export const person = {
  name: 'Yibo Ma', role: 'Computer Science at UCL', location: 'London, UK',
  email: 'yibo.ma.25@ucl.ac.uk', phone: '+44 7960 513809', telephone: '+447960513809',
  linkedin: 'https://linkedin.com/in/yibo-ma-b053a843b', github: 'https://github.com/YiboMa2333',
};
export const navigation = [
  { href: '/', label: 'Home' }, { href: '/projects/', label: 'Projects' },
  { href: '/background/', label: 'Background' }, { href: '/contact/', label: 'Contact Information' },
];
export const cv = { href: '/downloads/Yibo_Ma_CV.docx', label: 'Download CV (DOCX)' };
interface MediaBase { src: string; caption: string }
export interface ProjectImage extends MediaBase { kind: 'image'; alt: string }
export interface ProjectVideo extends MediaBase {
  kind: 'video'; poster: string; width: number; height: number;
  transcript?: string;
  captions?: { src: string; language: string; label: string };
}
export type ProjectMediaRecord = ProjectImage | ProjectVideo;
export interface Project {
  id: string; title: string; short: string; category: string; ongoing?: boolean;
  summary: string; mediaFolder: string;
  purpose: string; contribution: string; outcome: string; technologies: string[];
  detail: string; source?: string; sourceLabel?: string;
  media?: ProjectMediaRecord[];
}
export const projects: Project[] = [
  { id: 'super-happy-space', title: 'Super Happy Space 2.0', short: 'Super Happy Space', category: 'Accessible play · Local AI', ongoing: true,
    summary: 'Prompt-driven rhythm games combining local AI, selected music and accessible gesture controls.', mediaFolder: 'Super-Happy-Space-2.0',
    purpose: 'Turning prompts and selected music into accessible rhythm-game experiences, through a UCL Systems Engineering project with the National Autistic Society and MotionInput.',
    contribution: 'Development work combines prompt-driven game generation, accessible gesture controls and synchronised gameplay or reading prompts. Design work explores IBM Granite 4.1 and BOB for lyrics and narrative generation.',
    outcome: 'Ongoing development. AI, audio-analysis and engine integrations are being designed and developed; the diagram illustrates the intended pipeline.',
    technologies: ['Local AI', 'Onrails Engine 2', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js', 'Vite'],
    detail: 'FFT-based beat tracking and audio/MIDI analysis are intended to connect selected music to synchronised interactions. MultiPlay SDK provides the related shared motion-input work; these integrations are development work rather than a claim of a finished system.' },
  { id: 'multiplay', title: 'MultiPlay SDK', short: 'MultiPlay SDK', category: 'Computer vision · Shared infrastructure', ongoing: true,
    summary: 'Shared motion-input infrastructure for player-tagged gesture events across up to four players.', mediaFolder: 'MultiPlay-SDK',
    purpose: 'A shared motion-input SDK designed for up to four simultaneous players, developed across UCL IXN teams.',
    contribution: 'Team contribution to 12 cardio and torso movement detectors, with player-tagged ActionEvent outputs, selective inference gating, calibration and temporal motion buffers.',
    outcome: 'Ongoing cross-team development. The event flow below is a simulation of the intended player-tagged interface, not live pose inference.',
    technologies: ['Python', 'NumPy', 'MediaPipe Pose / Hand / Face', 'FFT', 'Zero-crossing analysis'],
    detail: '15-frame ring buffers retain temporal motion information. Selective inference gating and calibration support detector decisions, while beat-aligned timing connects movement events to rhythm interactions in Super Happy Space.' },
  { id: 'document-matcher', title: 'Language-Model-Based Label-and-Value Matcher', short: 'Document matcher', category: 'Document processing · Applied AI',
    summary: 'Document conversion, OCR and language models turn booking forms into structured data.', mediaFolder: 'Language-Model-Based-Label-and-Value-Matcher',
    purpose: 'Extracting structured fields from PDF, Word and Excel documents for booking-form processing.',
    contribution: 'Built a pipeline combining document conversion and OCR with language-model field matching, structured JSON output and a PySide6 desktop interface.',
    outcome: 'Applied to booking-form extraction for a shipping company and received positive user feedback.',
    technologies: ['Python', 'PaddleOCR', 'PyMuPDF', 'LibreOffice', 'Baidu Qianfan API', 'ERNIE 4.5 Turbo', 'JSON', 'PySide6'],
    detail: 'Document conversion and OCR make heterogeneous source files available to the field-matching stage. Structured JSON gives the downstream application a consistent representation. The preview uses invented sample data, not company records.',
    source: 'https://github.com/YiboMa2333/Language-Model-Based-Label-and-Value-Matcher' },
  { id: 'input-overlay', title: 'Input Overlay Desktop', short: 'Input Overlay', category: 'Native Windows · Systems programming',
    summary: 'A native Windows keyboard and mouse overlay with editable layouts and click-through display.', mediaFolder: 'Input-Overlay-Desktop',
    purpose: 'A native Windows adaptation of an open-source input overlay for live keyboard and mouse visualisation.',
    contribution: 'Implemented a click-through display, editable layouts and system-tray controls using native Windows input and drawing APIs.',
    outcome: 'A desktop adaptation with live input visualisation. The focused web preview demonstrates the idea without reading system-wide input.',
    technologies: ['C++20', 'Win32 Raw Input', 'Direct2D', 'DirectWrite', 'CMake', 'CTest'],
    detail: 'Win32 Raw Input supplies keyboard and mouse events, while Direct2D and DirectWrite draw the overlay. The browser illustration only responds when its preview has focus; it is not the native application.',
    source: 'https://github.com/YiboMa2333/Input_Overlay_on_desktop' },
  { id: 'tetris', title: 'Tetris AI', short: 'Tetris AI', category: 'Search · Heuristic evaluation',
    media: [
      { kind: 'video', src: '/media/Tetris-AI/demo.mp4', poster: '/media/Tetris-AI/demo-poster.webp', width: 460, height: 762, caption: 'Coursework gameplay demonstration: the Tetris agent selects and plays block placements automatically.' },
      { kind: 'image', src: '/media/Tetris-AI/2nd_Place.jpg', alt: 'Projected coursework leaderboard with Yibo Ma listed in second place.', caption: 'Coursework leaderboard showing Yibo Ma in second place.' },
    ],
    summary: 'A two-step-lookahead agent using board heuristics. Second place among approximately 200 students.', mediaFolder: 'Tetris-AI',
    purpose: 'Choosing Tetris placements by evaluating the board that each move leaves behind.',
    contribution: 'Developed a two-step-lookahead agent using weighted board heuristics, including holes, bumpiness, gaps and height.',
    outcome: 'Achieved second place among approximately 200 students.',
    technologies: ['Two-step lookahead', 'Weighted heuristics', 'Board evaluation'],
    detail: 'The agent considers a placement and a subsequent move, then compares board features through a weighted heuristic. The recreated illustration explains the features; it does not run the original agent or reproduce its exact weights.',
    source: 'https://github.com/YiboMa2333/TetrisAI', sourceLabel: 'View Tetris AI gameplay demo' },
  { id: 'bioreactor', title: 'Automated Bioreactor Control System', short: 'Bioreactor control', category: 'Embedded systems · Feedback control',
    media: [
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/block_diagram.png', alt: 'Block diagram linking a real-time controller, power supply, heater and thermistor feedback.', caption: 'Heating-control architecture and thermistor feedback diagram.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/Heater.jpg', alt: 'Hand-drawn thermistor voltage-divider connections to an Arduino Nano, with a 10-kilohm resistor.', caption: 'Thermistor sensing circuit and Arduino Nano connections.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/Sensor.jpg', alt: 'Hand-drawn Arduino Nano and MOSFET circuit controlling a heater with a 12-volt supply.', caption: 'MOSFET-controlled heater circuit and Arduino Nano connections.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/HeatingResult.png', alt: 'Supplied temperature-versus-time plot with temperature on the vertical axis and minutes on the horizontal axis.', caption: 'Supplied heating temperature-versus-time plot.' },
    ],
    summary: 'Arduino heating control that translates sensor voltages into a proportional feedback response.', mediaFolder: 'Automated-Bioreactor-Control-System',
    purpose: 'Controlling heating using measurements from an analogue temperature-sensing system.',
    contribution: 'Implemented sensor-voltage conversion and proportional heating control on Arduino.',
    outcome: 'Implemented the heating-control loop. The explanatory chart uses illustrative data and does not report measured system performance.',
    technologies: ['Arduino', 'C++', 'Analogue sensing', 'Proportional control'],
    detail: 'Sensor voltage is converted into a temperature estimate. The difference between the setpoint and the estimate determines a proportional control response. No accuracy, stability or response-time measurement is claimed.' },
  { id: 'sun-glare', title: 'Sun-Glare Detection Model', short: 'Sun-glare detection', category: 'Computer vision · Dataset annotation',
    summary: 'A YOLO detector trained on sun-glare images annotated in Roboflow.', mediaFolder: 'Sun-Glare-Detection-Model',
    purpose: 'Training an object detector to identify sun glare in images.',
    contribution: 'Annotated sun-glare images in Roboflow and trained a YOLO detector.',
    outcome: 'Completed annotation and model training. No unverified detection-accuracy metric is presented.',
    technologies: ['Roboflow', 'YOLO', 'Image annotation'],
    detail: 'Image annotation defines the training targets used by the detector. The visual is an abstract explanation of annotation, training and detection; it is not genuine imagery or model output.' },
];
export const education = [
  { institution: 'University College London', period: '2025–Present', qualification: 'BSc Computer Science', details: 'Expected upper second-class honours based on first-year results.' },
  { institution: 'Ningbo Foreign Language School', period: '2022–2025', qualification: 'Secondary education', details: 'Top-two overall GPA ranking among approximately 100 students.' },
];
export const activities = [
  { title: 'Alliance Management Team Member', context: 'Ice War Three Kingdoms', text: 'Coordinate alliance activities, mediate external disputes and contribute to long-term development priorities and strategy.' },
  { title: 'School Mathematics Club Leader', context: 'Ningbo Foreign Language School', text: 'Organised weekly activities, allocated training tasks and promoted competitions for 15 members, eight of whom placed in the top 15% of AMC 12.' },
  { title: 'Limin Village Programme', context: 'Sponsor and Organiser · Caring the Old', text: 'Led a teenage volunteer team teaching introductory English to older villagers. Coordinated the Moments in Life photography exhibition and performances of Funeral Feast and All About Times.' },
  { title: 'UCL Badminton Society', context: 'Society participation', text: 'Regularly attended weekly badminton sessions.' },
  { title: 'UCL Engineering Society', context: 'Guest lectures', text: 'Attend lectures by company managers and visiting scholars to learn about industry, research and career opportunities.' },
];
export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'C/C++', 'Haskell', 'SQL', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { group: 'AI, vision & APIs', items: ['NumPy', 'OpenVINO', 'FastAPI', 'MediaPipe', 'YOLO', 'Roboflow', 'PaddleOCR', 'PaddlePaddle', 'PaddleX', 'Baidu Qianfan API'] },
  { group: 'Documents & desktop', items: ['PyMuPDF', 'Pillow', 'openpyxl', 'python-dotenv', 'PySide6', 'LibreOffice', 'PyInstaller'] },
  { group: 'Web & Java', items: ['React', 'React DOM', 'Tailwind CSS', 'Motion', 'Lucide React', 'Node.js', 'Vite', 'Apache Tomcat', 'Jakarta Servlet', 'Apache Commons CSV', 'Jackson Databind', 'Maven'] },
  { group: 'Systems & hardware', items: ['Win32 Raw Input', 'Direct2D', 'DirectWrite', 'CMake', 'CTest', 'Arduino'] },
  { group: 'Foundations & tools', items: ['Data structures and algorithms', 'Object-oriented programming', 'Databases', 'Git/GitHub', 'VS Code', 'GitHub Copilot', 'ChatGPT Codex'] },
];
export const moduleGroups = [
  { title: 'Programming & software', modules: ['Principles of Programming', 'Object-Oriented Programming', 'Software Engineering', 'Systems Engineering'] },
  { title: 'Theory & mathematics', modules: ['Theory of Computation', 'Algorithms', 'Introductory Mathematics for Computer Science', 'Discrete Mathematics for Computer Scientists', 'Logic', 'Intermediate Mathematics for Computer Science'] },
  { title: 'Systems & security', modules: ['Computer Architecture and Concurrency', 'Security'] },
  { title: 'Engineering & professional practice', modules: ['Engineering Challenges', 'Design and Professional Skills I (Computer Science)', 'Understanding Management'] },
];
export const apResults = [
  { score: '5/5', subjects: ['Physics 1', 'Physics 2', 'Physics C', 'Computer Science Principles', 'Computer Science A', 'Calculus AB/BC', 'Chemistry', 'Microeconomics'] },
  { score: '4/5', subjects: ['Psychology', 'Macroeconomics'] },
];
export const awards = [
  { title: 'AP Scholar with Distinction', text: 'Awarded in 2024 and 2025.' },
  { title: 'AMC 12', text: 'Top 1%, Honor Roll of Distinction and qualification for AIME.' },
  { title: 'USACO', text: 'Silver.' },
  { title: 'iGEM', text: 'Team Gold.' },
  { title: 'British Physics Olympiad', text: 'Global Silver and Online Senior Gold.' },
  { title: 'Australian Mathematics Competition', text: 'Second award in the 9–11 and 11–12 categories.' },
];
export const experience = [
  { role: 'Video Editor', organisation: 'Suzhou Tianba Culture Media Co Ltd', period: 'April–August 2026 · Part-time', text: 'Edited gaming clips for online creators, producing content that generated over one million cumulative views in a single month.' },
  { role: 'Teaching Assistant', organisation: 'Ningbo Sanli Education', period: 'June–July 2025', text: 'Identified recurring errors in A-Level Mathematics practice and explained challenging topics through targeted student support.' },
];
