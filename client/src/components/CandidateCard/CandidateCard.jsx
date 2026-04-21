import { useState, useRef, useEffect } from 'react'
import styles from './CandidateCard.module.css'

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test']

function StarRating({ score }) {
  if (score === null || score === undefined) return null
  const full = Math.floor(score)
  const half = score % 1 >= 0.5
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${styles.star} ${i <= full ? styles.starFull : half && i === full + 1 ? styles.starHalf : styles.starEmpty}`}
        >
          ★
        </span>
      ))}
      <span className={styles.scoreLabel}>{score} Overall</span>
    </div>
  )
}

function Avatar({ name, photoUrl }) {
  if (photoUrl) {
    return <img className={styles.avatar} src={photoUrl} alt={name} />
  }
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const colors = ['#6c63ff', '#f97316', '#a855f7', '#3b82f6', '#14b8a6', '#10b981', '#f59e0b']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={styles.avatar} style={{ backgroundColor: color }}>
      {initials}
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function CardMenu({ candidate, onClose, onAddAssessment }) {
  const { id, stage } = candidate
  const menuRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [onClose])

  return (
    <div className={styles.menu} ref={menuRef}>
      {!candidate.hasAssessment && (
        <button
          className={styles.menuItem}
          onClick={(e) => {
            e.stopPropagation()
            onAddAssessment && onAddAssessment(id)
            onClose()
          }}
        >
          ✅ Mark Assessment Done
        </button>
      )}
      <div className={styles.menuDivider} />
      <p className={styles.menuLabel}>Move to Stage</p>
      {STAGES.filter((s) => s !== stage).map((s) => (
        <button
          key={s}
          className={styles.menuItem}
          onClick={(e) => {
            e.stopPropagation()
            // No direct move from card menu — open card modal instead
            onClose()
          }}
        >
          → {s}
        </button>
      ))}
    </div>
  )
}

function CandidateCard({ candidate, onClick, onAddAssessment }) {
  const { name, appliedAt, score, isReferred, hasAssessment } = candidate
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.card} onClick={() => onClick && onClick(candidate)}>
      <div className={styles.cardHeader}>
        <Avatar name={name} />
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.date}>Applied at {formatDate(appliedAt)}</p>
        </div>
        <div className={styles.menuWrapper}>
          <button
            className={styles.menuBtn}
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((o) => !o)
            }}
            title="More options"
          >
            ···
          </button>
          {menuOpen && (
            <CardMenu
              candidate={candidate}
              onClose={() => setMenuOpen(false)}
              onAddAssessment={onAddAssessment}
            />
          )}
        </div>
      </div>

      <div className={styles.cardFooter}>
        {score !== null && score !== undefined ? (
          <StarRating score={score} />
        ) : (
          <button
            className={styles.addAssessment}
            onClick={(e) => {
              e.stopPropagation()
              onAddAssessment && onAddAssessment(candidate.id)
            }}
          >
            + Add Assessment
          </button>
        )}
        <div className={styles.badges}>
          {isReferred && <span className={styles.referredBadge}>↗ Referred</span>}
          {hasAssessment && score === null && (
            <span className={styles.assessmentBadge}>✅ Assessed</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidateCard

