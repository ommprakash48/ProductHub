const container = document.getElementById("products-container");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

let allProducts = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    allProducts = data.products;

    displayProducts(allProducts);
    loadCategories(allProducts);
  });


function displayProducts(products) {
  container.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="toggleFavorite(${product.id})">
        ${favorites.includes(product.id) ? "❤️" : "🤍"}
      </button>
    </div>
  `).join("");
}


function loadCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];

  categorySelect.innerHTML += categories.map(cat => `
    <option value="${cat}">${cat}</option>
  `).join("");
}


function applyFilters() {
  let result = [...allProducts];


  const searchText = searchInput.value.toLowerCase();
  result = result.filter(p =>
    p.title.toLowerCase().includes(searchText)
  );


  if (categorySelect.value !== "all") {
    result = result.filter(p =>
      p.category === categorySelect.value
    );
  }


  if (sortSelect.value === "low") {
    result = result.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high") {
    result = result.sort((a, b) => b.price - a.price);
  }

  displayProducts(result);
}


function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  applyFilters();
}


searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);