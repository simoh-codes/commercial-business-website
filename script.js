let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Mini cart elements
const miniCart = document.getElementById("mini-cart");
const miniCartItems = document.getElementById("mini-cart-items");
const miniCartTotal = document.getElementById("mini-cart-total");

// Toggle mini-cart
document.getElementById("cart-toggle").addEventListener("click", () => {
  miniCart.classList.toggle("active");
});

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const product = e.target.closest(".product");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    cart.push({ id, name, price });
    updateCart();
  });
});

function updateCart() {
  cartCount.textContent = cart.length;

  // Full cart section
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <i class="fas fa-times remove-item" data-index="${index}"></i>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);

  // Mini cart
  miniCartItems.innerHTML = "";
  let miniTotal = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("mini-cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <i class="fas fa-times remove-item" data-index="${index}"></i>
    `;
    miniCartItems.appendChild(div);
    miniTotal += item.price;
  });
  miniCartTotal.textContent = miniTotal.toFixed(2);

  // Attach remove events
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

document.getElementById("mini-clear-cart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Proceeding to checkout...");
  }
});
