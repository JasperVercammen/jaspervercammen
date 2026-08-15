type Props = {
  compactWin: boolean
  onClose: () => void
  onMinimize: () => void
  onToggleSize: () => void
}

const SHRINK_PATH = 'M3.8 3.8 L3.8 0.2 L0.2 3.8 Z M4.2 4.2 L4.2 7.8 L7.8 4.2 Z'
const EXPAND_PATH = 'M1 1 L4.4 1 L1 4.4 Z M7 7 L3.6 7 L7 3.6 Z'

export function TitleBar({ compactWin, onClose, onMinimize, onToggleSize }: Props) {
  return (
    <div className="titlebar">
      <div className="traffic-lights">
        <button className="light light--red" onClick={onClose} title="close" aria-label="close">
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path
              d="M1.2 1.2 L6.8 6.8 M6.8 1.2 L1.2 6.8"
              stroke="rgba(77, 0, 0, 0.65)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="light light--yellow" onClick={onMinimize} title="minimize" aria-label="minimize">
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path d="M1 4 L7 4" stroke="rgba(90, 60, 0, 0.7)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="light light--green"
          onClick={onToggleSize}
          title="toggle mobile size"
          aria-label="toggle mobile size"
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path d={compactWin ? EXPAND_PATH : SHRINK_PATH} fill="rgba(0, 70, 10, 0.7)" />
          </svg>
        </button>
      </div>
      <div className="titlebar__center">
        <span className="address-pill">jasper.dev — {compactWin ? 'mobile preview' : 'live preview'}</span>
      </div>
      <div className="titlebar__spacer" />
    </div>
  )
}
