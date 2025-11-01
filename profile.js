document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.profile-container');
  if (container) {
    container.classList.add('appear');
  }

  const togglePasses = document.querySelectorAll('.toggle-pass');
  togglePasses.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      input.type = input.type === 'password' ? 'text' : 'password';
    });
    
    toggle.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(calc(-50% + 3px))';
    });
    
    toggle.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-50%)';
    });
    
    toggle.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-50%)';
    });
  });

  const payBtn = document.querySelector('.pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      window.location.href = 'opalate.html';
    });
  }

  const editIcon = document.querySelector('.edit-icon');
  if (editIcon) {
    editIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // Функция для подсчета общей суммы корзины
  function calculateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    
    items.forEach(item => {
      const priceElement = item.querySelector('.price');
      const qtyElement = item.querySelector('.qty');
      
      if (priceElement && qtyElement) {
        const price = parseInt(priceElement.textContent.replace(/\s/g, '').replace('₽', ''));
        const qty = parseInt(qtyElement.textContent.replace('шт.', ''));
        total += price * qty;
      }
    });
    
    document.getElementById('total-amount').textContent = 
      total.toLocaleString('ru-RU');
  }

  // Вызываем функцию подсчета при загрузке страницы
  calculateTotal();
});