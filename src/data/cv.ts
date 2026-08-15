export const PROFILE = {
  name: 'Jasper Vercammen',
  headline: 'Senior Frontend Developer — web & mobile · Lier, Belgium',
  email: 'vercammenjasper@gmail.com',
  phone: '+32 497 30 57 98',
  phoneHref: 'tel:+32497305798',
  location: '2500 Lier, Belgium',
  paragraphs: [
    'I have extensive experience in web development, with a focus on JavaScript for over a decade. My background includes several years of PHP development in a startup environment, followed by 8+ years specializing in React and React Native.',
    'I’m passionate about frontend development, consistently delivering clean, readable code while managing complex logic. I excel at maintaining a clear overview of large projects, meeting deadlines, and effectively collaborating with product owners and Scrum Masters to drive project success. I’m always eager to learn and embrace new technologies.',
  ],
}

export type Job = {
  company: string
  role: string
  dates: string
  body: string[]
  current?: boolean
}

export const EXPERIENCE: Job[] = [
  {
    company: 'Minze Health · Antwerp',
    role: 'Senior frontend developer',
    dates: '2025 – ongoing',
    current: true,
    body: [
      'Appointed to lead the technical overhaul of Minze’s React Native apps. Successfully migrated legacy codebases to modern architectures while maintaining a rapid release cycle. Balanced the delivery of new business requirements with essential refactoring to ensure long-term stability and scalability, all within a highly regulated compliance environment.',
      'Over the past year the team reshaped how we design and build: planning moved from Jira to Linear, AI became a daily part of the workflow — from shaping a ticket to reviewing a pull request — and we brought the platform up to the BSI security standard that medical software has to meet.',
    ],
  },
  {
    company: 'icapps · Antwerp',
    role: 'Senior frontend developer',
    dates: '2015 – 2024',
    body: [
      'At icapps, I transitioned from a junior developer to a frontend specialist, honing my skills in writing clean, efficient code. I contributed my expertise to support the team’s direction and consistently provided assistance to colleagues, fostering a collaborative environment.',
    ],
  },
  {
    company: 'VisionLine · Sint-Katelijne-Waver',
    role: 'Full stack developer',
    dates: '2013 – 2015',
    body: [
      'Worked at VisionLine, a startup in the real estate sector, where I developed and maintained in-house B2B software and various web applications. Primarily responsible for backend development and frontend integration using PHP, JavaScript, and MySQL. Collaborated closely with a small team to deliver efficient, tailored solutions.',
    ],
  },
  {
    company: 'Sakti · Lier',
    role: 'Owner — Frontend development',
    dates: '2012 – ongoing',
    body: [
      'Founded Sakti as a student to provide professional web development services for small businesses, allowing me to manage client projects and issue invoices. Over the years, I’ve continued to maintain these websites, using the business as a platform to learn and experiment with new technologies in a professional context.',
    ],
  },
]

export const SKILLS = [
  'Javascript / Typescript',
  'React',
  'React Native',
  'HTML / (s)css',
  'Git',
  'Devops',
  'Application Architecture',
]

export const EDUCATION = [
  { degree: 'Master — Elektronica-ICT', school: 'Thomas More · De Nayer Instituut — completed 2013' },
  { degree: 'Prof. Bachelor — Elektronica-ICT', school: 'Thomas More · De Nayer Instituut — completed 2011' },
]

export const QUICK_FACTS = 'Married · Father of 2 · Runner · Sports lover'
