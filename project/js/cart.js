// cart.js
let cart = [];
const deliveryCharge = 50;
let currentBalance = 0; 

const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const couponInput = document.getElementById('coupon');
const applyCouponBtn = document.getElementById('applyCoupon');
const confirmOrderBtn = document.getElementById('confirmOrder');
const cartMessage = document.getElementById('cartMessage');


function updateCartBalance(balance) {
  currentBalance = balance;
}


function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}


function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  let total = subtotal + deliveryCharge;

  const coupon = couponInput.value.trim().toUpperCase();
  if (coupon === 'SMART10') {
    discount = subtotal * 0.1;
    total = subtotal - discount + deliveryCharge;
  }

  subtotalEl.textContent = subtotal.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  return { subtotal, discount, total };
}


function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
    calculateTotals();
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center border-b pb-2';
    li.innerHTML = `
      <span>${item.title.slice(0, 25)}... x${item.quantity}</span>
      <div class="flex gap-2 items-center">
        <span>${(item.price * item.quantity).toFixed(2)} BDT</span>
        <button class="text-red-600 hover:underline remove">Remove</button>
      </div>
    `;
    li.querySelector('.remove').addEventListener('click', () => removeFromCart(item.id));
    cartItems.appendChild(li);
  });

  calculateTotals();
}


applyCouponBtn.addEventListener('click', () => {
  calculateTotals();
  cartMessage.textContent = '✅ Coupon applied (if valid)';
  setTimeout(() => (cartMessage.textContent = ''), 2000);
});


confirmOrderBtn.addEventListener('click', () => {
  const { total } = calculateTotals();

  if (cart.length === 0) {
    cartMessage.textContent = '🛒 Your cart is empty!';
    return;
  }

  if (total > currentBalance) {
    cartMessage.textContent = '⚠️ Insufficient balance. Please add funds.';
    cartMessage.classList.add('text-red-600');
  } else {
    
    currentBalance -= total;
    window.updateUserBalance(currentBalance); 

    cartMessage.textContent = '✅ Order placed successfully!';
    cartMessage.classList.remove('text-red-600');
    cart = [];
    renderCart();
  }

  setTimeout(() => (cartMessage.textContent = ''), 3000);
});

export { addToCart, updateCartBalance };