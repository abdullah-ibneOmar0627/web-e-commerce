// api.js
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

let allProducts = []; 
let filteredProducts = []; 


async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();
    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    productList.innerHTML = `<p class="text-center text-red-500">Failed to load products.</p>`;
  }
}


function renderProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = `<p class="text-center col-span-full text-gray-500">No products found.</p>`;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="h-40 object-contain mb-3">
      <h3 class="font-semibold mb-2">${product.title}</h3>
      <p class="text-gray-700 font-bold mb-1">${product.price} BDT</p>
      <p class="text-yellow-500 mb-2">⭐ ${product.rating.rate} (${product.rating.count})</p>
      <button 
        class="mt-auto bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        onclick="addToCart({id: ${product.id}, title: '${product.title.replace(/'/g, "\\'")}', price: ${product.price}})"
      >
        Add to Cart
      </button>
    `;
    productList.appendChild(card);
  });
}

// Search 
searchInput?.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(searchText)
  );
  applySort(); 
});

// Sort 
sortSelect?.addEventListener("change", (e) => {
  applySort();
});


function applySort() {
  const sortValue = sortSelect.value;

  if (sortValue === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "rating") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  renderProducts(filteredProducts);
}


document.addEventListener("DOMContentLoaded", fetchProducts);