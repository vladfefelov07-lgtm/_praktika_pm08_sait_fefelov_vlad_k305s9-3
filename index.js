// Функция поиска товаров
function performSearch() {
  const searchTerm = document.querySelector('.search-input').value.trim().toLowerCase();
  const productCards = document.querySelectorAll('.product-card');
  const clearBtn = document.querySelector('.search-clear-btn');
  
  productCards.forEach(card => {
    const productName = card.querySelector('.product-desc h2').textContent.toLowerCase();
    
    if (productName.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Показываем/скрываем кнопку сброса
  if (searchTerm) {
    clearBtn.style.display = 'flex';
  } else {
    clearBtn.style.display = 'none';
  }
}

// Обработчики событий для поиска
document.querySelector('.search-btn').addEventListener('click', performSearch);

document.querySelector('.search-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Обработчик для кнопки сброса поиска
document.querySelector('.search-clear-btn').addEventListener('click', function() {
  document.querySelector('.search-input').value = '';
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.display = 'flex';
  });
  this.style.display = 'none';
});

// Обновление видимости кнопки сброса при изменении текста
document.querySelector('.search-input').addEventListener('input', function() {
  const clearBtn = document.querySelector('.search-clear-btn');
  
  if (this.value.trim() === '') {
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.display = 'flex';
    });
    clearBtn.style.display = 'none';
  } else {
    clearBtn.style.display = 'flex';
  }
});

// Сохраняем исходный порядок товаров
let originalOrder = Array.from(document.querySelectorAll('.product-card'));

// Функция сортировки товаров
function applySorting(criteria) {
  const productsContainer = document.querySelector('.products');
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  productCards.sort((a, b) => {
    const priceA = parseInt(a.dataset.baseNew);
    const priceB = parseInt(b.dataset.baseNew);
    
    const discountA = (parseInt(a.dataset.baseOld) - priceA) / parseInt(a.dataset.baseOld) * 100;
    const discountB = (parseInt(b.dataset.baseOld) - priceB) / parseInt(b.dataset.baseOld) * 100;

    switch(criteria) {
      case 'price':
        return priceA - priceB;
      case 'discount':
        return discountB - discountA;
      case 'popular':
        // Для популярности можно добавить data-attribute с рейтингом
        // Пока используем случайный порядок как пример
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  // Очищаем контейнер и добавляем отсортированные товары
  productsContainer.innerHTML = '';
  productCards.forEach(card => productsContainer.appendChild(card));
}

// Функция сброса фильтров
function resetFilters() {
  const productsContainer = document.querySelector('.products');
  
  // Восстанавливаем исходный порядок товаров
  productsContainer.innerHTML = '';
  originalOrder.forEach(card => productsContainer.appendChild(card));
  
  // Сбрасываем радио-кнопки
  document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.checked = false;
  });
}

// Счетчики количества товаров
const cards = document.querySelectorAll('.product-card');
cards.forEach(card => {
  const btnPlus  = card.querySelector('.plus');
  const btnMinus = card.querySelector('.minus');
  const qtyEl    = card.querySelector('.qty-number');
  const priceOld = Number(card.dataset.baseOld);
  const priceNew = Number(card.dataset.baseNew);
  const oldEl    = card.querySelector('.price-container .old');
  const newEl    = card.querySelector('.price-container .new');

  function updatePrices() {
    const qty = Number(qtyEl.textContent);
    oldEl.textContent = (priceOld * qty).toLocaleString('ru-RU') + ' ₽';
    newEl.textContent = (priceNew * qty).toLocaleString('ru-RU') + ' ₽';
  }

  btnPlus.addEventListener('click', () => {
    qtyEl.textContent = Number(qtyEl.textContent) + 1;
    updatePrices();
  });
  btnMinus.addEventListener('click', () => {
    if (Number(qtyEl.textContent) > 1) {
      qtyEl.textContent = Number(qtyEl.textContent) - 1;
      updatePrices();
    }
  });
});

// Карусель изображений
document.querySelectorAll('.img-wrapper').forEach(wrapper => {
  const imgEl = wrapper.querySelector('img:not(.discount-badge)');
  const images = wrapper.dataset.images.split(',');
  const dots = wrapper.querySelectorAll('.carousel-btn');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      imgEl.src = images[idx].trim();
      wrapper.querySelector('.carousel-btn.active').classList.remove('active');
      dot.classList.add('active');
    });
  });
});

// Анимации кнопок карусели
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.2)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.9)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1.2)';
  });
});

// Панель фильтров
const filterBtn = document.querySelector('.btn-filter');
const filterPanel = document.createElement('div');
filterPanel.className = 'filter-panel';
filterPanel.innerHTML = `
  <div class="filter-close">×</div>
  <h3>Фильтры товаров</h3>
  <div class="filter-option">
    <input type="radio" id="price" name="filter">
    <label for="price">По цене (от дешевых к дорогим)</label>
  </div>
  <div class="filter-option">
    <input type="radio" id="discount" name="filter">
    <label for="discount">По размеру скидки</label>
  </div>
  <div class="filter-option">
    <input type="radio" id="popular" name="filter">
    <label for="popular">По популярности</label>
  </div>
  <div class="filter-buttons">
    <button class="filter-apply-btn">Применить</button>
    <button class="filter-reset-btn">Сбросить</button>
  </div>
`;

const overlay = document.createElement('div');
overlay.className = 'overlay';

document.body.appendChild(filterPanel);
document.body.appendChild(overlay);

// Открытие панели фильтров
filterBtn.addEventListener('click', () => {
  filterPanel.style.display = 'block';
  overlay.style.display = 'block';
});

// Закрытие панели фильтров
document.querySelector('.filter-close').addEventListener('click', () => {
  filterPanel.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  filterPanel.style.display = 'none';
  overlay.style.display = 'none';
});

// Анимации кнопок фильтров
document.querySelectorAll('.btn-filter').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.95)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1.05)';
  });
});

// Применение фильтров
document.querySelector('.filter-apply-btn').addEventListener('click', function() {
  const selectedFilter = document.querySelector('input[name="filter"]:checked');
  
  if (selectedFilter) {
    applySorting(selectedFilter.id);
  }
  
  filterPanel.style.display = 'none';
  overlay.style.display = 'none';
});

// Сброс фильтров
document.querySelector('.filter-reset-btn').addEventListener('click', function() {
  resetFilters();
  filterPanel.style.display = 'none';
  overlay.style.display = 'none';
});

// Обновляем исходный порядок при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  originalOrder = Array.from(document.querySelectorAll('.product-card'));
});