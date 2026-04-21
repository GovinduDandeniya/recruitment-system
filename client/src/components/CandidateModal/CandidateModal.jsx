import { useEffect } from 'react'
import styles from './CandidateModal.module.css'

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test']

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function Avatar({ name }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const colors = ['#6c63ff', '#f97316', '#a855f7', '#3b82f6', '#14b8a6', '#10b981', '#f59e0b']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={styles.avatar} style={{ backgroundColor: color }}>
      {initials}
    </div>
  )
}

function CandidateModal({ candidate, onClose, onMoveStage, onDelete }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!candidate) return null

  const { id, name, appliedAt, score, isReferred, hasAssessment, stage } = candidate

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Candidate Details</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.profile}>
          <Avatar name={name} />
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.meta}>Applied: {formatDate(appliedAt)}</p>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Stage</span>
            <span className={styles.value}>{stage}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Score</span>
            <span className={styles.value}>{score !== null ? `${score} / 5` : 'Not scored'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Referred</span>
            <span className={styles.value}>{isReferred ? '✅ Yes' : 'No'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Assessment</span>
            <span className={styles.value}>{hasAssessment ? '✅ Completed' : 'Pending'}</span>
          </div>
        </div>

        <div className={styles.stageSection}>
          <p className={styles.sectionTitle}>Move to Stage</p>
          <div className={styles.stageButtons}>
            {STAGES.map((s) => (
              <button
                key={s}
                className={`${styles.stageBtn} ${s === stage ? styles.stageBtnActive : ''}`}
                onClick={() => {
                  if (s !== stage) {
                    onMoveStage(id, s)
                    onClose()
                  }
                }}
                disabled={s === stage}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              onDelete(id)
              onClose()
            }}
          >
            Delete Candidate
          </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateModal
