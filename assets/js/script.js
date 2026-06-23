// CHAT ASSISTANT
const chatPanel = document.getElementById('chatPanel');
const chatMsgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');

const knowledge = {
  about: 'Tyrelm (Edwin Matekwa) is a recording, mixing, mastering, and production engineer based in Nairobi, Kenya. He founded Tyrelm Nation, a production company blending art, music, and science for talent discovery.',
  services: 'Four services: 1) Music Production \u2014 20,000 KES/project, collab 50/50, perf track +2,000, stripped +3,000. 2) Mixing & Mastering \u2014 stereo 15,000/track, album 12,000/track, Dolby Atmos 25,000/track, mastering only 5,000/track, 2 revisions included. 3) Tracking/Recording \u2014 2,000 KES/hr engineering, studio 1,000-5,000/hr. 4) Audio Consultation \u2014 2,500 KES/session, 60min, send materials 12hrs before.',
  production: 'Music Production: 20,000 KES per project. Includes custom instrumentals, vocal arrangement, full song structuring. Collab rate: 50/50 on composition & streaming. Performance track add: +2,000 KES. Stripped version add: +3,000 KES. One revision included, additional 3,000 KES/round. Delivery 7-14 business days.',
  mixing: 'Mixing & Mastering: Stereo Mix & Master 15,000 KES/track. Album deal (5+ tracks) 12,000 KES/track. Dolby Atmos/Ambisonic 25,000 KES/track. Mastering only 5,000 KES/track. Delivered 24-bit/48kHz WAV. 2 revision passes included, additional 2,500 KES/pass. Atmos requires min 5 business days.',
  tracking: 'Tracking/Recording: Engineering 2,000 KES/hr. Studio space 1,000-5,000 KES/hr depending on location. Includes setup, recording, comping, file delivery. Send session materials 24hrs in advance.',
  consultation: 'Audio Consultation: 2,500 KES per session (60 min). Mix feedback, arrangement review, pre-production advice. Send materials 12hrs before. Remote via Zoom/WhatsApp available.',
  releases: 'Latest releases: "Better Person" (Single, 2025) \u2014 https://youtu.be/aAjFKC2pdzw . "Ghost" (Single, 2026) \u2014 https://youtu.be/DX-zDYDqjMk . Full discography on YouTube: https://youtube.com/@Tyrelm',
  experience: 'Experience: 2026 \u2014 Session Diaspor.a (Matt Ngesa, Clerk Keeng, Mordecai Dex). 2024-26 \u2014 Wyatt Boyer (Chicago) mixing/mastering. 2025-26 \u2014 ARGO AR Game soundtrack (with WWF-Kenya). 2025 \u2014 "Time and Space" + "Broken Diary" albums (15 tracks). 2023 \u2014 Lowki The Great "Rise of Greatness", Dicemane "Resilient"/"Rudia" (radio airplay, Shoke Shoke Fest nom). 2018-25 \u2014 Voice over, theme songs, sync licensing.',
  stems: 'Send your stems via: 1) WhatsApp \u2014 quick voice notes/ideas. 2) Email tyrellmatekwa@gmail.com \u2014 full tracks. 3) Dropbox \u2014 large projects: https://www.dropbox.com/request/cq6xi9h8o504mm926l37 . Reviews within 2-3 business days. Format: 24-bit/44k-48kHz WAV.',
  plugin: 'Free TYSONICS bundle includes TYROOM (analog reverb emulation) and TYMLAPSE (delay). Download from the Free Plugin section on the site, or direct link: TYSONIX BUNDLE.rar.',
  tour: 'Sane Sessions \u2014 a live performance series blending raw performance, atmosphere, and sound. Coming soon. Dates TBA. Performances across the country.',
  merch: 'Merch available (order via WhatsApp +254 706 602 914): 1) White Hoodie + White Cargo \u2014 KSh 2,500. 2) Black Hoodie + Black Cargo \u2014 KSh 2,500. 3) White Tee + Black Cargo \u2014 KSh 2,100. 4) Black Tee + White Cargo \u2014 KSh 2,100. 5) Limited Edition Set \u2014 KSh 4,000. Email for shipping.',
  book: 'To book a session: WhatsApp +254 706 602 914 or email tyrellmatekwa@gmail.com. Direct line access: tyrellmatekwa@gmail.com | +254 706 602 914. Confirmation within 24hrs.',
  hours: 'Studio sessions typically 10am-8pm EAT (East Africa Time). Flexible by arrangement. Remote sessions available worldwide.',
  location: 'Based in Nairobi, Kenya. Remote sessions available worldwide for mixing, mastering, and consultation.',
  newsletter: 'Join the mailing list for updates on new releases, Sane Sessions, merch drops, and studio news. Subscribe on the site. No spam, unsubscribe anytime.',
  terms: 'Terms & Credits document available for download: Tyrelm_Nation_Terms_and_Credits.pdf',
  contact: 'WhatsApp: +254 706 602 914. Email: tyrellmatekwa@gmail.com. Instagram: @ty_relm and @tyrelm_nation. YouTube: @Tyrelm.',
};

function toggleChat() {
  chatPanel.classList.toggle('open');
  if (chatPanel.classList.contains('open')) {
    chatInput.focus();
    if (!chatMsgs.querySelector('.msg.bot')) {
      addMsg('Yo! Tyrelm Studio Assistant here. Ask me anything \u2014 services, pricing, releases, experience, merch, booking, stems, the free plugin \u2014 I know everything on the site.', 'bot');
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
    let reply;

    // services general
    if ((lower.includes('service') || lower.includes('offer') || lower.includes('do you') || lower.includes('what can you')) && !lower.includes('production') && !lower.includes('mix') && !lower.includes('master') && !lower.includes('track') && !lower.includes('consult')) {
      reply = knowledge.services;
    }
    // production
    else if (lower.includes('production') || lower.includes('produce') || lower.includes('beat') || lower.includes('instrumental') || lower.includes('song')) {
      reply = knowledge.production;
    }
    // mixing/mastering
    else if ((lower.includes('mix') && lower.includes('master')) || lower.includes('mixing') || lower.includes('mastering') || lower.includes('stereo') || lower.includes('atmos') || lower.includes('ambisonic')) {
      reply = knowledge.mixing;
    }
    // tracking / recording
    else if (lower.includes('track') || lower.includes('recording') || lower.includes('record') || lower.includes('vocal') || lower.includes('voiceover') || lower.includes('voice over') || lower.includes('studio space') || lower.includes('engineering')) {
      reply = knowledge.tracking;
    }
    // consultation
    else if (lower.includes('consult') || lower.includes('feedback') || lower.includes('pre-production') || lower.includes('arrangement advice') || lower.includes('mix direction')) {
      reply = knowledge.consultation;
    }
    // pricing general
    else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('kes') || lower.includes('how much') || lower.includes('fee') || lower.includes('charg')) {
      reply = knowledge.services;
    }
    // book / schedule
    else if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment') || lower.includes('reserve') || lower.includes('session')) {
      reply = knowledge.book;
    }
    // releases / music / songs
    else if (lower.includes('release') || lower.includes('music') || lower.includes('song') || lower.includes('single') || lower.includes('album') || lower.includes('listen') || lower.includes('discography') || lower.includes('track')) {
      reply = knowledge.releases;
    }
    // experience / work / projects
    else if (lower.includes('experience') || lower.includes('work') || lower.includes('project') || lower.includes('client') || lower.includes('portfolio') || lower.includes('career') || lower.includes('background')) {
      reply = knowledge.experience;
    }
    // stems / send files
    else if (lower.includes('stem') || lower.includes('send') || lower.includes('file') || lower.includes('upload') || lower.includes('track') || lower.includes('wav') || lower.includes('dropbox') || lower.includes('collaborate')) {
      reply = knowledge.stems;
    }
    // plugin
    else if (lower.includes('plugin') || lower.includes('free') || lower.includes('download') || lower.includes('tyson') || lower.includes('bundle') || lower.includes('tyroom') || lower.includes('tymlapse') || lower.includes('reverb') || lower.includes('delay')) {
      reply = knowledge.plugin;
    }
    // tour / live / sane sessions
    else if (lower.includes('tour') || lower.includes('live') || lower.includes('sane') || lower.includes('performance') || lower.includes('concert') || lower.includes('show')) {
      reply = knowledge.tour;
    }
    // merch / store / hoodie / tee / cargo
    else if (lower.includes('merch') || lower.includes('store') || lower.includes('hoodie') || lower.includes('tee') || lower.includes('shirt') || lower.includes('cargo') || lower.includes('clothing') || lower.includes('buy') || lower.includes('order') || lower.includes('limited')) {
      reply = knowledge.merch;
    }
    // hours / time
    else if (lower.includes('hour') || lower.includes('time') || lower.includes('when') || lower.includes('open') || lower.includes('available')) {
      reply = knowledge.hours;
    }
    // location / where / nairobi
    else if (lower.includes('location') || lower.includes('where') || lower.includes('nairobi') || lower.includes('remote') || lower.includes('address') || lower.includes('based')) {
      reply = knowledge.location;
    }
    // newsletter / subscribe / mailing
    else if (lower.includes('newsletter') || lower.includes('subscribe') || lower.includes('mailing') || lower.includes('email list') || lower.includes('stay connected')) {
      reply = knowledge.newsletter;
    }
    // terms / credits
    else if (lower.includes('term') || lower.includes('credit') || lower.includes('policy') || lower.includes('condition')) {
      reply = knowledge.terms;
    }
    // contact / whatsapp / email / instagram
    else if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('instagram') || lower.includes('reach') || lower.includes('social') || lower.includes('phone') || lower.includes('number')) {
      reply = knowledge.contact;
    }
    // about / who is
    else if (lower.includes('who') || lower.includes('about') || lower.includes('tyrelm') || lower.includes('matekwa') || lower.includes('edwin') || lower.includes('story') || lower.includes('bio')) {
      reply = knowledge.about;
    }
    // greeting
    else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('yo') || lower.includes('sup') || lower.includes('what\'s up') || lower.includes('good morning') || lower.includes('good evening')) {
      reply = 'Yo! Welcome to Tyrelm Studio. I know everything on the site \u2014 services, rates, releases, experience, merch, stems, the free plugin, and more. What do you need?';
    }
    // fallback
    else {
      reply = 'I can answer about: services & pricing, music production, mixing/mastering, tracking/recording, consultation, releases, experience, sending stems, the free plugin, tour, merch, booking, hours, location, contact, newsletter, and terms. Or WhatsApp +254 706 602 914.';
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
