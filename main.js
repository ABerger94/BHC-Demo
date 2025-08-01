// Update cart count on all pages
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = totalItems;
  });
}

// Add an item to the cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartCount();
}

// Set up Buy Now buttons
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Attach to all buttons with class 'buy-btn'
  const buyButtons = document.querySelectorAll(".buy");
  buyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const price = parseFloat(btn.dataset.price);

      if (isNaN(price)) {
        console.error("Invalid price on Buy button:", btn.dataset.price);
        return;
      }

      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: price,
        quantity: 1
      };

      addToCart(product);
    });
  });
});
