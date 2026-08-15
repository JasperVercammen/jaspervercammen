import { PROFILE } from '../data/cv'

type Props = {
  onStay: () => void
  onClose: () => void
}

export function ConfirmDialog({ onStay, onClose }: Props) {
  return (
    <div className="confirm-overlay">
      <div className="confirm" role="dialog" aria-modal="true" aria-label="close()">
        <div className="label">close();</div>
        <div className="confirm__text">Are you sure you want to close without contacting me?</div>
        <div className="confirm__actions">
          <button className="btn btn--primary" onClick={onStay} autoFocus>
            no, stay
          </button>
          <button className="btn btn--danger" onClick={onClose}>
            yes, close
          </button>
        </div>
        <a className="confirm__link" href={`mailto:${PROFILE.email}`}>
          or email me first ↗
        </a>
      </div>
    </div>
  )
}
