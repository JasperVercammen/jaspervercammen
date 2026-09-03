import type { Theme } from '../hooks/useTheme'
import { EDUCATION, EXPERIENCE, PROFILE, QUICK_FACTS, SKILLS } from './cv'
import { PROJECTS, type Project } from './projects'

export type CommandContext = {
  print: (text: string) => void
  clear: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
  winMode: 'normal' | 'compactWin'
  setWinMode: (mode: 'normal' | 'compactWin') => void
  showProject: (project: Project) => void
  closeProject: () => void
  hasOpenProject: boolean
  minimize: () => void
  askClose: () => void
  openUrl: (url: string) => void
  history: string[]
  startedAt: number
}

export type Command = {
  name: string
  args?: string
  help?: string
  aliases?: string[]
  run: (args: string[], ctx: CommandContext) => void
}

export const PROMPT = 'jasper@dev ~ % '

const pad = (value: string, width: number) => value.padEnd(width, ' ')

const factText = () =>
  QUICK_FACTS.map((fact) => (typeof fact === 'string' ? fact : fact.label)).join(' · ')

const stackText = (project: Project) =>
  (project.stack ?? []).map((item) => (typeof item === 'string' ? item : item.label)).join(', ')

const findProject = (term: string) => {
  const needle = term.toLowerCase().replace(/\s+/g, '-')
  return (
    PROJECTS.find((project) => project.id === needle) ??
    PROJECTS.find((project) => project.title.toLowerCase().replace(/\s+/g, '-') === needle) ??
    PROJECTS.find((project) => project.id.startsWith(needle)) ??
    PROJECTS.find((project) => project.title.toLowerCase().includes(term.toLowerCase()))
  )
}

const projectRow = (project: Project) =>
  `  ${pad(project.years ?? '', 18)}${pad(project.id, 26)}${project.status === 'retired' ? '○' : '●'}`

const SECTIONS = ['profile', 'experience', 'projects', 'skills', 'education', 'facts', 'contact']

const sectionText = (name: string): string | null => {
  switch (name) {
    case 'profile':
      return PROFILE.paragraphs.join('\n\n')
    case 'experience':
      return EXPERIENCE.map(
        (job) => `${job.dates}  ${job.company}\n  ${job.role}\n  ${job.body.join('\n  ')}`,
      ).join('\n\n')
    case 'projects':
      return PROJECTS.map(projectRow).join('\n')
    case 'skills':
      return SKILLS.join(' · ')
    case 'education':
      return EDUCATION.map((entry) => `${entry.degree}\n  ${entry.school}`).join('\n')
    case 'facts':
      return factText()
    case 'contact':
      return [
        PROFILE.email,
        PROFILE.phone,
        PROFILE.location,
        ...PROFILE.links.map((link) => `${link.label}: ${link.href}`),
      ].join('\n')
    default:
      return null
  }
}

const FORTUNES = [
  'a migration you can ship in slices beats a rewrite you cannot.',
  'the bug is in the layer you were sure about.',
  'if the release hurts, release more often.',
  'every "temporary" flag outlives the feature it guarded.',
  'readable beats clever, every single review.',
  'the hardest part of state management is deciding what is not state.',
  'estimates improve the moment someone writes them down.',
]

const RUNNING_URL = 'https://running.jaspervercammen.be'

export const COMMANDS: Command[] = [
  {
    name: 'help',
    args: '[command]',
    help: 'this list, or detail on one command',
    aliases: ['man', '?'],
    run: ([name], ctx) => {
      if (name) {
        const command = resolve(name)
        if (!command) return ctx.print(`help: no entry for ${name}`)
        const usage = [command.name, command.args].filter(Boolean).join(' ')
        const aliases = command.aliases?.length ? `\n  aliases: ${command.aliases.join(', ')}` : ''
        return ctx.print(`  ${usage}\n  ${command.help ?? 'undocumented. you found it, so use it.'}${aliases}`)
      }
      const listed = COMMANDS.filter((command) => command.help)
      const width = Math.max(...listed.map((command) => [command.name, command.args].filter(Boolean).join(' ').length)) + 3
      ctx.print(
        [
          'available commands',
          '',
          ...listed.map(
            (command) => `  ${pad([command.name, command.args].filter(Boolean).join(' '), width)}${command.help}`,
          ),
          '',
          '  not everything is on this list. poke around.',
        ].join('\n'),
      )
    },
  },
  {
    name: 'ls',
    args: '[projects|skills|sections]',
    help: 'list what is in here',
    aliases: ['dir'],
    run: ([what = 'projects'], ctx) => {
      if (what === 'skills') return ctx.print(SKILLS.map((skill) => `  ${skill}`).join('\n'))
      if (what === 'sections') return ctx.print(SECTIONS.map((section) => `  ${section}`).join('\n'))
      ctx.print(
        [
          `  ${PROJECTS.length} projects — ● still in production, ○ not`,
          '',
          ...PROJECTS.map(projectRow),
          '',
          '  open <id> to read one',
        ].join('\n'),
      )
    },
  },
  {
    name: 'open',
    args: '<project>',
    help: 'open a case study',
    run: (args, ctx) => {
      const term = args.join(' ')
      if (!term) return ctx.print('open: which one? try ls')
      const project = findProject(term)
      if (!project) return ctx.print(`open: no project matching "${term}". try ls`)
      if (!project.what) return ctx.print(`${project.id}: no case study written yet.`)
      ctx.print(`opening ${project.id} — ${project.title}`)
      ctx.showProject(project)
    },
  },
  {
    name: 'close',
    help: 'close the case study',
    run: (_args, ctx) => {
      if (!ctx.hasOpenProject) return ctx.print('close: nothing open.')
      ctx.print('closed')
      ctx.closeProject()
    },
  },
  {
    name: 'cat',
    args: '<section>',
    help: 'print a section of the CV',
    run: ([name], ctx) => {
      if (!name) return ctx.print(`cat: which section? ${SECTIONS.join(', ')}`)
      const text = sectionText(name)
      ctx.print(text ?? `cat: ${name}: no such section. try ls sections`)
    },
  },
  {
    name: 'theme',
    args: '[dark|light]',
    help: 'switch or report the theme',
    run: ([value], ctx) => {
      if (!value) return ctx.print(`theme: ${ctx.theme}`)
      const next = value === 'toggle' ? (ctx.theme === 'light' ? 'dark' : 'light') : value
      if (next !== 'dark' && next !== 'light') return ctx.print(`theme: ${value}? pick dark or light.`)
      ctx.setTheme(next)
      ctx.print(`theme set to ${next}`)
    },
  },
  {
    name: 'resize',
    args: '[mobile|desktop]',
    help: 'resize the window',
    run: ([value], ctx) => {
      const next = value ?? (ctx.winMode === 'compactWin' ? 'desktop' : 'mobile')
      if (next !== 'mobile' && next !== 'desktop') return ctx.print(`resize: ${value}? pick mobile or desktop.`)
      ctx.setWinMode(next === 'mobile' ? 'compactWin' : 'normal')
      ctx.print(`window resized to ${next}`)
    },
  },
  {
    name: 'stack',
    args: '<project>',
    help: 'what a project was built with',
    run: (args, ctx) => {
      const term = args.join(' ')
      if (!term) return ctx.print(`stack: which project? try ls`)
      const project = findProject(term)
      if (!project) return ctx.print(`stack: no project matching "${term}"`)
      const stack = stackText(project)
      ctx.print(stack ? `${project.title}: ${stack}` : `${project.title}: not written down yet.`)
    },
  },
  {
    name: 'search',
    args: '<term>',
    help: 'search the projects',
    aliases: ['grep', 'find'],
    run: (args, ctx) => {
      const term = args.join(' ').toLowerCase()
      if (!term) return ctx.print('search: search for what?')
      const hits = PROJECTS.filter((project) =>
        [project.title, project.tagline, project.what, project.tasks, project.role, stackText(project)]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
      ctx.print(hits.length ? hits.map(projectRow).join('\n') : `search: nothing for "${term}"`)
    },
  },
  {
    name: 'contact',
    help: 'how to reach me',
    aliases: ['email'],
    run: (_args, ctx) => ctx.print(sectionText('contact') ?? ''),
  },
  {
    name: 'github',
    help: 'open my GitHub',
    run: (_args, ctx) => {
      const link = PROFILE.links.find((entry) => entry.label === 'GitHub')
      if (link) ctx.openUrl(link.href)
      ctx.print(`opening ${link?.href}`)
    },
  },
  {
    name: 'linkedin',
    help: 'open my LinkedIn',
    run: (_args, ctx) => {
      const link = PROFILE.links.find((entry) => entry.label === 'LinkedIn')
      if (link) ctx.openUrl(link.href)
      ctx.print(`opening ${link?.href}`)
    },
  },
  {
    name: 'cv',
    help: 'the short version',
    aliases: ['resume', 'about'],
    run: (_args, ctx) =>
      ctx.print(
        [
          `${PROFILE.name} — ${PROFILE.headline}`,
          '',
          ...EXPERIENCE.map((job) => `  ${pad(job.dates, 18)}${job.company} — ${job.role}`),
          '',
          ...EDUCATION.map((entry) => `  ${entry.degree} · ${entry.school}`),
          '',
          `  ${PROJECTS.length} projects listed. ${PROFILE.email}`,
        ].join('\n'),
      ),
  },
  {
    name: 'pwd',
    help: 'where you are',
    run: (_args, ctx) => ctx.print('/Users/jasper/projects/jaspervercammen'),
  },
  {
    name: 'whoami',
    help: 'who I am',
    run: (_args, ctx) => ctx.print(`jasper — ${PROFILE.headline}`),
  },
  {
    name: 'date',
    help: 'the time here',
    run: (_args, ctx) => ctx.print(new Date().toString()),
  },
  {
    name: 'echo',
    args: '<text>',
    help: 'say it back',
    run: (args, ctx) => ctx.print(args.join(' ')),
  },
  {
    name: 'clear',
    help: 'wipe the session',
    aliases: ['cls'],
    run: (_args, ctx) => ctx.clear(),
  },
  {
    name: 'history',
    help: 'what you have typed',
    run: (_args, ctx) =>
      ctx.print(
        ctx.history.length
          ? ctx.history.map((entry, index) => `  ${pad(String(index + 1), 5)}${entry}`).join('\n')
          : '  nothing yet.',
      ),
  },
  {
    name: 'neofetch',
    help: 'the system, such as it is',
    run: (_args, ctx) => {
      const favourites = PROJECTS.filter((project) => project.highlight).length
      ctx.print(
        [
          '        jasper@jasper.dev',
          '        ─────────────────',
          `   ★    os        React 19 · Vite · TypeScript`,
          `        shell     jasper.tsx`,
          `        uptime    ${Math.round((Date.now() - ctx.startedAt) / 1000)}s`,
          `        theme     ${ctx.theme}`,
          `        window    ${ctx.winMode === 'compactWin' ? 'mobile preview' : 'desktop'}`,
          `        projects  ${PROJECTS.length}, ${favourites} favourites`,
          `        based in  ${PROFILE.location}`,
          `        contact   ${PROFILE.email}`,
        ].join('\n'),
      )
    },
  },
  {
    name: 'minimize',
    help: 'send the window to the dock',
    run: (_args, ctx) => ctx.minimize(),
  },
  {
    name: 'exit',
    help: 'try to leave',
    aliases: ['quit', 'logout'],
    run: (_args, ctx) => ctx.askClose(),
  },

  // ── undocumented from here down ──────────────────────────────────────────
  {
    name: 'sudo',
    run: (args, ctx) =>
      ctx.print(
        args.length
          ? `sudo: jasper is not in the sudoers file. this incident has been noted, fondly.`
          : 'sudo: usage: sudo <thing you are not allowed to do>',
      ),
  },
  { name: 'rm', run: (_args, ctx) => ctx.print('rm: permission denied. this one took a while to build.') },
  { name: 'vim', run: (_args, ctx) => ctx.print('vim: no exit strategy provided. try :q — or just keep scrolling.') },
  { name: 'emacs', run: (_args, ctx) => ctx.print('emacs: downloading 4 GB of extensions… cancelled.') },
  { name: 'nano', run: (_args, ctx) => ctx.print('nano: a person of taste, and of no strong opinions.') },
  { name: 'uname', run: (_args, ctx) => ctx.print('jasper.dev 1.0.0 React/19 Vite/8 TypeScript — built with React, obviously') },
  {
    name: 'uptime',
    run: (_args, ctx) =>
      ctx.print(`up ${Math.round((Date.now() - ctx.startedAt) / 1000)}s, 1 user, load average: 0.42`),
  },
  {
    name: 'env',
    run: (_args, ctx) =>
      ctx.print(
        [
          `THEME=${ctx.theme}`,
          `WINDOW=${ctx.winMode}`,
          'NODE_ENV=production',
          'EDITOR=vscode',
          'COFFEE=1',
        ].join('\n'),
      ),
  },
  { name: 'coffee', run: (_args, ctx) => ctx.print('brewing ☕ … done. now, about that thing you need built?') },
  { name: 'tea', run: (_args, ctx) => ctx.print('418 — I am a teapot.') },
  { name: 'beer', run: (_args, ctx) => ctx.print('after the deploy.') },
  {
    name: 'hire',
    aliases: ['work'],
    run: (_args, ctx) => {
      ctx.openUrl(`mailto:${PROFILE.email}`)
      ctx.print(`drafting an email to ${PROFILE.email}. talk soon.`)
    },
  },
  { name: 'matrix', run: (_args, ctx) => ctx.print('there is no spoon. there is only render().') },
  { name: 'xyzzy', run: (_args, ctx) => ctx.print('nothing happens.') },
  {
    name: 'konami',
    run: (_args, ctx) => ctx.print('↑ ↑ ↓ ↓ ← → ← → B A — 30 lives granted. spend them on side projects.'),
  },
  { name: 'fortune', run: (_args, ctx) => ctx.print(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]) },
  {
    name: 'run',
    aliases: ['running'],
    run: (_args, ctx) => {
      ctx.openUrl(RUNNING_URL)
      ctx.print(`opening ${RUNNING_URL} — the streak is public, sadly.`)
    },
  },
  {
    name: 'tetris',
    aliases: ['snake', 'doom', 'play'],
    run: (_args, ctx) => ctx.print('not shipped. the case studies are the interactive part.'),
  },
  { name: 'npm', run: (_args, ctx) => ctx.print('up to date in 0.42s. found 0 vulnerabilities. suspicious.') },
  { name: 'git', run: (args, ctx) => ctx.print(args[0] === 'blame' ? 'jasper. all of it.' : 'nothing to commit, working tree clean.') },
  { name: 'ping', run: ([host], ctx) => ctx.print(`PONG ${host ?? 'jasper.dev'}: time=0.42ms`) },
  { name: 'curl', run: (_args, ctx) => ctx.print('curl: use the links, they open in a new tab.') },
  { name: 'hello', aliases: ['hi', 'hey'], run: (_args, ctx) => ctx.print('hey. type help if you want the tour.') },
  { name: 'thanks', aliases: ['thx'], run: (_args, ctx) => ctx.print('any time. tell your product owner.') },
  { name: '42', aliases: ['answer'], run: (_args, ctx) => ctx.print('42. the question was probably "how many migrations?"') },
  {
    name: 'secret',
    aliases: ['easteregg'],
    run: (_args, ctx) => ctx.print('you found one. there are a few more down here, and one up in Quick facts.'),
  },
  {
    name: 'keys',
    aliases: ['shortcuts'],
    run: (_args, ctx) =>
      ctx.print(
        [
          '  ⏎         run a command',
          '  ↑ ↓       walk your history',
          '  tab       complete a command',
          '  ctrl+l    clear',
          '  click     the traffic lights all do something',
          '  click     the code area while it types to fast-forward',
        ].join('\n'),
      ),
  },
  {
    name: 'credits',
    run: (_args, ctx) => ctx.print('design and build: jasper. typing animation: setInterval. patience: yours.'),
  },
]

const resolve = (name: string) =>
  COMMANDS.find((command) => command.name === name || command.aliases?.includes(name))

export const COMPLETIONS = COMMANDS.filter((command) => command.help).map((command) => command.name)

const JS_FORMS: [RegExp, (match: RegExpMatchArray) => string][] = [
  [/^open\(\s*<CaseStudy\s+id="([^"]+)"\s*\/>\s*\)$/, (match) => `open ${match[1]}`],
  [/^theme\.set\(\s*"([^"]+)"\s*\)$/, (match) => `theme ${match[1]}`],
  [/^window\.resize\(\s*"([^"]+)"\s*\)$/, (match) => `resize ${match[1]}`],
  [/^([a-z]+)\(\s*\)$/, (match) => match[1]],
]

export function normalize(input: string) {
  const trimmed = input.trim().replace(/;+$/, '').trim()
  for (const [pattern, rewrite] of JS_FORMS) {
    const match = trimmed.match(pattern)
    if (match) return rewrite(match)
  }
  return trimmed
}

export function runCommand(input: string, ctx: CommandContext) {
  const line = normalize(input)
  if (!line) return
  const [name, ...args] = line.split(/\s+/)
  const command = resolve(name.toLowerCase())
  if (!command) return ctx.print(`${name}: command not found. try help`)
  command.run(args, ctx)
}
