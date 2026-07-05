const knowledgeBase = [
  {
    id: 'product-overview',
    keywords: ['what is craftroots', 'craftroots', 'platform', 'makers', 'hosts', 'traveler'],
    source: 'CraftRoots product overview',
    answer: 'CraftRoots is a platform where travelers book hands-on artisan workshops and artisans become cultural hosts. It helps travelers discover verified craft experiences, book sessions, learn directly from artisans, and leave with a self-made souvenir.'
  },
  {
    id: 'booking-flow',
    keywords: ['book', 'booking', 'payment', 'date', 'slot', 'calendar', 'confirm'],
    source: 'CraftRoots booking guidance',
    answer: 'A traveler can discover a workshop, review the artisan profile, select date and time, choose group size, complete payment, and receive pre-session guidance. I cannot confirm live availability here; a real booking system or support team must verify the final slot.'
  },
  {
    id: 'pre-session',
    keywords: ['bring', 'wear', 'prepare', 'pottery', 'block printing', 'session', 'workshop'],
    source: 'CraftRoots pre-session FAQ',
    answer: 'Wear comfortable clothes that can handle clay, dye, paint, or dust depending on the craft. Carry water, your phone for navigation, and any personal essentials. Workshop-specific material guidance should be confirmed in the pre-session message.'
  },
  {
    id: 'family',
    keywords: ['family', 'parents', 'niece', 'children', 'kids', 'elderly', 'accessibility', 'hygiene', 'wheelchair'],
    source: 'Family planner persona and accessibility policy',
    answer: 'CraftRoots can support family-friendly sessions, but details like accessibility, hygiene, clean restrooms, elderly comfort, and age suitability must be confirmed for the specific workshop. This should be routed to Customer Success for human confirmation.'
  },
  {
    id: 'verification',
    keywords: ['verify', 'verified', 'trust', 'safe', 'authentic', 'reviews', 'pehchan'],
    source: 'CraftRoots trust and verification policy',
    answer: 'CraftRoots builds trust through field team verification, real workshop photos/videos, artisan bios, participant reviews, trust scores, and government ID/Pehchan integration where available. I should not claim a specific artisan is verified unless the live artisan profile confirms it.'
  },
  {
    id: 'cancel',
    keywords: ['cancel', 'reschedule', 'refund', 'change date'],
    source: 'CraftRoots cancellation policy draft',
    answer: 'The CraftRoots PRD suggests free cancellation up to 24 hours before a session and one free reschedule up to 12 hours before. For a real booking, refund or cancellation status must be checked by human support.'
  },
  {
    id: 'no-show',
    keywords: ['no show', 'did not show', 'artisan not there', 'location issue', 'not arrived'],
    source: 'No-show escalation policy',
    answer: 'I’m sorry this happened. Please share the booking ID, name, phone number, workshop, date, and location. This must be escalated immediately to Field Operations and Customer Success for verification and resolution.'
  },
  {
    id: 'corporate',
    keywords: ['corporate', 'team', 'offsite', 'school', 'college', 'group', '20 people', 'large group'],
    source: 'Group booking routing rule',
    answer: 'Large groups, school/college trips, and corporate offsite workshop requests should be routed to the Revenue / Enterprise Team. They can coordinate private sessions, capacity, pricing, and operational requirements.'
  },
  {
    id: 'artisan-onboarding',
    keywords: ['artisan join', 'artisan onboarding', 'host', 'earnings', 'dashboard', 'payout', 'availability'],
    source: 'Artisan onboarding and dashboard knowledge',
    answer: 'Artisans join through field team onboarding. The team verifies the workshop, captures profile details, helps structure the session, and supports the artisan with availability, bookings, earnings, reviews, and low-digital-literacy workflows.'
  },
  {
    id: 'partnership',
    keywords: ['sourcing', 'designer', 'partnership', 'collaboration', 'sustainable', 'supply chain', 'bulk'],
    source: 'Ethical sourcing persona and partnership rule',
    answer: 'Ethical sourcing, designer collaboration, bulk craft partnerships, and supply-chain questions should be routed to the Partnerships Team. The assistant should not negotiate terms or claim partnership availability without human review.'
  }
];

const riskyLivePatterns = [
  'confirm a', 'confirmed', 'tomorrow at', 'slot tomorrow', 'available tomorrow',
  'exact price', 'approve refund', 'guarantee safe', 'guarantee accessibility', 'verified for'
];

const fallback = {
  source: 'Human escalation guardrail',
  answer: 'I do not have enough verified information in the CraftRoots knowledge base to answer that fully. I can route this to the CraftRoots support team so they can confirm the latest details instead of guessing.'
};

function scoreEntry(question, entry) {
  const q = question.toLowerCase();
  return entry.keywords.reduce((score, keyword) => q.includes(keyword) ? score + keyword.length : score, 0);
}

function getAnswer(question) {
  const q = question.toLowerCase();
  if (riskyLivePatterns.some(pattern => q.includes(pattern))) {
    return {
      source: 'Live-data hallucination guardrail',
      answer: 'I should not confirm live availability, exact pricing, booking status, refunds, or accessibility guarantees without verified system data. Please route this to human support so the latest details can be confirmed.'
    };
  }

  const ranked = knowledgeBase
    .map(entry => ({ ...entry, score: scoreEntry(question, entry) }))
    .sort((a, b) => b.score - a.score);

  if (!ranked[0] || ranked[0].score === 0) return fallback;
  return ranked[0];
}

function addMessage(role, text, source) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerHTML = `<p>${text}</p>${source ? `<div class="source">Source: ${source}</div>` : ''}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function ask(question) {
  if (!question.trim()) return;
  addMessage('user', question);
  const response = getAnswer(question);
  window.setTimeout(() => addMessage('assistant', response.answer, response.source), 250);
}

document.getElementById('chatForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('questionInput');
  ask(input.value);
  input.value = '';
});

document.querySelectorAll('[data-question]').forEach(button => {
  button.addEventListener('click', () => {
    const question = button.getAttribute('data-question');
    document.getElementById('questionInput').value = question;
    ask(question);
    document.getElementById('questionInput').value = '';
  });
});
