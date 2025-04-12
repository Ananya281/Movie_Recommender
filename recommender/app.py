from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import pandas as pd
import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from urllib.parse import unquote
import re 

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://movie-recommender-2823.vercel.app"])

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['movie_recommender']
users_collection = db['users']

with open('popular.pkl', 'rb') as f:
    popular = pickle.load(f)

with open('movienew.pkl', 'rb') as f:
    movienew = pickle.load(f)

try:
    with open('similarity.pkl', 'rb') as f:
        similarity = pickle.load(f)
except:
    similarity = None

# ===========================
# Movie Detail API
# ===========================

def get_movie_info(popular, title):
    title = unquote(title)  # Decode special characters
    safe_title = re.escape(title.lower())  # ✅ Escape special regex characters

    matched_movie = popular[popular['title'].str.lower().str.contains(safe_title, na=False, regex=True)]

    if matched_movie.empty:
        return None

    return {
        'title': matched_movie['title'].values[0],
        'imdb_rating': matched_movie['imdb_rating'].values[0],
        'poster_path': matched_movie['poster_path'].values[0],
        'genres': matched_movie['genres'].values[0],
        'summary': matched_movie['summary'].values[0],
        'actors': matched_movie['actors'].values[0],
    }


def get_movie_wiki(popular, title):
    movie_info = popular[popular['title'] == title]
    if movie_info.empty:
        return None
    return movie_info['story'].values[0]

@app.route('/api/movie-detail', methods=['POST'])
def movie_detail():
    try:
        data = request.get_json()
        title = data.get('title')
        if not title:
            return jsonify({"error": "Title is required"}), 400
        movie_info = get_movie_info(popular, title)
        if not movie_info:
            return jsonify({"error": "Movie not found"}), 404
        story = get_movie_wiki(popular, movie_info['title']) or "No story available"
        movie_info["story"] = story
        return jsonify(movie_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===========================
# Recommendation Function
# ===========================

def recommend_movies(popular_df, selected_genres=None, selected_actors=None, top_n=10):
    if popular_df.empty or 'imdb_rating' not in popular_df.columns:
        return pd.DataFrame()
    filtered_df = popular_df.copy()
    if selected_genres:
        filtered_df = filtered_df[filtered_df['genres'].apply(
            lambda x: any(
                genre.lower() in (item.lower() for item in x.split(',') if isinstance(x, str))
                for genre in selected_genres)
        )]
    if selected_actors:
        filtered_df = filtered_df[filtered_df['actors_normalized'].apply(
            lambda x: any(
                all(part.lower() in x.lower() for part in actor.split()) for actor in selected_actors)
        )]
    return filtered_df.sort_values(by='imdb_rating', ascending=False).head(top_n)

# ===========================
# Favorite Movies Endpoint
# ===========================

@app.route('/api/favorites/<user_id>', methods=['GET'])
def favorite_movies(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found"}), 404
        genres = user.get("favoriteGenres", [])
        actors = user.get("favoriteActors", [])
        recommended = recommend_movies(
            movienew,
            selected_genres=genres,
            selected_actors=actors,
            top_n=10
        )
        return jsonify([
            {"title": row["title"], "rating": row["imdb_rating"], "image": row["poster_path"]}
            for _, row in recommended.iterrows()
        ])
    except Exception as e:
        return jsonify({"message": "Internal server error"}), 500

# ===========================
# Top Genre Helpers & Routes
# ===========================

def get_top_movies_by_genre(genre, top_n=10):
    genre_movies = movienew[movienew['genres'].str.lower().str.contains(genre.lower(), na=False)]
    top_movies = genre_movies.sort_values(by='imdb_rating', ascending=False).head(top_n)
    return [
        {"title": row["title"], "rating": row["imdb_rating"], "image": row["poster_path"]}
        for _, row in top_movies.iterrows()
    ]

@app.route('/api/top/action')
def top_action():
    return jsonify(get_top_movies_by_genre("action"))

@app.route('/api/top/comedy')
def top_comedy():
    return jsonify(get_top_movies_by_genre("comedy"))

@app.route('/api/top/romance')
def top_romance():
    return jsonify(get_top_movies_by_genre("romance"))

@app.route('/api/top/thriller')
def top_thriller():
    return jsonify(get_top_movies_by_genre("thriller"))

# ===========================
# Combined Search Recommendation
# ===========================

@app.route('/api/search', methods=['POST'])
def search_movies():
    data = request.get_json()
    query = data.get("query", "").strip().lower()
    if not query:
        return jsonify([])
    recommendations = combined_movie_recommendation(query)
    return jsonify([
        {"title": r[0][0], "rating": r[1][0], "image": r[2][0]} for r in recommendations
    ])

def recommend_based_actor(actor_name):
    actor_name = actor_name.replace(" ", "").lower()
    movienew['actors_normalized'] = movienew['actors'].str.replace(" ", "").str.lower()
    matches = movienew[movienew['actors_normalized'].str.contains(actor_name, na=False)]
    return build_recommendation(matches)

def recommend_based_genre(genre_name):
    genre_name = genre_name.strip().lower()
    matches = movienew[movienew['genres'].str.lower().str.contains(genre_name, na=False)]
    return build_recommendation(matches)

def recommend_based_movie(movie_title):
    if not similarity:
        return []
    query_normalized = movie_title.strip().lower()
    title_series = movienew['title'].str.lower().str.replace(r'\s*\(.*\)', '', regex=True)
    movie_matches = movienew[title_series.str.contains(query_normalized, na=False)]
    if movie_matches.empty:
        return []
    recommendations = []
    for _, row in movie_matches.iterrows():
        try:
            idx = movienew[title_series == row['title'].lower()].index[0]
            distances = similarity[idx]
            movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
            for i in movie_list:
                movie_info = movienew.iloc[i[0]]
                recommendations.append([
                    [movie_info['title']], [movie_info['imdb_rating']], [movie_info['poster_path']]
                ])
        except IndexError:
            continue
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations[:5]

def build_recommendation(df):
    if df.empty:
        return []
    df = df.sort_values(by='imdb_rating', ascending=False).head(5)
    return [[[r['title']], [r['imdb_rating']], [r['poster_path']]] for _, r in df.iterrows()]

def combined_movie_recommendation(query):
    recommendations = []
    try:
        recommendations.extend(recommend_based_movie(query))
    except:
        pass
    try:
        recommendations.extend(recommend_based_actor(query))
    except:
        pass
    try:
        recommendations.extend(recommend_based_genre(query))
    except:
        pass
    return recommendations[:5]

# ===========================
# Start the Server
# ===========================

@app.route('/')
def home():
    return {'message': 'Flask backend is running!'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))