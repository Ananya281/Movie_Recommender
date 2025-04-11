from flask import Flask, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load DataFrame
with open('movienew.pkl', 'rb') as f:
    movienew = pickle.load(f)

# ===========================
# Helper to Return Top Movies
# ===========================

def get_top_movies_by_genre(genre, top_n=10):
    genre_movies = movienew[movienew['genres'].str.lower().str.contains(genre.lower(), na=False)]
    sorted_movies = genre_movies.sort_values(by='imdb_rating', ascending=False)
    top_movies = sorted_movies.head(top_n)
    
    return [
        {
            "title": row["title"],
            "rating": row["imdb_rating"],
            "image": row["poster_path"]
        }
        for _, row in top_movies.iterrows()
    ]

# ===========================
# API Endpoints
# ===========================

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

