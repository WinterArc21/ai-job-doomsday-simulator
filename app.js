/* =============================================
   AI JOB DOOMSDAY SIMULATOR 2027 — app.js
   ============================================= */

'use strict';

// =============================================
// RESEARCH DATA (from research-data.json)
// =============================================
const RESEARCH = {
  jobCategories: {
    ultra_high_risk: {
      survival_range: [5, 25],
      salary_change_range: [-45, -15],
      roles: ["data entry clerk","telemarketer","bookkeeper","tax preparer","legal secretary",
        "administrative assistant","proofreader","copy marker","correspondence clerk",
        "switchboard operator","ticket agent","travel clerk","financial clerk",
        "order filler","stock clerk","receptionist","scheduler","file clerk","billing clerk",
        "payroll clerk","data entry","secretary","typist","word processor"],
      reasoning: "Wave 1 automation targets (Careery 2026). 60-80% task automation already underway."
    },
    high_risk: {
      survival_range: [20, 45],
      salary_change_range: [-30, -5],
      roles: ["customer service representative","customer service","translator","interpreter",
        "content writer","copywriter","journalist","reporter","paralegal",
        "junior accountant","bookkeeping clerk","auditing clerk","market research analyst",
        "sales representative","sales rep","insurance underwriter","retail salesperson",
        "cashier","fast food worker","counter worker","broadcast announcer","radio dj",
        "brokerage clerk","statistical assistant","technical writer","copy editor",
        "claims adjuster","loan officer","teller","bank teller","call center","support agent",
        "content creator","blogger","columnist","editor assistant","research assistant"],
      reasoning: "Wave 2 targets (2025-2027). Microsoft ranks these in top 40 AI-exposed."
    },
    moderate_risk: {
      survival_range: [40, 65],
      salary_change_range: [-15, 10],
      roles: ["software developer","software engineer","web developer","data scientist",
        "data analyst","financial analyst","graphic designer","ui designer","ux designer",
        "product designer","marketing specialist","digital marketer","seo specialist",
        "social media manager","hr specialist","human resources","hr assistant","recruiter",
        "talent acquisition","business analyst","project manager","scrum master",
        "product manager","accountant","auditor","personal financial advisor","management consultant",
        "editor","historian","geographer","archivist","librarian","teacher","professor",
        "lecturer","instructor","trainer","curriculum developer","instructional designer",
        "marketing manager","brand manager","communications manager","pr specialist",
        "public relations","event planner","event coordinator","animator","video editor",
        "game designer","concept artist","illustrator","programmer","developer","coder",
        "full stack","frontend developer","backend developer","mobile developer",
        "ios developer","android developer","qa engineer","test engineer","devops",
        "site reliability","systems analyst","it analyst","database administrator",
        "network administrator","it manager","information technology","finance manager",
        "controller","budget analyst","cost analyst","tax specialist","compliance officer"],
      reasoning: "Complex but partially automatable. WEF: 40% of programming tasks automated by 2040."
    },
    low_risk: {
      survival_range: [60, 82],
      salary_change_range: [0, 20],
      roles: ["nurse","registered nurse","nurse practitioner","physician assistant",
        "physical therapist","occupational therapist","mental health counselor","therapist",
        "social worker","psychologist","speech pathologist","doctor","physician","surgeon",
        "dentist","pharmacist","veterinarian","civil engineer","mechanical engineer",
        "electrical engineer","aerospace engineer","construction manager","architect",
        "urban planner","cybersecurity analyst","ai engineer","machine learning engineer",
        "lawyer","attorney","judge","detective","police officer","firefighter",
        "paramedic","emt","emergency medical","security analyst","information security",
        "network security","systems engineer","cloud engineer","solutions architect",
        "technical lead","engineering manager","research scientist","clinical researcher",
        "epidemiologist","public health","environmental scientist","geologist","biologist",
        "chemist","physicist","mathematician","statistician","economist","social scientist",
        "anthropologist","sociologist"],
      reasoning: "Require physical presence, emotional intelligence, ethical accountability."
    },
    very_low_risk: {
      survival_range: [78, 95],
      salary_change_range: [5, 30],
      roles: ["electrician","plumber","hvac technician","hvac","carpenter","welder",
        "mechanic","auto technician","crane operator","heavy equipment operator",
        "nurse anesthetist","emergency physician","pilot","flight engineer",
        "choreographer","athletic trainer","coach","fitness trainer","personal trainer",
        "chef","head chef","executive chef","sous chef","early childhood educator",
        "daycare worker","childcare","midwife","prosthodontist","oral surgeon",
        "dermatologist","neurologist","psychiatrist","emergency manager","fire chief",
        "pipefitter","ironworker","boilermaker","glazier","roofer","sheet metal worker",
        "concrete finisher","mason","bricklayer","tile setter","flooring installer",
        "painter contractor","grounds maintenance","arborist","landscaper","farmer",
        "agricultural worker","childcare worker","preschool teacher","kindergarten teacher"],
      reasoning: "Physical complexity + human judgment + unpredictable environments."
    }
  },
  skillsByIndustry: {
    Technology: {
      icon: ["🔐","🤖","☁️","🎨","⚙️","📊","🛡️"],
      skills: ["Cybersecurity","AI/ML Operations","Cloud Architecture","Human-AI Interaction Design",
        "DevOps & Infrastructure","AI Ethics & Governance","Systems Design"]
    },
    Finance: {
      icon: ["🧠","📡","🔍","🤝","📈","⚖️","🔒"],
      skills: ["AI-Augmented Decision Making","Strategic Communication","Risk Analysis",
        "Client Relationship Management","Data Storytelling","Regulatory Compliance","Fraud Detection"]
    },
    Healthcare: {
      icon: ["💊","🩺","🤝","🔬","📋","🧬","📱"],
      skills: ["Telemedicine Technology","AI-Assisted Diagnostics","Patient Communication",
        "Specialized Procedures","Research Methodology","Clinical Data Analysis","Digital Health"]
    },
    Education: {
      icon: ["🧠","🎯","🤝","📊","💡","🌍","🎮"],
      skills: ["AI Literacy & Pedagogy","Personalized Learning Design","Emotional Intelligence",
        "Data-Driven Instruction","Creative Problem Solving","Interdisciplinary Teaching","EdTech Mastery"]
    },
    Legal: {
      icon: ["🧠","🔍","⚖️","🤝","📝","🛡️","💼"],
      skills: ["AI Legal Research","Regulatory Technology","Contract Analysis",
        "Ethical Judgment","Strategic Advocacy","Compliance Tech","Domain Expertise"]
    },
    Marketing: {
      icon: ["🎨","📡","🎯","📊","🤝","💡","🌐"],
      skills: ["Brand Strategy & Voice","AI Tool Mastery","Creative Direction",
        "Cultural Insight","Multimedia Production","Data Storytelling","Campaign Analytics"]
    },
    Manufacturing: {
      icon: ["🤖","🔧","📊","🛡️","⚡","🌱","🏭"],
      skills: ["Industrial AI Systems","Advanced Diagnostics","Smart Manufacturing",
        "Quality Control AI","Process Optimization","Renewable Energy Tech","Robotics Oversight"]
    },
    Retail: {
      icon: ["📊","🤝","🌐","📱","🎯","💡","🔍"],
      skills: ["Customer Experience Design","AI-Driven Personalization","Omnichannel Strategy",
        "Supply Chain Optimization","Brand Storytelling","Data Analytics","E-commerce Technology"]
    },
    Government: {
      icon: ["🛡️","📊","🤝","⚖️","💡","🌐","🔒"],
      skills: ["AI Policy & Governance","Digital Services Design","Stakeholder Communication",
        "Ethical AI Implementation","Cybersecurity","Data Analytics","Change Management"]
    },
    Creative: {
      icon: ["🎨","💡","📡","🌍","🎬","🤝","🎯"],
      skills: ["Creative Direction & Vision","AI Tool Mastery","Cultural Insight",
        "Multimedia Production","Experiential Design","Brand Strategy","Audience Development"]
    },
    Construction: {
      icon: ["🏗️","🤖","⚡","📊","🔧","🌱","💼"],
      skills: ["Smart Building Systems","Renewable Energy Tech","Advanced Diagnostics Tools",
        "Project Management","BIM & Digital Twins","Entrepreneurship","Safety Tech"]
    },
    Transportation: {
      icon: ["🚀","📡","🔧","📊","🛡️","🌱","💡"],
      skills: ["Autonomous Systems Oversight","Logistics Optimization","Predictive Maintenance",
        "Fleet Management Tech","Safety & Compliance","Sustainability Tech","Last-Mile Innovation"]
    },
    Other: {
      icon: ["🧠","🤝","📊","💡","🔍","🎯","⚡"],
      skills: ["AI Literacy & Prompt Engineering","Critical Thinking & Analysis","Emotional Intelligence",
        "Creative Problem Solving","Adaptability & Resilience","Data Storytelling","Interdisciplinary Knowledge"]
    }
  },
  expertQuotes: [
    {
      person: "Kai-Fu Lee",
      title: "Chairman, Sinovation Ventures",
      quote: "AI will displace 50% of jobs by 2027. My 2017 prediction has proven uncannily accurate.",
      source: "Fortune Innovation Forum 2024",
      url: "https://fortune.com/2024/05/25/ai-job-displacement-forecast-50-percent-2027-kai-fu-lee-chatgpt-openai/"
    },
    {
      person: "Dario Amodei",
      title: "CEO, Anthropic",
      quote: "AI will disrupt 50% of entry-level white-collar jobs over 1-5 years. It cannot be long before AI outperforms humans in virtually every task.",
      source: "Anthropic Essay 2026",
      url: "https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic"
    },
    {
      person: "Kristalina Georgieva",
      title: "Managing Director, IMF",
      quote: "This is a tsunami hitting labour markets. 40% of the global workforce will be impacted. Entry-level roles are being squeezed first.",
      source: "India AI Impact Summit 2026",
      url: "https://codingscape.com/blog/40-percent-of-global-employment-is-exposed-to-ai-imf-report"
    },
    {
      person: "Jamie Dimon",
      title: "CEO, JPMorgan Chase",
      quote: "Repetitive tasks could be predominantly handled by AI within 15 years.",
      source: "Forbes 2025",
      url: "https://privatebank.jpmorgan.com/apac/en/insights/markets-and-investing/tmt/why-ai-might-strain-the-economy-before-it-booms"
    },
    {
      person: "Sam Altman",
      title: "CEO, OpenAI",
      quote: "I don't know how workers will survive and does anyone else. We need a new economic framework.",
      source: "Tech Conference 2025",
      url: "https://www.vice.com/en/article/openai-research-says-80-of-us-workers-will-have-jobs-impacted-by-gpt/"
    },
    {
      person: "Bill George",
      title: "Former CEO, Medtronic",
      quote: "Starting positions in law firms, brokerage firms, and investment banks are swiftly declining. The pressing question is where young people begin careers.",
      source: "Yahoo Finance Opening Bid 2026",
      url: "https://privatebank.jpmorgan.com/apac/en/insights/markets-and-investing/tmt/why-ai-might-strain-the-economy-before-it-booms"
    },
    {
      person: "Larry Fink",
      title: "CEO, BlackRock",
      quote: "AI will cause a 'reinvention' of white-collar jobs by 2035. We're already enhancing back-office operations.",
      source: "Economic Club of New York 2025",
      url: "https://finance.yahoo.com/news/goldman-sachs-warns-ai-fueled-layoffs-could-raise-the-unemployment-rate-this-year-chart-154251740.html"
    }
  ],
  scenarios: {
    best: {
      name: "The Augmentation Era",
      desc: "AI becomes your superpower. You master AI tools early, your productivity triples, and you become indispensable. Companies compete for humans who can direct AI effectively. Salary rises 20–35%.",
      prob_base: [25, 35]
    },
    likely: {
      name: "The Great Reshuffle",
      desc: "Your current role transforms significantly. 40–60% of tasks get automated, but new responsibilities emerge. You spend 6–12 months upskilling. Salary stays flat or dips 5–10% during transition before recovering.",
      prob_base: [35, 45]
    },
    bad: {
      name: "The Displacement Wave",
      desc: "Your role gets significantly downsized. Companies cut headcount 20–40% in your department. You compete with AI-augmented workers for fewer positions. Forced career pivot within 18 months.",
      prob_base: [15, 25]
    },
    worst: {
      name: "The Obsolescence Cliff",
      desc: "AI fully automates your core functions. Your entire department gets eliminated. Retraining takes 2+ years. Salary drops 30–50% during extended transition. Only 1 in 5 displaced workers returns to equivalent role.",
      prob_base: [5, 15]
    }
  }
};

// =============================================
// JOB AUTOCOMPLETE LIST
// =============================================
const JOB_LIST = [
  // Tech
  "Software Engineer","Software Developer","Full Stack Developer","Frontend Developer",
  "Backend Developer","Mobile Developer","iOS Developer","Android Developer",
  "Data Scientist","Data Analyst","Data Engineer","Machine Learning Engineer",
  "AI Engineer","DevOps Engineer","Cloud Engineer","Solutions Architect",
  "Cybersecurity Analyst","Network Administrator","Systems Administrator",
  "Database Administrator","IT Manager","Product Manager","QA Engineer",
  "UX Designer","UI Designer","Product Designer","Graphic Designer",
  "Web Developer","Game Developer","Site Reliability Engineer",
  // Finance
  "Financial Analyst","Accountant","Bookkeeper","Auditor","Tax Preparer",
  "Financial Advisor","Investment Banker","Portfolio Manager","Risk Analyst",
  "Insurance Underwriter","Loan Officer","Bank Teller","Claims Adjuster",
  "Compliance Officer","Controller","CFO","Budget Analyst","Tax Specialist",
  // Healthcare
  "Nurse","Registered Nurse","Nurse Practitioner","Doctor","Physician","Surgeon",
  "Dentist","Pharmacist","Physical Therapist","Occupational Therapist",
  "Mental Health Counselor","Psychologist","Psychiatrist","Social Worker",
  "Veterinarian","Paramedic","EMT","Radiologist","Pathologist","Neurologist",
  "Dermatologist","Cardiologist","Anesthesiologist","Nurse Anesthetist",
  // Legal & Business
  "Lawyer","Attorney","Paralegal","Legal Secretary","Judge","Compliance Analyst",
  "Management Consultant","Business Analyst","Operations Manager","CEO","COO",
  "Project Manager","Program Manager","Scrum Master","Business Development Manager",
  // Education
  "Teacher","Professor","Lecturer","Curriculum Developer","School Counselor",
  "Instructional Designer","Librarian","Tutor","Early Childhood Educator",
  // Marketing & Creative
  "Marketing Manager","Digital Marketer","SEO Specialist","Social Media Manager",
  "Content Writer","Copywriter","Journalist","Reporter","Editor","Translator",
  "Graphic Designer","Animator","Video Editor","Photographer","Art Director",
  "Brand Manager","Communications Manager","PR Specialist","Event Planner",
  // Sales & CS
  "Sales Representative","Account Executive","Account Manager","Sales Manager",
  "Customer Service Representative","Call Center Agent","Retail Salesperson","Cashier",
  // Trades & Physical
  "Electrician","Plumber","HVAC Technician","Carpenter","Welder","Mechanic",
  "Auto Technician","Crane Operator","Pilot","Chef","Head Chef","Sous Chef",
  "Construction Manager","Architect","Civil Engineer","Mechanical Engineer",
  "Electrical Engineer","Structural Engineer","Urban Planner",
  // Admin
  "Administrative Assistant","Executive Assistant","Office Manager","Receptionist",
  "Data Entry Clerk","Scheduler","Procurement Specialist","Logistics Coordinator",
  // Other
  "Research Scientist","Epidemiologist","Environmental Scientist","Economist",
  "Human Resources Manager","HR Specialist","Recruiter","Talent Acquisition",
  "Supply Chain Manager","Operations Analyst","Financial Planner","Coach",
  "Fitness Trainer","Athletic Trainer","Choreographer","Interior Designer",
  "Fashion Designer","Landscape Architect","Technical Writer","Market Research Analyst"
];

// =============================================
// STATE
// =============================================
let currentPage = 'landing';
let analysisResult = null;
let leaderboardData = [];
let userLeaderboardEntry = null;

// =============================================
// PAGE NAVIGATION
// =============================================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageMap = {
    landing: 'landing',
    form: 'form-page',
    loading: 'loading-page',
    results: 'results-page',
    leaderboard: 'leaderboard-page'
  };
  const el = document.getElementById(pageMap[page]);
  if (el) {
    el.classList.add('active');
    currentPage = page;
    window.scrollTo(0, 0);
  }
  if (page === 'leaderboard') renderLeaderboard('all');
}

// =============================================
// MATRIX RAIN CANVAS
// =============================================
function initMatrix() {
  const canvas = document.getElementById('matrixBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ#@!%$&01";
  const fontSize = 14;
  let cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px Share Tech Mono, monospace`;

    cols = Math.floor(canvas.width / fontSize);
    while (drops.length < cols) drops.push(1);

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#00d4ff' :
                      Math.random() > 0.9 ? '#ffb000' : '#00ff41';
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

// =============================================
// TYPING ANIMATION
// =============================================
function typeText(el, text, speed = 50) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// =============================================
// JOB AUTOCOMPLETE
// =============================================
function filterJobs(val) {
  const dropdown = document.getElementById('jobDropdown');
  if (!val || val.length < 2) {
    dropdown.classList.add('hidden');
    return;
  }

  const lower = val.toLowerCase();
  const matches = JOB_LIST.filter(j => j.toLowerCase().includes(lower)).slice(0, 12);

  if (matches.length === 0) {
    dropdown.classList.add('hidden');
    return;
  }

  dropdown.innerHTML = '';
  matches.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-option';
    div.textContent = job;
    div.onclick = () => {
      document.getElementById('jobTitle').value = job;
      dropdown.classList.add('hidden');
    };
    dropdown.appendChild(div);
  });
  dropdown.classList.remove('hidden');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.input-wrapper') && !e.target.closest('.job-dropdown')) {
    const dd = document.getElementById('jobDropdown');
    if (dd) dd.classList.add('hidden');
  }
});

function updateSlider(el) {
  const display = document.getElementById('expDisplay');
  display.textContent = el.value >= 30 ? '30+' : el.value;
  // Update slider fill color
  const pct = (el.value / 30) * 100;
  el.style.background = `linear-gradient(90deg, var(--green) ${pct}%, var(--border-bright) ${pct}%)`;
}

// =============================================
// JOB MATCHING ALGORITHM
// =============================================
function matchJobCategory(jobTitle) {
  const lower = jobTitle.toLowerCase().trim();

  // Try exact/partial match in each category
  const categories = ['very_low_risk', 'low_risk', 'moderate_risk', 'high_risk', 'ultra_high_risk'];
  for (const cat of categories) {
    const roles = RESEARCH.jobCategories[cat].roles;
    for (const role of roles) {
      if (lower.includes(role) || role.includes(lower)) {
        return cat;
      }
    }
  }

  // Keyword fallback matching
  const keywords = {
    ultra_high_risk: ['data entry','bookkeep','clerk','receptionist','telemarket','secretary',
      'typist','scheduler','filing','billing','payroll','dispatch','reservat'],
    high_risk: ['customer service','call center','writer','journalist','report','translator',
      'paralegal','sales rep','cashier','teller','copywriter','content','support agent',
      'research analyst','underwriter','adjuster','announcer','dj','statistician'],
    moderate_risk: ['software','developer','engineer','designer','analyst','manager','marketer',
      'product','seo','social media','hr','human resource','recruit','consultant',
      'accountant','auditor','editor','teacher','professor','instructor','programmer',
      'devops','it ','information tech','finance','librarian','archivist','historian'],
    low_risk: ['nurse','doctor','physician','surgeon','dentist','pharmacist','therapist',
      'counselor','social work','psycholog','lawyer','attorney','detective','police',
      'firefighter','paramedic','architect','civil eng','mechanical eng','electrical eng',
      'cybersecurity','security analyst','veterinarian','scientist','epidemiol'],
    very_low_risk: ['electrician','plumber','hvac','carpenter','welder','mechanic',
      'pilot','chef','cook','childcare','daycare','preschool','kindergarten',
      'anesthes','coach','trainer','choreograph','heavy equip','crane op']
  };

  for (const [cat, kws] of Object.entries(keywords)) {
    for (const kw of kws) {
      if (lower.includes(kw)) return cat;
    }
  }

  // Default fallback
  return 'moderate_risk';
}

// =============================================
// CALCULATE SURVIVAL SCORE
// =============================================
function calculateSurvival(jobTitle, experience, industry, seniority, aiUsage) {
  const cat = matchJobCategory(jobTitle);
  const catData = RESEARCH.jobCategories[cat];
  const [minScore, maxScore] = catData.survival_range;
  const [minSalary, maxSalary] = catData.salary_change_range;

  // Base score — midpoint of range with slight variance
  const baseScore = (minScore + maxScore) / 2;

  // Experience modifier
  const expNum = parseInt(experience) || 0;
  let expMod = 0;
  if (expNum <= 2) expMod = -10;
  else if (expNum <= 5) expMod = -5;
  else if (expNum <= 10) expMod = 0;
  else if (expNum <= 20) expMod = 5;
  else expMod = 10;

  // AI Usage modifier
  const aiMods = { never: -10, occasionally: -3, regularly: 5, daily: 10 };
  const aiMod = aiMods[aiUsage] || 0;

  // Seniority modifier
  const senMods = { entry: -8, mid: 0, senior: 5, executive: 8 };
  const senMod = senMods[seniority] || 0;

  // Random variance ±3%
  const variance = (Math.random() * 6) - 3;

  const rawScore = baseScore + expMod + aiMod + senMod + variance;
  const score = Math.max(3, Math.min(97, Math.round(rawScore)));

  // Salary projection
  const baseSalaryMid = (minSalary + maxSalary) / 2;
  const salaryBest = Math.min(40, maxSalary + (aiMod > 0 ? 8 : 0) + (expMod > 0 ? 5 : 0));
  const salaryWorst = Math.max(-55, minSalary - (aiMod < 0 ? 5 : 0));

  // Threat level label
  let threatLevel, threatColor;
  if (score < 20) { threatLevel = 'EXTINCTION LEVEL'; threatColor = '#ff0040'; }
  else if (score < 35) { threatLevel = 'CRITICAL THREAT'; threatColor = '#ff0040'; }
  else if (score < 50) { threatLevel = 'HIGH THREAT'; threatColor = '#ff6633'; }
  else if (score < 65) { threatLevel = 'MODERATE RISK'; threatColor = '#ffb000'; }
  else if (score < 80) { threatLevel = 'LOW RISK'; threatColor = '#00ff41'; }
  else { threatLevel = 'HIGHLY RESILIENT'; threatColor = '#00d4ff'; }

  // Determine primary wave impact
  let waveImpact;
  if (cat === 'ultra_high_risk') waveImpact = 'Wave 1 (2023–2025): ALREADY IN PROGRESS';
  else if (cat === 'high_risk') waveImpact = 'Wave 2 (2025–2027): PEAK DISRUPTION NOW';
  else if (cat === 'moderate_risk') waveImpact = 'Wave 2–3 (2026–2028): TRANSITION PERIOD';
  else if (cat === 'low_risk') waveImpact = 'Wave 3 (2027–2030): LONG-TERM ADAPTATION';
  else waveImpact = 'Post-2030: STRONG RESILIENCE THROUGH AI ERA';

  // Verdict text
  let verdict;
  if (score < 25) {
    verdict = `Your role faces EXTINCTION-LEVEL threat. AI will automate ${100 - score}% of your core functions by 2027. Immediate reskilling is critical.`;
  } else if (score < 40) {
    verdict = `CRITICAL exposure detected. Your role is in Wave ${cat === 'ultra_high_risk' ? '1' : '2'} of AI disruption. Proactive adaptation is non-negotiable.`;
  } else if (score < 55) {
    verdict = `HIGH disruption risk. Your role will transform significantly by 2027. AI will automate many tasks, but human oversight remains essential.`;
  } else if (score < 70) {
    verdict = `MODERATE threat level. Your role faces AI augmentation more than replacement. Workers who master AI tools will gain a significant edge.`;
  } else if (score < 85) {
    verdict = `LOW risk profile. Your role's complexity and human requirements provide strong protection. AI will augment rather than replace your skills.`;
  } else {
    verdict = `HIGHLY RESILIENT. Your role has strong natural defenses against AI automation. Physical complexity and human judgment make you irreplaceable.`;
  }

  // Scenario probabilities (adjusted)
  let bestProb, likelyProb, badProb, worstProb;
  if (score >= 70) {
    bestProb = 40; likelyProb = 40; badProb = 14; worstProb = 6;
  } else if (score >= 50) {
    bestProb = 30; likelyProb = 42; badProb = 20; worstProb = 8;
  } else if (score >= 30) {
    bestProb = 20; likelyProb = 38; badProb = 28; worstProb = 14;
  } else {
    bestProb = 10; likelyProb = 30; badProb = 36; worstProb = 24;
  }

  // Adjust for AI usage
  if (aiUsage === 'daily') { bestProb += 8; likelyProb -= 2; badProb -= 4; worstProb -= 2; }
  else if (aiUsage === 'never') { bestProb -= 8; likelyProb -= 4; badProb += 6; worstProb += 6; }

  // Normalize to ~100
  const total = bestProb + likelyProb + badProb + worstProb;
  bestProb = Math.round(bestProb / total * 100);
  likelyProb = Math.round(likelyProb / total * 100);
  badProb = Math.round(badProb / total * 100);
  worstProb = 100 - bestProb - likelyProb - badProb;

  return {
    score,
    category: cat,
    threatLevel,
    threatColor,
    verdict,
    waveImpact,
    salaryBest: Math.round(salaryBest),
    salaryWorst: Math.round(salaryWorst),
    scenarios: { bestProb, likelyProb, badProb, worstProb },
    mostLikely: Math.max(bestProb, likelyProb, badProb, worstProb)
  };
}

// =============================================
// LOADING SEQUENCE
// =============================================
function runLoadingSequence(callback) {
  showPage('loading');

  const messages = ['msg0','msg1','msg2','msg3','msg4','msg5','msg6','msg7'];
  const bar = document.getElementById('loadingBar');
  const pct = document.getElementById('loadingPercent');
  let currentMsg = 0;
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';

    const msgIndex = Math.floor(progress / (100 / messages.length));
    if (msgIndex !== currentMsg && msgIndex < messages.length) {
      // Mark previous as done
      if (currentMsg < messages.length) {
        const prev = document.getElementById(messages[currentMsg]);
        if (prev) {
          prev.classList.remove('active');
          prev.classList.add('done');
        }
      }
      currentMsg = msgIndex;
      const cur = document.getElementById(messages[currentMsg]);
      if (cur) cur.classList.add('active');
    }

    if (progress >= 100) {
      clearInterval(interval);
      // Activate last message
      const last = document.getElementById('msg7');
      if (last) last.classList.add('active');
      setTimeout(callback, 800);
    }
  }, 80);
}

// =============================================
// RUN ANALYSIS
// =============================================
function runAnalysis() {
  const jobTitle = document.getElementById('jobTitle').value.trim();
  const experience = document.getElementById('experience').value;
  const industry = document.getElementById('industry').value;
  const seniority = document.querySelector('input[name="seniority"]:checked')?.value || 'mid';
  const aiUsage = document.querySelector('input[name="aiUsage"]:checked')?.value || 'occasionally';

  if (!jobTitle) {
    alert('Please enter your job title to proceed.');
    return;
  }

  // Reset loading bar
  const bar = document.getElementById('loadingBar');
  const pct = document.getElementById('loadingPercent');
  bar.style.width = '0%';
  pct.textContent = '0%';
  document.querySelectorAll('.load-msg').forEach(m => {
    m.classList.remove('active', 'done');
  });

  // Calculate result
  analysisResult = calculateSurvival(jobTitle, experience, industry, seniority, aiUsage);
  analysisResult.jobTitle = jobTitle;
  analysisResult.industry = industry;
  analysisResult.experience = experience;
  analysisResult.seniority = seniority;
  analysisResult.aiUsage = aiUsage;

  // Add to leaderboard
  addToLeaderboard(analysisResult);

  // Show loading then results
  runLoadingSequence(() => {
    buildResults(analysisResult);
    showPage('results');
    animateResults();
  });
}

// =============================================
// BUILD RESULTS PAGE
// =============================================
function buildResults(r) {
  // Header
  document.getElementById('resultsSubject').textContent =
    `THREAT ANALYSIS: ${r.jobTitle.toUpperCase()} — ${r.industry || 'UNSPECIFIED SECTOR'}`;
  document.getElementById('resultsTimestamp').textContent =
    `GENERATED: ${new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })} EST`;

  // Section A: Gauge & Verdict
  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeNumber = document.getElementById('gaugeNumber');
  const threatBadge = document.getElementById('threatBadge');
  const threatFill = document.getElementById('threatFill');
  const survivalVerdict = document.getElementById('survivalVerdict');

  // Set gauge color
  const gaugeColor = r.score < 35 ? '#ff0040' :
                     r.score < 55 ? '#ff6633' :
                     r.score < 70 ? '#ffb000' : '#00ff41';
  gaugeFill.setAttribute('stroke', gaugeColor);
  gaugeNumber.style.fill = gaugeColor;

  // Threat badge styling
  threatBadge.textContent = r.threatLevel;
  threatBadge.style.borderColor = r.threatColor;
  threatBadge.style.color = r.threatColor;

  // Threat meter: invert (high score = low threat meter fill)
  const threatPct = (100 - r.score);
  threatFill.style.width = '0%';

  survivalVerdict.textContent = r.verdict;

  // Section C: Salary data
  document.getElementById('bestSalaryPct').textContent =
    (r.salaryBest > 0 ? '+' : '') + r.salaryBest + '%';
  document.getElementById('worstSalaryPct').textContent =
    (r.salaryWorst > 0 ? '+' : '') + r.salaryWorst + '%';

  // Section D: Futures
  buildFutures(r);

  // Section E: Skills
  buildSkills(r);

  // Section F: Quotes
  buildQuotes();

  // Section G: Big picture (static, pre-built in HTML)

  // Share card
  buildShareCard(r);

  // Store data for salary chart
  window._salaryData = { best: r.salaryBest, worst: r.salaryWorst, score: r.score };
}

function buildFutures(r) {
  const grid = document.getElementById('futuresGrid');
  const { bestProb, likelyProb, badProb, worstProb } = r.scenarios;
  const sc = RESEARCH.scenarios;

  // Determine most likely index
  const probs = [bestProb, likelyProb, badProb, worstProb];
  const maxProb = Math.max(...probs);

  const futures = [
    { key: 'best', prob: bestProb, cls: 'future-best', nameColor: '#00ff41' },
    { key: 'likely', prob: likelyProb, cls: '', nameColor: '#ffb000' },
    { key: 'bad', prob: badProb, cls: '', nameColor: '#ff8855' },
    { key: 'worst', prob: worstProb, cls: 'future-worst', nameColor: '#ff0040' }
  ];

  grid.innerHTML = futures.map(f => {
    const scenario = sc[f.key];
    const isTop = f.prob === maxProb;
    return `
      <div class="future-card ${f.cls} ${isTop ? 'most-likely' : ''}">
        <div class="future-name" style="color:${f.nameColor}">${scenario.name}</div>
        <div class="future-prob" style="color:${f.nameColor}">${f.prob}%</div>
        <div class="future-desc">${scenario.desc}</div>
      </div>
    `;
  }).join('');
}

function buildSkills(r) {
  const grid = document.getElementById('skillsGrid');
  const industry = r.industry || 'Other';
  const industryData = RESEARCH.skillsByIndustry[industry] || RESEARCH.skillsByIndustry.Other;

  const priorities = ['CRITICAL','CRITICAL','HIGH','HIGH','RECOMMENDED','RECOMMENDED','RECOMMENDED','RECOMMENDED'];
  const priorityClass = { CRITICAL: 'priority-critical', HIGH: 'priority-high', RECOMMENDED: 'priority-recommended' };

  const skillDescriptions = {
    "AI Literacy & Prompt Engineering": "Master prompting, AI workflows, and tool chains. 56% wage premium for AI-skilled workers (PwC).",
    "Critical Thinking & Analysis": "AI can generate — humans must evaluate. Complex judgment remains a human advantage.",
    "Emotional Intelligence": "Empathy, social skills, and relationship-building — skills AI cannot replicate.",
    "Creative Problem Solving": "Novel thinking and creative synthesis across domains remain uniquely human.",
    "Adaptability & Resilience": "The #1 skill for navigating rapid change in the AI era.",
    "Data Storytelling": "Transform AI-generated data into compelling narratives and actionable insights.",
    "Cybersecurity": "As AI expands attack surfaces, security expertise becomes mission-critical.",
    "AI/ML Operations": "Manage, deploy, and maintain AI systems in production environments.",
    "Cloud Architecture": "AI runs in the cloud — cloud expertise is foundational for the AI economy.",
    "Human-AI Interaction Design": "Design systems where humans and AI collaborate effectively.",
    "AI Ethics & Governance": "Organizations need humans to set guardrails and ensure responsible AI use.",
    "Systems Design": "High-level architecture and systems thinking remain beyond AI's current scope.",
    "DevOps & Infrastructure": "The backbone of AI deployment — high demand, hard to automate.",
    "AI-Augmented Decision Making": "Use AI as a co-pilot for strategic decisions while retaining final authority.",
    "Strategic Communication": "Translate complex AI insights into human language for stakeholders.",
    "Change Management": "Lead organizations through AI-driven transformation effectively.",
    "Process Optimization": "Identify which processes to automate and how to redesign workflows.",
    "Domain Expertise Deepening": "Deep subject matter expertise + AI tools = irreplaceable combination.",
    "Client Relationship Management": "Human trust and relationships remain essential in high-stakes contexts.",
    "Brand Strategy & Voice": "Define the authentic human story that AI cannot generate.",
    "Creative Direction": "AI needs human creative vision to produce meaningful work.",
    "AI Tool Mastery": "Leverage AI tools to multiply your creative output 10x.",
    "Cultural Insight": "Deep cultural understanding informs content that resonates authentically.",
    "Multimedia Production": "Direct, orchestrate, and curate across AI-generated media channels.",
    "Experiential Design": "Create physical and digital experiences that AI cannot fully replicate.",
    "Telemedicine Technology": "Digital health platforms expanding access to care — high demand.",
    "AI-Assisted Diagnostics": "Partner with AI diagnostic tools while applying clinical judgment.",
    "Patient Communication": "Empathy, trust, and communication in healthcare remain deeply human.",
    "Specialized Procedures": "Hands-on clinical skills cannot be automated — high value.",
    "Research Methodology": "Design and validate studies that AI cannot do independently.",
    "Smart Building Systems": "IoT, sensors, and automation in modern construction — growing field.",
    "Renewable Energy Tech": "Green transition creates massive demand for skilled trades workers.",
    "Advanced Diagnostics Tools": "AI diagnostic systems require human interpretation and application.",
    "Project Management": "Complex project coordination requires human leadership and judgment.",
    "Entrepreneurship": "Build your own AI-powered business — the ultimate resilience strategy.",
    "Interdisciplinary Knowledge": "Broad knowledge enables you to connect dots AI cannot see.",
    "Logistics Optimization": "AI-augmented supply chain management — humans direct the strategy.",
    "Regulatory Compliance": "Regulations require human accountability — cannot be delegated to AI.",
    "Risk Analysis": "Holistic risk assessment combining data and judgment remains human.",
    "Autonomous Systems Oversight": "Monitor and manage AI-driven transportation systems.",
  };

  const skills = industryData.skills;
  const icons = industryData.icon;

  grid.innerHTML = skills.slice(0, 8).map((skill, i) => {
    const priority = priorities[i] || 'RECOMMENDED';
    const icon = icons[i] || '💡';
    const desc = skillDescriptions[skill] || `Essential skill for navigating the AI era in ${industry}. High demand projected through 2030.`;
    return `
      <div class="skill-card">
        <span class="skill-priority ${priorityClass[priority]}">${priority}</span>
        <div class="skill-icon">${icon}</div>
        <div class="skill-name">${skill}</div>
        <div class="skill-desc">${desc}</div>
      </div>
    `;
  }).join('');
}

function buildQuotes() {
  const grid = document.getElementById('quotesGrid');
  // Pick 3 random quotes
  const shuffled = [...RESEARCH.expertQuotes].sort(() => Math.random() - 0.5).slice(0, 3);

  grid.innerHTML = shuffled.map(q => `
    <div class="quote-card">
      <div class="quote-text">"${q.quote}"</div>
      <div class="quote-attr">
        <span class="person">${q.person}</span>
        <span class="title-text"> — ${q.title}</span>
        <br>
        <span class="source-text">Source: <a href="${q.url}" target="_blank" rel="noopener noreferrer">${q.source}</a></span>
      </div>
    </div>
  `).join('');
}

function buildShareCard(r) {
  const seniorityLabel = { entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior', executive: 'Executive' };
  const aiLabel = { never: 'Never', occasionally: 'Occasionally', regularly: 'Regularly', daily: 'Daily Power User' };

  const scenarioProbs = r.scenarios;
  const maxProb = Math.max(scenarioProbs.bestProb, scenarioProbs.likelyProb, scenarioProbs.badProb, scenarioProbs.worstProb);
  let likelyScenario;
  if (maxProb === scenarioProbs.bestProb) likelyScenario = 'The Augmentation Era';
  else if (maxProb === scenarioProbs.likelyProb) likelyScenario = 'The Great Reshuffle';
  else if (maxProb === scenarioProbs.badProb) likelyScenario = 'The Displacement Wave';
  else likelyScenario = 'The Obsolescence Cliff';

  const industry = r.industry || 'General';
  const topSkills = (RESEARCH.skillsByIndustry[industry] || RESEARCH.skillsByIndustry.Other).skills.slice(0, 3).join(', ');

  const shareText = `🤖 My AI Doomsday Score: ${r.score}% survival as a ${r.jobTitle}
📊 Threat Level: ${r.threatLevel}
🎯 Most Likely Scenario: ${likelyScenario} (${maxProb}%)
🛠️ Top Skills to Learn: ${topSkills}

Simulated using the AI Job Doomsday Simulator 2027 — based on data from WEF, Goldman Sachs, OpenAI & more.`;

  document.getElementById('shareContent').textContent = shareText;
  window._shareText = shareText;
}

// =============================================
// SALARY CHART (Canvas-based)
// =============================================
function drawSalaryChart(best, worst) {
  const canvas = document.getElementById('salaryChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 700;
  const H = 280;
  canvas.width = W;
  canvas.height = H;

  const years = [2024, 2025, 2026, 2027, 2028];
  const padL = 60, padR = 30, padT = 30, padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Best case trajectory: gradual increase reaching `best`
  const bestData = [0, best * 0.2, best * 0.5, best * 0.8, best];
  // Worst case: gradual decrease reaching `worst`
  const worstData = [0, worst * 0.3, worst * 0.65, worst * 0.85, worst];

  const allVals = [...bestData, ...worstData, 0];
  const minVal = Math.min(...allVals) - 5;
  const maxVal = Math.max(...allVals) + 5;
  const valRange = maxVal - minVal;

  function xPos(i) { return padL + (i / (years.length - 1)) * chartW; }
  function yPos(v) { return padT + chartH - ((v - minVal) / valRange) * chartH; }

  // Background
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
  }

  // Zero line
  const zeroY = yPos(0);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padL, zeroY);
  ctx.lineTo(W - padR, zeroY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Shaded area between lines
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(bestData[0]));
  for (let i = 1; i < years.length; i++) ctx.lineTo(xPos(i), yPos(bestData[i]));
  for (let i = years.length - 1; i >= 0; i--) ctx.lineTo(xPos(i), yPos(worstData[i]));
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,176,0,0.06)';
  ctx.fill();

  // Best case line (green)
  ctx.beginPath();
  ctx.strokeStyle = '#00ff41';
  ctx.lineWidth = 2.5;
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#00ff41';
  for (let i = 0; i < years.length; i++) {
    if (i === 0) ctx.moveTo(xPos(i), yPos(bestData[i]));
    else ctx.lineTo(xPos(i), yPos(bestData[i]));
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Worst case line (red)
  ctx.beginPath();
  ctx.strokeStyle = '#ff0040';
  ctx.lineWidth = 2.5;
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#ff0040';
  for (let i = 0; i < years.length; i++) {
    if (i === 0) ctx.moveTo(xPos(i), yPos(worstData[i]));
    else ctx.lineTo(xPos(i), yPos(worstData[i]));
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Data points
  for (let i = 0; i < years.length; i++) {
    // Best
    ctx.beginPath();
    ctx.fillStyle = '#00ff41';
    ctx.arc(xPos(i), yPos(bestData[i]), 4, 0, Math.PI * 2);
    ctx.fill();
    // Worst
    ctx.beginPath();
    ctx.fillStyle = '#ff0040';
    ctx.arc(xPos(i), yPos(worstData[i]), 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Year labels
  ctx.fillStyle = '#666';
  ctx.font = '11px Share Tech Mono, monospace';
  ctx.textAlign = 'center';
  years.forEach((yr, i) => {
    ctx.fillText(yr, xPos(i), H - 12);
  });

  // Y-axis labels
  ctx.textAlign = 'right';
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const val = minVal + (i / ySteps) * valRange;
    const y = padT + chartH - (i / ySteps) * chartH;
    ctx.fillStyle = val === 0 ? '#888' : val > 0 ? '#00ff4177' : '#ff004077';
    ctx.fillText((val > 0 ? '+' : '') + Math.round(val) + '%', padL - 6, y + 4);
  }

  // Legend
  ctx.fillStyle = '#00ff41';
  ctx.fillRect(padL, 8, 20, 3);
  ctx.fillStyle = '#aaa';
  ctx.textAlign = 'left';
  ctx.font = '10px Share Tech Mono, monospace';
  ctx.fillText('Best case (AI Augmentation)', padL + 28, 14);

  ctx.fillStyle = '#ff0040';
  ctx.fillRect(W - padR - 200, 8, 20, 3);
  ctx.fillStyle = '#aaa';
  ctx.fillText('Worst case (Displacement)', W - padR - 168, 14);
}

// =============================================
// ANIMATE RESULTS
// =============================================
function animateResults() {
  const r = analysisResult;

  // Animate gauge
  let counter = 0;
  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeNumber = document.getElementById('gaugeNumber');
  const circumference = 534;

  const gaugeInterval = setInterval(() => {
    counter += 1;
    if (counter > r.score) {
      counter = r.score;
      clearInterval(gaugeInterval);
    }
    // SVG stroke dash animation
    const offset = circumference - (counter / 100) * circumference;
    gaugeFill.style.strokeDashoffset = offset;
    gaugeNumber.textContent = counter + '%';
  }, 25);

  // Animate threat meter (after delay)
  setTimeout(() => {
    const threatPct = 100 - r.score;
    document.getElementById('threatFill').style.width = threatPct + '%';
  }, 600);

  // Draw salary chart after layout
  setTimeout(() => {
    drawSalaryChart(r.salaryBest, r.salaryWorst);
  }, 200);

  // Reveal sections with stagger
  const sections = document.querySelectorAll('.reveal-section');
  sections.forEach((section, i) => {
    setTimeout(() => {
      section.classList.add('visible');
    }, 200 + i * 150);
  });

  // Timeline impact highlight
  setTimeout(() => {
    highlightTimeline(r.category);
    document.getElementById('impactLabel').textContent =
      `YOUR ROLE IS MOST IMPACTED IN: ${r.waveImpact}`;
  }, 600);
}

function highlightTimeline(category) {
  const dotMap = {
    ultra_high_risk: 0,
    high_risk: 1,
    moderate_risk: 1,
    low_risk: 2,
    very_low_risk: 3
  };

  const dots = document.querySelectorAll('.tl-dot');
  const idx = dotMap[category] ?? 1;
  if (dots[idx]) dots[idx].classList.add('user-highlight');
}

// =============================================
// SHARE
// =============================================
function copyShareText() {
  const text = window._shareText || '';
  navigator.clipboard.writeText(text).then(() => {
    const confirm = document.getElementById('copyConfirm');
    confirm.classList.add('show');
    setTimeout(() => confirm.classList.remove('show'), 3000);
  }).catch(() => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const confirm = document.getElementById('copyConfirm');
    confirm.classList.add('show');
    setTimeout(() => confirm.classList.remove('show'), 3000);
  });
}

// =============================================
// LEADERBOARD DATA
// =============================================
const SEED_ENTRIES = [
  { jobTitle: "Data Entry Clerk", industry: "Finance", score: 8, category: "ultra_high_risk" },
  { jobTitle: "Telemarketer", industry: "Retail", score: 12, category: "ultra_high_risk" },
  { jobTitle: "Legal Secretary", industry: "Legal", score: 18, category: "ultra_high_risk" },
  { jobTitle: "Bookkeeper", industry: "Finance", score: 22, category: "ultra_high_risk" },
  { jobTitle: "Customer Service Rep", industry: "Retail", score: 27, category: "high_risk" },
  { jobTitle: "Content Writer", industry: "Marketing", score: 31, category: "high_risk" },
  { jobTitle: "Market Research Analyst", industry: "Marketing", score: 35, category: "high_risk" },
  { jobTitle: "Paralegal", industry: "Legal", score: 38, category: "high_risk" },
  { jobTitle: "Financial Analyst", industry: "Finance", score: 43, category: "moderate_risk" },
  { jobTitle: "Social Media Manager", industry: "Marketing", score: 46, category: "moderate_risk" },
  { jobTitle: "Software Developer", industry: "Technology", score: 52, category: "moderate_risk" },
  { jobTitle: "Product Manager", industry: "Technology", score: 56, category: "moderate_risk" },
  { jobTitle: "Data Scientist", industry: "Technology", score: 58, category: "moderate_risk" },
  { jobTitle: "UX Designer", industry: "Technology", score: 61, category: "moderate_risk" },
  { jobTitle: "Cybersecurity Analyst", industry: "Technology", score: 68, category: "low_risk" },
  { jobTitle: "Registered Nurse", industry: "Healthcare", score: 72, category: "low_risk" },
  { jobTitle: "Mechanical Engineer", industry: "Manufacturing", score: 74, category: "low_risk" },
  { jobTitle: "Surgeon", industry: "Healthcare", score: 79, category: "low_risk" },
  { jobTitle: "Electrician", industry: "Construction", score: 85, category: "very_low_risk" },
  { jobTitle: "Plumber", industry: "Construction", score: 87, category: "very_low_risk" },
  { jobTitle: "Emergency Physician", industry: "Healthcare", score: 91, category: "very_low_risk" },
  { jobTitle: "HVAC Technician", industry: "Construction", score: 89, category: "very_low_risk" },
];

function initLeaderboard() {
  leaderboardData = SEED_ENTRIES.map((e, i) => ({
    ...e,
    id: i,
    isUser: false
  }));
}

function addToLeaderboard(result) {
  userLeaderboardEntry = {
    jobTitle: result.jobTitle,
    industry: result.industry || 'Other',
    score: result.score,
    category: result.category,
    id: 999,
    isUser: true
  };
  // Remove previous user entry if exists
  leaderboardData = leaderboardData.filter(e => !e.isUser);
  leaderboardData.push(userLeaderboardEntry);
}

function getThreatBadge(score) {
  if (score < 20) return '<span class="threat-badge-sm badge-critical">EXTINCTION</span>';
  if (score < 35) return '<span class="threat-badge-sm badge-critical">CRITICAL</span>';
  if (score < 50) return '<span class="threat-badge-sm badge-high">HIGH</span>';
  if (score < 65) return '<span class="threat-badge-sm badge-moderate">MODERATE</span>';
  if (score < 80) return '<span class="threat-badge-sm badge-low">LOW</span>';
  return '<span class="threat-badge-sm badge-minimal">MINIMAL</span>';
}

function getSurvivalColor(score) {
  if (score < 35) return '#ff0040';
  if (score < 50) return '#ff6633';
  if (score < 65) return '#ffb000';
  return '#00ff41';
}

function renderLeaderboard(filter) {
  let data = [...leaderboardData];

  if (filter === 'safe') data.sort((a, b) => b.score - a.score);
  else if (filter === 'doomed') data.sort((a, b) => a.score - b.score);
  else data.sort((a, b) => b.score - a.score);

  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = data.map((entry, i) => {
    const rank = i + 1;
    const color = getSurvivalColor(entry.score);
    return `
      <tr class="${entry.isUser ? 'user-row' : ''}">
        <td><span class="lb-rank ${rank <= 3 ? 'top3' : ''}">${rank}</span></td>
        <td class="lb-job">${entry.jobTitle}${entry.isUser ? ' ← YOU' : ''}</td>
        <td>${entry.industry}</td>
        <td class="lb-survival" style="color:${color}">${entry.score}%</td>
        <td>${getThreatBadge(entry.score)}</td>
      </tr>
    `;
  }).join('');
}

function filterLeaderboard(mode, btn) {
  document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboard(mode);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initLeaderboard();

  // Typing animation for subtitle
  const subtitleEl = document.getElementById('subtitleType');
  setTimeout(() => {
    typeText(subtitleEl, 'How long until the machines take your job?', 45);
  }, 1000);

  // Initialize slider
  const slider = document.getElementById('experience');
  if (slider) {
    updateSlider(slider);
  }

  // Set timestamp
  const ts = document.getElementById('resultsTimestamp');
  if (ts) {
    ts.textContent = new Date().toLocaleString();
  }
});

// Show results page if somehow navigated there with no data
window.showPage = showPage;
window.filterJobs = filterJobs;
window.updateSlider = updateSlider;
window.runAnalysis = runAnalysis;
window.copyShareText = copyShareText;
window.filterLeaderboard = filterLeaderboard;