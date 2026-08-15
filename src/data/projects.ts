import {
  adminnoAgenda,
  adminnoPortfolio,
  mijnAntwerpen1,
  mijnAntwerpen2,
  mijnAntwerpen3,
  mijnAntwerpen4,
  type CompanyId,
} from './assets'

export type Project = {
  id: string
  title: string
  tagline: string
  tag: string
  role: string
  company: CompanyId
  years?: string
  what: string
  tasks: string
  more?: string
  stack: string[]
  shots?: string[]
  shotAspect?: 'phone' | 'desktop'
  links?: { label: string; href: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'mijn-antwerpen',
    title: 'Mijn Antwerpen',
    tagline: 'The city of Antwerp in every resident’s pocket',
    tag: 'React Native · lead',
    role: 'React Native — Lead frontend developer',
    company: 'icapps',
    what: 'With this app residents of Antwerp can make appointments, request documents and send messages to the city, save points and exchange them for benefits, discover interesting activities, consult a map with important locations in the city and receive relevant updates (news, appointments, reminders, …).',
    tasks:
      'Front-end development. Architecture of the application. Designing and setup of the CI/CD. Integration of an authentication system throughout the application and in multiple webviews in the app. Make it secure and robust. WCAG AA implementation.',
    stack: ['React', 'React Native', 'TypeScript', 'Webviews', 'Mapbox', 'NFC', 'beacons', 'Jenkins', 'Jira'],
    shots: [mijnAntwerpen1, mijnAntwerpen2, mijnAntwerpen3, mijnAntwerpen4],
    shotAspect: 'phone',
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/mijn-antwerpen/id1642896636' },
      { label: 'Google Play', href: 'https://play.google.com/store/search?q=mijn+antwerpen&c=apps&hl=en' },
    ],
  },
  {
    id: 'sp-expert-connect',
    title: 'SP Expert Connect',
    tagline: 'HR platform — one shared codebase for web + app',
    tag: 'React & RN · lead',
    role: 'React & React Native — Lead frontend developer',
    company: 'icapps',
    what: 'SP Expert Connect is an HR application where employees can check their roster, vacation, shift-swaps and company resources. They can request vacation and shift swaps, or chat with each other. We made both an app and a web version of the platform.',
    tasks:
      'Front-end development. Architecture of the application, managing the CI/CD. Setup shared layer between web and app. Setup shared component library between different web apps. Wrote a chat functionality via websockets.',
    stack: [
      'React',
      'React Native',
      'TypeScript',
      'Redux',
      'Redux Observable',
      'Websockets',
      'SCSS',
      'Jenkins',
      'Jest',
      'Detox',
      'Cypress',
    ],
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.sp_expert_connect.app&hl=en' },
    ],
  },
  {
    id: 'keytrade',
    title: 'Keytrade',
    tagline: 'A complete native banking app rebuilt in React Native',
    tag: 'React & RN',
    role: 'React & React Native — Frontend developer',
    company: 'icapps',
    what: 'We replace the complete native banking application of Keytrade. The project included a POC with basic functionalities, redesign from scratch and provided native bridges for Vasco. The app comes with graphs, gestures and performance optimisations all in React Native. It’s also tablet ready. The project was rounded in about 1 year.',
    tasks:
      'Front-end development. Architecture of the application and data flow/management in the app. Implemented several security functions. Native module bridging.',
    more: 'Made the Keyhome platform, the online mortgage tool of Keytrade. Helped on the secure banking environment.',
    stack: ['React', 'React Native', 'Redux', 'Jenkins', 'Javascript', 'Jest', 'Enzyme', 'scss'],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/be/app/keytrade-bank/id640974593' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=be.keytradebank.phone&hl=en' },
      { label: 'Keyhome', href: 'https://www.keytradebank.be/node/frontend/en/keyhome/simulation/' },
    ],
  },
  {
    id: 'lutastic-plus',
    title: 'Lutastic+',
    tagline: 'Hardware-connected app — BLE, Skia, Expo',
    tag: 'React Native · lead',
    role: 'React Native — Lead frontend developer',
    company: 'Minze Health',
    what: 'A hardware-connected companion app built with Expo, talking to the device over Bluetooth Low Energy, with Skia-driven visuals.',
    tasks:
      'Front-end development. Architecture of the application. Designing and setup of the CI/CD. Move from Jenkins to GitHub Actions. Migration from existing redux/sagas to more modern approach. Stabilize bluetooth connection with the hardware side. Make it secure and robust.',
    stack: ['React', 'React Native', 'Expo', 'TypeScript', 'Skia', 'Redux', 'BLE', 'Jenkins', 'Github'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/us/app/lutastic/id6651840803' }],
  },
  {
    id: 'adminno4pro',
    title: 'Adminno4Pro',
    tagline: 'Real-estate management, tailored to commercial property',
    tag: 'PHP · lead',
    role: 'PHP — Lead developer, frontend & backend',
    company: 'VisionLine',
    years: '2013 – 2015',
    what: 'Adminno4pro is a real-estate management package tailored to commercial property. With the Adminno4pro package you can effortlessly manage your agency’s portfolio. Various handy features such as the agenda, task management, prospecting functions and more make it possible to organize your administration effortlessly.',
    tasks:
      'Design and development of new features. Maintenance of the existing web app. Responsible for, among other things, implementing a custom agenda and a full-featured todo list. Extending existing features from A to Z (from database to frontend development).',
    stack: ['PHP', 'MySQL', 'Illustrator', 'Javascript', 'jQuery', 'Google PHP SDK', 'Grunt'],
    shots: [adminnoPortfolio, adminnoAgenda],
    shotAspect: 'desktop',
  },
]

export const OTHER_PROJECTS =
  'Others: Uitpas, Cashfree, Belgian Economic Mission, Mobility Masters, Essent, Clearfacts, Slim Naar Antwerpen, Sibelga, …'
