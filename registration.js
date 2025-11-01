document.addEventListener('DOMContentLoaded', function() {

  const elements = [
    document.querySelector('.login-title'),
    document.querySelector('.avatar-container'),
    document.querySelector('.login-form'),
    ...document.querySelectorAll('.input-group'),
    document.querySelector('.login-btn'),
    document.querySelector('.forgot-btn'),
    document.querySelector('.create-btn'),
    ...document.querySelectorAll('.social-icon')
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    if (el) observer.observe(el);
  });


  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();

      this.classList.add('active');
      setTimeout(() => {
        this.classList.remove('active');
      }, 300);

    });
  }
});
