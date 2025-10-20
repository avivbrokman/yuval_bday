// script.js
function renderReview(r) {
  const wrap = document.createElement('div');
  wrap.className = 'card';
  const stars = '★★★★★'.slice(0, Math.max(0, Math.min(5, r.rating || 0)));

  wrap.innerHTML = `
    <div class="meta">
      <div>
        <div class="rev-name">${r.name}</div>
        <div class="rev-date">${r.date} • ${r.review_count} reviews</div>
      </div>
      <div style="text-align:right">
        <div class="stars">${stars}</div>
        <div style="color:#666;font-size:13px">${r.tagline ? `“${r.tagline}”` : ''}</div>
      </div>
    </div>
    <div class="review-text">${r.text}</div>
  `;

  if (r.thumb || r.photo) {
    const thumbs = document.createElement('div');
    thumbs.className = 'thumbs';
    const img = document.createElement('img');
    img.className = 'thumb';
    img.src = r.thumb || r.photo;
    img.alt = r.photo_alt || '';
    img.dataset.full = r.photo || r.thumb;
    thumbs.appendChild(img);
    wrap.appendChild(thumbs);
  }

  return wrap;
}

function renderList() {
  const root = document.getElementById('reviews');
  if (!root) return;

  if (!Array.isArray(window.REVIEWS)) {
    root.textContent = 'No data.';
    return;
  }

  for (const r of window.REVIEWS) {
    root.appendChild(renderReview(r));
  }

  setupLightbox();
}

function setupLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCap = document.getElementById('lb-cap');

  document.addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (!t) return;
    lbImg.src = t.dataset.full || t.src;
    lbImg.alt = t.alt || '';
    lbCap.textContent = '';
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-open');
  });

  document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeLB();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') closeLB();
  });

  function closeLB() {
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-open');
    lbImg.src = '';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderList);
} else {
  renderList();
}





// function renderReview(r) {
//   const wrap = document.createElement('div');
//   wrap.className = 'card';
//   wrap.innerHTML = `
//     <div class="meta">
//       <div>
//         <div class="rev-name">${r.name}</div>
//         <div class="rev-date">${r.date} • ${r.review_count} reviews</div>
//       </div>
//       <div style="text-align:right">
//         <div class="stars">${'★★★★★'.slice(0, Math.max(0, Math.min(5, r.rating)))}</div>
//         <div style="color:#666;font-size:13px">${r.tagline ? `“${r.tagline}”` : ''}</div>
//       </div>
//     </div>
//     <div class="review-text">${r.text}</div>
//     ${r.photo ? `<img src="${r.photo}" alt="${r.photo_alt || ''}" class="review-photo">` : ''}
//   `;
//   return wrap;
// }

// function renderList() {
//   const root = document.getElementById('reviews');
//   if (!root) {
//     console.error('No #reviews element found.');
//     return;
//   }

//   if (!Array.isArray(window.REVIEWS)) {
//     root.textContent = 'No data.';
//     console.error('window.REVIEWS is not an array:', window.REVIEWS);
//     return;
//   }

//   for (const r of window.REVIEWS) {
//     const div = document.createElement('div');
//     // div.textContent = `${r.name} — ${r.tagline}`;
//     root.appendChild(renderReview(r));
//   }
// }

// // Ensure the DOM exists before we touch it
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', renderList);
// } else {
//   renderList();
// }