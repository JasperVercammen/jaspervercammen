import pixelJasper from '../assets/pixel-jasper.png'
import icappsLogo from '../assets/icapps-logo.svg'
import minzeLogo from '../assets/minze-logo.svg'
import visionlineLogo from '../assets/visionline-logo.svg'
import mijnAntwerpen1 from '../assets/mijn-antwerpen-1.webp'
import mijnAntwerpen2 from '../assets/mijn-antwerpen-2.webp'
import mijnAntwerpen3 from '../assets/mijn-antwerpen-3.webp'
import mijnAntwerpen4 from '../assets/mijn-antwerpen-4.webp'
import adminnoPortfolio from '../assets/adminno-portfolio.png'
import adminnoAgenda from '../assets/adminno-agenda.png'

export {
  pixelJasper,
  mijnAntwerpen1,
  mijnAntwerpen2,
  mijnAntwerpen3,
  mijnAntwerpen4,
  adminnoPortfolio,
  adminnoAgenda,
}

export const COMPANIES = {
  icapps: { name: 'icapps', logo: icappsLogo, logoWidth: '114px' },
  'Minze Health': { name: 'Minze Health', logo: minzeLogo, logoWidth: '75px' },
  VisionLine: { name: 'VisionLine', logo: visionlineLogo, logoWidth: '160px' },
} as const

export type CompanyId = keyof typeof COMPANIES
