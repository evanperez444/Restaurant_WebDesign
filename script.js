let slideIndex = 1;
showSlides(slideIndex);

//function to move to next/previous slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//function to display the correct slide
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    //hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    //show the correct slide
    slides[slideIndex - 1].style.display = "block";
}

setInterval(() => {
    plusSlides(1);
}, 3000);


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    //close menu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
        }
    });
});



function initMap() {
    //location of the restaurant
    const restaurantLocation = { lat: 61.1903, lng: -149.8976 };

    //create the map, centered on the restaurant's location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: restaurantLocation,
        mapTypeId: "roadmap"
    });

    //add a marker at the restaurant's location
    const marker = new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: "4333 Spenard Rd, Anchorage, AK 99517"
    });
}


