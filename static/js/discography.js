//-----------------------------------------------------------------------------------------------
// FAVORITE ALBUMS TO CART LOGIC

// Array to store the albums to be favorited
let cart = [];

// getting the elements
const cartDiv = document.querySelector('.cart_container');
const saveButton = document.getElementById('save_favorites_button');

// check if the album is within the cart using the albumId
function albumInCart(albumId) {
    return cart.some(album => album.id === albumId);
}

// hides the save button if there are no albums within the cart
function updateSaveButtonVisibility() {
    if (cart.length > 0) {
        saveButton.style.display = 'block';
    } else {
        saveButton.style.display = 'none';
    }
}

document.addEventListener('click', function(e) {
    // Add to cart button logic
    if (e.target && e.target.classList.contains('add-favorite-button')) {
        const button = e.target; 
        const album = {
            album_id: button.dataset.id,
            album_name: button.dataset.album, 
            album_cover: button.dataset.cover
        };

        // adds albums to the cart
        cart.push(album);
        console.log(cart);      // debugging

        // creates a li element to display the albums in the cart
        const li = document.createElement('li');
        li.dataset.id = album.album_id;
        li.innerHTML = `<button class = "remove-favorite-button"> Remove</button> <br>
                        <img src="${album.album_cover}" alt="${album.album_name} cover"> <br> ${album.album_name}`;
                        
        cartDiv.appendChild(li);

        // changing the button properties [disables] to avoid duplicates
        button.textContent = 'Added to Cart';
        button.disabled = true;
        updateSaveButtonVisibility();
    }

    // Remove from cart button logic
    if (e.target && e.target.classList.contains('remove-favorite-button')) {
        const li = e.target.parentElement;
        const albumId = li.dataset.id;

        // removes the album from the cart
        cart = cart.filter(album => album.album_id !== albumId);
        console.log(cart);      // debugging
        li.remove();            // removes the li element
        
        // changes the button properties
        const addButton = document.querySelector(`.add-favorite-button[data-id='${albumId}']`);
        if (addButton) {
            addButton.textContent = 'Add to Cart';
            addButton.disabled = false;
        }
        updateSaveButtonVisibility();
    }
});

// save button stores the albums currently in the cart to the favorite.db database
document.getElementById('save_favorites_button')?.addEventListener('click', function() {
    // edge case handling
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    // posting the albums to the database
    fetch("/save_favorite", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({ albums: cart })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);                  // debugging
        window.location.href = "/confirmation";     // redirection to the confirmation page
    });
});