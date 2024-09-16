document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceContainer = document.getElementById('total-price');
  const cartCountElement = document.getElementById('cartCount'); 

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  function updateCartCount() {
    const cart = getCart();
    cartCountElement.textContent = cart.length; 
  }


  function renderCartItems() {
    const cart = getCart();
    cartItemsContainer.innerHTML = ''; 
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('col-md-4');
      itemDiv.innerHTML = `
        <div class="card mb-4">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">Price: ₹${item.price}</p>
            <button class="btn btn-danger btn-remove" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);

      totalPrice += item.price;
    });

    if (totalPriceContainer) {
      totalPriceContainer.textContent = `Total Price: ₹${totalPrice}`;
    }


    updateCartCount();
  }

  function removeItemFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1); 
    saveCart(cart);
    renderCartItems(); 
  }

  renderCartItems();

  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-remove')) {
      const index = e.target.getAttribute('data-index');
      removeItemFromCart(index);
    }
  });

  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Successfully purchased');
    localStorage.removeItem('cart'); 
    renderCartItems(); 
  });
});
