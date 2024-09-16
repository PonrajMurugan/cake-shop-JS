const sectionThree = document.getElementById('sectionThree');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const cartCountElement = document.getElementById('cartCount');
const priceFilter = document.getElementById('priceFilter');

const cardData = [
  {
    title: "Chocolate Cake",
    description: "Delicious and rich chocolate cake.",
    imageUrl: "https://assets.winni.in/product/primary/2024/3/94564.jpeg?dpr=1&w=400",
    price: 450,
  },
  {
    title: "Vanilla Cake",
    description: "Classic vanilla cake with a creamy frosting.",
    imageUrl: "https://assets.winni.in/product/primary/2022/3/58400.jpeg?dpr=1&w=400",
    price: 480
  },
  {
    title: "Red Velvet Cake",
    description: "Smooth and velvety red velvet cake.",
    imageUrl: "https://assets.winni.in/product/primary/2024/4/95074.jpeg?dpr=1&w=400",
    price: 700
  },
  {
    title: "Carrot Cake",
    description: "Healthy and sweet carrot cake.",
    imageUrl: "https://assets.winni.in/product/primary/2024/3/94609.jpeg?dpr=1&w=400",
    price: 800
  },
  {
    title: "Pineapple Cake",
    description: "Delicious and rich Pineapple cake.",
    imageUrl: "https://assets.winni.in/product/primary/2024/4/95082.jpeg?dpr=1&w=400",
    price: 550,
  },
  {
    title: "Blueberry Cake",
    description: "Classic Blueberry cake with a frosting.",
    imageUrl: "https://assets.winni.in/product/primary/2024/4/95081.jpeg?dpr=1&w=400",
    price: 250
  },
  {
    title: "Coconut Cake",
    description: "Smooth Coconut cake.",
    imageUrl: "https://assets.winni.in/product/primary/2024/4/95085.jpeg?dpr=1&w=400",
    price: 750
  },
  {
    title: "Mango Cake",
    description: "Healthy and sweet Mango cake.",
    imageUrl: "https://assets.winni.in/product/primary/2014/6/31167.jpeg?dpr=1&w=400",
    price: 350
  }
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
  const cart = getCart();
  cartCountElement.textContent = cart.length;
}

updateCartCount();

function renderCards(cards) {
  sectionThree.innerHTML = '';
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  cards.forEach(card => {
    const cardElement = createCard(card.title, card.description, card.imageUrl, card.price);
    cardContainer.appendChild(cardElement);
  });

  sectionThree.appendChild(cardContainer);
}

function createCard(title, description, imageUrl, price) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const img = document.createElement('img');
  img.classList.add('card-img');
  img.src = imageUrl;
  img.alt = title;

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = title;

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = description;

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('card-price');
  cardPrice.textContent = `Price: ₹ ${price}`;

  const cardButton = document.createElement('button');
  cardButton.classList.add('card-btn');
  cardButton.textContent = "View";

  cardButton.addEventListener('click', () => {
    const url = `details.html?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&imageUrl=${encodeURIComponent(imageUrl)}&price=${encodeURIComponent(price)}`;
    window.open(url, '_blank');
  });

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardText);
  cardDiv.appendChild(cardPrice);
  cardDiv.appendChild(cardButton);

  return cardDiv;
}

renderCards(cardData);


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  let filteredCards = cardData.filter(card => card.title.toLowerCase().includes(query));

  renderCards(filteredCards); 
});


priceFilter.addEventListener('change', () => {
  const priceFilterValue = priceFilter.querySelector('input[name="priceFilter"]:checked').value;

  let filteredCards = cardData;

  if (priceFilterValue === 'above500') {
    filteredCards = cardData.filter(card => card.price > 500);
  } else if (priceFilterValue === 'below500') {
    filteredCards = cardData.filter(card => card.price <= 500);
  }

  renderCards(filteredCards); 
});
