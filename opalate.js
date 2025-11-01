document.addEventListener('DOMContentLoaded', function() {
  const options = document.querySelectorAll('.payment-option');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('appear');
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  options.forEach(option => observer.observe(option));

  options.forEach(option => {
    option.addEventListener('click', function() {
      document.getElementById('overlay').style.display = 'flex';
    });
  });

  document.getElementById('submitPayment').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    
    const thankYouOverlay = document.createElement('div');
    thankYouOverlay.className = 'thank-you-overlay';
    document.body.appendChild(thankYouOverlay);
    thankYouOverlay.style.display = 'block';
    
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';
    й
    setTimeout(function() {
      thankYouMessage.style.display = 'none';
      thankYouOverlay.style.display = 'none';
      document.body.removeChild(thankYouOverlay);
    }, 5000);
  });
});
document.querySelector('.payment-title').addEventListener('click', function() {
  console.log('Заголовок нажат');
});
document.querySelector('.form-close').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
});
