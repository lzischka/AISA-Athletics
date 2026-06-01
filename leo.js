/* ============================================================
   Leo — AISA Lions Athletics Chat Assistant
   ============================================================
   A lightweight FAQ-style assistant that answers questions about
   AISA Athletics using a keyword-matched knowledge base.
   Drops itself into any page that loads this script.
============================================================ */
(function () {
  'use strict';
  if (window.__leoLoaded) return;
  window.__leoLoaded = true;

  /* ---------- Knowledge base ---------- */
  const KB = [
    { id: 'greet',
      kw: ['hi','hello','hey','hola','greetings','sup','yo'],
      a: "Hi there! I'm Leo, your AISA Lions Athletics assistant. Ask me about our conferences, sports, seasons, team levels, or eligibility — or pick a quick topic below. 🦁" },

    { id: 'mission',
      kw: ['mission','purpose','about','why','philosophy','goal','aim','vision'],
      a: "AISA Athletics complements the school's academic mission by teaching life skills through competitive sport. Our six core values are <b>Teamwork, Resilience, Excellence, Global Citizenship, Student-First, and Sportsmanship</b>. Academics always come first." },

    { id: 'conferences',
      kw: ['conference','conferences','league','leagues'],
      a: "AISA competes in <b>4 conferences</b>: <b>GAAC</b> (Gulf regional, Varsity only), <b>ISAC</b> (Abu Dhabi local, MS/JV/V), <b>EAC</b> (UAE-wide Middle School), and <b>JEAC</b> (UAE Elementary jamborees). Want details on any one of them?" },

    { id: 'gaac',
      kw: ['gaac','gulf athletics','gulf conference','regional','championship','jordan','doha','qatar','kuwait','bahrain','riyadh'],
      a: "<b>GAAC</b> = Gulf Athletics &amp; Activities Conference. Founded 2024. Levels: <b>Varsity only</b>. <b>10 member schools</b> across UAE, Qatar, Kuwait, Bahrain, and Saudi Arabia — including AISA Lions &amp; DAS Eagles as new additions. Annual championship tournaments. Sports: Volleyball, Swimming, Soccer, Basketball, Badminton, Track &amp; Field, and Academic Games." },

    { id: 'isac',
      kw: ['isac','abu dhabi local','local league'],
      a: "<b>ISAC</b> = International Schools Activities Conference. Founded 2024. <b>4 schools</b>: AISA Lions, CIS Grizzlies, DAS Eagles, GAA Wildcats. Levels: MS, JV, Varsity. Format: home/away league + playoffs. Local — minimal travel." },

    { id: 'eac',
      kw: ['eac','emirates athletics','middle school league','deac'],
      a: "<b>EAC</b> = Emirates Athletics Conference. Middle School only (Grades 6-8). <b>6 UAE schools</b>: AISA, ACS Abu Dhabi, ASD Dubai, DAA, DAS, GAA. Format: 5-game league + 4-team final. A development league (<b>DEAC</b>) runs alongside for less-experienced athletes." },

    { id: 'jeac',
      kw: ['jeac','elementary','grade 4','grade 5','grade 6','jamboree','junior emirates'],
      a: "<b>JEAC</b> = Junior Emirates Athletics Conference. Elementary level (Grades 4-6). Same 6 schools as EAC. Jamboree format — <b>no awards</b>. One sport per season: Soccer (Autumn), Track &amp; Field (Winter), Basketball (Spring). Focus is fun, fundamentals, and sportsmanship." },

    { id: 'levels',
      kw: ['level','levels','varsity','jv','junior varsity','middle school','team structure'],
      a: "AISA fields teams at <b>4 competitive levels</b>:<br>• <b>Varsity</b> (Grades 9-12) — GAAC + ISAC, international travel<br>• <b>Junior Varsity</b> (Under-16 before Sept 1) — ISAC<br>• <b>Middle School</b> (Grades 6-8) — split into <b>Blue</b> (EAC + ISAC) &amp; <b>Yellow</b> (DEAC) teams<br>• <b>CUBS / Elementary</b> (Grades 4-6) — JEAC jamborees, our Young Lions" },

    { id: 'blueyellow',
      kw: ['blue team','yellow team','blue','yellow','ms team','deac','development team'],
      a: "AISA MS teams are split into two squads:<br>• 🔵 <b>Blue Team</b> — competition-focused for more skilled athletes, competes in <b>EAC</b> &amp; <b>ISAC</b><br>• 🟡 <b>Yellow Team</b> — development-focused for athletes building their skills, competes in <b>DEAC</b> (Development EAC)" },

    { id: 'cubs',
      kw: ['cubs','young lions','elementary','jeac','cub','cubs team'],
      a: "At AISA, all JEAC (Junior Emirates Athletics Conference) teams are known as the <b>CUBS — our Young Lions</b> 🦁. The CUBS program is for Grades 4–6. JEAC events are jamborees with no awards — the focus is fun, fundamentals, and the Lion Way." },

    { id: 'autumn',
      kw: ['autumn','fall','season 1','september','october','november','volleyball','swim','swimming'],
      a: "<b>Autumn season</b> runs September–November. Sports: <b>Volleyball</b> (all levels, headline sport), <b>Swimming</b> (invitational at all levels), <b>JEAC Soccer</b> (elementary), and the <b>GAAC Leadership Conference</b>. Varsity Volleyball Championship is in mid-November." },

    { id: 'winter',
      kw: ['winter','season 2','december','january','february','basketball','soccer','cross country','football','band','choir'],
      a: "<b>Winter season</b> runs late November–early February. Sports: <b>Basketball</b> &amp; <b>Soccer</b> (all levels), <b>Cross Country</b> (EAC MS only, 3km), <b>JEAC Track &amp; Field</b> (elementary), and the <b>GAAC Band &amp; Choir Festival</b>. GAAC championships in mid-February." },

    { id: 'spring',
      kw: ['spring','season 3','march','april','may','badminton','track','academic games','field'],
      a: "<b>Spring season</b> runs February–late May. Sports: <b>Badminton</b> (all levels, Yonex Mavis 350 shuttle), <b>Track &amp; Field</b> (GAAC meet, international), <b>JEAC Basketball</b> (elementary), and the <b>GAAC Academic Games</b> — 7 Olympiads including Quiz Bowl, Math, and Fine Arts." },

    { id: 'volleyball',
      kw: ['volleyball','volley'],
      a: "<b>Volleyball</b> is the headline Autumn sport. AISA fields teams at every competitive level. Played by FIVB rules with GAAC-specific net heights for each level. MS/JV play ISAC + EAC; Varsity plays the GAAC championship." },

    { id: 'basketball',
      kw: ['basketball','hoops','bball'],
      a: "<b>Basketball</b> is the marquee Winter sport — every level. Played by FIBA rules. Quarters are 4×8 min at EAC MS and 4×7 min at GAAC. A 20-point lead triggers running clock or half-court defense to keep games balanced." },

    { id: 'soccer',
      kw: ['soccer','football'],
      a: "<b>Soccer</b> runs in Winter. FIFA rules, 2×25-min halves, unlimited substitutions. EAC MS plays 8-a-side; ISAC and GAAC play 7v7 girls and 11v11 boys at JV/V. Mercy rule caps goal differential at +5 per match." },

    { id: 'badminton',
      kw: ['badminton','shuttle','shuttlecock'],
      a: "<b>Badminton</b> is one of the largest Spring programs at AISA — every level. Singles seeds (SB1-SB4 / SG1-SG4) and doubles (BD1, BD2, GD1, GD2). The official shuttle is the Yonex Mavis 350 blue cap. Tournaments are 2-3 days, round-robin into seeded playoffs." },

    { id: 'track',
      kw: ['track','field','running','sprint','relay','high jump','long jump','discus','shot put'],
      a: "<b>Track &amp; Field</b> is run by World Athletics rules. The GAAC meet is held annually in <b>Jordan</b> — a 2-day event with sprints, distance, hurdles, relays, jumps, shot put, and discus. Each athlete may enter up to 5 events. EAC MS T&amp;F is a one-afternoon meet." },

    { id: 'swim',
      kw: ['swim','swimming','pool','fina'],
      a: "<b>Swimming</b> runs as an Invitational at all 3 high school conferences in Autumn. Follows FINA rules. AISA swimmers may enter up to 4 individual events and 2 relays per meet." },

    { id: 'crosscountry',
      kw: ['cross country','xc','3k','3km','distance running'],
      a: "<b>Cross Country</b> runs in Winter for EAC Middle School only — a 3km course with team scoring based on the top four finishers. JV and Varsity races are organized informally on the same days." },

    { id: 'academic',
      kw: ['academic','quiz','math','olympiad','spelling','geography','science','quiz bowl'],
      a: "The <b>GAAC Academic Games</b> are a Core (non-athletic) Spring event. Schools field up to two 4-student teams across <b>7 Olympiads</b>: Quiz Bowl, Current Events, Geography, Spelling, Science/Engineering, Math, and Fine Arts &amp; Music. JV and Varsity champions receive plaques." },

    { id: 'eligibility',
      kw: ['eligibility','requirements','sign up','register','join','tryout','tryouts','fee','medical','physical','consent','gpa'],
      a: "To participate in AISA Athletics each season, athletes must:<br>• Maintain the minimum <b>GPA</b><br>• Have a current annual <b>physical exam</b> on file<br>• Submit a signed <b>parent/guardian consent</b> form<br>• Pay the per-season <b>athletics fee</b> (financial assistance is available)" },

    { id: 'schools',
      kw: ['member schools','schools','rivals','opponents','who do we play'],
      a: "AISA plays a wide network of American-curriculum schools. Highlights: <b>GAAC</b>: AISA, DAS, GIS, ACS Qatar, ISL Qatar, GAAQ, AUS, UAS, ASB, AISR. <b>ISAC</b>: AISA, CIS, DAS, GAA. <b>EAC/JEAC</b>: AISA, ACS, ASD Dubai, DAA, DAS, GAA." },

    { id: 'aisa',
      kw: ['aisa','american international','abu dhabi','lions','where','address','location','rabdan','pepsi','embassy'],
      a: "AISA is the <b>American International School of Abu Dhabi</b>, home of the <b>Lions</b> 🦁 (yellow &amp; blue). We're located on <b>29th Street (Rabdan Street)</b>, near the Airport Road and Baghdad Street intersection in the Al Aman/Embassy Area of Abu Dhabi — opposite the Pepsi-Cola Plant. AISA athletes compete at all 4 levels across all 4 conferences." },

    { id: 'lionway',
      kw: ['lion way','responsible','safe','respectful','kind','code','values','character'],
      a: "The <b>Lion Way</b> is the character code every AISA athlete lives by:<br>• 🦁 <b>Be Responsible</b> — Show up prepared, own your performance<br>• 🛡️ <b>Be Safe</b> — Respect your body and the rules<br>• 🤝 <b>Be Respectful</b> — Honor opponents, officials, coaches, and the game<br>• ❤️ <b>Be Kind</b> — Lead with compassion, lift others up" },

    { id: 'wooden',
      kw: ['wooden','john wooden','pyramid','philosophy','coaching','success','character','preparation','effort'],
      a: "<b>John Wooden</b>'s philosophy is at the heart of AISA's coaching approach. He defined success as <em>\"peace of mind from knowing you made the effort to become the best you are capable of.\"</em> AISA coaches use his <b>Pyramid of Success</b> — prioritizing character, preparation, industriousness, and team spirit — rather than measuring success purely by wins. Be more concerned with your <b>character</b> than your reputation." },

    { id: 'travel',
      kw: ['travel','trip','away','flight','passport'],
      a: "Travel varies by level: <b>Varsity</b> athletes travel internationally for GAAC tournaments (UAE, Qatar, Kuwait, Bahrain, Saudi Arabia). <b>JV</b> competes locally in ISAC. <b>MS</b> stays within the UAE for EAC. <b>Elementary</b> JEAC events are local jamborees." },

    { id: 'colors',
      kw: ['colors','mascot','lion','school colors'],
      a: "AISA's colors are <b>Yellow &amp; Blue</b>, and our mascot is the <b>Lion</b> 🦁. That's me — go Lions!" },

    { id: 'opportunities',
      kw: ['opportunities','additional','partners','partnership','beyond','extra','programs'],
      a: "Beyond the conference calendar, AISA offers <b>4 signature opportunities</b>: the <b>Jr. NBA Abu Dhabi</b> experience, our partnerships with <b>PASS Football</b> and <b>GameTimeSports</b>, and the <b>ADEK SportsCup</b>. Visit the <b>Opportunities</b> page for details on each!" },

    { id: 'jrnba',
      kw: ['jr nba','jr. nba','junior nba','nba','etihad arena','abu dhabi games'],
      a: "The <b>Jr. NBA Abu Dhabi</b> experience is an annual highlight for AISA basketball. Our student-athletes get NBA-certified coaching, meet current and former NBA players, and participate in skills clinics tied to the NBA Abu Dhabi Games at Etihad Arena. It's the NBA in our backyard." },

    { id: 'pass',
      kw: ['pass football','pass','football academy','uefa'],
      a: "<b>PASS Football</b> is one of AISA's official athletics partners. Their UEFA-licensed coaches deliver year-round football development from elementary through Varsity, complementing our seasonal soccer program with a serious year-round pathway." },

    { id: 'gametime',
      kw: ['gametime','game time','gametimesports','after-school','after school','holiday camp'],
      a: "<b>GameTimeSports</b> is AISA's multi-sport development partner. They run after-school programs, holiday camps, and tournaments across basketball, volleyball, and other core AISA sports — extending our athletes' development beyond the school day." },

    { id: 'adek',
      kw: ['adek','sportscup','sports cup','abu dhabi department','department of education'],
      a: "The <b>ADEK SportsCup</b> is the Abu Dhabi Department of Education and Knowledge's flagship inter-school competition. AISA Lions teams compete against private schools from across the emirate in a wide range of sports — a chance to represent AISA on the broadest Abu Dhabi stage." },

    { id: 'handbook',
      kw: ['handbook','student parent','student-parent','rules','policies','policy','tryout','code of conduct','faq','faqs','document','download','pdf','manual'],
      a: "The <b>AISA Lions Student–Parent Handbook</b> covers everything: tryouts, eligibility, practices, travel, code of conduct, injuries, uniforms, fees, communication, and awards. Visit our <a href='handbook.html'><b>Handbook page</b></a> for quick FAQs by topic, or download the full PDF directly." },

    { id: 'thanks',
      kw: ['thanks','thank you','thx','appreciate'],
      a: "You're welcome! Roar on. 🦁" },
  ];

  const SUGGESTIONS = [
    { label: 'Our mission',     q: 'mission' },
    { label: 'The Lion Way',    q: 'lion way' },
    { label: 'John Wooden',     q: 'wooden' },
    { label: 'Conferences',     q: 'conferences' },
    { label: 'Team levels',     q: 'levels' },
    { label: 'Autumn sports',   q: 'autumn' },
    { label: 'Winter sports',   q: 'winter' },
    { label: 'Spring sports',   q: 'spring' },
    { label: 'Eligibility',     q: 'eligibility' },
    { label: 'Jr. NBA & Partners', q: 'opportunities' },
    { label: 'Handbook & FAQs', q: 'handbook' },
  ];

  /* ---------- Match logic ---------- */
  function match(q) {
    const text = q.toLowerCase().trim();
    if (!text) return null;
    let best = null, bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const k of item.kw) {
        if (text.includes(k)) score += k.length;
      }
      if (score > bestScore) { best = item; bestScore = score; }
    }
    return best;
  }

  function fallback() {
    return "Hmm, I'm not sure about that one. Try asking about <b>conferences</b>, <b>seasons</b> (autumn/winter/spring), a specific <b>sport</b>, <b>team levels</b>, or <b>eligibility</b>. You can also pick a quick topic below.";
  }

  /* ---------- DOM injection ---------- */
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    const wrap = document.createElement('div');
    wrap.id = 'leo-widget';
    wrap.innerHTML = `
      <button id="leo-toggle" aria-label="Open Leo, the AISA Athletics chat assistant" type="button">
        <span class="leo-emoji">🦁</span>
        <span class="leo-toggle-text">Ask Leo</span>
      </button>
      <section id="leo-panel" class="leo-hidden" role="dialog" aria-label="Leo chat">
        <header class="leo-header">
          <span class="leo-emoji leo-avatar" aria-hidden="true">🦁</span>
          <div class="leo-title">
            <strong>Leo</strong>
            <small>AISA Lions Assistant · Online</small>
          </div>
          <button id="leo-close" aria-label="Close chat" type="button">×</button>
        </header>
        <div id="leo-messages" aria-live="polite"></div>
        <div id="leo-suggestions" role="group" aria-label="Quick topic suggestions"></div>
        <form id="leo-form" autocomplete="off">
          <button type="button" id="leo-chips-toggle" aria-label="Quick topic suggestions" title="Quick topics">💡</button>
          <input id="leo-input" type="text" placeholder="Ask Leo a question..." aria-label="Type your question to Leo" />
          <button type="submit" aria-label="Send">➤</button>
        </form>
      </section>
    `;
    document.body.appendChild(wrap);

    const toggle      = document.getElementById('leo-toggle');
    const panel       = document.getElementById('leo-panel');
    const close       = document.getElementById('leo-close');
    const msgs        = document.getElementById('leo-messages');
    const sugg        = document.getElementById('leo-suggestions');
    const form        = document.getElementById('leo-form');
    const input       = document.getElementById('leo-input');
    const chipsToggle = document.getElementById('leo-chips-toggle');

    function bubble(html, who) {
      const div = document.createElement('div');
      div.className = 'leo-msg leo-msg-' + who;
      if (who === 'bot') {
        div.innerHTML = '<span class="leo-emoji leo-msg-avatar">🦁</span><span class="leo-msg-text">' + html + '</span>';
      } else {
        div.innerHTML = '<span class="leo-msg-text">' + escape(html) + '</span>';
      }
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function escape(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

    function answer(q) {
      const hit = match(q);
      const html = hit ? hit.a : fallback();
      setTimeout(() => bubble(html, 'bot'), 280);
    }

    function renderSuggestions() {
      sugg.innerHTML = '';
      SUGGESTIONS.forEach(s => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'leo-chip';
        b.textContent = s.label;
        b.addEventListener('click', () => {
          bubble(s.label, 'user');
          answer(s.q);
        });
        sugg.appendChild(b);
      });
    }

    function open() {
      panel.classList.remove('leo-hidden');
      toggle.classList.add('leo-active');
      if (!msgs.dataset.greeted) {
        bubble("Hi! I'm <b>Leo</b>, the AISA Lions Athletics assistant. 🦁<br>Ask me anything, or tap <b>💡</b> below for quick topic suggestions.", 'bot');
        msgs.dataset.greeted = '1';
      }
      setTimeout(() => input.focus(), 100);
    }
    function shut() {
      panel.classList.add('leo-hidden');
      toggle.classList.remove('leo-active');
      sugg.classList.remove('leo-chips-open');
      chipsToggle.classList.remove('active');
    }

    toggle.addEventListener('click', () => panel.classList.contains('leo-hidden') ? open() : shut());
    close.addEventListener('click', shut);

    chipsToggle.addEventListener('click', () => {
      const isOpen = sugg.classList.toggle('leo-chips-open');
      chipsToggle.classList.toggle('active', isOpen);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      bubble(q, 'user');
      input.value = '';
      sugg.classList.remove('leo-chips-open');
      chipsToggle.classList.remove('active');
      answer(q);
    });

    renderSuggestions();
  });
})();
