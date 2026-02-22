// balance.js
import { updateCartBalance } from './cart.js';

const balanceAmountEl = document.getElementById('user-balance');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const withdrawMoneyBtn = document.getElementById('withdrawMoneyBtn');

let userBalance = localStorage.getItem('userBalance')
  ? parseFloat(localStorage.getItem('userBalance'))
  : 1000;

function updateUserBalanceDisplay() {
  balanceAmountEl.textContent = userBalance.toFixed(2);
  balanceAmountEl.classList.toggle('text-red-600', userBalance < 100);
  updateCartBalance(userBalance);
}

function saveBalance() {
  localStorage.setItem('userBalance', userBalance);
}

addMoneyBtn.addEventListener('click', () => {
  userBalance += 1000;
  saveBalance();
  updateUserBalanceDisplay();
  alert('💸 1000 BDT added to your balance!');
});

withdrawMoneyBtn.addEventListener('click', () => {
  if (userBalance >= 500) {
    userBalance -= 500;
    saveBalance();
    updateUserBalanceDisplay();
    alert('💰 500 BDT withdrawn from your balance.');
  } else {
    alert('⚠️ Not enough balance to withdraw!');
  }
});

// function to be used by cart.js
window.updateUserBalance = (newBalance) => {
  userBalance = newBalance;
  saveBalance();
  updateUserBalanceDisplay();
};

updateUserBalanceDisplay();