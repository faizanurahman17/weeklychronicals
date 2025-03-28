document.getElementById('birthdate').addEventListener('input', calculateWeeks);
document.getElementById('clearBtn').addEventListener('click', clearChart);

function calculateWeeks() {
  const birthDate = new Date(document.getElementById('birthdate').value);
  const currentDate = new Date();

  if (!birthDate) {
    alert("Please enter your birth date");
    return;
  }

  const oneWeek = 1000 * 60 * 60 * 24 * 7; // One week in milliseconds
  const totalWeeks = 100 * 52; // 100 years in weeks
  const lifeChart = document.getElementById('life-chart');
  lifeChart.innerHTML = ''; // Clear previous content

  const livedWeeks = Math.floor((currentDate - birthDate) / oneWeek);
  const weeksLeft = totalWeeks - livedWeeks;
  const currentWeek = livedWeeks;

  let activeBox;

  for (let year = 0; year < 100; year++) {
    const yearContainer = document.createElement('div');
    yearContainer.className = 'year-container';

    const yearTitle = document.createElement('div');
    yearTitle.className = 'year-title';
    yearTitle.textContent = `${year + 1}`;
    yearContainer.appendChild(yearTitle);

    for (let week = 0; week < 52; week++) {
      const weekIndex = year * 52 + week;
      const box = document.createElement('div');
      box.className = 'box';

      if (weekIndex === currentWeek) {
        box.classList.add('blinking');
        activeBox = box;
      } else if (weekIndex < livedWeeks) {
        box.classList.add('red');
      } else {
        box.classList.add('green');
      }

      yearContainer.appendChild(box);
    }

    lifeChart.appendChild(yearContainer);
  }

  if (activeBox) {
    const summary = document.createElement('p');
    summary.className = 'summary';
    summary.innerHTML = `You have lived <span class="highlight-red">${livedWeeks} weeks </span> and there are <span class="highlight-green">${weeksLeft} weeks</span> left out of <span class="highlight-yellow">${totalWeeks} weeks</span>`;

    // Ensure to clear previous summary
    const existingSummary = document.querySelector('.summary');
    if (existingSummary) {
      existingSummary.remove();
    }

    // Add summary below the active box
    activeBox.parentElement.appendChild(summary);
  }
}

function clearChart() {
  document.getElementById('birthdate').value = ''; // Clear the birthdate input
  document.getElementById('life-chart').innerHTML = ''; // Clear the chart
}