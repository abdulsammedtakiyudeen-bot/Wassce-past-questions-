export type Resource = {
  id: string;
  subject: string;
  year: number | null;
  paper: string;
  section: string;
  resourceType: string;
  title: string;
  description: string;
  filePath: string;
  fileSize: string;
  dateAdded: string;
  tags: string[];
  verifiedStatus: string;
  pageCount: number;
  rightsNote: string;
};

export type MockQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Mock = {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questionCount: number;
  difficulty: string;
  questions: MockQuestion[];
};

const byteLabel = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const resource = (
  item: Omit<Resource, 'fileSize'> & { fileSize: number },
): Resource => ({ ...item, fileSize: byteLabel(item.fileSize) });

export const resources: Resource[] = [
  resource({
    id: 'res-english-2026-paper-1',
    subject: 'English Language',
    year: 2026,
    paper: 'Paper 1',
    section: 'Objective Test',
    resourceType: 'Past Question',
    title: 'WASSCE 2026 English Language 1',
    description:
      'Scanned WASSCE 2026 English Language objective paper. The cover identifies subject code SC 4221 and a one-hour test.',
    filePath: `${import.meta.env.BASE_URL}resources/2026-english-language-paper-1.pdf`,
    fileSize: 5515001,
    pageCount: 20,
    dateAdded: '29 Sep 2026',
    tags: ['English', 'Objective', 'Scanned', '2026'],
    verifiedStatus: 'Verified from cover',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-core-maths-2026-paper-1',
    subject: 'Core Mathematics',
    year: 2026,
    paper: 'Paper 1',
    section: 'Objective Test',
    resourceType: 'Past Question',
    title: 'WASSCE 2026 Core Mathematics 1',
    description:
      'Scanned WASSCE 2026 Mathematics objective paper. The cover identifies a 40-mark, one-hour-fifteen-minute test.',
    filePath: `${import.meta.env.BASE_URL}resources/2026-core-mathematics-paper-1.pdf`,
    fileSize: 2891471,
    pageCount: 14,
    dateAdded: '29 Sep 2026',
    tags: ['Mathematics', 'Core', 'Objective', 'Scanned', '2026'],
    verifiedStatus: 'Verified from cover',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-science-2026-paper-1',
    subject: 'Integrated Science',
    year: 2026,
    paper: 'Paper 1',
    section: 'Objective Test',
    resourceType: 'Past Question',
    title: 'WASSCE 2026 General Science 1',
    description:
      'Scanned WASSCE 2026 General Science objective paper. The cover identifies subject code SC 5401, 60 marks, and a one-hour-thirty-minute test.',
    filePath: `${import.meta.env.BASE_URL}resources/2026-integrated-science-paper-1.pdf`,
    fileSize: 5387658,
    pageCount: 22,
    dateAdded: '29 Sep 2026',
    tags: ['Science', 'Integrated Science', 'Objective', 'Scanned', '2026'],
    verifiedStatus: 'Verified from cover',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-social-studies-2026-paper-1',
    subject: 'Social Studies',
    year: 2026,
    paper: 'Paper 1',
    section: 'Objective Test',
    resourceType: 'Past Question',
    title: 'WASSCE 2026 Social Studies 1',
    description:
      'Scanned WASSCE 2026 Social Studies objective paper. The cover identifies subject code SC 2261 and a 50-minute test.',
    filePath: `${import.meta.env.BASE_URL}resources/2026-social-studies-paper-1.pdf`,
    fileSize: 3217700,
    pageCount: 11,
    dateAdded: '29 Sep 2026',
    tags: ['Social Studies', 'Objective', 'Scanned', '2026'],
    verifiedStatus: 'Verified from cover',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-science-2026-practical',
    subject: 'Integrated Science',
    year: 2026,
    paper: 'Practical / Essay',
    section: 'Structured questions',
    resourceType: 'Past Question',
    title: 'WASSCE 2026 Integrated Science Practical',
    description:
      'Scanned practical-style science pages with labelled human excretory-system diagrams and structured questions. The first visible page is an interior scan, so paper details are kept conservative.',
    filePath: `${import.meta.env.BASE_URL}resources/2026-integrated-science-practical.pdf`,
    fileSize: 4065879,
    pageCount: 7,
    dateAdded: '29 Sep 2026',
    tags: ['Science', 'Practical', 'Diagrams', 'Scanned', '2026'],
    verifiedStatus: 'Subject and year inferred from internal footer',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-government-2022-paper-2',
    subject: 'Government',
    year: 2022,
    paper: 'Paper 2',
    section: 'Essay',
    resourceType: 'Past Question',
    title: 'WASSCE 2022 Government 2',
    description:
      'WASSCE 2022 Government essay paper. The cover identifies a two-hour paper with Sections A and B.',
    filePath: `${import.meta.env.BASE_URL}resources/2022-government-paper-2.pdf`,
    fileSize: 231478,
    pageCount: 3,
    dateAdded: '29 Sep 2026',
    tags: ['Government', 'Essay', '2022', 'Scanned'],
    verifiedStatus: 'Verified from cover',
    rightsNote:
      'Supplied examination material. Copyright and examination rights remain with the original rights holder.',
  }),
  resource({
    id: 'res-science-selected-answers',
    subject: 'Integrated Science',
    year: null,
    paper: 'Selected answers',
    section: 'Answer notes',
    resourceType: 'Answer / Marking Scheme',
    title: 'WASSCE Science Answers (Selected)',
    description:
      'A short, user-supplied answer sheet covering selected science questions. It is not presented as an official WAEC marking scheme.',
    filePath: `${import.meta.env.BASE_URL}resources/wassce-science-selected-answers.pdf`,
    fileSize: 2390,
    pageCount: 1,
    dateAdded: '29 Sep 2026',
    tags: ['Science', 'Answers', 'Selected', 'User supplied'],
    verifiedStatus: 'Content inspected; official status not verified',
    rightsNote:
      'Supplied material. Source ownership and accuracy have not been independently verified.',
  }),
  resource({
    id: 'res-core-maths-black-mock',
    subject: 'Core Mathematics',
    year: 2026,
    paper: 'Papers 1 and 2',
    section: 'Objective and essay',
    resourceType: 'Mock',
    title: 'Core Mathematics Black Mock',
    description:
      'An independently authored 2026 Core Mathematics mock booklet with objective questions, essay questions, model answers, and a marking scheme.',
    filePath: `${import.meta.env.BASE_URL}resources/core-mathematics-black-mock-2026.pdf`,
    fileSize: 67266,
    pageCount: 26,
    dateAdded: '29 Sep 2026',
    tags: ['Mathematics', 'Mock', 'Paper 1', 'Paper 2', 'Independent'],
    verifiedStatus: 'Content inspected; independent mock',
    rightsNote:
      'The booklet identifies GhLearner as its source. It is not an official WAEC publication.',
  }),
  resource({
    id: 'res-core-maths-midnight-mock',
    subject: 'Core Mathematics',
    year: 2026,
    paper: 'Papers 1 and 2',
    section: 'Objective and essay',
    resourceType: 'Mock',
    title: 'Core Mathematics Midnight Mock',
    description:
      'An independently authored 2026 Core Mathematics mock with Paper 2 first, followed by Paper 1, model answers, and exam strategy notes.',
    filePath: `${import.meta.env.BASE_URL}resources/core-mathematics-midnight-mock-2026.pdf`,
    fileSize: 65419,
    pageCount: 25,
    dateAdded: '29 Sep 2026',
    tags: ['Mathematics', 'Mock', 'Paper 1', 'Paper 2', 'Independent'],
    verifiedStatus: 'Content inspected; independent mock',
    rightsNote:
      'The booklet identifies GhLearner as its source. It is not an official WAEC publication.',
  }),
  resource({
    id: 'res-core-maths-red-mock',
    subject: 'Core Mathematics',
    year: 2026,
    paper: 'Papers 1 and 2',
    section: 'Objective and essay',
    resourceType: 'Mock',
    title: 'Core Mathematics Red Mock',
    description:
      'An independently authored 2026 Core Mathematics mock with objective and essay papers, model answers, and a marking scheme.',
    filePath: `${import.meta.env.BASE_URL}resources/core-mathematics-red-mock-2026.pdf`,
    fileSize: 61082,
    pageCount: 23,
    dateAdded: '29 Sep 2026',
    tags: ['Mathematics', 'Mock', 'Paper 1', 'Paper 2', 'Independent'],
    verifiedStatus: 'Content inspected; independent mock',
    rightsNote:
      'The booklet identifies GhLearner as its source. It is not an official WAEC publication.',
  }),
  resource({
    id: 'res-dark-stain-society',
    subject: 'General',
    year: null,
    paper: 'N/A',
    section: 'Reading material',
    resourceType: 'Other',
    title: "The Dark Stain on Today's Society",
    description:
      'An independently authored social commentary booklet supplied with the resource set. It is not a WASSCE examination paper or official study guide.',
    filePath: `${import.meta.env.BASE_URL}resources/the-dark-stain-on-todays-society.pdf`,
    fileSize: 3452350,
    pageCount: 7,
    dateAdded: '29 Sep 2026',
    tags: ['Reading', 'Society', 'Independent', 'Author supplied'],
    verifiedStatus: 'Content inspected; independent publication',
    rightsNote:
      'The cover credits Abdul Sammed Takiyudeen. Copyright remains with the author.',
  }),
];

export const mocks: Mock[] = [
  {
    id: 'mock-core-maths-foundations',
    title: 'Core Maths Foundations',
    subject: 'Core Mathematics',
    durationMinutes: 12,
    questionCount: 5,
    difficulty: 'Starter',
    questions: [
      { id: 'cmf-1', prompt: 'What is 15% of 240?', options: ['24', '36', '40', '45'], answer: 1, explanation: '15% of 240 is 0.15 × 240 = 36.' },
      { id: 'cmf-2', prompt: 'If 3x + 5 = 20, what is x?', options: ['3', '5', '7', '15'], answer: 1, explanation: 'Subtract 5, then divide by 3: x = 15 ÷ 3 = 5.' },
      { id: 'cmf-3', prompt: 'The bearing of B from A is 060°. What is the bearing of A from B?', options: ['120°', '180°', '240°', '300°'], answer: 2, explanation: 'The reverse bearing is 060° + 180° = 240°.' },
      { id: 'cmf-4', prompt: 'A bag has 3 red and 2 blue balls. What is the probability of selecting a blue ball?', options: ['1/5', '2/5', '3/5', '1/2'], answer: 1, explanation: 'There are 2 blue balls out of 5 balls, so the probability is 2/5.' },
      { id: 'cmf-5', prompt: 'The mean of 4, 6, 8 and x is 7. Find x.', options: ['8', '9', '10', '12'], answer: 2, explanation: 'The total must be 4 × 7 = 28. Therefore x = 28 − 18 = 10.' },
    ],
  },
  {
    id: 'mock-english-quick-check',
    title: 'English Quick Check',
    subject: 'English Language',
    durationMinutes: 10,
    questionCount: 5,
    difficulty: 'Starter',
    questions: [
      { id: 'eqc-1', prompt: 'Choose the word closest in meaning to “brief”.', options: ['Short', 'Loud', 'Bright', 'Late'], answer: 0, explanation: 'Brief means short in duration or length.' },
      { id: 'eqc-2', prompt: 'Which sentence is correctly punctuated?', options: ['Ama said “I am ready”.', 'Ama said, “I am ready.”', 'Ama said “I am ready.”', 'Ama said, I am ready.'], answer: 1, explanation: 'A reporting clause is followed by a comma before the quotation.' },
      { id: 'eqc-3', prompt: 'What is the plural of “criterion”?', options: ['Criterions', 'Criteria', 'Criterion', 'Criterias'], answer: 1, explanation: 'Criteria is the standard plural form of criterion.' },
      { id: 'eqc-4', prompt: 'In “The runner moved swiftly”, what part of speech is “swiftly”?', options: ['Noun', 'Adjective', 'Adverb', 'Pronoun'], answer: 2, explanation: 'Swiftly describes how the runner moved, so it is an adverb.' },
      { id: 'eqc-5', prompt: 'A summary should mainly be…', options: ['Longer than the passage', 'A list of every example', 'Concise and in your own words', 'Copied word for word'], answer: 2, explanation: 'A good summary keeps the key ideas concise and uses your own words.' },
    ],
  },
  {
    id: 'mock-science-core-concepts',
    title: 'Science Core Concepts',
    subject: 'Integrated Science',
    durationMinutes: 12,
    questionCount: 5,
    difficulty: 'Starter',
    questions: [
      { id: 'scc-1', prompt: 'Which gas is released during photosynthesis?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen'], answer: 1, explanation: 'Plants release oxygen as a product of photosynthesis.' },
      { id: 'scc-2', prompt: 'The functional unit of the kidney is the…', options: ['Neuron', 'Alveolus', 'Nephron', 'Villus'], answer: 2, explanation: 'A nephron filters blood and forms urine.' },
      { id: 'scc-3', prompt: 'Which method separates an insoluble solid from a liquid?', options: ['Filtration', 'Distillation', 'Chromatography', 'Evaporation'], answer: 0, explanation: 'Filtration traps the insoluble solid while the liquid passes through.' },
      { id: 'scc-4', prompt: 'A force that opposes motion between surfaces is called…', options: ['Upthrust', 'Friction', 'Weight', 'Momentum'], answer: 1, explanation: 'Friction acts against relative motion between surfaces.' },
      { id: 'scc-5', prompt: 'What is the main function of red blood cells?', options: ['Fight pathogens', 'Clot wounds', 'Transport oxygen', 'Produce hormones'], answer: 2, explanation: 'Haemoglobin in red blood cells transports oxygen.' },
    ],
  },
  {
    id: 'mock-government-citizenship',
    title: 'Government & Citizenship',
    subject: 'Government',
    durationMinutes: 10,
    questionCount: 5,
    difficulty: 'Starter',
    questions: [
      { id: 'gcc-1', prompt: 'The supreme law of a state is its…', options: ['Manifesto', 'Constitution', 'Budget', 'Convention'], answer: 1, explanation: 'The constitution provides the foundational legal framework of a state.' },
      { id: 'gcc-2', prompt: 'A system in which citizens choose representatives is…', options: ['Direct democracy', 'Representative democracy', 'Monarchy', 'Oligarchy'], answer: 1, explanation: 'Citizens elect representatives to make decisions on their behalf.' },
      { id: 'gcc-3', prompt: 'Which arm of government interprets laws?', options: ['Executive', 'Legislature', 'Judiciary', 'Civil service'], answer: 2, explanation: 'The judiciary interprets and applies the law.' },
      { id: 'gcc-4', prompt: 'A citizen’s legal right to vote is called…', options: ['Suffrage', 'Diplomacy', 'Tenure', 'Census'], answer: 0, explanation: 'Suffrage is the right to vote in political elections.' },
      { id: 'gcc-5', prompt: 'The sharing of powers between central and regional governments is…', options: ['Unitary government', 'Federalism', 'Confederation', 'Imperialism'], answer: 1, explanation: 'Federalism constitutionally distributes power between levels of government.' },
    ],
  },
];

export const superMock: Mock = {
  id: 'super-mock-mixed-2026',
  title: 'WASSCE Super Mock · Mixed subjects',
  subject: 'Mixed subjects',
  durationMinutes: 40,
  questionCount: mocks.reduce((total, mock) => total + mock.questions.length, 0),
  difficulty: 'Full simulation',
  questions: mocks.flatMap((mock) =>
    mock.questions.map((question) => ({
      ...question,
      id: `${mock.id}-${question.id}`,
      prompt: `${mock.subject}: ${question.prompt}`,
    })),
  ),
};

export const subjects = [
  'Core Mathematics',
  'English Language',
  'Integrated Science',
  'Social Studies',
  'Elective Mathematics',
  'Government',
  'Economics',
  'Geography',
];