from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import pandas as pd
import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# If using dotenv (recommended)
load_dotenv()

# Connect to MongoDB using MONGO_URI from .env
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['movie_recommender']
users_collection = db['users']

# Load DataFrame
with open('movienew.pkl', 'rb') as f:
    movienew = pickle.load(f)

# ===========================
# Recommendation Function
# ===========================

def recommend_movies(popular_df, selected_genres=None, selected_actors=None, top_n=10):
    if popular_df.empty:
        return pd.DataFrame()

    if 'imdb_rating' not in popular_df.columns:
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

    filtered_df = filtered_df.sort_values(by='imdb_rating', ascending=False)
    return filtered_df.head(top_n)

# ===========================
# Favorite Movies Endpoint
# ===========================
@app.route('/api/favorites/<user_id>', methods=['GET'])
def favorite_movies(user_id):
    try:
        print("=== DEBUG START ===")
        print(f"Raw user ID: {user_id}")
        converted_id = ObjectId(user_id)
        print(f"Converted ID: {converted_id}")

        user = users_collection.find_one({"_id": converted_id})
        print(f"User: {user}")
        print("=== DEBUG END ===")

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
        print("Error:", e)
        return jsonify({"message": "Internal server error"}), 500


# ===========================
# Top Genre Helpers & Routes
# ===========================

def get_top_movies_by_genre(genre, top_n=10):
    genre_movies = movienew[movienew['genres'].str.lower().str.contains(genre.lower(), na=False)]
    sorted_movies = genre_movies.sort_values(by='imdb_rating', ascending=False)
    top_movies = sorted_movies.head(top_n)
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
# Start the Server
# ===========================
if __name__ == '__main__':
    app.run(debug=True, port=5001)
