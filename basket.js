document.addEventListener('DOMContentLoaded', function() {
  // Данные о товарах
  const products = [
    {
      id: 1,
      image: 'img/7185292296.webp',
      price: 300,
      name: 'Катушка рыболовная'
    },
    {
      id: 2,
      image: 'img/7086317409.webp',
      price: 655,
      name: 'Удочка'
    },
    {
      id: 3,
      image: 'img/7342795353.webp',
      price: 555,
      name: 'Набор приманок'
    }
  ];

  // Элементы DOM
  const priceEl = document.querySelector('.price');
  const qtyEl = document.querySelector('.qty-number');
  const btnPlus = document.querySelector('.plus');
  const btnMinus = document.querySelector('.minus');
  const mainImage = document.querySelector('.main-product-image');
  const leftImage = document.querySelector('.side-product.left img');
  const rightImage = document.querySelector('.side-product.right img');
  const navButtons = document.querySelectorAll('.nav-button');
  
  // Текущий индекс товара
  let currentIndex = 0;
  let basePrice = products[currentIndex].price;
  
  // Устанавливаем начальное количество 2
  qtyEl.textContent = '2';

  // Функция обновления цены
  function updatePrice() {
    const qty = parseInt(qtyEl.textContent);
    const totalPrice = basePrice * qty;
    priceEl.textContent = totalPrice.toLocaleString('ru-RU') + ' ₽';
  }

  // Функция обновления товаров
  function updateProducts() {
    // Обновляем основной товар
    mainImage.src = products[currentIndex].image;
    mainImage.alt = products[currentIndex].name;
    basePrice = products[currentIndex].price;
    
    // Обновляем левый товар (предыдущий)
    const leftIndex = (currentIndex - 1 + products.length) % products.length;
    leftImage.src = products[leftIndex].image;
    leftImage.alt = products[leftIndex].name;
    
    // Обновляем правый товар (следующий)
    const rightIndex = (currentIndex + 1) % products.length;
    rightImage.src = products[rightIndex].image;
    rightImage.alt = products[rightIndex].name;
    
    // Обновляем цену
    updatePrice();
  }

  // Обработчики для кнопок + и -
  btnPlus.addEventListener('click', function() {
    let qty = parseInt(qtyEl.textContent);
    qtyEl.textContent = qty + 1;
    updatePrice();
  });

  btnMinus.addEventListener('click', function() {
    let qty = parseInt(qtyEl.textContent);
    if (qty > 1) {
      qtyEl.textContent = qty - 1;
      updatePrice();
    }
  });

  // Обработчики для навигационных кнопок
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const direction = this.getAttribute('data-direction');
      
      if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
      } else {
        currentIndex = (currentIndex + 1) % products.length;
      }
      
      updateProducts();
    });
  });

  // Инициализация
  updateProducts();
});