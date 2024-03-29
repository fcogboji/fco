import { products } from "./products.js";

// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the displayed cart quantity
function updateCartQuantity() {
  let cartQuantity = 0;
  // Calculate total quantity in the cart
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  // Display the total cart quantity
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(productName, quantity) {
  // Find if the product is already in the cart
  let matchingItem = cart.find((item) => item.productName === productName);

  if (matchingItem) {
    // If product already exists, update its quantity
    matchingItem.quantity += quantity;
  } else {
    // If product doesn't exist, add it to the cart
    cart.push({
      productName: productName,
      quantity: quantity
    });
  }

  // Update the displayed cart quantity and save to localStorage
  updateCartQuantity();
  saveCartToLocalStorage();

  // Find the corresponding "add my-list" element and add the "enable" class
  const addMyListElement = document.querySelector(`.add.my-list[data-product-name="${productName}"]`);
  addMyListElement.classList.add('enable');

  // After 1 second, remove the "enable" class
  setTimeout(() => {
    addMyListElement.classList.remove('enable');
  }, 1000);
}

// Function to clear the cart
function clearCart() {
  // Reset cart to an empty array
  cart = [];
  // Remove cart from localStorage
  localStorage.removeItem('cart');
  // Update the displayed cart quantity
  updateCartQuantity();
}

// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  let productsHTML = "";
  // Generate HTML for each product
  products.forEach((product) => {
    productsHTML += `
      <div class="happy-customer">
        <div class="image-size">
          <img class="images-style" src="${product.image}">
        </div>
        <div class="my-paragraph">${product.name}</div>
        <div>
          <img class="ratings" src="rating-45.png">
          <div class="count">${product.rating.count}</div>
          <div>£${(product.priceCents / 100).toFixed(2)}</div>
        </div>
        <select class="itemQuantity" data-product-name="${product.name}">
          <option selected="" value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div class="btm parent-element-selector">
          <div class="add my-list" data-product-name="${product.name}">&#10003; Added</div>
          <button class="btn js-add-to-cart list" data-product-name="${product.name}">Add to cart</button>
        </div>
      </div>
    `;
  });

  // Display the product HTML
  document.querySelector('.js-grid-template').innerHTML = productsHTML;

  // Update the displayed cart quantity
  updateCartQuantity();

  // Add event listeners to "Add to cart" buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.productName;
      const selectElement = document.querySelector(`.itemQuantity[data-product-name="${productName}"]`);
      const quantity = parseInt(selectElement.value);
      // Add product to cart when "Add to cart" button is clicked
      addToCart(productName, quantity);
    });
  });

  // Add event listener to "Clear cart" button
  document.querySelector('.js-clear-cart').addEventListener('click', () => {
    // Clear the cart when "Clear cart" button is clicked
    clearCart();
  });
});
