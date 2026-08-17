import {
  adminnoAgenda,
  adminnoPortfolio,
  keyhome1,
  keyhome2,
  keyhome3,
  keytrade1,
  keytrade2,
  keytrade3,
  mijnAntwerpen1,
  mijnAntwerpen2,
  mijnAntwerpen3,
  mijnAntwerpen4,
  mobilityMasters1,
  mobilityMasters2,
  type CompanyId,
} from './assets'

export type StackItem = string | { label: string; href: string }

export type Project = {
  id: string
  title: string
  company: CompanyId
  tagline?: string
  tag?: string
  role?: string
  years?: string
  highlight?: boolean
  what?: string
  tasks?: string
  more?: string
  stack?: StackItem[]
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
    highlight: true,
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
    id: 'keytrade-mobile',
    title: 'Keytrade Mobile',
    tagline: 'A complete native banking app rebuilt in React Native',
    tag: 'React & RN',
    role: 'React & React Native — Frontend developer',
    company: 'icapps',
    years: '2016 – 2017, 2023',
    highlight: true,
    what: 'We replace the complete native banking application of Keytrade. The project included a POC with basic functionalities, redesign from scratch and provided native bridges for Vasco. The app comes with graphs, gestures and performance optimisations all in React Native. It’s also tablet ready. The project was rounded in about 1 year.',
    tasks:
      'Front-end development. Architecture of the application and data flow/management in the app. Implemented several security functions. Native module bridging.',
    stack: ['React', 'React Native', 'Redux', 'Jenkins', 'Javascript', 'Jest', 'Enzyme', 'scss'],
    shots: [keytrade1, keytrade2, keytrade3],
    shotAspect: 'phone',
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/be/app/keytrade-bank/id640974593' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=be.keytradebank.phone&hl=en' },
    ],
  },
  {
    id: 'keyhome',
    title: 'Keyhome',
    tagline: 'The first full online mortgage platform in Belgium',
    tag: 'React · lead',
    role: 'React — Lead developer',
    company: 'icapps',
    years: '2016',
    what: 'Crafted and set up from scratch the first full online mortgage platform in Belgium. Users can simulate their entire mortgage, play with the numbers — duration, amount to borrow — and see the best interest rate they can get.',
    tasks:
      'One of the lead developers on this platform. Helped set up the architecture and state management. Crafted the webpack bundler and the styling system. Created the building blocks and built the platform on top of them.',
    stack: ['React', 'scss', 'Webpack', 'Redux', 'Redux Thunk'],
    shots: [keyhome1, keyhome2, keyhome3],
    shotAspect: 'desktop',
    links: [{ label: 'Keyhome', href: 'https://www.keytradebank.be/node/frontend/en/keyhome/simulation/' }],
  },
  {
    id: 'keytrade-platform',
    title: 'Keytrade platform',
    tagline: 'The web banking and trading platform',
    company: 'icapps',
    years: '2016',
    what: 'The web banking and trading platform of Keytrade.',
    tasks: 'Helped on the secure banking environment.',
  },
  {
    id: 'lutastic-plus',
    title: 'Lutastic+',
    tagline: 'Hardware-connected app — BLE, Skia, Expo',
    tag: 'React Native · lead',
    role: 'React Native — Lead frontend developer',
    company: 'Minze Health',
    highlight: true,
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
    highlight: true,
    what: 'Adminno4pro is a real-estate management package tailored to commercial property. With the Adminno4pro package you can effortlessly manage your agency’s portfolio. Various handy features such as the agenda, task management, prospecting functions and more make it possible to organize your administration effortlessly.',
    tasks:
      'Design and development of new features. Maintenance of the existing web app. Responsible for, among other things, implementing a custom agenda and a full-featured todo list. Extending existing features from A to Z (from database to frontend development).',
    stack: ['PHP', 'MySQL', 'Illustrator', 'Javascript', 'jQuery', 'Google PHP SDK', 'Grunt'],
    shots: [adminnoPortfolio, adminnoAgenda],
    shotAspect: 'desktop',
  },
  {
    id: 'immo4pro',
    title: 'Immo4Pro',
    tagline: 'Commercial real estate from every agency, in one place',
    company: 'VisionLine',
    years: '2014 – 2015',
    what: 'A digital platform that pools commercial real estate across different real-estate agencies, so a property listed by any of them shows up in one shared portfolio.',
  },
  {
    id: 'uitpas',
    title: 'Uitpas',
    tagline: 'Your UiTPAS card, always in your pocket',
    tag: 'React Native',
    role: 'React Native — Frontend developer',
    company: 'icapps',
    years: '2023',
    what: 'With the official UiTPAS app your digital card is always on you. You collect points by scanning QR codes at the collection points, check your balance, and exchange points for benefits and discounts. Adding the cards of your family members is easy too.',
    tasks:
      'Took over development for a new set of features and introduced rewards in the app. Stabilisation improvements throughout the app, and architectural improvements for a more stable app and better builds. Design improvements for a lot of the building blocks.',
    stack: [
      { label: 'React Native', href: 'https://reactnative.dev/docs/getting-started' },
      { label: 'Styled components', href: 'https://styled-components.com/' },
      { label: 'Tanstack React Query', href: 'https://tanstack.com/query/v4/docs/' },
      'Query persistance',
      { label: 'MMKV', href: 'https://github.com/Tencent/MMKV' },
      { label: 'i18next', href: 'https://react.i18next.com/' },
      { label: 'React Navigation', href: 'https://reactnavigation.org/docs/getting-started' },
    ],
  },
  {
    id: 'mobility-masters',
    title: 'Mobility Masters',
    tagline: 'Dispatching system for aircraft cleaning crews',
    tag: 'React',
    role: 'React — Frontend developer',
    company: 'icapps',
    years: '2020',
    what: 'Mobility Masters cleans aircraft between flights, which means knowing which planes to clean, when each one lands and leaves again, and which team is assigned where — and keeping Brussels Airlines informed of all of it. We replaced that coordination with one digital ecosystem: a web dispatching tool giving dispatchers a real-time overview of every aircraft and letting them assign teams on availability and schedule, a mobile app putting task lists, cleaning instructions and shift schedules directly in the hands of the teams in the field, and a bridge app that keeps the two in sync so issues get resolved before they turn into missteps.',
    stack: ['React', 'Redux', 'Observables', 'scss'],
    shots: [mobilityMasters1, mobilityMasters2],
    shotAspect: 'desktop',
  },
  {
    id: 'clearfacts',
    title: 'Clearfacts',
    company: 'icapps',
  },
  {
    id: 'slim-naar-antwerpen',
    title: 'Slim Naar Antwerpen',
    company: 'icapps',
  },
  {
    id: 'sibelga',
    title: 'Sibelga',
    company: 'icapps',
  },
]

export const OTHER_PROJECTS = 'Others: Cashfree, Belgian Economic Mission, Essent, …'
