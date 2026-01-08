// ❌ УДАЛЕНО: localStrage.removeIteom('ratings');

document.querySelectorAll('.toggle-rating').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });
});

document.querySelectorAll('.submit-rating').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.educator-card');
    const educatorName = card.querySelector('h3').textContent.replace('Воспитатель: ', '').trim();

    const kindness = card.querySelector('.kindness-rating').value;
    const activities = card.querySelector('.activities-rating').value;
    const communication = card.querySelector('.communication-rating').value;
    const schedule = card.querySelector('.schedule-rating').value;

    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    ratings[educatorName] = { kindness, activities, communication, schedule };
    localStorage.setItem('ratings', JSON.stringify(ratings));

    alert('Спасибо за ваш отзыв!');

    if (typeof window.updateSatisfactionChart === 'function') {
      window.updateSatisfactionChart();
    }

    // Скрыть панель
    card.querySelector('.rating-panel').style.display = 'none';
  });
});

document.querySelectorAll('.enroll-button').forEach(button => {
  button.addEventListener('click', () => {
    const animation = document.querySelector('.celebration-animation');
    animation.style.display = 'block';

    setTimeout(() => {
      animation.style.display = 'none';
    }, 2500);
  });
});