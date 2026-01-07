window.addEventListener("load", setup);

function setup() {
    const favoriteList = document.getElementById("favorites_list");

    favoriteList.addEventListener("click", function (e) {
        // Remove album from the database logic
        if (e.target && e.target.classList.contains("remove-favorite-button")) {
            const albumId = e.target.dataset.id;
            const albumCard = e.target.closest(".favorite_album_card");

            // deleting album/entry from the database (HTTP Request)
            fetch("/remove_favorite", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ album_id: albumId }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);      // debugging
                // Remove the album card 
                if (albumCard) {
                    albumCard.remove();
                    console.log(favoriteList);  // debugging
                }

                if (favoriteList.querySelectorAll('.favorite_album_card').length === 0) {
                    favoriteList.innerHTML = "<p>No favorite albums added yet.</p>";
                }
            });
        }
    });
}