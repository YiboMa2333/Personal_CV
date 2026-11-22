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
  workflow?: { title: string; description: string }[];
  links?: { label: string; href: string }[];
  publication?: { title: string; author: string; venue: string; doi: string; url: string; summary: string };
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
  { id: 'input-overlay', title: 'Input Overlay Desktop', short: 'Input Overlay', category: 'Native Windows · Systems programming', ongoing: true,
    media: [
      { kind: 'video', src: '/media/Input-Overlay-Desktop/demo_Compact.mp4', poster: '/media/Input-Overlay-Desktop/demo_Compact-poster.webp', width: 436, height: 276, caption: 'Compact gaming layout: the native overlay highlights keyboard and mouse input as it is pressed.' },
      { kind: 'video', src: '/media/Input-Overlay-Desktop/demo_awsd+modifiers.mp4', poster: '/media/Input-Overlay-Desktop/demo_awsd_modifiers-poster.webp', width: 366, height: 190, caption: 'WASD + modifiers layout: a focused arrangement for movement keys, modifiers and the mouse.' },
      { kind: 'video', src: '/media/Input-Overlay-Desktop/demo_Single_Row.mp4', poster: '/media/Input-Overlay-Desktop/demo_Single_Row-poster.webp', width: 718, height: 164, caption: 'Single row layout: a horizontal arrangement showing live input in a low-height overlay.' },
      { kind: 'image', src: '/media/Input-Overlay-Desktop/dashboard.png', alt: 'Input Overlay tray menu with settings, edit, lock, reset, startup and exit commands.', caption: 'Tray controls: open Settings, edit or lock the overlay, reset its position and size, or exit the application.' },
      { kind: 'image', src: '/media/Input-Overlay-Desktop/Setting_Appearance.png', alt: 'Native Appearance settings for pressed and border colours, opacity, font, scale and spacing.', caption: 'Appearance settings: adjust colours, opacity, font, scale and spacing, then Apply to save.' },
      { kind: 'image', src: '/media/Input-Overlay-Desktop/Settting_Layout.png', alt: 'Native Layout settings with Compact gaming, WASD + modifiers and Single row presets and per-key position controls.', caption: 'Layout settings: select a preset, position or hide existing keys, and show or hide the mouse diagram.' },
      { kind: 'image', src: '/media/Input-Overlay-Desktop/Layout_Behavior.png', alt: 'Native Behavior settings for topmost display, click-through mode, aspect ratio, startup and the edit shortcut.', caption: 'Behaviour settings: configure topmost display, Edit/Locked mode, aspect-ratio lock, optional startup and the global shortcut.' },
    ],
    summary: 'A native Windows keyboard and mouse overlay with editable layouts and click-through display.', mediaFolder: 'Input-Overlay-Desktop',
    purpose: 'Visualising live keyboard and mouse input directly on the Windows desktop, without OBS. A native adaptation of the open-source input-overlay project.',
    contribution: 'Adapted the input overlay into a C++20 Windows application with Raw Input capture, Direct2D/DirectWrite rendering, click-through and editable modes, system-tray controls and native settings for appearance, layout and behaviour.',
    outcome: 'Independent project under development, with a Windows x64 preview release available. The recordings show the native application in three layouts. Remaining work includes gamepad support, mixed-DPI monitor testing and broader performance validation.',
    technologies: ['C++20', 'Win32 Raw Input', 'Direct2D', 'DirectWrite', 'CMake', 'CTest'],
    detail: 'Raw Input events update bounded held-key, button and wheel state independently of rendering. A timer redraws changed input state using Direct2D and DirectWrite; settings and geometry are persisted in a validated INI file. The repository CI configures MSVC and LLVM-MinGW builds, runs noninteractive CTest checks and validates packaging. Portable ZIP upload is restricted to an explicitly requested, gated main-branch workflow run. The adaptation is GPL-2.0-only. The focus-only browser illustration below is recreated and does not capture desktop input.',
    workflow: [
      { title: 'Open the tray controls', description: 'Launch the application and use its notification-area icon. The overlay starts locked, displaying live input while allowing clicks to reach the application underneath.' },
      { title: 'Position the overlay', description: 'Choose Edit Overlay from the tray, or use Ctrl+Alt+F8. Move the keyboard/mouse group and resize it with the selection handles.' },
      { title: 'Customise and apply', description: 'Open Settings to adjust Appearance, Layout and Behavior. Choose Compact gaming, WASD + modifiers or Single row, then Apply to save changes.' },
      { title: 'Lock and use', description: 'Choose Lock Overlay to restore click-through display. Closing Settings leaves the overlay running; choose Exit from the tray to quit.' },
    ],
    links: [
      { label: 'Preview release on GitHub', href: 'https://github.com/YiboMa2333/Input_Overlay_on_desktop/releases/tag/v0.1.0-preview.1' },
      { label: 'Settings and customisation guide', href: 'https://github.com/YiboMa2333/Input_Overlay_on_desktop/blob/main/docs/CUSTOMIZATION.md' },
      { label: 'Windows build and test workflow', href: 'https://github.com/YiboMa2333/Input_Overlay_on_desktop/blob/main/.github/workflows/windows-x64.yml' },
    ],
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
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/block_diagram.png', alt: 'Block diagram linking a real-time controller, power supply, heater and thermistor feedback.', caption: 'System architecture: thermistor feedback connects temperature sensing to the controller and heater power supply.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/Heater.jpg', alt: 'Hand-drawn thermistor voltage-divider connections to an Arduino Nano, with a 10-kilohm resistor.', caption: 'Temperature sensing: the supplied sketch shows the thermistor and resistor connections used to obtain an analogue voltage reading at the Arduino Nano.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/Sensor.jpg', alt: 'Hand-drawn Arduino Nano and MOSFET circuit controlling a heater with a 12-volt supply.', caption: 'Heater control: the supplied sketch shows an Arduino output connected to a MOSFET controlling the heater circuit.' },
      { kind: 'image', src: '/media/Automated-Bioreactor-Control-System/HeatingResult.png', alt: 'Supplied heating plot showing temperature rising over time and then levelling, with degrees Celsius and minutes on the axes.', caption: 'Project temperature-versus-time plot supplied with the media. This is separate from the recreated feedback-response illustration below; no control-accuracy or stability metric is claimed.' },
    ],
    summary: 'Arduino heating control that translates sensor voltages into a proportional feedback response.', mediaFolder: 'Automated-Bioreactor-Control-System',
    purpose: 'Regulating heating power in a bioreactor using temperature readings derived from analogue sensor voltages.',
    contribution: 'Implemented the heating-control subsystem on Arduino: converted sensor voltages into temperature readings and applied proportional control to regulate heating power.',
    outcome: 'Implemented the sensor-voltage conversion and proportional heating-control loop. The supplied architecture, circuit sketches and temperature plot are shown above. The recreated response curve below is illustrative.',
    technologies: ['Arduino', 'C++', 'Analogue sensing', 'Proportional control'],
    detail: 'The control path runs from analogue sensing to voltage-to-temperature conversion, then from temperature error to a proportional heating response. The supplied circuit sketches show thermistor sensing and a MOSFET-controlled heater. My implemented contribution was the heating-control subsystem; no unverified accuracy, stability or response-time measurement is claimed.' },
  { id: 'sun-glare', title: 'Sun-Glare Detection Model', short: 'Sun-glare detection', category: 'Computer vision · Dataset annotation',
    summary: 'YOLO-based glare detection in a school gym, with a paper examining how training-data sources affect performance.', mediaFolder: 'Sun-Glare-Detection-Model',
    purpose: 'Detecting sun glare in gym images and investigating how local and online training data affect the detector.',
    contribution: 'Annotated sun-glare images in Roboflow, trained a YOLO object detector and authored a case study comparing local, online and combined training data.',
    outcome: 'Completed annotation and model training, with the case study available through the paper DOI. The supplied detection example illustrates a prediction, rather than an overall accuracy measurement.',
    technologies: ['Roboflow', 'YOLO', 'Image annotation', 'Object detection', 'Training-data comparison'],
    detail: 'Annotation defines the glare regions used for detector training. The paper investigates data-source choices for the school-gym setting. Supplied source photographs and a detector-output example appear above; the annotation–training–detection visual below is an abstract illustration, not model output.',
    publication: {
      title: 'Evaluating the Impact of Online Database Integration on the Performance of a Sun Glare Detection Model: A Case Study from a Chinese High School Gym',
      author: 'Yibo Ma', venue: 'Advances in Engineering Technology Research', doi: '10.56028/aetr.12.1.1222.2024', url: 'https://doi.org/10.56028/aetr.12.1.1222.2024',
      summary: 'The abstract reports the strongest detection performance with local training data. Combining local and online images performed slightly worse, but reached high performance in fewer epochs and showed greater stability in this case study.',
    },
    media: [
      { kind: 'image', src: '/media/Sun-Glare-Detection-Model/detected.png', alt: 'Detector-output image of a gym with a blue glare bounding box and a displayed score of 0.69.', caption: 'Supplied detector output: a glare region is marked with a 0.69 detection confidence score. This score is not the model’s overall accuracy.' },
      { kind: 'image', src: '/media/Sun-Glare-Detection-Model/label (1).jpg', alt: 'Sunlight entering a gym through windows behind a basketball backboard.', caption: 'Source photograph: direct sunlight near the basketball backboard.' },
      { kind: 'image', src: '/media/Sun-Glare-Detection-Model/label (2).jpg', alt: 'Wide view of a gym with sunlight entering through roof glazing and reflecting on the court.', caption: 'Source photograph: overhead sunlight and reflections across the gym floor.' },
      { kind: 'image', src: '/media/Sun-Glare-Detection-Model/label (3).jpg', alt: 'Gym interior showing strong rays of sunlight through windows and bright reflections on the floor.', caption: 'Source photograph: window glare and reflected sunlight viewed across the court.' },
      { kind: 'image', src: '/media/Sun-Glare-Detection-Model/label (4).jpg', alt: 'Another view of the gym with direct sun rays beside a basketball backboard and light across the court.', caption: 'Source photograph: the glare source and surrounding court from another viewpoint.' },
    ],
  },
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
