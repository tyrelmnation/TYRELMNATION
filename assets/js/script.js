// CHAT ASSISTANT
const chatPanel = document.getElementById('chatPanel');
const chatMsgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');

const responses = {
  pricing: 'Pricing: Music Production 20,000 KES/project, Mix & Master 15,000 KES/track, Mastering only 5,000 KES/track, Tracking 2,000 KES/hr, Consultation 2,500 KES/session.',
  book: 'To book: WhatsApp +254 706 602 914 or email tyrellmatekwa@gmail.com. I\'ll confirm within 24hrs.',
  services: 'Services: Music Production, Mixing & Mastering, Tracking/Recording, Audio Consultation. Check the Services section for rates.',
  hours: 'Studio sessions typically run 10am\u20138pm EAT, flexible by arrangement.',
  location: 'Based in Nairobi, Kenya. Remote sessions available worldwide.',
  plugin: 'Download the free TYSONICS bundle (TYROOM reverb + TYMLAPSE delay) from the Free Plugin section.',
  hello: 'Hey! Welcome to Tyrelm Studio. Ask me about services, pricing, booking, or the free plugin.',
};

function toggleChat() {
  chatPanel.classList.toggle('open');
  if (chatPanel.classList.contains('open')) {
    chatInput.focus();
    if (!chatMsgs.querySelector('.msg.bot')) {
      addMsg('Hey! Welcome to Tyrelm Studio. Ask me about services, pricing, booking, or the free plugin.', 'bot');
    }
  }
}

function addMsg(text, sender) {
  const div = document.createElement('div');
  div.className = 'msg ' + sender;
  div.textContent = text;
  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function sendMsg() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    const lower = text.toLowerCase();
    let reply = null;
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('kes') || lower.includes('how much')) {
      reply = responses.pricing;
    } else if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment') || lower.includes('reserve')) {
      reply = responses.book;
    } else if (lower.includes('service') || lower.includes('offer') || lower.includes('do you')) {
      reply = responses.services;
    } else if (lower.includes('hour') || lower.includes('time') || lower.includes('when')) {
      reply = responses.hours;
    } else if (lower.includes('location') || lower.includes('where') || lower.includes('nairobi') || lower.includes('remote')) {
      reply = responses.location;
    } else if (lower.includes('plugin') || lower.includes('free') || lower.includes('download') || lower.includes('tyson')) {
      reply = responses.plugin;
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('yo')) {
      reply = responses.hello;
    } else {
      reply = 'Check the Services section for details, or WhatsApp +254 706 602 914 for a quick answer.';
    }
    addMsg(reply, 'bot');
  }, 400);
}

// NEWSLETTER
function handleNewsletter(form) {
  const email = form.email.value.trim();
  if (email) {
    alert('Thanks! You\'re on the list.');
    form.reset();
  }
  return false;
}

// TERMS MODAL
const termsData = {
  production: [
    'Client provides reference tracks and creative brief.',
    'One revision round included in the base rate.',
    'Additional revisions: 3,000 KES per round.',
    'Client receives 24-bit/48kHz WAV stems upon final payment.',
    'Producer retains 50% publishing credit on collab projects.',
    'Delivery within 7\u201314 business days.',
  ],
  mixing: [
    'Client supplies recorded tracks as 24-bit/44.1kHz or 48kHz WAV.',
    'Up to 2 revision passes included.',
    'Additional revisions: 2,500 KES per pass.',
    'Delivered as 24-bit/48kHz stereo WAV + mp3 preview.',
    'Dolby Atmos mix requires minimum 5 business days.',
    'Album deal applies to 5+ tracks booked together.',
  ],
  tracking: [
    'Hourly rate applies from session start time.',
    'Includes setup, recording, and comping.',
    'Client must provide session materials 24hrs in advance.',
    'Studio space rates vary by location.',
    'File delivery via Dropbox or USB drive.',
  ],
  consultation: [
    'Session lasts up to 60 minutes.',
    'Client sends materials at least 12 hours before.',
    'Mix feedback, arrangement review, and pre-production advice.',
    'Remote consultation via Zoom/WhatsApp available.',
  ],
};

function openTerms(type) {
  const items = termsData[type] || [];
  document.getElementById('modalBody').innerHTML = '<ul>' + items.map(i => '<li>' + i + '</li>').join('') + '</ul>';
  document.getElementById('termsModal').classList.add('active');
}

function closeTerms() {
  document.getElementById('termsModal').classList.remove('active');
}

document.getElementById('termsModal').addEventListener('click', function(e) {
  if (e.target === this) closeTerms();
});

// VIDEO GALLERY
function openVideoGallery() {
  document.getElementById('videoGallery').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoGallery() {
  document.getElementById('videoGallery').classList.remove('active');
  const player = document.getElementById('videoPlayer');
  const video = document.getElementById('galleryVideo');
  player.style.display = 'none';
  video.pause();
  video.src = '';
  document.body.style.overflow = '';
}

function playVideo(src, poster) {
  const player = document.getElementById('videoPlayer');
  const video = document.getElementById('galleryVideo');
  player.style.display = 'block';
  video.src = src;
  video.poster = poster;
  video.load();
  video.play();
}

// NAV SCROLL
const nav = document.querySelector('nav');
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const curr = window.scrollY;
  if (curr > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = curr;
});

// MOBILE NAV TOGGLE
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}

// FADE-IN ON SCROLL
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});
