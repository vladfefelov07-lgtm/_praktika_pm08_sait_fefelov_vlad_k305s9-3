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

let originalOrder = Array.from(document.querySelectorAll('.product-card'));

// Функция сортировки товаров
function applySorting(criteria) {
  const productsContainer = document.querySelector('.products');
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  productCards.sort((a, b) => {
    const priceA = parseInt(a.dataset.basePrice);
    const priceB = parseInt(b.dataset.basePrice);

    switch(criteria) {
      case 'price':
        return priceA - priceB;
      case 'discount':
        // В shop.html нет скидок, поэтому сортируем по цене
        return priceA - priceB;
      case 'popular':
        // Для популярности используем случайный порядок как пример
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  productsContainer.innerHTML = '';
  productCards.forEach(card => productsContainer.appendChild(card));
}

// Функция сброса фильтров
function resetFilters() {
  const productsContainer = document.querySelector('.products');
  
  productsContainer.innerHTML = '';
  originalOrder.forEach(card => productsContainer.appendChild(card));
  
  document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.checked = false;
  });
}

// Корзина и счетчики
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');

  document.querySelectorAll('.product-card').forEach(card => {
    const id         = card.dataset.id;
    const basePrice  = Number(card.dataset.basePrice);
    const btnPlus    = card.querySelector('.qty-btn.plus');
    const btnMinus   = card.querySelector('.qty-btn.minus');
    const qtyEl      = card.querySelector('.qty-number');
    const priceEl    = card.querySelector('.price');
    const addToCartBtn = card.querySelector('.add-to-cart-btn');

    if (cart[id]) {
      qtyEl.textContent = cart[id];
      priceEl.textContent = formatPrice(basePrice * cart[id]);
    }

    function update() {
      const qty = Number(qtyEl.textContent);
      priceEl.textContent = formatPrice(basePrice * qty);
      cart[id] = qty;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    btnPlus.addEventListener('click', () => {
      qtyEl.textContent = Number(qtyEl.textContent) + 1;
      update();
    });

    btnMinus.addEventListener('click', () => {
      const cur = Number(qtyEl.textContent);
      if (cur > 1) {
        qtyEl.textContent = cur - 1;
        update();
      }
    });

    addToCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
        window.location.href = 'registration.html';
      }, 300);
    });

    // Карусель изображений
    const wrapper = card.querySelector('.img-wrapper');
    const imgEl   = wrapper.querySelector('img:not(.discount-badge)');
    const images  = wrapper.dataset.images.split(',').map(s => s.trim());
    wrapper.querySelectorAll('.carousel-btn').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.dataset.index);
        imgEl.src = images[idx];
        wrapper.querySelector('.carousel-btn.active').classList.remove('active');
        dot.classList.add('active');
      });
    });
  });

  // Анимация появления карточек
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('appear');
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.product-card').forEach(c => observer.observe(c));

  function formatPrice(num) {
    return num.toLocaleString('ru-RU') + ' ₽';
  }
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

document.addEventListener('DOMContentLoaded', function() {
  originalOrder = Array.from(document.querySelectorAll('.product-card'));
});