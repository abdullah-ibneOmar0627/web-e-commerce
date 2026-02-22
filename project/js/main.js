// main.js
let cart = [];
let subtotal = 0;
let deliveryCharge = 60;
let shippingCost = 40;
let couponDiscount = 0;
let userBalance = 1000; 


function updateBalance() {
  const balanceDisplay = document.getElementById("user-balance");
  if (balanceDisplay) balanceDisplay.innerText = `${userBalance} BDT`;
}


function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}


function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}


function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer || !subtotalElement || !totalElement) {
    console.warn("Cart elements missing in DOM");
    return;
  }

  cartContainer.innerHTML = "";

  subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-white p-3 rounded shadow";
    div.innerHTML = `
      <div>
        <p class="font-semibold">${item.title}</p>
        <p>${item.price} BDT × ${item.quantity}</p>
      </div>
      <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="removeFromCart(${item.id})">
        Remove
      </button>
    `;
    cartContainer.appendChild(div);
  });

  subtotalElement.innerText = subtotal.toFixed(2);
  const total = subtotal + deliveryCharge + shippingCost - couponDiscount;
  totalElement.innerText = total.toFixed(2);
}


document.getElementById("apply-coupon")?.addEventListener("click", () => {
  const code = document.getElementById("coupon-code").value.trim();
  if (code === "SMART10") {
    couponDiscount = subtotal * 0.1;
    alert("✅ Coupon applied: 10% discount!");
  } else {
    couponDiscount = 0;
    alert("❌ Invalid coupon!");
  }
  updateCart();
});


document.getElementById("place-order")?.addEventListener("click", () => {
  const total = subtotal + deliveryCharge + shippingCost - couponDiscount;

  if (total > userBalance) {
    alert("❌ Insufficient balance! Please add more funds.");
  } else if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
  } else {
    userBalance -= total;
    alert("🎉 Order placed successfully!");
    cart = [];
    couponDiscount = 0;
    updateCart();
    updateBalance();
  }
});


document.getElementById("add-money")?.addEventListener("click", () => {
  userBalance += 1000;
  updateBalance();
});


document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  updateBalance();
});