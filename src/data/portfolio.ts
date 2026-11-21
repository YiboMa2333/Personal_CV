export const person = {
  name: 'Yibo Ma', role: 'Computer Science at UCL', location: 'London, UK',
  email: 'yibo.ma.25@ucl.ac.uk', phone: '+44 7960 513809', telephone: '+447960513809',
  linkedin: 'https://linkedin.com/in/yibo-ma-b053a843b', github: 'https://github.com/YiboMa2333',
};
export const navigation = [
  { href: '/', label: 'Home' }, { href: '/projects/', label: 'Projects' },
  { href: '/background/', label: 'Background' }, { href: '/contact/', label: 'Contact Information' },
];
export interface Project {
  id: string; title: string; short: string; category: string; ongoing?: boolean;
  purpose: string; contribution: string; outcome: string; technologies: string[];
  detail: string; source?: string; sourceLabel?: string;
}
export const projects: Project[] = [
  { id: 'super-happy-space', title: 'Super Happy Space 2.0', short: 'Super Happy Space', category: 'Accessible play · Local AI', ongoing: true,
    purpose: 'Turning prompts and selected music into accessible rhythm-game experiences, through a UCL Systems Engineering project with the National Autistic Society and MotionInput.',
    contribution: 'Development work combines prompt-driven game generation, accessible gesture controls and synchronised gameplay or reading prompts. Design work explores IBM Granite 4.1 and BOB for lyrics and narrative generation.',
    outcome: 'Ongoing development. AI, audio-analysis and engine integrations are being designed and developed; the diagram illustrates the intended pipeline.',
    technologies: ['Local AI', 'Onrails Engine 2', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js', 'Vite'],
    detail: 'FFT-based beat tracking and audio/MIDI analysis are intended to connect selected music to synchronised interactions. MultiPlay SDK provides the related shared motion-input work; these integrations are development work rather than a claim of a finished system.' },
  { id: 'multiplay', title: 'MultiPlay SDK', short: 'MultiPlay SDK', category: 'Computer vision · Shared infrastructure', ongoing: true,
    purpose: 'A shared motion-input SDK designed for up to four simultaneous players, developed across UCL IXN teams.',
    contribution: 'Team contribution to 12 cardio and torso movement detectors, with player-tagged ActionEvent outputs, selective inference gating, calibration and temporal motion buffers.',
    outcome: 'Ongoing cross-team development. The event flow below is a simulation of the intended player-tagged interface, not live pose inference.',
    technologies: ['Python', 'NumPy', 'MediaPipe Pose / Hand / Face', 'FFT', 'Zero-crossing analysis'],
    detail: '15-frame ring buffers retain temporal motion information. Selective inference gating and calibration support detector decisions, while beat-aligned timing connects movement events to rhythm interactions in Super Happy Space.' },
  { id: 'document-matcher', title: 'Language-Model-Based Label-and-Value Matcher', short: 'Document matcher', category: 'Document processing · Applied AI',
    purpose: 'Extracting structured fields from PDF, Word and Excel documents for booking-form processing.',
    contribution: 'Built a pipeline combining document conversion and OCR with language-model field matching, structured JSON output and a PySide6 desktop interface.',
    outcome: 'Applied to booking-form extraction for a shipping company and received positive user feedback.',
    technologies: ['Python', 'PaddleOCR', 'PyMuPDF', 'LibreOffice', 'Baidu Qianfan API', 'ERNIE 4.5 Turbo', 'JSON', 'PySide6'],
    detail: 'Document conversion and OCR make heterogeneous source files available to the field-matching stage. Structured JSON gives the downstream application a consistent representation. The preview uses invented sample data, not company records.',
    source: 'https://github.com/YiboMa2333/Language-Model-Based-Label-and-Value-Matcher' },
  { id: 'input-overlay', title: 'Input Overlay Desktop', short: 'Input Overlay', category: 'Native Windows · Systems programming',
    purpose: 'A native Windows adaptation of an open-source input overlay for live keyboard and mouse visualisation.',
    contribution: 'Implemented a click-through display, editable layouts and system-tray controls using native Windows input and drawing APIs.',
    outcome: 'A desktop adaptation with live input visualisation. The focused web preview demonstrates the idea without reading system-wide input.',
    technologies: ['C++20', 'Win32 Raw Input', 'Direct2D', 'DirectWrite', 'CMake', 'CTest'],
    detail: 'Win32 Raw Input supplies keyboard and mouse events, while Direct2D and DirectWrite draw the overlay. The browser illustration only responds when its preview has focus; it is not the native application.',
    source: 'https://github.com/YiboMa2333/Input_Overlay_on_desktop' },
  { id: 'tetris', title: 'Tetris AI', short: 'Tetris AI', category: 'Search · Heuristic evaluation',
    purpose: 'Choosing Tetris placements by evaluating the board that each move leaves behind.',
    contribution: 'Developed a two-step-lookahead agent using weighted board heuristics, including holes, bumpiness, gaps and height.',
    outcome: 'Achieved second place among approximately 200 students.',
    technologies: ['Two-step lookahead', 'Weighted heuristics', 'Board evaluation'],
    detail: 'The agent considers a placement and a subsequent move, then compares board features through a weighted heuristic. The recreated illustration explains the features; it does not run the original agent or reproduce its exact weights.',
    source: 'https://github.com/YiboMa2333/TetrisAI', sourceLabel: 'View Tetris AI gameplay demo' },
  { id: 'bioreactor', title: 'Automated Bioreactor Control System', short: 'Bioreactor control', category: 'Embedded systems · Feedback control',
    purpose: 'Controlling heating using measurements from an analogue temperature-sensing system.',
    contribution: 'Implemented sensor-voltage conversion and proportional heating control on Arduino.',
    outcome: 'Implemented the heating-control loop. The explanatory chart uses illustrative data and does not report measured system performance.',
    technologies: ['Arduino', 'C++', 'Analogue sensing', 'Proportional control'],
    detail: 'Sensor voltage is converted into a temperature estimate. The difference between the setpoint and the estimate determines a proportional control response. No accuracy, stability or response-time measurement is claimed.' },
  { id: 'sun-glare', title: 'Sun-Glare Detection Model', short: 'Sun-glare detection', category: 'Computer vision · Dataset annotation',
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
  { title: 'Alliance management', text: 'Alliance-management role.' },
  { title: 'Mathematics Club', text: 'Club leadership.' },
  { title: 'Limin Village volunteering', text: 'Volunteer participation.' },
  { title: 'Badminton', text: 'Badminton participation.' },
  { title: 'Engineering Society', text: 'Attendance at guest lectures.' },
];
export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'TypeScript'] },
  { group: 'Web & interfaces', items: ['React', 'Node.js', 'Vite', 'Tailwind CSS', 'Motion', 'PySide6'] },
  { group: 'AI & data', items: ['NumPy', 'MediaPipe', 'PaddleOCR', 'PyMuPDF', 'YOLO', 'Roboflow'] },
  { group: 'Systems & hardware', items: ['Win32', 'Direct2D', 'DirectWrite', 'CMake', 'CTest', 'Arduino'] },
];
