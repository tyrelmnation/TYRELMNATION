// CHAT ASSISTANT
const chatPanel = document.getElementById('chatPanel');
const chatMsgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');
let shengMode = false;

const knowledge = {
  about: 'Tyrelm (Edwin Matekwa) is a recording, mixing, mastering, and production engineer based in Nairobi, Kenya. He founded Tyrelm Nation, a production company blending art, music, and science for talent discovery.',
  services: 'Four services: 1) Music Production \u2014 20,000 KES/project, collab 50/50, perf track +2,000, stripped +3,000. 2) Mixing & Mastering \u2014 stereo 15,000/track, album 12,000/track, Dolby Atmos 25,000/track, mastering only 5,000/track, 2 revisions included. 3) Tracking/Recording \u2014 2,000 KES/hr engineering, studio 1,000-5,000/hr. 4) Audio Consultation \u2014 2,500 KES/session, 60min, send materials 12hrs before.',
  production: 'Music Production: 20,000 KES per project. Includes custom instrumentals, vocal arrangement, full song structuring. Collab rate: 50/50 on composition & streaming. Performance track add: +2,000 KES. Stripped version add: +3,000 KES. One revision included, additional 3,000 KES/round. Delivery 7-14 business days.',
  mixing: 'Mixing & Mastering: Stereo Mix & Master 15,000 KES/track. Album deal (5+ tracks) 12,000 KES/track. Dolby Atmos/Ambisonic 25,000 KES/track. Mastering only 5,000 KES/track. Delivered 24-bit/48kHz WAV. 2 revision passes included, additional 2,500 KES/pass. Atmos requires min 5 business days.',
  tracking: 'Studio session (tracking/recording): Engineering 2,000 KES/hr. Studio space 1,000-5,000 KES/hr depending on location. Includes setup, recording, comping, file delivery. Send materials 24hrs in advance.',
  consultation: 'Audio Consultation: 2,500 KES per session (60 min). Mix feedback, arrangement review, pre-production advice. Send materials 12hrs before. Remote via Zoom/WhatsApp available.',
  releases: 'Latest releases: "Better Person" (Single, 2025) \u2014 https://youtu.be/aAjFKC2pdzw . "Ghost" (Single, 2026) \u2014 https://youtu.be/DX-zDYDqjMk . Full discography on YouTube: https://youtube.com/@Tyrelm',
  experience: 'Experience: 2026 \u2014 Session Diaspor.a (Matt Ngesa, Clerk Keeng, Mordecai Dex). 2024-26 \u2014 Wyatt Boyer (Chicago) mixing/mastering. 2025-26 \u2014 ARGO AR Game soundtrack (with WWF-Kenya). 2025 \u2014 "Time and Space" + "Broken Diary" albums (15 tracks). 2023 \u2014 Lowki The Great "Rise of Greatness", Dicemane "Resilient"/"Rudia" (radio airplay, Shoke Shoke Fest nom). 2018-25 \u2014 Voice over, theme songs, sync licensing.',
  stems: 'Send your stems via: 1) WhatsApp \u2014 quick voice notes/ideas. 2) Email tyrellmatekwa@gmail.com \u2014 full tracks. 3) Dropbox \u2014 large projects: https://www.dropbox.com/request/cq6xi9h8o504mm926l37 . Reviews within 2-3 business days. Format: 24-bit/44k-48kHz WAV.',
  plugin: 'Free TYSONICS bundle includes TYROOM (analog reverb emulation) and TYMLAPSE (delay). Download from the Free Plugin section on the site.',
  tour: 'Sane Sessions \u2014 a live performance series blending raw performance, atmosphere, and sound. Coming soon. Dates TBA. Performances across the country.',
  merch: 'T-shirt and cargo pants: 2,100 KES \u2014 they come as a pair. Hoodie and cargo: 2,500 KES. Great value! Options: White set 2,500, Black set 2,500, White Tee + Black Cargo 2,100, Black Tee + White Cargo 2,100, Limited Edition 4,000. Order via WhatsApp +254 706 602 914.',
  book: 'To book a session: WhatsApp +254 706 602 914 or email tyrellmatekwa@gmail.com. Direct line: tyrellmatekwa@gmail.com | +254 706 602 914. Confirmation within 24hrs.',
  hours: 'Studio sessions typically 10am-8pm EAT (East Africa Time). Flexible by arrangement. Remote sessions available worldwide.',
  location: 'Based in Nairobi, Kenya. Remote sessions available worldwide for mixing, mastering, and consultation.',
  newsletter: 'Join the mailing list for updates on new releases, Sane Sessions, merch drops, and studio news. Subscribe on the site. No spam, unsubscribe anytime.',
  terms: 'Terms & Credits document available for download: Tyrelm_Nation_Terms_and_Credits.pdf',
  contact: 'WhatsApp: +254 706 602 914. Email: tyrellmatekwa@gmail.com. Instagram: @ty_relm and @tyrelm_nation. YouTube: @Tyrelm.',
};

const sheng = {
  about: 'Huyu ni Tyrelm (Edwin Matekwa) \u2014 ni mtu wa recording, mixing, mastering na production based Nairobi. Alianzisha Tyrelm Nation, production company inachanga art, music na science.',
  services: 'Service ziko nne: 1) Music Production \u2014 20K KES per project, collab 50/50. 2) Mixing & Mastering \u2014 stereo 15K/track, album 12K/track, Dolby Atmos 25K/track, mastering tu 5K/track. 3) Tracking/Recording \u2014 2K KES/hr, studio 1K-5K/hr. 4) Audio Consultation \u2014 2.5K KES/session.',
  production: 'Music Production ni 20K KES per project. Una custom instrumentals, vocal arrangement, full song structuring. Collab rate 50/50. Performance track +2K, stripped version +3K.',
  mixing: 'Mixing & Mastering: stereo 15K/track. Album deal 12K/track. Dolby Atmos 25K/track. Mastering tu 5K/track. Delivery 24-bit/48kHz WAV. Revision mbili included.',
  tracking: 'Studio session: Engineering 2K KES/hr. Studio 1K-5K/hr. Inawekwa setup, recording, comping, file delivery.',
  consultation: 'Audio Consultation: 2.5K KES per session (60min). Mix feedback, arrangement advice, pre-production. Remote via Zoom ama WhatsApp.',
  releases: 'Nyimbo mpya: "Better Person" (Single, 2025) na "Ghost" (Single, 2026). YouTube: https://youtube.com/@Tyrelm',
  experience: 'Experience: 2026 Session Diaspor.a, 2024-26 Wyatt Boyer, 2025-26 ARGO Game soundtrack, 2025 Albums "Time and Space" na "Broken Diary", 2023 Lowki The Great na Dicemane.',
  stems: 'Tuma stems zako via: 1) WhatsApp, 2) Email tyrellmatekwa@gmail.com, 3) Dropbox. Reviews 2-3 business days. Format: 24-bit/44k-48kHz WAV.',
  plugin: 'Free TYSONICS bundle iko na TYROOM (reverb) na TYMLAPSE (delay). Download free from Free Plugin section.',
  tour: 'Sane Sessions \u2014 live performance series. Inakuja soon. Dates zitatangazwa.',
  merch: 'Niaje! Tisho na cargo pants utaziget na 2,100 \u2014 zita come kama pair. Hood na cargo ni 2,500. Bei fiti sana! Iko: White set 2,500, Black set 2,500, White Tee + Black Cargo 2,100, Black Tee + White Cargo 2,100, Limited Edition 4,000. Order via WhatsApp +254 706 602 914. Very nice! Utanishow ukikuwa interested.',
  book: 'Kubook session: WhatsApp +254 706 602 914 ama email tyrellmatekwa@gmail.com. Confirmation in 24hrs.',
  hours: 'Studio sessions kuanzia 10am-8pm EAT. Inaweza adjust. Remote sessions iko worldwide.',
  location: 'Based Nairobi, Kenya. Remote sessions worldwide.',
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
  tracking: ['tracking', 'recording', 'record', 'vocal', 'voiceover', 'engineering', 'track', 'studio', 'session', 'rekodi'],
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
  if (/\b(hi|hello|hey|yo|sup|niaje|woza|what's up|good morning|good evening|morning|evening|sasa)\b/.test(lower)) {
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

    // Sheng toggle
    if (/\b(sheng|sheng mode|niambie kwa sheng)\b/.test(lower)) {
      shengMode = !shengMode;
      addMsg(shengMode ? 'Sawa! Sheng mode iko active. Uliza chochote.' : 'Switched to English. Ask me anything.', 'bot');
      return;
    }

    const topic = detectTopic(lower);

    // Price complaint handler
    const priceComplaints = /\b(expensive|ghali|too much|bei mbaya|expensive sana|too expensive|overpriced|pricey|costly|ni bei|sana hii bei|bei yote)\b/;
    if (priceComplaints.test(lower)) {
      addMsg(shengMode ? '\uD83D\uDE02\uD83D\uDE02nakufanyia na bei fiti mali ni safi' : 'The prices are fair for the quality. A T-shirt and cargo set is 2,100 KES, hoodie and cargo set is 2,500 KES \u2014 good value.', 'bot');
      return;
    }

    // Session pricing question — ask what kind first
    const hasSession = /\b(session|booking)\b/.test(lower);
    const hasPriceIntent = /\b(ngapi|bei|how|hoe|price|cost|rate|fee|gharama|senti|much|expensive)\b/.test(lower);
    if (hasSession && hasPriceIntent && topic === 'tracking') {
      addMsg(shengMode ? 'Unataka session ya aina gani?\n1) Music production — kutengeneza beat na song\n2) Mixing & mastering — kusafisha sauti\n3) Tracking/recording — kurekodi\n4) Audio consultation — ushauri wa music' : 'What kind of session do you need?\n1) Music production — making beats & structuring songs\n2) Mixing & mastering — polishing your sound\n3) Tracking/recording — recording vocals or instruments\n4) Audio consultation — mix feedback & pre-production advice', 'bot');
      return;
    }

    const map = shengMode ? sheng : knowledge;

    let reply;
    if (topic === 'greeting') {
      reply = shengMode ? 'Yo! Sheng mode iko active. Uliza chochote.' : 'Hi! Tyrelm Studio Assistant here. Ask me about services, pricing, merch, booking, releases, or anything on the site.';
    } else if (topic === 'pricing') {
      reply = map.services;
    } else if (topic && map[topic]) {
      reply = map[topic];
    } else {
      reply = shengMode ? 'Sijaelewa. Jaribu tena ama WhatsApp +254 706 602 914.' : 'Didn\'t catch that. Try rephrasing or WhatsApp +254 706 602 914.';
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
