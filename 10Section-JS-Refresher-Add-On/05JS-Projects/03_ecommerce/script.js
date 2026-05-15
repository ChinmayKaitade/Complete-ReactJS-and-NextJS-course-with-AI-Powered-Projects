document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Initial render
  renderProducts();
  renderCart();

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  // Listen for clicks on the remove buttons in the cart
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(index);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveAndRender();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product"); // Reusing style for consistency
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}" style="background-color: #ff123d;">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    alert(`Purchased successfully! Total: ${totalPriceDisplay.textContent}`);
    cart = [];
    saveAndRender();
  });
});
