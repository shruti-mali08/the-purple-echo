// const all_albums = [
//     {
//         name: "2 Cool 4 Skool",
//         year: 2013,
//         type: "single album",
//         cover: "images/04discography_page/bts/01-2_cool_4_skool.jpg"
//     },

//     {
//         name: "O!RUL82?",
//         year: 2013,
//         type: "mini album",
//         cover: "images/04discography_page/bts/02-oh_are_you_late_too.jpg"
//     },

//     {
//         name: "Skool Luv Affair",
//         year: 2014,
//         type: "mini album",
//         cover: "images/04discography_page/bts/03-skool_luv_affair.jpg"
//     },

//     {
//         name: "Darkk & Wild",
//         year: 2014,
//         type: "full-length album",
//         cover: "images/04discography_page/bts/04-dark_and_wild.jpg"
//     },

//     {
//         name: "The most beautiful moment in life pt.1",
//         year: 2015,
//         type: "mini album",
//         cover: "images/04discography_page/bts/05-TMBMIL_pt1.jpg"
//     },

//     {
//         name: "The most beautiful moment in life pt.2",
//         year: 2015,
//         type: "mini album", 
//         cover: "images/04discography_page/bts/06-TMBMIL_pt2.jpg"
//     },

//     {
//         name: "The most beautiful moment in life : Young Forever",
//         year: 2016,
//         type: "special album",
//         cover: "images/04discography_page/bts/07-TMBMIL_young_forever.jpg"
//     },

//     {
//         name: "Wings",
//         year: 2016,
//         type: "full-length album", 
//         cover: "images/04discography_page/bts/08-wings.jpg"
//     },

//     {
//         name: "You never walk alone",
//         year: 2017,
//         type: "special album",
//         cover: "images/04discography_page/bts/09-you_never_walk_alone.jpg"
//     },

//     {
//         name: "Love Yourself 承 'Her'",
//         year: 2017,
//         type: "mini album",
//         cover: "images/04discography_page/bts/10-LY_her.jpg"
//     },

//     {
//         name: "Love Yourself 轉 'Tear'",
//         year: 2018,
//         type: "full-length album", 
//         cover: "images/04discography_page/bts/11-LY_tear.jpg"
//     },

//     {
//         name: "Love Yourself 結 'Answer'",
//         year: 2018,
//         type: "repackaging album", 
//         cover: "images/04discography_page/bts/12-LY_answer.jpg"
//     },

//     {
//         name: "Map of the Soul : Persona",
//         year: 2019,
//         type: "mini album", 
//         cover: "images/04discography_page/bts/13-MOTS_persona.jpg"
//     },

//     {
//         name: "Map of the Soul : 7",
//         year: 2020,
//         type: "full-length album", 
//         cover: "images/04discography_page/bts/14-MOTS_7.jpg"
//     },

//     {
//         name: "Dynamite",
//         year: 2020,
//         type: "digital single", 
//         cover: "images/04discography_page/bts/15-dynamite.jpg"
//     },

//     {
//         name: "BE",
//         year: 2020,
//         type: "mini album", 
//         cover: "images/04discography_page/bts/16-be.jpg"
//     },

//     {
//         name: "Butter",
//         year: 2021,
//         type: "digital single", 
//         cover: "images/04discography_page/bts/17-butter-ds.jpg"
//     },

//     {
//         name: "Butter",
//         year: 2021,
//         type: "single album", 
//         cover: "images/04discography_page/bts/18-butter.jpg"
//     },

//     {
//         name: "Proof",
//         year: 2022,
//         type: "anthology album", 
//         cover: "images/04discography_page/bts/19-proof.jpg"
//     },

//     {
//         name: "Take Two",
//         year: 2023,
//         type: "digital single", 
//         cover: "images/04discography_page/bts/20-take_two.jpg"
//     },

//     {
//         name: "Permission to Dance On Stage - Live",
//         year: 2025,
//         type: "live album", 
//         cover: "images/04discography_page/bts/21-pts_on_stage-live.jpg"
//     }
// ];

//-----------------------------------------------------------------------------------------------

window.addEventListener("load", setup);

function setup()
{
    // mouseHoverOverlay();
    search_input_reference = document.getElementById("search_input");
    search_button_reference = document.getElementById("search_image");

    search_input_reference.addEventListener("keyup", handle_search);
}

function handle_search()
{
    let album_name = search_input_reference.value.trim().toLowerCase();
    let found_album = false;
    let album_found = null;

    for(let i = 0; i < all_albums.length; i++)
    {
        if(all_albums[i].name.toLowerCase() === album_name)
        {
            found_album = true;
            album_found = all_albums[i];
            break;
        }
    }

    displayAlbum(album_found, found_album);
}

function displayAlbum(album_found, found_album)
{
    const display = document.getElementById("found_album");
    let display_album_cover;

    if(found_album)
    {
        display_album_cover = `<img src="${album_found.cover}" alt="${album_found.name} cover" class="album-cover">
                                <h4>${album_found.name}</h4> <hr>`
    }
    else {
        display_album_cover = `<p>Album not found in the database.</p> <hr>`
    }
    display.innerHTML = display_album_cover;
    
}













































// function mouseHoverOverlay()
// {
//     const images = document.querySelectorAll("#albums li img");

//     images.forEach(img =>{

//         // create overlay
//         const overlay = document.createElement("div");
//         overlay.classList.add("overlay");
//         overlay.textContent = img.dataset.title;
//         img.parentElement.appendChild(overlay);

//         img.addEventListener('mouseover', () => {
//             img.style.filter = 'brightness(60%)'; // darken image
//             overlay.style.opacity = '1';          // show overlay text
//         });

//         img.addEventListener('mouseout', () => {
//             img.style.filter = 'brightness(100%)'; // reset brightness
//             overlay.style.opacity = '0';           // hide overlay text
//         });
//     });
// }