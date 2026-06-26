// CHAT ASSISTANT
const chatPanel = document.getElementById('chatPanel');
const chatMsgs = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');
let shengMode = false;

const knowledge = {
  about: 'Tyrelm (Edwin Matekwa) is a recording, mixing, mastering, and production engineer based in Nairobi, Kenya. He founded Tyrelm Nation, a production company blending art, music, and science for talent discovery.',
  services: 'Four services: 1) Music Production \u2014 20,000 KES ($154)/project, collab 50/50, perf track +2,000 ($15), stripped +3,000 ($23). 2) Mixing & Mastering \u2014 stereo 15,000 ($115)/track, album 12,000 ($92)/track, Dolby Atmos 25,000 ($192)/track, mastering only 5,000 ($38)/track, 2 revisions included. 3) Tracking/Recording \u2014 2,000 KES ($15)/hr engineering, studio 1,000-5,000 ($8-$38)/hr. 4) Audio Consultation \u2014 2,500 KES ($19)/session, 60min, send materials 12hrs before.',
  production: 'Music Production: 20,000 KES ($154) per project. Includes custom instrumentals, vocal arrangement, full song structuring. Collab rate: 50/50 on composition & streaming. Performance track add: +2,000 KES ($15). Stripped version add: +3,000 KES ($23). One revision included, additional 3,000 KES ($23)/round. Delivery 7-14 business days.',
  mixing: 'Mixing: Stereo Mix 15,000 KES ($115)/track. Album deal (5+ tracks) 12,000 KES ($92)/track. Dolby Atmos/Ambisonic 25,000 KES ($192)/track. Delivered 24-bit/48kHz WAV. 2 revision passes included, additional 2,500 KES ($19)/pass. Atmos requires min 5 business days.',
  mastering: 'Mastering: 5,000 KES ($38)/track. Stereo mastering from mixed stems or stereo file. Delivered 24-bit/48kHz WAV. 2 revision passes included, additional 2,500 KES ($19)/pass. Album deal available on request.',
  mixmaster: 'Mixing & Mastering: Stereo Mix & Master 15,000 KES ($115)/track. Album deal (5+ tracks) 12,000 KES ($92)/track. Dolby Atmos/Ambisonic 25,000 KES ($192)/track. Mastering only 5,000 KES ($38)/track. Delivered 24-bit/48kHz WAV. 2 revision passes included, additional 2,500 KES ($19)/pass. Atmos requires min 5 business days.',
  tracking: 'Studio session (tracking/recording): Engineering 2,000 KES ($15)/hr. Studio space 1,000-5,000 KES ($8-$38)/hr depending on location. Includes setup, recording, comping, file delivery. Send materials 24hrs in advance.',
  consultation: 'Audio Consultation: 2,500 KES ($19) per session (60 min). Mix feedback, arrangement review, pre-production advice. Send materials 12hrs before. Remote via Zoom/WhatsApp available.',
  releases: 'Latest releases: "Better Person" (Single, 2025) \u2014 https://youtu.be/aAjFKC2pdzw . "Ghost" (Single, 2026) \u2014 https://youtu.be/DX-zDYDqjMk . Full discography on YouTube: https://youtube.com/@Tyrelm',
  experience: 'Experience: 2026 \u2014 Session Diaspor.a (Matt Ngesa, Clerk Keeng, Mordecai Dex). 2024-26 \u2014 Wyatt Boyer (Chicago) mixing/mastering. 2025-26 \u2014 ARGO AR Game soundtrack (with WWF-Kenya). 2025 \u2014 "Time and Space" + "Broken Diary" albums (15 tracks). 2023 \u2014 Lowki The Great "Rise of Greatness", Dicemane "Resilient"/"Rudia" (radio airplay, Shoke Shoke Fest nom). 2018-25 \u2014 Voice over, theme songs, sync licensing.',
  beats: 'Beat licensing: MP3 Lease 5,000 KES ($38), WAV Lease 8,000 KES ($62), Stems Lease (music/drum/bass stems) 10,000 KES ($77), Exclusive (all separated multi-tracks) 70,000 KES ($538). Order via WhatsApp +254 706 602 914.',
  stems: 'Send your stems via: 1) WhatsApp \u2014 quick voice notes/ideas. 2) Email tyrellmatekwa@gmail.com \u2014 full tracks. 3) Dropbox \u2014 large projects: https://www.dropbox.com/request/cq6xi9h8o504mm926l37 . Reviews within 2-3 business days. Format: 24-bit/44k-48kHz WAV.',
  plugin: 'Free TYSONICS bundle includes TYROOM (analog reverb emulation) and TYMLAPSE (delay). Download from the Free Plugin section on the site.',
  tour: 'Sane Sessions \u2014 a live performance series blending raw performance, atmosphere, and sound. Coming soon. Dates TBA. Performances across the country.',
  merch: 'T-shirt and cargo pants: 2,100 KES ($16) \u2014 they come as a pair. Hoodie and cargo: 2,500 KES ($19). Great value! Options: White set 2,500 ($19), Black set 2,500 ($19), White Tee + Black Cargo 2,100 ($16), Black Tee + White Cargo 2,100 ($16), Limited Edition 4,000 ($31). Order via WhatsApp +254 706 602 914.',
  book: 'To book a session: WhatsApp +254 706 602 914 or email tyrellmatekwa@gmail.com. Direct line: tyrellmatekwa@gmail.com | +254 706 602 914. Confirmation within 24hrs.',
  hours: 'Studio sessions typically 10am-8pm EAT (East Africa Time). Flexible by arrangement. Remote sessions available worldwide.',
  location: 'Based in Nairobi, Kenya. Remote sessions available worldwide for mixing, mastering, and consultation.',
  newsletter: 'Join the mailing list for updates on new releases, Sane Sessions, merch drops, and studio news. Subscribe on the site. No spam, unsubscribe anytime.',
  terms: 'Terms & Credits document available for download: Tyrelm_Nation_Terms_and_Credits.pdf',
  contact: 'WhatsApp: +254 706 602 914. Email: tyrellmatekwa@gmail.com. Instagram: @ty_relm and @tyrelm_nation. YouTube: @Tyrelm.',
};

const sheng = {
  about: 'Huyu ni Tyrelm (Edwin Matekwa) \u2014 ni mtu wa recording, mixing, mastering na production based Nairobi. Alianzisha Tyrelm Nation, production company inachanga art, music na science.',
  services: 'Service ziko nne: 1) Music Production \u2014 20K KES ($154) per project, collab 50/50. 2) Mixing & Mastering \u2014 stereo 15K ($115)/track, album 12K ($92)/track, Dolby Atmos 25K ($192)/track, mastering tu 5K ($38)/track. 3) Tracking/Recording \u2014 2K KES ($15)/hr, studio 1K-5K ($8-$38)/hr. 4) Audio Consultation \u2014 2.5K KES ($19)/session.',
  production: 'Music Production ni 20K KES ($154) per project. Una custom instrumentals, vocal arrangement, full song structuring. Collab rate 50/50. Performance track +2K ($15), stripped version +3K ($23).',
  mixing: 'Mixing: stereo mix 15K ($115)/track. Album deal 12K ($92)/track. Dolby Atmos 25K ($192)/track. Delivery 24-bit/48kHz WAV. Revision mbili included.',
  mastering: 'Mastering tu: 5K KES ($38)/track. Unatumia mixed stems ama stereo file. Delivery 24-bit/48kHz WAV. Revision mbili included.',
  mixmaster: 'Mixing & Mastering: stereo 15K ($115)/track. Album deal 12K ($92)/track. Dolby Atmos 25K ($192)/track. Mastering tu 5K ($38)/track. Delivery 24-bit/48kHz WAV. Revision mbili included.',
  tracking: 'Studio session: Engineering 2K KES ($15)/hr. Studio 1K-5K ($8-$38)/hr. Inawekwa setup, recording, comping, file delivery.',
  consultation: 'Audio Consultation: 2.5K KES ($19) per session (60min). Mix feedback, arrangement advice, pre-production. Remote via Zoom ama WhatsApp.',
  releases: 'Nyimbo mpya: "Better Person" (Single, 2025) na "Ghost" (Single, 2026). YouTube: https://youtube.com/@Tyrelm',
  experience: 'Experience: 2026 Session Diaspor.a, 2024-26 Wyatt Boyer, 2025-26 ARGO Game soundtrack, 2025 Albums "Time and Space" na "Broken Diary", 2023 Lowki The Great na Dicemane.',
  beats: 'Beat licensing: MP3 Lease 5K KES ($38), WAV Lease 8K KES ($62), Stems Lease 10K KES ($77), Exclusive 70K KES ($538). Order via WhatsApp +254 706 602 914.',
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
  beats: ['beat', 'lease', 'leases', 'exclusive', 'licensing', 'wav lease', 'mp3 lease', 'stems lease'],
  production: ['production', 'produce', 'instrumental', 'producer', 'producing', 'sanaa', 'ngoma'],
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

function addBotHTML(html) {
  const div = document.createElement('div');
  div.className = 'msg bot msg-html';
  div.innerHTML = html;
  chatMsgs.appendChild(div);
}

function showMerchCards(outfits) {
  var html = '<div class="merch-card-grid">';
  for (var i = 0; i < outfits.length; i++) {
    var o = outfits[i];
    html += '<div class="merch-chat-card" onclick="window.open(\'' + o.link + '\',\'_blank\')">';
    html += '  <div class="merch-chat-visual">';
    html += '    <img class="merch-chat-top" src="' + o.top + '" loading="lazy">';
    if (o.bottom) html += '    <img class="merch-chat-bottom" src="' + o.bottom + '" loading="lazy">';
    html += '  </div>';
    html += '  <div class="merch-chat-info">';
    html += '    <span class="merch-chat-name">' + o.name + '</span>';
    html += '    <span class="merch-chat-price">' + o.price + '</span>';
    html += '  </div>';
    html += '</div>';
  }
  html += '</div>';
  addBotHTML(html);
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
      addMsg(shengMode ? '\uD83D\uDE02\uD83D\uDE02nakufanyia na bei fiti mali ni safi' : 'The prices are fair for the quality. A T-shirt and cargo set is 2,100 KES ($16), hoodie and cargo set is 2,500 KES ($19) \u2014 good value.', 'bot');
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
    } else if (topic === 'merch') {
      addMsg(map.merch, 'bot');
      if (/\b(tee|t.?shirt|tshirt|shati)\b/.test(lower) && !/\b(hoodie|hood)\b/.test(lower)) {
        showMerchCards([
          { top: 'PICS/white-tee-front.webp', bottom: 'PICS/black-cargo.webp', name: 'White Tee + Black Cargo', price: 'KSh 2,100 ($16)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20White%20Tee%20%2B%20Black%20Cargo%20set.' },
          { top: 'PICS/black-tee-front.webp', bottom: 'PICS/white-cargo.webp', name: 'Black Tee + White Cargo', price: 'KSh 2,100 ($16)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Black%20Tee%20%2B%20White%20Cargo%20set.' }
        ]);
      } else if (/\b(hoodie|hood)\b/.test(lower) && !/\b(tee|t.?shirt|tshirt)\b/.test(lower)) {
        showMerchCards([
          { top: 'PICS/white-hoodie.webp', bottom: 'PICS/white-cargo.webp', name: 'White Set', price: 'KSh 2,500 ($19)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20White%20Hoodie%20%2B%20White%20Cargo%20set.' },
          { top: 'PICS/black-hoodie.webp', bottom: 'PICS/black-cargo.webp', name: 'Black Set', price: 'KSh 2,500 ($19)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Black%20Hoodie%20%2B%20Black%20Cargo%20set.' }
        ]);
      } else if (/\b(limited)\b/.test(lower)) {
        showMerchCards([
          { top: 'PICS/white-hoodie.webp', bottom: 'PICS/limited-cargo.webp', name: 'Limited Edition', price: 'KSh 4,000 ($31)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Limited%20Edition%20Set.' }
        ]);
      } else {
        showMerchCards([
          { top: 'PICS/white-hoodie.webp', bottom: 'PICS/white-cargo.webp', name: 'White Set', price: 'KSh 2,500 ($19)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20White%20Hoodie%20%2B%20White%20Cargo%20set.' },
          { top: 'PICS/black-hoodie.webp', bottom: 'PICS/black-cargo.webp', name: 'Black Set', price: 'KSh 2,500 ($19)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Black%20Hoodie%20%2B%20Black%20Cargo%20set.' },
          { top: 'PICS/white-tee-front.webp', bottom: 'PICS/black-cargo.webp', name: 'White Tee + Black Cargo', price: 'KSh 2,100 ($16)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20White%20Tee%20%2B%20Black%20Cargo%20set.' },
          { top: 'PICS/black-tee-front.webp', bottom: 'PICS/white-cargo.webp', name: 'Black Tee + White Cargo', price: 'KSh 2,100 ($16)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Black%20Tee%20%2B%20White%20Cargo%20set.' },
          { top: 'PICS/white-hoodie.webp', bottom: 'PICS/limited-cargo.webp', name: 'Limited Edition', price: 'KSh 4,000 ($31)', link: 'https://wa.me/254706602914?text=Hi%20Tyrelm%2C%20I%20want%20to%20order%20the%20Limited%20Edition%20Set.' }
        ]);
      }
      return;
    } else if (topic === 'production' || topic === 'mixing' || topic === 'tracking' || topic === 'consultation') {
      if (topic === 'mixing' && /\b(mastering|master)\b/.test(lower) && !/\b(mix|mixing)\b/.test(lower)) {
        reply = map.mastering;
      } else if (topic === 'mixing' && /\b(mix|mixing)\b/.test(lower) && /\b(mastering|master)\b/.test(lower)) {
        reply = (shengMode ? sheng.mixmaster : knowledge.mixmaster);
      } else {
        reply = map[topic];
      }
      addMsg(reply, 'bot');
      return;
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
  const email = form.field_0.value.trim();
  if (!email) return false;
  const btn = form.querySelector('button');
  btn.textContent = 'Subscribing...';
  btn.disabled = true;
  var data = new URLSearchParams();
  data.append('field_0', email);
  data.append('hpc4b27b6e-eb38-11e9-be00-06b4694bee2a', '');
  fetch('https://eocampaign1.com/form/313feece-6ed4-11f1-98dc-69ffe802ccb0', {
    method: 'POST',
    body: data
  }).then(function(r) {
    if (r.ok) {
      form.innerHTML = '<p style="color:var(--gold);font-size:14px;">\u2705 You\'re on the list! Check your email to confirm.</p>';
    } else {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
      alert('Something went wrong. Try again or WhatsApp +254 706 602 914.');
    }
  }).catch(function() {
    btn.textContent = 'Subscribe';
    btn.disabled = false;
    alert('Something went wrong. Try again or WhatsApp +254 706 602 914.');
  });
  return false;
}

// PLUGIN DOWNLOAD (email gate)
function downloadPlugin() {
  var email = document.getElementById('pluginEmail').value.trim();
  if (!email) { alert('Please enter your email to download.'); return; }
  var btn = document.querySelector('#pluginEmail + button');
  btn.textContent = 'Processing...';
  btn.disabled = true;
  fetch('https://formspree.io/f/xwvzqdpj', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email: email, _subject: 'TYSONIX Plugin Download' })
  }).then(function() {
    doDownload(btn);
  }).catch(function() {
    doDownload(btn);
  });
}
function doDownload(btn) {
  var a = document.createElement('a');
  a.href = 'TYSONIX%20BUNDLE.rar';
  a.download = 'TYSONIX_BUNDLE.rar';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  btn.textContent = 'Download started!';
  btn.disabled = false;
}

// TERMS MODAL
const termsData = {
  production: [
    'Client provides reference tracks and creative brief.',
    'One revision round included in the base rate.',
    'Additional revisions: 3,000 KES ($23) per round.',
    'Client receives 24-bit/48kHz WAV stems upon final payment.',
    'Producer retains 50% publishing credit on collab projects.',
    'Delivery within 7\u201314 business days.',
  ],
  mixing: [
    'Client supplies recorded tracks as 24-bit/44.1kHz or 48kHz WAV.',
    'Up to 2 revision passes included.',
    'Additional revisions: 2,500 KES ($19) per pass.',
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
function loadGallery() {
  var grid = document.getElementById('videoGalleryGrid');
  if (!grid) return;
  fetch('gallery/videos.json').then(function(r) { return r.json(); }).then(function(videos) {
    videos.forEach(function(v) {
      var item = document.createElement('div');
      item.className = 'video-gallery-item';
      var thumbSrc = v.thumb || guessThumb(v.video);
      var videoEnc = encodePath(v.video);
      var thumbEnc = encodePath(thumbSrc);
      item.innerHTML = '<div class="video-gallery-thumb" style="background:var(--black-3);padding:0;"><img src="' + thumbEnc + '" alt="' + v.title + '" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:12px;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><span class="video-gallery-play-icon" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;font-size:40px;">&#9654;</span></div><div class="video-gallery-item-title">' + v.title + '</div>';
      item.onclick = function() { playVideo(videoEnc, thumbEnc); };
      grid.appendChild(item);
    });
  }).catch(function() {});
}
function guessThumb(videoPath) {
  var name = videoPath.split('/').pop().replace(/\.\w+$/, '');
  return 'PICS/' + name + '-thumb.webp';
}
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

// HERO VIDEO
var heroVideo = document.getElementById('heroVideo');
var heroPoster = document.getElementById('heroPoster');
if (heroVideo && heroPoster) {
  heroVideo.addEventListener('loadeddata', function() {
    heroVideo.style.transition = 'opacity 0.8s ease';
    heroVideo.style.opacity = '1';
    heroPoster.style.transition = 'opacity 0.8s ease';
    heroPoster.style.opacity = '0';
    heroVideo.play().catch(function() {});
  });
  // If video loads fast enough, canplay might already have fired
  if (heroVideo.readyState >= 2) {
    heroVideo.style.opacity = '1';
    heroPoster.style.opacity = '0';
    heroVideo.play().catch(function() {});
  }
}

// PORTFOLIO
function encodePath(p) {
  return p.split('/').map(function(s) { return encodeURIComponent(s); }).join('/');
}
function loadPortfolio() {
  var grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  fetch('portfolio/tracks.json').then(function(r) { return r.json(); }).then(function(tracks) {
    tracks.forEach(function(t, i) {
      var card = document.createElement('div');
      card.className = 'portfolio-card';
      var artSrc = encodePath(t.art);
      var rawSrc = encodePath(t.raw);
      card.innerHTML = '<div class="portfolio-card-art"><img src="' + artSrc + '" alt="' + t.title + '" loading="lazy"></div><div class="portfolio-card-body"><div class="portfolio-card-title">' + t.title + '</div><div class="portfolio-card-artist">' + t.artist + '</div></div><div class="portfolio-card-versions"><audio id="audio-' + i + '" preload="none"><source src="' + rawSrc + '" type="audio/mpeg"></audio><button class="portfolio-version version-raw" onclick="togglePortfolioAudio(' + i + ')"><span class="version-label">Raw</span><span class="version-icon">\u25B6</span></button><button class="portfolio-version version-final" onclick="playPortfolioFinal(\'' + t.final + '\')"><span class="version-label">Final</span><span class="version-icon">\u25B6</span></button></div>';
      grid.appendChild(card);
    });
  }).catch(function() {});
}
var portfolioAudio = null;
function togglePortfolioAudio(i) {
  var audio = document.getElementById('audio-' + i);
  if (!audio) return;
  var rawBtn = audio.parentNode.querySelector('.version-raw');
  var icon = rawBtn.querySelector('.version-icon');
  if (portfolioAudio && portfolioAudio !== audio) { portfolioAudio.pause(); portfolioAudio.currentTime = 0; var b = portfolioAudio.parentNode.querySelector('.version-raw'); if (b) { b.classList.remove('playing'); b.querySelector('.version-icon').textContent = '\u25B6'; } }
  if (audio.paused) { audio.play(); rawBtn.classList.add('playing'); icon.textContent = '\u23F8'; portfolioAudio = audio; audio.onended = function() { rawBtn.classList.remove('playing'); icon.textContent = '\u25B6'; }; }
  else { audio.pause(); rawBtn.classList.remove('playing'); icon.textContent = '\u25B6'; }
}
function playPortfolioFinal(src) {
  document.getElementById('showreelIframe').src = src;
  document.getElementById('showreelPlayer').style.display = 'flex';
}
function closeShowreelPlayer() {
  document.getElementById('showreelIframe').src = '';
  document.getElementById('showreelPlayer').style.display = 'none';
  var ga = document.getElementById('galleryArt');
  if (ga) { ga.style.display = 'none'; }
}
function showGalleryArt() {
  closeVideoGallery();
  var ov = document.getElementById('showreelPlayer');
  ov.style.display = 'flex';
  var inner = ov.querySelector('.showreel-player-inner');
  var existing = document.getElementById('galleryArt');
  if (existing) { existing.style.display = 'block'; return; }
  var img = document.createElement('img');
  img.id = 'galleryArt';
  img.src = 'ALBUM%20ARTS/ARTWORK.webp';
  img.style.cssText = 'width:100%;max-width:600px;border-radius:12px;display:block;margin:0 auto;';
  inner.appendChild(img);
}
if (document.getElementById('portfolioGrid')) { loadPortfolio(); }
if (document.getElementById('videoGalleryGrid')) { loadGallery(); }
