// CHAT ASSISTANT
const chatPanel = document.getElementById('chatPanel');
const chatMsgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');
const knowledge = {
  about: 'Niaje! Tyrelm (Edwin Matekwa) here \u2014 recording, mixing, mastering na production based Nairobi, Kenya. I run Tyrelm Nation, a production company blending art, music na science for talent discovery. Very nice vibes only.',
  services: 'Niaje! Service zangu ni nne very nice: 1) Music Production \u2014 20K KES per project, collab 50/50. 2) Mixing & Mastering \u2014 stereo 15K/track, album deal 12K/track, Dolby Atmos 25K/track, mastering tu 5K/track. 3) Tracking/Recording \u2014 2K KES/hr, studio 1K-5K/hr. 4) Audio Consultation \u2014 2.5K KES/session. Utanishow ukikuwa interested.',
  production: 'Niaje! Music Production ni 20K KES per project. Unaeka custom instrumentals, vocal arrangement, full song structuring. Collab rate 50/50 on composition na streaming. Performance track +2K, stripped version +3K. Revision moja included, extra 3K/round. Delivery 7-14 business days. Very nice. Utanishow ukikuwa interested.',
  mixing: 'Niaje! Mixing & Mastering \u2014 stereo 15K/track. Album deal (5+ tracks) 12K/track. Dolby Atmos 25K/track. Mastering tu 5K/track. Delivery 24-bit/48kHz WAV. Revision mbili included. Atmos inahitaji min 5 business days. Very nice, utanistua ukidai kitu yoyote.',
  tracking: 'Tracking/Recording \u2014 Engineering 2K KES/hr. Studio space 1K-5K/hr depends na location. Setup, recording, comping na file delivery ziko included. Tuma materials 24hrs before. Utanishow ukikuwa interested.',
  consultation: 'Audio Consultation \u2014 2.5K KES per session (60min). Mix feedback, arrangement review, pre-production advice. Tuma materials 12hrs before. Remote via Zoom ama WhatsApp. Very nice.',
  releases: 'Latest releases: "Better Person" (Single, 2025) \u2014 https://youtu.be/aAjFKC2pdzw . "Ghost" (Single, 2026) \u2014 https://youtu.be/DX-zDYDqjMk . Full discography iko YouTube: https://youtube.com/@Tyrelm . Very nice vibes, utanistua ukidai kitu yoyote.',
  experience: 'Experience: 2026 \u2014 Session Diaspor.a (Matt Ngesa, Clerk Keeng, Mordecai Dex). 2024-26 \u2014 Wyatt Boyer (Chicago) mixing/mastering. 2025-26 \u2014 ARGO AR Game soundtrack with WWF-Kenya. 2025 \u2014 "Time and Space" na "Broken Diary" albums (15 tracks). 2023 \u2014 Lowki The Great, Dicemane. 2018-25 \u2014 Voice over, theme songs na sync licensing. Very nice run.',
  stems: 'Niaje! Tuma stems zako via: 1) WhatsApp \u2014 short voice notes. 2) Email tyrellmatekwa@gmail.com \u2014 full tracks. 3) Dropbox \u2014 large projects: https://www.dropbox.com/request/cq6xi9h8o504mm926l37 . Reviews in 2-3 business days. Format: 24-bit/44k-48kHz WAV. Utanishow ukikuwa interested.',
  plugin: 'Free TYSONICS bundle \u2014 TYROOM (analog reverb) na TYMLAPSE (delay). Very nice plugins. Download free from the Free Plugin section. Utanistua ukidai kitu yoyote.',
  tour: 'Sane Sessions \u2014 live performance series blending raw performance, atmosphere na sound. Inakuja soon. Dates zitatangazwa. Performances across the country. Very nice.',
  merch: 'Niaje! Tisho na cargo pants utaziget na 2,100 \u2014 zita come kama pair. Hood na cargo ni 2,500. Bei fiti sana! Iko: White set 2,500, Black set 2,500, White Tee + Black Cargo 2,100, Black Tee + White Cargo 2,100, Limited Edition 4,000. Order via WhatsApp +254 706 602 914. Very nice! Utanishow ukikuwa interested.',
  book: 'Niaje! Kubook session: WhatsApp +254 706 602 914 ama email tyrellmatekwa@gmail.com. Direct line: tyrellmatekwa@gmail.com | +254 706 602 914. Confirmation in 24hrs. Utanistua ukidai kitu yoyote.',
  hours: 'Studio sessions ziko 10am-8pm EAT (East Africa Time). Flexible depending. Remote sessions iko worldwide. Very nice.',
  location: 'Based Nairobi, Kenya. Remote sessions worldwide for mixing, mastering na consultation. Utanistua ukidai kitu yoyote.',
  newsletter: 'Join the mailing list for updates on new releases, Sane Sessions, merch drops na studio news. Subscribe on the site. No spam, unsubscribe anytime. Very nice.',
  terms: 'Terms & Credits document \u2014 download Tyrelm_Nation_Terms_and_Credits.pdf. Utanishow ukikuwa interested.',
  contact: 'WhatsApp: +254 706 602 914. Email: tyrellmatekwa@gmail.com. Instagram: @ty_relm na @tyrelm_nation. YouTube: @Tyrelm. Utanistua ukidai kitu yoyote!',
};

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = [];
  for (let i = 0; i <= m; i++) { dp[i] = [i]; }
  for (let j = 1; j <= n; j++) { dp[0][j] = j; }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
    }
  }
  return dp[m][n];
}

function bestFuzzyMatch(word, wordList) {
  let best = null, bestDist = 3;
  for (const w of wordList) {
    const dist = levenshtein(word, w);
    if (dist < bestDist) { bestDist = dist; best = w; }
  }
  return best;
}

// Topic keywords for exact + fuzzy matching
const topicKeywords = {
  merch: ['merch', 'store', 'hoodie', 'tee', 'shirt', 'cargo', 'clothing', 'buy', 'order', 'limited', 'outfit', 'tisho', 'tshirt', 't-shirt', 'shati'],
  production: ['production', 'produce', 'beat', 'instrumental', 'producer', 'producing', 'sanaa', 'ngoma'],
  mixing: ['mixing', 'mastering', 'mix', 'master', 'stereo', 'atmos', 'ambisonic', 'mastered', 'mixed', 'sauti'],
  tracking: ['tracking', 'recording', 'record', 'vocal', 'voiceover', 'engineering', 'track', 'studio', 'rekodi'],
  consultation: ['consultation', 'consult', 'feedback', 'pre-production', 'arrangement', 'ushauri'],
  services: ['service', 'offer', 'capabilities', 'huduma'],
  releases: ['release', 'music', 'single', 'album', 'listen', 'discography', 'song', 'songs', 'new', 'wimbo', 'nyimbo', 'muziki'],
  experience: ['experience', 'work', 'project', 'client', 'portfolio', 'career', 'background', 'projects', 'kazi'],
  stems: ['stem', 'send', 'file', 'upload', 'wav', 'dropbox', 'collaborate', 'stems', 'stems'],
  plugin: ['plugin', 'free', 'download', 'tyson', 'bundle', 'tyroom', 'tymlapse', 'reverb', 'delay', 'plugins'],
  tour: ['tour', 'live', 'sane', 'performance', 'concert', 'show', 'performing', 'tamasha'],
  book: ['book', 'schedule', 'appointment', 'reserve', 'booking', 'kahawa'],
  hours: ['hour', 'time', 'when', 'open', 'available', 'hours', 'saa'],
  location: ['location', 'where', 'nairobi', 'remote', 'address', 'based', 'wapi'],
  newsletter: ['newsletter', 'subscribe', 'mailing', 'email list'],
  terms: ['term', 'credit', 'policy', 'condition', 'terms', 'sheria'],
  contact: ['contact', 'whatsapp', 'instagram', 'reach', 'social', 'phone', 'number', 'namba', 'simu'],
  about: ['who', 'about', 'tyrelm', 'matekwa', 'edwin', 'story', 'bio', 'tyrelmnation', 'msanii'],
  pricing: ['price', 'cost', 'rate', 'kes', 'how much', 'fee', 'charg', 'ngapi', 'bei', 'pesa', 'senti', 'gharama'],
};

// Flatten all keywords for fuzzy matching
const allKeywords = Object.values(topicKeywords).flat();

function detectTopic(lower) {
  // Check for greeting first
  if (/\b(hi|hello|hey|yo|sup|what's up|good morning|good evening|morning|evening)\b/.test(lower)) {
    return 'greeting';
  }
  // Check each topic by exact substring match first
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return topic;
    }
  }
  // Fuzzy match each word in the input
  const words = lower.split(/\s+/);
  const matchedTopics = {};
  for (const word of words) {
    if (word.length < 3) continue;
    const match = bestFuzzyMatch(word, allKeywords);
    if (match) {
      for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.includes(match)) {
          matchedTopics[topic] = (matchedTopics[topic] || 0) + 1;
        }
      }
    }
  }
  // Return topic with most fuzzy matches
  let bestTopic = null, bestCount = 0;
  for (const [topic, count] of Object.entries(matchedTopics)) {
    if (count > bestCount) { bestCount = count; bestTopic = topic; }
  }
  return bestTopic;
}

function toggleChat() {
  chatPanel.classList.toggle('open');
  if (chatPanel.classList.contains('open')) {
    chatInput.focus();
    if (!chatMsgs.querySelector('.msg.bot')) {
      addMsg('Niaje! Tyrelm Studio Assistant here. Services, merch, booking, releases \u2014 I know everything about the site. Very nice. Utanishow ukikuwa interested.', 'bot');
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

    const topic = detectTopic(lower);

    // Price complaint handler
    const priceComplaints = /\b(expensive|ghali|too much|bei mbaya|expensive sana|too expensive|overpriced|pricey|costly|ni bei|sana hii bei|bei yote)\b/;
    if (priceComplaints.test(lower)) {
      addMsg('\uD83D\uDE02\uD83D\uDE02nakufanyia na bei fiti mali ni safi', 'bot');
      return;
    }

    let reply;
    if (topic === 'greeting') {
      reply = 'Niaje! Tyrelm Studio Assistant here. Ask about services, merch, booking, releases \u2014 I know everything. Very nice. Utanishow ukikuwa interested.';
    } else if (topic === 'pricing') {
      reply = knowledge.services;
    } else if (topic && knowledge[topic]) {
      reply = knowledge[topic];
    } else {
      reply = 'Sijaelewa. Rephrase ama WhatsApp +254 706 602 914.';
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
