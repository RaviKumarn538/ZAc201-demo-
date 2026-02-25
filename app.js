const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

const syllabusHints = [
  'class 9',
  'class 10',
  'ncert',
  'cbse',
  'science',
  'math',
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'civics',
  'economics',
  'english',
  'hindi',
  'chapter',
  'algebra',
  'geometry',
  'trigonometry',
  'quadratic',
  'surface area',
  'heredity',
  'life processes',
  'electricity'
];

const restrictedCheatingPhrases = [
  'give leaked paper',
  'tell exact board exam question',
  'i have exam now give direct answer'
];

const testModeState = {
  active: false,
  step: 0,
  subject: '',
  chapter: '',
  difficulty: ''
};

function appendMessage(role, text) {
  const item = document.createElement('div');
  item.className = `message message--${role}`;
  item.textContent = text;
  messagesEl.appendChild(item);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function normalize(text) {
  return text.toLowerCase().trim();
}

function looksLikeMathProblem(input) {
  const numericPattern = /\d/;
  const operatorPattern = /[+\-*/=^]/;
  const mathTerms = ['solve', 'find', 'calculate', 'value of', 'equation', 'area', 'volume'];
  const low = normalize(input);

  return (numericPattern.test(low) && operatorPattern.test(low)) || mathTerms.some((term) => low.includes(term));
}

function isSyllabusRelated(input) {
  const low = normalize(input);
  return syllabusHints.some((hint) => low.includes(hint));
}

function detectCheatingRequest(input) {
  const low = normalize(input);
  return restrictedCheatingPhrases.some((phrase) => low.includes(phrase));
}

function buildTheoryTemplate(question) {
  return [
    'Chapter: Please specify chapter name | Topic: Please specify exact topic',
    '',
    'Concept Explanation',
    '- This question is treated as a theory question within Class 9-10 syllabus.',
    `- Question focus: ${question}`,
    '',
    'Step-by-step breakdown',
    '- Step 1: Identify the chapter and topic from your textbook.',
    '- Step 2: Write the core definition or law in simple words.',
    '- Step 3: Add 2-3 key points used in board answers.',
    '- Step 4: Connect the concept with one textbook example.',
    '',
    'Example (if applicable)',
    '- Example: Mention a textbook-style example from the same chapter and explain why it fits.',
    '',
    'Key Points Summary',
    '- Stay within NCERT/Class 9-10 content.',
    '- Use definitions, laws, and labelled points.',
    '- Keep answers structured for exams.',
    '',
    '5 Practice Questions',
    '1) Define the main concept in one line.',
    '2) Write two characteristics of the concept.',
    '3) Explain one real-life application.',
    '4) Differentiate it from a related concept.',
    '5) Write a short board-style answer (3-4 marks).',
    '',
    'Answers to Practice Questions',
    '1) Use textbook definition from the chapter.',
    '2) List any two valid textbook characteristics.',
    '3) Give one correct textbook-level example.',
    '4) Compare definition, use, and key difference.',
    '5) Include definition + points + one example.'
  ].join('\n');
}

function buildNumericalTemplate(question) {
  return [
    'Chapter: Please specify chapter name | Topic: Please specify exact topic',
    '',
    'Given',
    `- Problem statement: ${question}`,
    '- List known values and required quantity.',
    '',
    'Formula Used',
    '- Write the standard NCERT formula for this topic.',
    '',
    'Step-by-step Solution',
    '- Step 1: Substitute known values carefully.',
    '- Step 2: Solve in proper sequence.',
    '- Step 3: Attach unit in the final step.',
    '',
    'Final Answer',
    '- Write the final value clearly with unit.',
    '',
    'Common Mistake Warning',
    '- Avoid unit conversion mistakes and sign errors.',
    '',
    '3 Similar Practice Questions',
    '1) Solve a similar question with different values.',
    '2) Solve a direct formula-based question from this topic.',
    '3) Solve a word problem from the same chapter.',
    '',
    'Answers',
    '1) Use same steps: Given -> Formula -> Substitution -> Final Answer.',
    '2) Keep units consistent before calculation.',
    '3) Convert all quantities to standard units first.'
  ].join('\n');
}

function startTestFlow() {
  testModeState.active = true;
  testModeState.step = 1;
  testModeState.subject = '';
  testModeState.chapter = '';
  testModeState.difficulty = '';

  return [
    'Quiz Mode',
    '- Subject: Please enter subject name.',
    '- Chapter: I will ask after subject.',
    '- Difficulty: Easy / Medium / Hard (asked in next steps).'
  ].join('\n');
}

function continueTestFlow(input) {
  if (testModeState.step === 1) {
    testModeState.subject = input;
    testModeState.step = 2;
    return 'Quiz Mode\n- Chapter: Please enter chapter name.';
  }

  if (testModeState.step === 2) {
    testModeState.chapter = input;
    testModeState.step = 3;
    return 'Quiz Mode\n- Difficulty: Choose Easy / Medium / Hard.';
  }

  if (testModeState.step === 3) {
    testModeState.difficulty = input;
    testModeState.step = 4;
    return [
      'Quiz Mode',
      `- Subject: ${testModeState.subject}`,
      `- Chapter: ${testModeState.chapter}`,
      `- Difficulty: ${testModeState.difficulty}`,
      '- Generated 10 questions:',
      '1) Define one key term from this chapter.',
      '2) Write one short-answer concept question.',
      '3) Explain one process in steps.',
      '4) Write one reason-based question.',
      '5) Give one assertion-reason question.',
      '6) Write one application-based question.',
      '7) Include one numerical/problem-solving question.',
      '8) Write one diagram/map/data interpretation question.',
      '9) Write one previous-year style question.',
      '10) Write one higher-order thinking question.',
      '- Send your answers in order (1-10).',
      '- After submission, I will evaluate score and weak topics.'
    ].join('\n');
  }

  return [
    'Quiz Evaluation',
    '- Score: Evaluation pending (demo mode).',
    '- Weak Topics: I will identify after checking your detailed answers.',
    '- Please provide answers in numbered format (1-10) for proper evaluation.'
  ].join('\n');
}

function buildRevisionTemplate() {
  return [
    'Revision Mode',
    '- Please provide subject and chapter name to begin.',
    '',
    'After chapter is provided, response structure will be:',
    '1) Chapter summary',
    '2) Important formulas / definitions',
    '3) Frequently asked questions',
    '4) 10 rapid revision questions'
  ].join('\n');
}

function generateTutorResponse(input) {
  const low = normalize(input);

  if (detectCheatingRequest(low)) {
    return 'I can help you understand the concept, but I cannot assist in cheating.';
  }

  if (low.includes('start test')) {
    return startTestFlow();
  }

  if (testModeState.active) {
    return continueTestFlow(input);
  }

  if (low.includes('revise chapter')) {
    return buildRevisionTemplate();
  }

  if (!isSyllabusRelated(low)) {
    return 'This topic is outside the defined syllabus.';
  }

  if (looksLikeMathProblem(low)) {
    return buildNumericalTemplate(input);
  }

  return buildTheoryTemplate(input);
}

appendMessage(
  'bot',
  [
    'Chapter: Orientation | Topic: Class 9-10 Tutor Rules',
    '',
    'Concept Explanation',
    '- I answer only Class 9-10 syllabus related academic questions.',
    '',
    'Step-by-step breakdown',
    '- Ask chapter and topic clearly.',
    '- For math/numericals, include all given values.',
    '- Use "Start Test" for quiz mode or "Revise Chapter" for revision mode.',
    '',
    'Example (if applicable)',
    '- Example query: "Class 10 Science, Chapter Electricity: Explain Ohm\'s Law".',
    '',
    'Key Points Summary',
    '- Syllabus only.',
    '- Structured exam-focused format.',
    '- Concept teaching only, no cheating help.',
    '',
    '5 Practice Questions',
    '1) Which class and subject do you need help with?',
    '2) Which chapter is your question from?',
    '3) Is your question theory or numerical?',
    '4) Do you want Start Test mode?',
    '5) Do you want Revise Chapter mode?',
    '',
    'Answers to Practice Questions',
    '1) Mention Class 9 or 10 with subject.',
    '2) Mention exact chapter name.',
    '3) Say theory or numerical.',
    '4) Type "Start Test".',
    '5) Type "Revise Chapter".'
  ].join('\n')
);

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  messageInput.value = '';

  const response = generateTutorResponse(userMessage);
  setTimeout(() => appendMessage('bot', response), 200);
});
