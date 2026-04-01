const container = document.getElementById("products-container");
const loading = document.getElementById("loading");

// Fetch API
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none"; // hide loading
    displayProducts(data.products);
  })
  .catch(err => {
    loading.innerText = "Failed to load data";
    console.error(err);
  });

// Display function
function displayProducts(products) {
  container.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 60)}...</p>
      <p class="price">$${product.price}</p>
    </div>
  `).join("");
}