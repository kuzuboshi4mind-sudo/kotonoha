// メニュー開閉（スマホ）
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

// イラストの拡大表示
const box = document.querySelector('.lightbox');
if (box) {
  const img = box.querySelector('img');
  document.querySelectorAll('.zoom').forEach((btn) => {
    btn.addEventListener('click', () => {
      img.src = btn.dataset.full;
      img.alt = btn.querySelector('img')?.alt || '';
      box.showModal();
    });
  });
  img.addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
}

// 縦書き：画面に収まるときだけ縦書きで表示し、
// 収まらない端末（スマホなど）では横書きに切り替えて、全文がひと目で読めるようにする
const verticals = document.querySelectorAll('.work-body[data-vertical]');
const fitVertical = () => {
  verticals.forEach((el) => {
    el.classList.add('vertical');
    const fits = el.scrollWidth <= el.clientWidth + 24; // 余白程度のはみ出しは許容
    el.classList.toggle('vertical', fits);
    el.closest('.work')?.classList.toggle('is-vertical', fits);
  });
};
if (verticals.length) {
  fitVertical();
  document.fonts?.ready.then(fitVertical); // 文字の読み込み後にもう一度
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(fitVertical, 150); });
}
