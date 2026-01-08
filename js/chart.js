document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('satisfactionChart')?.getContext('2d');
  let satisfactionChart;

  function calculateMonthlySatisfaction(ratings) {
    const monthlySatisfaction = Array(12).fill(0);
    const totalRatingsPerMonth = Array(12).fill(0);

    for (const key in ratings) {
      if (ratings.hasOwnProperty(key)) {
        const { kindness, activities, communication, schedule } = ratings[key];

        const k = parseInt(kindness, 10);
        const a = parseInt(activities, 10);
        const c = parseInt(communication, 10);
        const s = parseInt(schedule, 10);

        if ([k, a, c, s].some(isNaN)) continue;

        const avg = (k + a + c + s) / 4;
        const month = new Date().getMonth();

        monthlySatisfaction[month] += avg;
        totalRatingsPerMonth[month]++;
      }
    }

    return monthlySatisfaction.map((sum, i) =>
      totalRatingsPerMonth[i] > 0 ? sum / totalRatingsPerMonth[i] : 0
    );
  }

  function updateSatisfactionChartData() {
    if (!satisfactionChart) return;
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    const data = calculateMonthlySatisfaction(ratings);
    satisfactionChart.data.datasets[0].data = data;
    satisfactionChart.update();
  }

  function initializeSatisfactionChart() {
    if (!ctx) return;

    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    const data = calculateMonthlySatisfaction(ratings);

    satisfactionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        datasets: [{
          label: 'Средняя оценка',
          data: data,
          backgroundColor: 'rgba(255, 153, 102, 0.7)',
          borderColor: 'rgba(255, 102, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#5a3921'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            grid: {
              color: 'rgba(255, 204, 102, 0.3)'
            },
            ticks: {
              color: '#5a3921'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 204, 102, 0.3)'
            },
            ticks: {
              color: '#5a3921'
            }
          }
        }
      }
    });
  }

  initializeSatisfactionChart();
  window.updateSatisfactionChart = updateSatisfactionChartData;
});