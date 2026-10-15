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

// 縦書き：マウスホイールの縦スクロールを横スクロールに変換
document.querySelectorAll('.work-body.vertical').forEach((el) => {
  el.addEventListener('wheel', (e) => {
    if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const atStart = el.scrollLeft >= 0 && e.deltaY < 0;
    const atEnd = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
    if (atStart || atEnd) return; // 端ではページを通常スクロール
    e.preventDefault();
    el.scrollLeft -= e.deltaY;
  }, { passive: false });
});

// 縦書き：続きが隠れているときは案内を出す（左端までスクロールしたら消す）
document.querySelectorAll('.work-body.vertical').forEach((el) => {
  if (el.scrollWidth <= el.clientWidth + 24) return; // 余白程度のはみ出しは無視
  const hint = document.createElement('p');
  hint.className = 'scroll-hint';
  hint.textContent = '← 左へスクロールすると続きがあります';
  el.after(hint);
  el.addEventListener('scroll', () => {
    const end = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 4;
    hint.classList.toggle('is-done', end);
  }, { passive: true });
});
