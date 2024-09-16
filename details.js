const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const description = urlParams.get('description');
const imageUrl = urlParams.get('imageUrl');
const price = urlParams.get('price');

document.getElementById('title').textContent = title;
document.getElementById('description').textContent = description;
document.getElementById('image').src = imageUrl;
document.getElementById('price').textContent = `Price: ₹ ${price}`;

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
  const cart = getCart();
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

updateCartCount();

document.getElementById('add-to-cart').addEventListener('click', () => {
  const cartItem = {
    title,
    description,
    imageUrl,
    price: parseFloat(price)
  };

  let cart = getCart();
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
  alert('Item added to cart!');
});

const relatedProducts = [
  {
    title: 'Chocolate Truffle Cake',
    description: 'Rich chocolate cake with layers of creamy ganache.',
    imageUrl: 'https://assets.winni.in/product/primary/2014/6/31204.jpeg?dpr=1&w=400',
    price: 500
  },
  {
    title: 'Vanilla Cream Cake',
    description: 'Classic vanilla cake with fresh cream and fruit toppings.',
    imageUrl: 'https://assets.winni.in/product/primary/2023/8/88014.jpeg?dpr=1&w=400',
    price: 450
  },
  {
    title: 'Strawberry Delight Cake',
    description: 'Delicious strawberry cake with whipped cream.',
    imageUrl: 'https://assets.winni.in/product/primary/2024/1/93199.jpeg?dpr=1&w=400',
    price: 600
  }
];

function renderRelatedProducts() {
  const relatedProductsContainer = document.getElementById('related-products');
  
  relatedProducts.forEach(product => {
    const productHTML = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Price: ₹${product.price}</strong></p>
            <a href="details.html?title=${encodeURIComponent(product.title)}&description=${encodeURIComponent(product.description)}&imageUrl=${encodeURIComponent(product.imageUrl)}&price=${product.price}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    `;
    relatedProductsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}

renderRelatedProducts();
