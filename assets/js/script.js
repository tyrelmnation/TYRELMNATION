// HERO VIDEO DELAY — poster stays 2s, then video fades in over it
const heroVideo = document.getElementById('heroVideo');
const heroPoster = document.getElementById('heroPoster');
const heroSection = document.querySelector('.hero');
let heroTimerDone = false;

setTimeout(() => {
  if (heroVideo) {
    heroVideo.style.transition = 'opacity 1s ease';
    heroVideo.style.opacity = '1';
    heroVideo.play();
  }
  if (heroPoster) {
    heroPoster.style.transition = 'opacity 1s ease 0.5s';
    heroPoster.style.opacity = '0';
  }
  heroTimerDone = true;
}, 2000);

// when scrolling back to hero, fade poster in smoothly
window.addEventListener('scroll', () => {
  if (!heroSection || !heroPoster || !heroTimerDone) return;
  const rect = heroSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  if (isVisible && heroPoster.style.opacity !== '1') {
    heroPoster.style.transition = 'opacity 0.8s ease';
    heroPoster.style.opacity = '1';
  } else if (!isVisible && heroPoster.style.opacity !== '0') {
    heroPoster.style.opacity = '0';
  }
});

// NAVIGATION
const nav = document.querySelector('nav');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  toggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 80);
});

// PAGE BACKGROUND subtle zoom & color shift on scroll
const pageBg = document.getElementById('page-bg');
if (pageBg) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(sy / maxScroll, 1);
    const hue = -8 + progress * 16;
    const scale = 1 + progress * 0.05;
    pageBg.style.filter = `hue-rotate(${hue}deg)`;
    pageBg.style.transform = `scale(${scale})`;
  });
}

// CHATBOT
const PHONE = '254706602914';
const chatPanel = document.getElementById('chatPanel');

const KB = [
  { kw:['hi','hello','hey','yo','sup'], ans:'Hey! I\'m the Tyrelm Studio assistant. Ask me about music production, mixing, recording, pricing, or anything studio related.' },
  { kw:['production','produce','beat','instrumental','music production'], ans:'<b>Music Production</b> &mdash; 20,000 KES per project. Includes beat creation, vocal arrangement, full song structuring.<br>Collab rate: 50/50 on composition &amp; streaming.<br>Extra: Performance track +2,000 KES, Stripped version +3,000 KES.<br><a href="javascript:openTerms(\'production\')" style="color:var(--gold)">View full Terms &amp; Credits &rarr;</a>' },
  { kw:['mix','master','mixing','mastering','stereo','dolby','atmos'], ans:'<b>Mixing &amp; Mastering</b><br>Stereo Mix &amp; Master: 15,000 KES/track<br>Album deal: 12,000 KES/track<br>Dolby Atmos / Ambisonic: 25,000 KES/track<br>Mastering only: 5,000 KES/track<br>Delivered at 24-bit/48kHz WAV, up to 2 revision passes.<br><a href="javascript:openTerms(\'mixing\')" style="color:var(--gold)">View full Terms &amp; Credits &rarr;</a>' },
  { kw:['track','record','recording','vocal','voice','session','engineering'], ans:'<b>Tracking / Recording</b><br>Engineering fee: 2,000 KES per hour.<br>Studio space: from 1,000 KES/hr (budget) to 5,000 KES/hr (high-end).<br>Full session comping &amp; file delivery included.<br><a href="javascript:openTerms(\'tracking\')" style="color:var(--gold)">View full Terms &amp; Credits &rarr;</a>' },
  { kw:['consult','consultation','advice','feedback','direction','pre-production'], ans:'<b>Audio Consultation</b> &mdash; 2,500 KES per session.<br>Covers mix feedback, arrangement review, pre-production planning &amp; release direction.<br>Remote or in-person. Send materials 12hrs in advance.<br><a href="javascript:openTerms(\'consultation\')" style="color:var(--gold)">View full Terms &amp; Credits &rarr;</a>' },
  { kw:['price','pricing','cost','rate','how much','fee','kes'], ans:'<b>Pricing overview:</b><br>&bull; Music Production: 20,000 KES/project<br>&bull; Mix &amp; Master: 15,000 KES/track<br>&bull; Dolby Atmos: 25,000 KES/track<br>&bull; Mastering only: 5,000 KES/track<br>&bull; Tracking/Recording: 2,000 KES (engineering)<br>&bull; Studio space: 1,000&ndash;5,000 KES/hr<br>&bull; Audio Consultation: 2,500 KES/session<br><br>Ask me about any service for full details!' },
  { kw:['book','booking','appointment','session','schedule','reserve'], ans:'Ready to book? Hit me on WhatsApp and I\'ll get you set up!<br><a href="https://wa.me/'+PHONE+'" target="_blank" style="color:var(--gold)">Book via WhatsApp &rarr;</a>' },
  { kw:['contact','phone','number','call','reach','email'], ans:'<b>Contact Tyrelm</b><br>WhatsApp: <a href="https://wa.me/'+PHONE+'" target="_blank" style="color:var(--gold)">+254 706 602 914</a><br>Email: <a href="mailto:tyrellmatekwa@gmail.com" style="color:var(--gold)">tyrellmatekwa@gmail.com</a><br>Studio: Nairobi, Kenya' },
  { kw:['where','location','nairobi','studio location','based'], ans:'Tyrelm Nation is based in <b>Nairobi, Kenya</b>. Recording studio options available depending on your budget (1,000&ndash;5,000 KES/hr).' },
  { kw:['terms','credit','condition','rights','license','buyout','exclusive'], ans:'Check the Terms &amp; Credits for each service:<br><a href="javascript:openTerms(\'production\')" style="color:var(--gold)">Music Production</a><br><a href="javascript:openTerms(\'mixing\')" style="color:var(--gold)">Mixing &amp; Mastering</a><br><a href="javascript:openTerms(\'tracking\')" style="color:var(--gold)">Tracking / Recording</a><br><a href="javascript:openTerms(\'consultation\')" style="color:var(--gold)">Audio Consultation</a>' },
  { kw:['stem','dropbox','upload','send file','collab','collaborate','collaboration'], ans:'<b>Send Stems</b><br>WhatsApp: quick voice notes &amp; clips<br>Email: tyrellmatekwa@gmail.com (full tracks)<br>Dropbox: <a href="https://www.dropbox.com/request/cq6xi9h8o504mm926l37" target="_blank" style="color:var(--gold)">Upload here</a><br>Format: 24-bit / 44&ndash;48kHz WAV. Reviews within 2&ndash;3 business days.' },
  { kw:['plugin','tysonics','tyroom','tym lapse','reverb','delay','free','download'], ans:'<b>TYSONICS Bundle</b> &mdash; TYROOM reverb &amp; TYMLAPSE delay plugins.<br>Analog-emulation VSTs, free to download.<br><a href="TYSONIX%20BUNDLE.rar" download style="color:var(--gold)">Download TYSONICS Bundle &rarr;</a>' },
  { kw:['tyrelm','who','about','edwin','matekwa','nation'], ans:'<b>Tyrelm Nation</b> is a recording, mixing, mastering, and production studio based in Nairobi, founded by Edwin Matekwa (Tyrelm). Architectural Audio Frameworks.' },
  { kw:['revision','revise','revise pass','revision rounds'], ans:'<b>Revisions:</b><br>&bull; Music Production: up to 3 revision rounds within 14 days of rough delivery.<br>&bull; Mixing &amp; Mastering: up to 2 passes included.' },
  { kw:['cancellation','cancel','refund','deposit'], ans:'<b>Cancellation policy:</b> 24-hour notice required for tracking/recording sessions, or a 30% hold fee applies.' },
];

function findAnswer(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    for (const kw of entry.kw) {
      if (lower.includes(kw)) return entry.ans;
    }
  }
  return null;
}

function addMsg(text, role) {
  const el = document.createElement('div');
  el.className = 'msg ' + role;
  el.innerHTML = text;
  document.getElementById('chatMsgs').appendChild(el);
  el.scrollIntoView({ behavior: 'smooth' });
}

function sendMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  input.value = '';
  setTimeout(() => {
    const ans = findAnswer(text);
    if (ans) {
      addMsg(ans, 'bot');
    } else {
      const wa = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent('Hey Tyrelm, I visited your studio page and have a question: ' + text);
      addMsg('I don\'t have an answer for that yet. Let me connect you directly!<br><br><a href="' + wa + '" target="_blank" class="btn-gold" style="padding:10px 24px;font-size:14px;display:inline-block">Ask on WhatsApp &rarr;</a><div class="wa-fallback">Or email: <a href="mailto:tyrellmatekwa@gmail.com">tyrellmatekwa@gmail.com</a></div>', 'bot');
    }
  }, 400);
}

function toggleChat() {
  const panel = document.getElementById('chatPanel');
  const btn = document.getElementById('chatInlineBtn');
  const open = panel.classList.toggle('open');
  if (btn) btn.style.display = open ? 'none' : 'inline-flex';
  if (open && !document.querySelector('#chatMsgs .msg')) {
    setTimeout(() => {
      addMsg('Hey there! I\'m your Tyrelm Studio assistant. Ask me anything about our services, pricing, or how to book a session.', 'bot');
    }, 400);
  }
}

// TERMS MODAL
const termsData = {
  production: {
    title: "Music Production - Terms & Credits",
    html: `<ul>
            <li><strong>Rate:</strong> 20,000 KES per project. Client owns the master recording rights to their song.</li>
            <li><strong>Beat composition:</strong> Remains the property of Tyrelm Nation. Client does not own the underlying beat composition.</li>
            <li><strong>Exclusive licence buyout:</strong> 70,000 - 85,000 KES. Client purchases full exclusive rights to the beat composition.</li>
            <li><strong>Collab rate:</strong> If it's a collaboration, the split is 50/50 - on composition rights and streaming royalties.</li>
            <li><strong>Performance track:</strong> +2,000 KES. A live/show-ready version of the song - arranged and mixed specifically for stage or live performance use.</li>
            <li><strong>Stripped version:</strong> +3,000 KES per version. Acoustic, minimal, or alternative arrangement of the original (e.g. piano-only, guitar-vocal, unplugged). Each additional stripped version is charged separately.</li>
            <li><strong>Production credit:</strong> Track must be credited as <em>Produced by Tyrelm</em>.</li>
            <li><strong>Composer credit:</strong> Edwin Matekwa listed as Composer on all metadata and release documentation.</li>
            <li><strong>Revisions:</strong> Up to 3 revision rounds within 14 days of rough delivery.</li>
           </ul>`
  },
  mixing: {
    title: "Mixing & Mastering - Terms & Credits",
    html: `<ul>
            <li><strong>Stereo Mix & Master:</strong> 15,000 KES per track.</li>
            <li><strong>Album rate:</strong> 12,000 KES per track (multi-track projects).</li>
            <li><strong>Dolby Atmos / Ambisonic mix:</strong> 25,000 KES per track.</li>
            <li><strong>Mastering only:</strong> 5,000 KES per track.</li>
            <li><strong>File requirements:</strong> Send clean consolidated stems, no spatial plugins, labeled correctly at 24-bit / 48kHz WAV or higher.</li>
            <li><strong>Deliverables:</strong> Stereo mix at 24-bit/48kHz WAV. Ambisonic and Dolby Atmos mixes available on request.</li>
            <li><strong>Turnaround:</strong> 5-7 working days.</li>
            <li><strong>Revisions:</strong> Up to 2 passes included in the rate.</li>
           </ul>`
  },
  tracking: {
    title: "Tracking & Recording - Terms & Credits",
    html: `<ul>
            <li><strong>Engineering fee:</strong> 2,000 KES per hour - this is Tyrelm's fee for engineering the session. It does not include studio space rental.</li>
            <li><strong>Studio space:</strong> Ranges from 1,000 KES/hr (budget studios) to 5,000 KES/hr (high-end facilities). Options are discussed based on your budget and project needs.</li>
            <li><strong>Booking:</strong> Full payment upfront to confirm the session slot.</li>
            <li><strong>Cancellation:</strong> 24-hour notice required or a 30% hold fee applies.</li>
            <li><strong>File delivery:</strong> Raw multitracks handed over once session is paid in full.</li>
           </ul>`
  },
  consultation: {
    title: "Audio Consultation - Terms & Credits",
    html: `<ul>
            <li><strong>Rate:</strong> 2,500 KES per session.</li>
            <li><strong>What's covered:</strong> Mix feedback, arrangement review, pre-production planning, and release direction.</li>
            <li><strong>Preparation:</strong> Send your materials (tracks, links, briefs) to <em>tyrellmatekwa@gmail.com</em> at least 12 hours before the session.</li>
            <li><strong>Format:</strong> Remote (video call) or in-person - confirmed on booking.</li>
           </ul>`
  }
};

function openTerms(serviceKey) {
  const data = termsData[serviceKey];
  if(data) {
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalBody').innerHTML = data.html;
    document.getElementById('termsModal').classList.add('active');
  }
}

function closeTerms() {
  document.getElementById('termsModal').classList.remove('active');
}

// VIDEO GALLERY
function openVideoGallery() {
  document.getElementById('videoGallery').classList.add('active');
  document.querySelector('.video-gallery-grid').style.display = 'grid';
  document.getElementById('videoPlayer').style.display = 'none';
}
function closeVideoGallery() {
  document.getElementById('videoGallery').classList.remove('active');
  const vid = document.getElementById('galleryVideo');
  if (vid) { vid.pause(); vid.src = ''; }
}
function playVideo(src, poster) {
  document.querySelector('.video-gallery-grid').style.display = 'none';
  const player = document.getElementById('videoPlayer');
  player.style.display = 'block';
  const vid = document.getElementById('galleryVideo');
  vid.src = src;
  vid.poster = poster;
  vid.load();
  vid.play();
}

window.onclick = function(event) {
  const modal = document.getElementById('termsModal');
  if (event.target === modal) {
    modal.classList.remove('active');
  }
  const vg = document.getElementById('videoGallery');
  if (event.target === vg) {
    closeVideoGallery();
  }
};

// NEWSLETTER — sends signup to WhatsApp
function handleNewsletter(form) {
  const input = form.querySelector('input');
  if (input.value.trim()) {
    const wa = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent('New mailing list signup: ' + input.value.trim());
    window.open(wa, '_blank');
    input.value = '';
  }
  return false;
}
