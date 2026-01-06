/* ================= HERO SLIDER ================= */
const heroTexts = [
    "New Year’s deals just dropped",
    "Top electronics up to 50% off",
    "Upgrade your home today"
];

let currentSlide = 0;
const heroTextEl = document.getElementById("hero-text");

function updateHero() {
    heroTextEl.innerHTML = `
        <p class="small">Make 2026 your year</p>
        <h1>${heroTexts[currentSlide]}</h1>
    `;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroTexts.length;
    updateHero();
}

function prevSlide() {
    currentSlide =
        (currentSlide - 1 + heroTexts.length) % heroTexts.length;
    updateHero();
}

setInterval(nextSlide, 4000);

/* ================= PRODUCTS ================= */
const products = [
    { id: 1, name: "Wireless Mouse", price: 500, image: "https://th.bing.com/th/id/R.deb94eda72a04115155bccd1ea2f9288?rik=q1OLgKsSNlNZFA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f04%2fPC-Mouse-PNG.png&ehk=PIqmYrfA%2bFGQ9Q9s7hPO8VZzcnIggPD%2bFfTf0xb3H8E%3d&risl=&pid=ImgRaw&r=0" },
    { id: 2, name: "Headphones", price: 999, image: "image/headphones.jpg" },
    { id: 3, name: "Smart Watch", price: 1499, image: "image/watch.png" },
    { id: 4, name: "Bluetooth Speaker", price: 1999, image: "image/speaker.jpg" },
    { id: 5, name: "Bag", price: 699, image: "image/Bag.png" }
];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

/* ================= CART (localStorage) ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.length;
}

/* ================= DISPLAY PRODUCTS ================= */
function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<h2>No products found</h2>";
        return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
<h3>${product.name}</h3>
<div class="rating">⭐⭐⭐⭐☆</div>
<p>${product.price.toLocaleString('en-IN', {
  style: 'currency',
  currency: 'INR'
})}</p>
<button>Add to Cart</button>

        `;

        div.querySelector("button").addEventListener("click", () => {
            addToCart(product.id);
        });

        fragment.appendChild(div);
    });

    productList.appendChild(fragment);
}

displayProducts(products);

/* ================= SEARCH ================= */
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );
    displayProducts(filteredProducts);
});
