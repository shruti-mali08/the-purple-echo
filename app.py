from flask import Flask, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from flask import request
import json

## Flask app setup
app = Flask(__name__)

## SQLAlchemy database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///favorites.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

## Initialize the database
db = SQLAlchemy(app)


## Database model for favorite albums
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    album_id = db.Column(db.Integer, unique = True, nullable=False)
    album_name = db.Column(db.String(200), unique = True, nullable=False)
    album_cover = db.Column(db.String(300), unique = True, nullable=False)

## Creating the database if they don't exist
with app.app_context():
    db.create_all()


## Load albums data from JSON file
def load_albums():
    with open("data/albums.json", "r", encoding="utf-8") as f: 
        return json.load(f)     ## Returns a Pythin list of albums


##############################
## ROUTES
##############################

@app.route("/")
@app.route("/home")
def home():
    return render_template("01home_page.html")
    
@app.route("/members")
def members():
    return render_template("02members_page.html")

@app.route("/cultural_influence")
def cultural_influence():
    return render_template("03cultural_influence_page.html")


@app.route("/discography")
def discography():
    # Loads the albums (from JSON file)
    albums = load_albums()

    # Loads the favorites (from database) 
    favorites = Favorite.query.all()

    # Extracts the names of albums in favorites database
    favorite_names = [fav.album_name for fav in favorites]

    # Passes the albums and favorite album names to 04discography_page_flask.html
    return render_template(
        "04discography_page_flask.html", 
        albums=albums, 
        favorite_names=favorite_names)

@app.route("/confirmation")
def confirmation():
    return render_template("08confirmation_page.html")

##############################
## FAVORITES API ROUTES
##############################

@app.route("/favorites_page")
def favorites_page():
    # retrieves all favorites from the db. Passing it to 07favorites_page.html
    all_favorites = Favorite.query.all()
    return render_template("07favorites_page.html", favorites = all_favorites)

@app.route("/get_favorites")
def get_favorites():
    # retrieves all favorites from the db
    favorites = Favorite.query.all()
    
    # converts Favorite objects to JSON dictionaries
    favorites_list = [{"album_id": fav.album_id, "album_name": fav.album_name, "album_cover": fav.album_cover} for fav in favorites]
    
    # return as a json response
    return jsonify(favorites_list)

@app.route("/save_favorite", methods=["POST"])
def save_favorite():
    # gets json from the frontend
    data = request.get_json()

    # extracts the list of albums from above data
    favorites = data.get("albums", [])

    # iterating through the list to check if the album exists in the db. 
    for album in favorites: 
        exists = Favorite.query.filter_by(album_id=album['album_id']).first()

        # adding to the db if the album doesnt already exist in the db
        if not exists:
            fav = Favorite(
                album_id=album['album_id'],
                album_name=album['album_name'],
                album_cover=album['album_cover']
            )
            db.session.add(fav)
    db.session.commit()

    return jsonify({"message": "Favorites saved successfully."}), 201

## REMOVING FROM THE DATABASE 
@app.route("/remove_favorite", methods=["DELETE"])
def remove_favorite():
    # gets json from frontend
    data = request.get_json()

    # extracts the album_id from above 
    album_id = data.get("album_id")

    # get the particular album from the db using the album_id
    fav = Favorite.query.filter_by(album_id=album_id).first()

    # if the album (using the id) exists in the db, delete it
    if fav:
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"message": f"Removed {fav.album_name} from favorites."})
    else:
        return jsonify({"message": f"Album not found in favorites."}), 404 

##############################
## Run the app
##############################
if __name__ == "__main__":
    app.run(debug=True)