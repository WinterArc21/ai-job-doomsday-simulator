/* =============================================
   AI JOB IMPACT ANALYZER — app.js
   Warm Editorial Redesign
   ============================================= */

'use strict';

// =============================================
// RESEARCH DATA
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
      icon: ["\uD83D\uDD10","\uD83E\uDD16","\u2601\uFE0F","\uD83C\uDFA8","\u2699\uFE0F","\uD83D\uDCCA","\uD83D\uDEE1\uFE0F"],
      skills: ["Cybersecurity","AI/ML Operations","Cloud Architecture","Human-AI Interaction Design",
        "DevOps & Infrastructure","AI Ethics & Governance","Systems Design"]
    },
    Finance: {
      icon: ["\uD83E\uDDE0","\uD83D\uDCE1","\uD83D\uDD0D","\uD83E\uDD1D","\uD83D\uDCC8","\u2696\uFE0F","\uD83D\uDD12"],
      skills: ["AI-Augmented Decision Making","Strategic Communication","Risk Analysis",
        "Client Relationship Management","Data Storytelling","Regulatory Compliance","Fraud Detection"]
    },
    Healthcare: {
      icon: ["\uD83D\uDC8A","\uD83E\uDE7A","\uD83E\uDD1D","\uD83D\uDD2C","\uD83D\uDCCB","\uD83E\uDDEC","\uD83D\uDCF1"],
      skills: ["Telemedicine Technology","AI-Assisted Diagnostics","Patient Communication",
        "Specialized Procedures","Research Methodology","Clinical Data Analysis","Digital Health"]
    },
    Education: {
      icon: ["\uD83E\uDDE0","\uD83C\uDFAF","\uD83E\uDD1D","\uD83D\uDCCA","\uD83D\uDCA1","\uD83C\uDF0D","\uD83C\uDFAE"],
      skills: ["AI Literacy & Pedagogy","Personalized Learning Design","Emotional Intelligence",
        "Data-Driven Instruction","Creative Problem Solving","Interdisciplinary Teaching","EdTech Mastery"]
    },
    Legal: {
      icon: ["\uD83E\uDDE0","\uD83D\uDD0D","\u2696\uFE0F","\uD83E\uDD1D","\uD83D\uDCDD","\uD83D\uDEE1\uFE0F","\uD83D\uDCBC"],
      skills: ["AI Legal Research","Regulatory Technology","Contract Analysis",
        "Ethical Judgment","Strategic Advocacy","Compliance Tech","Domain Expertise"]
    },
    Marketing: {
      icon: ["\uD83C\uDFA8","\uD83D\uDCE1","\uD83C\uDFAF","\uD83D\uDCCA","\uD83E\uDD1D","\uD83D\uDCA1","\uD83C\uDF10"],
      skills: ["Brand Strategy & Voice","AI Tool Mastery","Creative Direction",
        "Cultural Insight","Multimedia Production","Data Storytelling","Campaign Analytics"]
    },
    Manufacturing: {
      icon: ["\uD83E\uDD16","\uD83D\uDD27","\uD83D\uDCCA","\uD83D\uDEE1\uFE0F","\u26A1","\uD83C\uDF31","\uD83C\uDFED"],
      skills: ["Industrial AI Systems","Advanced Diagnostics","Smart Manufacturing",
        "Quality Control AI","Process Optimization","Renewable Energy Tech","Robotics Oversight"]
    },
    Retail: {
      icon: ["\uD83D\uDCCA","\uD83E\uDD1D","\uD83C\uDF10","\uD83D\uDCF1","\uD83C\uDFAF","\uD83D\uDCA1","\uD83D\uDD0D"],
      skills: ["Customer Experience Design","AI-Driven Personalization","Omnichannel Strategy",
        "Supply Chain Optimization","Brand Storytelling","Data Analytics","E-commerce Technology"]
    },
    Government: {
      icon: ["\uD83D\uDEE1\uFE0F","\uD83D\uDCCA","\uD83E\uDD1D","\u2696\uFE0F","\uD83D\uDCA1","\uD83C\uDF10","\uD83D\uDD12"],
      skills: ["AI Policy & Governance","Digital Services Design","Stakeholder Communication",
        "Ethical AI Implementation","Cybersecurity","Data Analytics","Change Management"]
    },
    Creative: {
      icon: ["\uD83C\uDFA8","\uD83D\uDCA1","\uD83D\uDCE1","\uD83C\uDF0D","\uD83C\uDFAC","\uD83E\uDD1D","\uD83C\uDFAF"],
      skills: ["Creative Direction & Vision","AI Tool Mastery","Cultural Insight",
        "Multimedia Production","Experiential Design","Brand Strategy","Audience Development"]
    },
    Construction: {
      icon: ["\uD83C\uDFD7\uFE0F","\uD83E\uDD16","\u26A1","\uD83D\uDCCA","\uD83D\uDD27","\uD83C\uDF31","\uD83D\uDCBC"],
      skills: ["Smart Building Systems","Renewable Energy Tech","Advanced Diagnostics Tools",
        "Project Management","BIM & Digital Twins","Entrepreneurship","Safety Tech"]
    },
    Transportation: {
      icon: ["\uD83D\uDE80","\uD83D\uDCE1","\uD83D\uDD27","\uD83D\uDCCA","\uD83D\uDEE1\uFE0F","\uD83C\uDF31","\uD83D\uDCA1"],
      skills: ["Autonomous Systems Oversight","Logistics Optimization","Predictive Maintenance",
        "Fleet Management Tech","Safety & Compliance","Sustainability Tech","Last-Mile Innovation"]
    },
    Other: {
      icon: ["\uD83E\uDDE0","\uD83E\uDD1D","\uD83D\uDCCA","\uD83D\uDCA1","\uD83D\uDD0D","\uD83C\uDFAF","\u26A1"],
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
      name: "AI-Augmented Growth",
      desc: "AI becomes a productivity multiplier for your role. Early adoption of AI tools triples output, and your capacity to direct AI effectively becomes a premium skill. Organizations compete for workers who can lead AI integration. Salary growth of 20\u201335% over 3 years.",
      prob_base: [25, 35]
    },
    likely: {
      name: "Role Transformation",
      desc: "Your current role evolves significantly. 40\u201360% of existing tasks become automated, but new responsibilities emerge around oversight, strategy, and human judgment. A 6\u201312 month adaptation period is expected. Compensation stays flat or dips modestly before recovering.",
      prob_base: [35, 45]
    },
    bad: {
      name: "Significant Disruption",
      desc: "Your role faces meaningful headcount reduction. Organizations cut positions 20\u201340% in your department, and remaining workers take on broader responsibilities with AI assistance. A career pivot within 18 months becomes the most pragmatic path.",
      prob_base: [15, 25]
    },
    worst: {
      name: "Full Displacement",
      desc: "AI assumes the core functions of your role. Entire departments are restructured or eliminated. Retraining requires 2+ years of focused effort. Only 1 in 5 displaced workers returns to equivalent-level employment within 3 years. Early action is essential.",
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
  // Update leaderboard back-link
  if (page === 'leaderboard' && analysisResult) {
    const backBtn = document.getElementById('backFromLeaderboard');
    if (backBtn) backBtn.setAttribute('onclick', "showPage('results'); return false;");
  }
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
  // Update slider fill
  const pct = (el.value / 30) * 100;
  el.style.background = `linear-gradient(90deg, #C45D3E ${pct}%, #E4DDD1 ${pct}%)`;
}

// =============================================
// JOB MATCHING ALGORITHM
// =============================================
function matchJobCategory(jobTitle) {
  const lower = jobTitle.toLowerCase().trim();

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

  return 'moderate_risk';
}

// =============================================
// CALCULATE RESILIENCE SCORE
// =============================================
function calculateSurvival(jobTitle, experience, industry, seniority, aiUsage) {
  const cat = matchJobCategory(jobTitle);
  const catData = RESEARCH.jobCategories[cat];
  const [minScore, maxScore] = catData.survival_range;
  const [minSalary, maxSalary] = catData.salary_change_range;

  // Base score \u2014 midpoint of range
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

  // Slight variance \u00B13
  const variance = (Math.random() * 6) - 3;

  const rawScore = baseScore + expMod + aiMod + senMod + variance;
  const score = Math.max(3, Math.min(97, Math.round(rawScore)));

  // Salary projection
  const salaryBest = Math.min(40, maxSalary + (aiMod > 0 ? 8 : 0) + (expMod > 0 ? 5 : 0));
  const salaryWorst = Math.max(-55, minSalary - (aiMod < 0 ? 5 : 0));

  // Threat level (professional language)
  let threatLevel, threatColor;
  if (score < 20) { threatLevel = 'High Disruption Risk'; threatColor = '#C45D3E'; }
  else if (score < 35) { threatLevel = 'Significant Risk'; threatColor = '#C45D3E'; }
  else if (score < 50) { threatLevel = 'Elevated Risk'; threatColor = '#C49A3C'; }
  else if (score < 65) { threatLevel = 'Moderate Risk'; threatColor = '#C49A3C'; }
  else if (score < 80) { threatLevel = 'Low Risk'; threatColor = '#5A7A5E'; }
  else { threatLevel = 'Highly Resilient'; threatColor = '#2C3E50'; }

  // Disruption wave
  let waveImpact;
  if (cat === 'ultra_high_risk') waveImpact = 'Wave 1 (2023\u20132025) \u2014 Disruption already in progress';
  else if (cat === 'high_risk') waveImpact = 'Wave 2 (2025\u20132027) \u2014 Peak disruption period';
  else if (cat === 'moderate_risk') waveImpact = 'Wave 2\u20133 (2026\u20132028) \u2014 Transition and adaptation period';
  else if (cat === 'low_risk') waveImpact = 'Wave 3 (2027\u20132030) \u2014 Long-term evolution';
  else waveImpact = 'Post-2030 \u2014 Strong resilience through the AI era';

  // Verdict (professional tone)
  let verdict;
  if (score < 25) {
    verdict = `This role faces high disruption risk. AI is already automating a significant portion of its core functions, and the pace is accelerating through 2027. Proactive reskilling is the most effective response at this stage.`;
  } else if (score < 40) {
    verdict = `This role carries significant exposure to AI disruption. It falls within Wave ${cat === 'ultra_high_risk' ? '1' : '2'} of automation impact. Workers who adapt early \u2014 by building adjacent skills and AI fluency \u2014 will be best positioned.`;
  } else if (score < 55) {
    verdict = `This role faces meaningful transformation over the next 2\u20133 years. AI will automate a substantial portion of current tasks, but human oversight, judgment, and client relationships will remain essential.`;
  } else if (score < 70) {
    verdict = `This role shows moderate resilience. AI augmentation is more likely than direct replacement. Workers who actively adopt AI tools will gain a measurable productivity and compensation advantage over peers who do not.`;
  } else if (score < 85) {
    verdict = `This role has a strong resilience profile. Its complexity, physical demands, or requirement for human judgment provides meaningful protection against automation in the near to medium term.`;
  } else {
    verdict = `This role is highly resilient to AI automation. Physical complexity, unpredictable environments, and the irreplaceable nature of human judgment make near-term displacement unlikely. AI will serve as a supporting tool rather than a replacement.`;
  }

  // Risk explanation for the spectrum bar
  let riskExplanation;
  if (score < 35) {
    riskExplanation = `Your role is positioned in the high-disruption zone. Research from the WEF and Goldman Sachs identifies roles in this range as facing the most immediate pressure from AI automation, particularly in task-level functions. Early action on skill development has a demonstrable impact on long-term outcomes.`;
  } else if (score < 55) {
    riskExplanation = `Your role sits in the elevated-risk zone \u2014 significant transformation is expected, but outright displacement is not inevitable. Workers who augment their expertise with AI proficiency are demonstrably more likely to navigate this transition successfully.`;
  } else if (score < 75) {
    riskExplanation = `Your role shows moderate resilience. AI will reshape responsibilities, but the combination of human judgment, domain expertise, and relationship-based work provides a meaningful buffer. Adaptation will be required; replacement is not the primary risk.`;
  } else {
    riskExplanation = `Your role sits in the highly resilient zone of the spectrum. Physical presence, fine-grained human judgment, and complexity in unpredictable environments make full automation technically and practically difficult within the foreseeable research horizon.`;
  }

  // Scenario probabilities
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

  // AI usage adjustments
  if (aiUsage === 'daily') { bestProb += 8; likelyProb -= 2; badProb -= 4; worstProb -= 2; }
  else if (aiUsage === 'never') { bestProb -= 8; likelyProb -= 4; badProb += 6; worstProb += 6; }

  // Normalize to 100
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
    riskExplanation,
    waveImpact,
    salaryBest: Math.round(salaryBest),
    salaryWorst: Math.round(salaryWorst),
    scenarios: { bestProb, likelyProb, badProb, worstProb },
    mostLikely: Math.max(bestProb, likelyProb, badProb, worstProb)
  };
}

// =============================================
// LOADING SEQUENCE (simplified)
// =============================================
const LOADING_MESSAGES = [
  'Identifying role category\u2026',
  'Cross-referencing disruption research\u2026',
  'Applying experience and seniority modifiers\u2026',
  'Generating scenario probabilities\u2026'
];

function runLoadingSequence(callback) {
  showPage('loading');

  let msgIndex = 0;
  const statusEl = document.getElementById('loadingStatus');
  const msgs = document.querySelectorAll('.load-msg');

  // Reset
  msgs.forEach(m => m.classList.remove('active', 'done'));

  function advanceMessage() {
    if (msgIndex > 0 && msgs[msgIndex - 1]) {
      msgs[msgIndex - 1].classList.remove('active');
      msgs[msgIndex - 1].classList.add('done');
    }
    if (msgIndex < msgs.length) {
      if (msgs[msgIndex]) msgs[msgIndex].classList.add('active');
      if (statusEl) statusEl.textContent = LOADING_MESSAGES[msgIndex] || 'Analyzing\u2026';
      msgIndex++;
      if (msgIndex <= msgs.length) {
        setTimeout(advanceMessage, 750);
      }
    } else {
      // All done \u2014 mark last done
      msgs.forEach(m => { m.classList.remove('active'); m.classList.add('done'); });
      if (statusEl) statusEl.textContent = 'Assessment complete.';
      setTimeout(callback, 500);
    }
  }

  setTimeout(advanceMessage, 200);
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
    alert('Please enter your job title to continue.');
    return;
  }

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
    `AI Impact Assessment: ${r.jobTitle} \u2014 ${r.industry || 'General'}`;
  document.getElementById('resultsTimestamp').textContent =
    new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });

  // Score gauge color
  const gaugeColor = r.score < 35 ? '#C45D3E' :
                     r.score < 55 ? '#C49A3C' :
                     r.score < 75 ? '#5A7A5E' : '#2C3E50';

  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeNumber = document.getElementById('gaugeNumber');
  gaugeFill.setAttribute('stroke', gaugeColor);
  gaugeNumber.style.fill = gaugeColor;

  // Threat badge
  const threatBadge = document.getElementById('threatBadge');
  threatBadge.textContent = r.threatLevel;
  threatBadge.style.borderColor = r.threatColor;
  threatBadge.style.color = r.threatColor;

  // Verdict
  document.getElementById('survivalVerdict').textContent = r.verdict;

  // Risk explanation
  const riskExp = document.getElementById('riskExplanation');
  if (riskExp) riskExp.textContent = r.riskExplanation;

  // Position risk marker (score 0-100 \u2192 left 0-100%)
  const riskMarker = document.getElementById('riskMarker');
  if (riskMarker) {
    // Invert: score 100 = most resilient (right), score 0 = most at risk (left)
    const leftPct = (r.score / 100) * 100;
    riskMarker.style.left = leftPct + '%';
    const markerLabel = document.getElementById('riskMarkerLabel');
    if (markerLabel) markerLabel.textContent = r.jobTitle;
  }

  // Salary
  document.getElementById('bestSalaryPct').textContent =
    (r.salaryBest > 0 ? '+' : '') + r.salaryBest + '%';
  document.getElementById('worstSalaryPct').textContent =
    (r.salaryWorst > 0 ? '+' : '') + r.salaryWorst + '%';

  // Build sub-sections
  buildFutures(r);
  buildSkills(r);
  buildQuotes();
  buildShareCard(r);

  // Store for chart
  window._salaryData = { best: r.salaryBest, worst: r.salaryWorst, score: r.score };
}

function buildFutures(r) {
  const grid = document.getElementById('futuresGrid');
  const { bestProb, likelyProb, badProb, worstProb } = r.scenarios;
  const sc = RESEARCH.scenarios;

  const probs = [bestProb, likelyProb, badProb, worstProb];
  const maxProb = Math.max(...probs);

  const futures = [
    { key: 'best',   prob: bestProb,   nameColor: '#5A7A5E' },
    { key: 'likely', prob: likelyProb, nameColor: '#2C3E50' },
    { key: 'bad',    prob: badProb,    nameColor: '#C49A3C' },
    { key: 'worst',  prob: worstProb,  nameColor: '#C45D3E' }
  ];

  grid.innerHTML = futures.map(f => {
    const scenario = sc[f.key];
    const isTop = f.prob === maxProb;
    return `
      <div class="future-card ${isTop ? 'most-likely' : ''}">
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

  const priorities = ['CRITICAL','CRITICAL','HIGH','HIGH','RECOMMENDED','RECOMMENDED','RECOMMENDED'];
  const priorityClass = { CRITICAL: 'priority-critical', HIGH: 'priority-high', RECOMMENDED: 'priority-recommended' };

  const skillDescriptions = {
    "AI Literacy & Prompt Engineering": "Master prompting, AI workflows, and tool chains. 56% wage premium for AI-skilled workers (PwC).",
    "Critical Thinking & Analysis": "AI can generate \u2014 humans must evaluate. Complex judgment remains a human advantage.",
    "Emotional Intelligence": "Empathy, social skills, and relationship-building \u2014 skills AI cannot replicate.",
    "Creative Problem Solving": "Novel thinking and creative synthesis across domains remain uniquely human.",
    "Adaptability & Resilience": "The number one skill for navigating rapid change in the AI era.",
    "Data Storytelling": "Transform AI-generated data into compelling narratives and actionable insights.",
    "Cybersecurity": "As AI expands attack surfaces, security expertise becomes mission-critical.",
    "AI/ML Operations": "Manage, deploy, and maintain AI systems in production environments.",
    "Cloud Architecture": "AI runs in the cloud \u2014 cloud expertise is foundational for the AI economy.",
    "Human-AI Interaction Design": "Design systems where humans and AI collaborate effectively.",
    "AI Ethics & Governance": "Organizations need humans to set guardrails and ensure responsible AI use.",
    "Systems Design": "High-level architecture and systems thinking remain beyond AI's current scope.",
    "DevOps & Infrastructure": "The backbone of AI deployment \u2014 high demand, difficult to automate.",
    "AI-Augmented Decision Making": "Use AI as a co-pilot for strategic decisions while retaining final authority.",
    "Strategic Communication": "Translate complex AI insights into human language for stakeholders.",
    "Change Management": "Lead organizations through AI-driven transformation effectively.",
    "Process Optimization": "Identify which processes to automate and how to redesign workflows.",
    "Client Relationship Management": "Human trust and relationships remain essential in high-stakes contexts.",
    "Brand Strategy & Voice": "Define the authentic human story that AI cannot generate.",
    "Creative Direction": "AI needs human creative vision to produce meaningful work.",
    "AI Tool Mastery": "Leverage AI tools to multiply your creative output significantly.",
    "Cultural Insight": "Deep cultural understanding informs content that resonates authentically.",
    "Multimedia Production": "Direct, orchestrate, and curate across AI-generated media channels.",
    "Experiential Design": "Create physical and digital experiences that AI cannot fully replicate.",
    "Telemedicine Technology": "Digital health platforms expanding access to care \u2014 high demand.",
    "AI-Assisted Diagnostics": "Partner with AI diagnostic tools while applying clinical judgment.",
    "Patient Communication": "Empathy, trust, and communication in healthcare remain deeply human.",
    "Specialized Procedures": "Hands-on clinical skills cannot be automated \u2014 high value.",
    "Research Methodology": "Design and validate studies that AI cannot conduct independently.",
    "Smart Building Systems": "IoT, sensors, and automation in modern construction \u2014 growing field.",
    "Renewable Energy Tech": "Green transition creates significant demand for skilled workers.",
    "Advanced Diagnostics Tools": "AI diagnostic systems require human interpretation and application.",
    "Project Management": "Complex project coordination requires human leadership and judgment.",
    "Entrepreneurship": "Build your own AI-powered venture \u2014 the ultimate resilience strategy.",
    "Interdisciplinary Knowledge": "Broad knowledge enables you to connect insights AI cannot see.",
    "Logistics Optimization": "AI-augmented supply chain management \u2014 humans direct the strategy.",
    "Regulatory Compliance": "Regulations require human accountability \u2014 cannot be delegated to AI.",
    "Risk Analysis": "Holistic risk assessment combining data and judgment remains human.",
    "Autonomous Systems Oversight": "Monitor and manage AI-driven transportation systems.",
    "Interdisciplinary Teaching": "Teaching across domains, adapting to diverse learner needs.",
    "EdTech Mastery": "Proficiency with digital education platforms and AI tutoring tools.",
    "AI Legal Research": "Leverage AI-powered legal research tools while applying legal judgment.",
    "Regulatory Technology": "Navigate the intersection of regulation and emerging technology.",
    "Contract Analysis": "Assess contractual risk and implications in complex agreements.",
    "Ethical Judgment": "Ethical reasoning and accountability that clients and institutions require.",
    "Strategic Advocacy": "Represent clients with strategic insight that goes beyond information retrieval.",
    "Compliance Tech": "Technology-assisted compliance monitoring and reporting.",
    "Domain Expertise": "Deep subject matter expertise paired with AI tools creates outsized value.",
    "Industrial AI Systems": "Integrate AI into manufacturing and industrial workflows.",
    "Smart Manufacturing": "Operate and oversee AI-driven production systems.",
    "Quality Control AI": "Leverage machine vision and AI for quality assurance at scale.",
    "Robotics Oversight": "Supervise and troubleshoot robotic systems in industrial environments.",
    "AI Policy & Governance": "Develop and implement AI governance frameworks for public institutions.",
    "Digital Services Design": "Design citizen-facing digital services that are accessible and effective.",
    "Ethical AI Implementation": "Ensure AI systems meet standards for fairness, transparency, and accountability.",
    "Customer Experience Design": "Architect customer journeys that AI can personalize at scale.",
    "AI-Driven Personalization": "Use AI to deliver highly relevant customer experiences.",
    "Omnichannel Strategy": "Integrate physical and digital customer touchpoints cohesively.",
    "Supply Chain Optimization": "Use AI tools to improve supply chain visibility and efficiency.",
    "Audience Development": "Build and engage audiences across evolving digital platforms.",
    "BIM & Digital Twins": "Build information modelling and digital twin technologies for construction.",
    "Safety Tech": "Leverage technology to enhance workplace safety and compliance.",
    "Fleet Management Tech": "Manage vehicle fleets using AI-powered routing and diagnostics.",
    "Sustainability Tech": "Apply technology to reduce environmental impact in transportation.",
    "Last-Mile Innovation": "Innovate delivery and logistics for the final mile of supply chains.",
    "Predictive Maintenance": "Use sensor data and AI to anticipate equipment failures.",
    "Safety & Compliance": "Ensure regulatory and operational safety standards are met.",
    "Campaign Analytics": "Measure and optimize marketing campaigns with data-driven insights.",
    "Clinical Data Analysis": "Analyze patient and clinical data to support evidence-based decisions.",
    "Digital Health": "Navigate and leverage digital health platforms and health informatics.",
    "Fraud Detection": "Use AI tools to identify and prevent financial fraud.",
    "Data-Driven Instruction": "Use data and analytics to improve learning outcomes.",
    "Personalized Learning Design": "Design adaptive, individualized learning experiences.",
    "AI Literacy & Pedagogy": "Teach AI literacy and model responsible AI use in educational contexts.",
    "Creative Direction & Vision": "Provide creative leadership that AI tools can execute around.",
    "Stakeholder Communication": "Communicate complex information to diverse stakeholders clearly.",
  };

  const skills = industryData.skills;
  const icons = industryData.icon;

  grid.innerHTML = skills.slice(0, 7).map((skill, i) => {
    const priority = priorities[i] || 'RECOMMENDED';
    const icon = icons[i] || '\uD83D\uDCA1';
    const desc = skillDescriptions[skill] || `High-value skill for navigating the AI transition in ${industry}. Projected demand through 2030.`;
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
  const shuffled = [...RESEARCH.expertQuotes].sort(() => Math.random() - 0.5).slice(0, 3);

  grid.innerHTML = shuffled.map(q => `
    <div class="quote-card">
      <div class="quote-text">${q.quote}</div>
      <div class="quote-attr">
        <span class="person">${q.person}</span>
        <span class="title-text"> \u2014 ${q.title}</span>
        <br>
        <span class="source-text">Source: <a href="${q.url}" target="_blank" rel="noopener noreferrer">${q.source}</a></span>
      </div>
    </div>
  `).join('');
}

function buildShareCard(r) {
  const scenarioProbs = r.scenarios;
  const maxProb = Math.max(scenarioProbs.bestProb, scenarioProbs.likelyProb, scenarioProbs.badProb, scenarioProbs.worstProb);
  let likelyScenario;
  if (maxProb === scenarioProbs.bestProb) likelyScenario = RESEARCH.scenarios.best.name;
  else if (maxProb === scenarioProbs.likelyProb) likelyScenario = RESEARCH.scenarios.likely.name;
  else if (maxProb === scenarioProbs.badProb) likelyScenario = RESEARCH.scenarios.bad.name;
  else likelyScenario = RESEARCH.scenarios.worst.name;

  const industry = r.industry || 'General';
  const topSkills = (RESEARCH.skillsByIndustry[industry] || RESEARCH.skillsByIndustry.Other).skills.slice(0, 3).join(', ');

  const shareText =
`AI Resilience Score: ${r.score}% \u2014 ${r.jobTitle} (${industry})
Risk Assessment: ${r.threatLevel}
Most Likely Outcome: ${likelyScenario} (${maxProb}%)
Recommended Skills: ${topSkills}

Assessed using the AI Job Impact Analyzer \u2014 evidence-based career analysis from WEF, Goldman Sachs, McKinsey & OpenAI research.`;

  document.getElementById('shareContent').textContent = shareText;
  window._shareText = shareText;
}

// =============================================
// SALARY CHART (Canvas \u2014 editorial color scheme)
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
  const padL = 64, padR = 32, padT = 40, padB = 52;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const bestData  = [0, best * 0.2, best * 0.5, best * 0.8, best];
  const worstData = [0, worst * 0.3, worst * 0.65, worst * 0.85, worst];

  const allVals = [...bestData, ...worstData, 0];
  const minVal = Math.min(...allVals) - 5;
  const maxVal = Math.max(...allVals) + 5;
  const valRange = maxVal - minVal;

  function xPos(i) { return padL + (i / (years.length - 1)) * chartW; }
  function yPos(v) { return padT + chartH - ((v - minVal) / valRange) * chartH; }

  // Background
  ctx.fillStyle = '#EDE8DE';
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(26,26,26,0.07)';
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
  ctx.strokeStyle = 'rgba(26,26,26,0.2)';
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
  ctx.fillStyle = 'rgba(90,122,94,0.08)';
  ctx.fill();

  // Best case line (sage green)
  ctx.beginPath();
  ctx.strokeStyle = '#5A7A5E';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < years.length; i++) {
    if (i === 0) ctx.moveTo(xPos(i), yPos(bestData[i]));
    else ctx.lineTo(xPos(i), yPos(bestData[i]));
  }
  ctx.stroke();

  // Worst case line (terracotta)
  ctx.beginPath();
  ctx.strokeStyle = '#C45D3E';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < years.length; i++) {
    if (i === 0) ctx.moveTo(xPos(i), yPos(worstData[i]));
    else ctx.lineTo(xPos(i), yPos(worstData[i]));
  }
  ctx.stroke();

  // Data points \u2014 best
  for (let i = 0; i < years.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#5A7A5E';
    ctx.arc(xPos(i), yPos(bestData[i]), 4, 0, Math.PI * 2);
    ctx.fill();
  }
  // Data points \u2014 worst
  for (let i = 0; i < years.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#C45D3E';
    ctx.arc(xPos(i), yPos(worstData[i]), 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Year labels
  ctx.fillStyle = '#6B6B6B';
  ctx.font = "500 12px 'Source Sans 3', 'Helvetica Neue', sans-serif";
  ctx.textAlign = 'center';
  years.forEach((yr, i) => {
    ctx.fillText(yr, xPos(i), H - 14);
  });

  // Y-axis labels
  ctx.textAlign = 'right';
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const val = minVal + (i / ySteps) * valRange;
    const y = padT + chartH - (i / ySteps) * chartH;
    ctx.fillStyle = val > 0 ? '#5A7A5E' : val < 0 ? '#C45D3E' : '#6B6B6B';
    ctx.fillText((val > 0 ? '+' : '') + Math.round(val) + '%', padL - 8, y + 4);
  }

  // Legend
  const legendY = padT - 20;
  ctx.fillStyle = '#5A7A5E';
  ctx.fillRect(padL, legendY, 22, 3);
  ctx.fillStyle = '#3D3D3D';
  ctx.textAlign = 'left';
  ctx.font = "500 11px 'Source Sans 3', 'Helvetica Neue', sans-serif";
  ctx.fillText('Best case (AI augmentation)', padL + 28, legendY + 4);

  ctx.fillStyle = '#C45D3E';
  ctx.fillRect(padL + 220, legendY, 22, 3);
  ctx.fillStyle = '#3D3D3D';
  ctx.fillText('Worst case (displacement)', padL + 248, legendY + 4);
}

// =============================================
// ANIMATE RESULTS
// =============================================
function animateResults() {
  const r = analysisResult;

  // Animate gauge fill
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
    const offset = circumference - (counter / 100) * circumference;
    gaugeFill.style.strokeDashoffset = offset;
    gaugeNumber.textContent = counter + '%';
  }, 20);

  // Draw salary chart
  setTimeout(() => {
    drawSalaryChart(r.salaryBest, r.salaryWorst);
  }, 400);

  // Animate risk marker (needs a tick to let CSS transition work)
  setTimeout(() => {
    const riskMarker = document.getElementById('riskMarker');
    if (riskMarker) {
      riskMarker.style.transition = 'left 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, 100);

  // Timeline highlight
  setTimeout(() => {
    highlightTimeline(r.category);
    const impactEl = document.getElementById('impactLabel');
    if (impactEl) impactEl.textContent = r.waveImpact;
  }, 600);

  // Reveal sections using IntersectionObserver
  setupRevealObserver();
  // Also force-reveal all sections with a stagger (for immediate view)
  const sections = document.querySelectorAll('.reveal-section');
  sections.forEach((section, i) => {
    setTimeout(() => {
      section.classList.add('visible');
    }, 100 + i * 120);
  });
}

function setupRevealObserver() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
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
    showCopyConfirm();
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showCopyConfirm();
  });
}

function showCopyConfirm() {
  const confirm = document.getElementById('copyConfirm');
  if (confirm) {
    confirm.classList.add('show');
    setTimeout(() => confirm.classList.remove('show'), 3000);
  }
}

// =============================================
// LEADERBOARD
// =============================================
const SEED_ENTRIES = [
  { jobTitle: "Data Entry Clerk",        industry: "Finance",        score: 8,  category: "ultra_high_risk" },
  { jobTitle: "Telemarketer",            industry: "Retail",         score: 12, category: "ultra_high_risk" },
  { jobTitle: "Legal Secretary",         industry: "Legal",          score: 18, category: "ultra_high_risk" },
  { jobTitle: "Bookkeeper",              industry: "Finance",        score: 22, category: "ultra_high_risk" },
  { jobTitle: "Customer Service Rep",    industry: "Retail",         score: 27, category: "high_risk" },
  { jobTitle: "Content Writer",          industry: "Marketing",      score: 31, category: "high_risk" },
  { jobTitle: "Market Research Analyst", industry: "Marketing",      score: 35, category: "high_risk" },
  { jobTitle: "Paralegal",               industry: "Legal",          score: 38, category: "high_risk" },
  { jobTitle: "Financial Analyst",       industry: "Finance",        score: 43, category: "moderate_risk" },
  { jobTitle: "Social Media Manager",    industry: "Marketing",      score: 46, category: "moderate_risk" },
  { jobTitle: "Software Developer",      industry: "Technology",     score: 52, category: "moderate_risk" },
  { jobTitle: "Product Manager",         industry: "Technology",     score: 56, category: "moderate_risk" },
  { jobTitle: "Data Scientist",          industry: "Technology",     score: 58, category: "moderate_risk" },
  { jobTitle: "UX Designer",             industry: "Technology",     score: 61, category: "moderate_risk" },
  { jobTitle: "Cybersecurity Analyst",   industry: "Technology",     score: 68, category: "low_risk" },
  { jobTitle: "Registered Nurse",        industry: "Healthcare",     score: 72, category: "low_risk" },
  { jobTitle: "Mechanical Engineer",     industry: "Manufacturing",  score: 74, category: "low_risk" },
  { jobTitle: "Surgeon",                 industry: "Healthcare",     score: 79, category: "low_risk" },
  { jobTitle: "Electrician",             industry: "Construction",   score: 85, category: "very_low_risk" },
  { jobTitle: "Plumber",                 industry: "Construction",   score: 87, category: "very_low_risk" },
  { jobTitle: "HVAC Technician",         industry: "Construction",   score: 89, category: "very_low_risk" },
  { jobTitle: "Emergency Physician",     industry: "Healthcare",     score: 91, category: "very_low_risk" },
];

function initLeaderboard() {
  leaderboardData = SEED_ENTRIES.map((e, i) => ({ ...e, id: i, isUser: false }));
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
  leaderboardData = leaderboardData.filter(e => !e.isUser);
  leaderboardData.push(userLeaderboardEntry);
}

function getResilienceBadge(score) {
  if (score < 20) return '<span class="threat-badge-sm badge-critical">High Risk</span>';
  if (score < 35) return '<span class="threat-badge-sm badge-critical">Significant</span>';
  if (score < 50) return '<span class="threat-badge-sm badge-high">Elevated</span>';
  if (score < 65) return '<span class="threat-badge-sm badge-moderate">Moderate</span>';
  if (score < 80) return '<span class="threat-badge-sm badge-low">Low Risk</span>';
  return '<span class="threat-badge-sm badge-minimal">Resilient</span>';
}

function getScoreColor(score) {
  if (score < 35) return '#C45D3E';
  if (score < 50) return '#C49A3C';
  if (score < 65) return '#7A9E7E';
  return '#2C3E50';
}

function renderLeaderboard(filter) {
  let data = [...leaderboardData];

  if (filter === 'safe') data.sort((a, b) => b.score - a.score);
  else if (filter === 'doomed') data.sort((a, b) => a.score - b.score);
  else data.sort((a, b) => b.score - a.score);

  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = data.map((entry, i) => {
    const rank = i + 1;
    const color = getScoreColor(entry.score);
    return `
      <tr class="${entry.isUser ? 'user-row' : ''}">
        <td><span class="lb-rank ${rank <= 3 ? 'top3' : ''}">${rank}</span></td>
        <td class="lb-job">${entry.jobTitle}${entry.isUser ? ' &nbsp;<span style="font-size:0.7rem;font-weight:700;color:#C45D3E;letter-spacing:0.06em;text-transform:uppercase;">YOU</span>' : ''}</td>
        <td>${entry.industry}</td>
        <td class="lb-survival" style="color:${color}">${entry.score}%</td>
        <td>${getResilienceBadge(entry.score)}</td>
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
  initLeaderboard();

  // Initialize slider
  const slider = document.getElementById('experience');
  if (slider) updateSlider(slider);
});

// Expose globals
window.showPage = showPage;
window.filterJobs = filterJobs;
window.updateSlider = updateSlider;
window.runAnalysis = runAnalysis;
window.copyShareText = copyShareText;
window.filterLeaderboard = filterLeaderboard;