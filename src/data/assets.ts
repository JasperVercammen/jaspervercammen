import pixelJasper from '../assets/pixel-jasper.png'
import icappsLogo from '../assets/icapps-logo.svg'
import minzeLogo from '../assets/minze-logo.svg'
import visionlineLogo from '../assets/visionline-logo.svg'
import mijnAntwerpen1 from '../assets/mijn-antwerpen-1.webp'
import mijnAntwerpen2 from '../assets/mijn-antwerpen-2.webp'
import mijnAntwerpen3 from '../assets/mijn-antwerpen-3.webp'
import mijnAntwerpen4 from '../assets/mijn-antwerpen-4.webp'
import adminnoPortfolio from '../assets/adminno-portfolio.webp'
import adminnoAgenda from '../assets/adminno-agenda.webp'
import keytrade1 from '../assets/keytrade-1.webp'
import keytrade2 from '../assets/keytrade-2.webp'
import keytrade3 from '../assets/keytrade-3.webp'
import keyhome1 from '../assets/keyhome-1.webp'
import keyhome2 from '../assets/keyhome-2.webp'
import keyhome3 from '../assets/keyhome-3.webp'
import mobilityMasters1 from '../assets/mobility-masters-1.webp'
import mobilityMasters2 from '../assets/mobility-masters-2.webp'

export {
  pixelJasper,
  mijnAntwerpen1,
  mijnAntwerpen2,
  mijnAntwerpen3,
  mijnAntwerpen4,
  adminnoPortfolio,
  adminnoAgenda,
  keytrade1,
  keytrade2,
  keytrade3,
  keyhome1,
  keyhome2,
  keyhome3,
  mobilityMasters1,
  mobilityMasters2,
}

export const COMPANIES = {
  icapps: { name: 'icapps', logo: icappsLogo, logoWidth: '114px' },
  'Minze Health': { name: 'Minze Health', logo: minzeLogo, logoWidth: '75px' },
  VisionLine: { name: 'VisionLine', logo: visionlineLogo, logoWidth: '160px' },
} as const

export type CompanyId = keyof typeof COMPANIES
