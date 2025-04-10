let slideIndex = 1;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//initialize slideshow
showSlides(slideIndex);

//slideshow functions
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

setInterval(() => plusSlides(1), 3000);

//map initialization
function initMap() {
    const restaurantLocation = { lat: 61.1903, lng: -149.8976 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: restaurantLocation,
        mapTypeId: "roadmap"
    });
    new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: "4333 Spenard Rd, Anchorage, AK 99517"
    });
}

// --- Enhanced Cart Functionality ---
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ 
            name, 
            price: parseFloat(price) || 0, 
            quantity: 1 
        });
    }
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Your cart is empty";
        cartItems.appendChild(li);
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            
            // Create elements safely (XSS protection)
            const itemText = document.createElement("span");
            itemText.textContent = `${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`;
            
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => removeFromCart(item.name));
            
            li.appendChild(itemText);
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
        });
    }

    cartTotal.textContent = formatCurrency(total);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(amount);
}

//DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
    // Hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
        
        document.addEventListener("click", (event) => {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price) || 0;
            addToCart(name, price);
        });
    });

    const clearCartBtn = document.getElementById("clear-cart");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }

 
    updateCart();
});