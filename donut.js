window.initDonut = function () {
  const container = document.getElementById('donut-container');
  const donutEl = document.getElementById('donut');
  const frostingMain = document.getElementById('frosting-main');
  const cinnamonOverlay = document.getElementById('cinnamon-overlay');
  const colors = ['#f7f4f4', '#fff562', '#2799d8', '#39a126', '#e7484c', '#ff741a', '#402626', '#ff4fa7'];
  const chocolateColors = ['#6b3f2a', '#4e321d', '#7a4a2a', '#3d2415', '#8b5a2b'];
  const pebbleShapes = [
    '40% 60% 55% 45% / 50% 45% 55% 50%',
    '60% 40% 45% 55% / 45% 55% 40% 60%',
    '50% 50% 65% 35% / 40% 60% 40% 60%',
    '35% 65% 40% 60% / 60% 40% 65% 35%'
  ];
  let currentShape = 'long';

  document.querySelectorAll('[data-frosting]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-frosting]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      frostingMain.setAttribute('fill', btn.dataset.frosting);
      frostingMain.setAttribute('fill-opacity', btn.dataset.opacity || 1);
      cinnamonOverlay.setAttribute('opacity', btn.dataset.cinnamon ? 1 : 0);
    });
  });
  document.querySelectorAll('[data-shape]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-shape]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentShape = btn.dataset.shape;
    });
  });
  document.querySelectorAll('[data-dough]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-dough]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      donutEl.style.background = btn.dataset.dough;
    });
  });
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const holeRadius = rect.width * 0.09;
    if (distance < holeRadius) return;
    const roll = Math.random();
    let sprinkleCount;
    if (roll < 0.4) sprinkleCount = 1;
    else if (roll < 0.7) sprinkleCount = 2;
    else sprinkleCount = 3;
    for (let i = 0; i < sprinkleCount; i++) {
      const offsetX = x + (Math.random() * 16 - 8);
      const offsetY = y + (Math.random() * 16 - 8);
      const sprinkle = document.createElement('div');
      sprinkle.style.left = `${offsetX}px`;
      sprinkle.style.top = `${offsetY}px`;
      if (currentShape === 'dot') {
        sprinkle.className = 'sprinkle dot';
        sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      } else if (currentShape === 'pebble') {
        sprinkle.className = 'sprinkle pebble';
        const radius = pebbleShapes[Math.floor(Math.random() * pebbleShapes.length)];
        const size = 9 + Math.random() * 5;
        const ratio = 0.75 + Math.random() * 0.4;
        sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sprinkle.style.borderRadius = radius;
        sprinkle.style.width = `${size}px`;
        sprinkle.style.height = `${size * ratio}px`;
      } else if (currentShape === 'jimmies') {
        sprinkle.className = 'sprinkle';
        sprinkle.style.background = chocolateColors[Math.floor(Math.random() * chocolateColors.length)];
        sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;
      } else {
        sprinkle.className = 'sprinkle';
        sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
      container.appendChild(sprinkle);
    }
  });
  document.getElementById('clear-btn').addEventListener('click', () => {
    document.querySelectorAll('.sprinkle').forEach(s => s.remove());
  });

  // hook up click sounds for the newly-injected buttons
  document.querySelectorAll('#donut-mount .option-btn, #donut-mount .clear-mini-btn')
    .forEach(el => el.addEventListener('click', () => playSound(clickSound)));
};