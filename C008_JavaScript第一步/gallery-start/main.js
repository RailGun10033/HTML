const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

function loopImages() {
    for (let index = 0; index < 5; index++) {
        const newImage = document.createElement('img');
        newImage.setAttribute('src', "images/pic"+(index+1)+".jpg");
        thumbBar.appendChild(newImage);   
    }
    
}

thumbBar.addEventListener('click', function (e) {
    displayedImage.setAttribute('src',e.target.src);
});


loopImages();
/* Wiring up the Darken/Lighten button */

let isDark = false;
btn.addEventListener('click', function(e) {
    isDark = !isDark;
    if (isDark == true) {
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});
