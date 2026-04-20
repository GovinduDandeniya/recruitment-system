import styles from './CandidateCard.module.css'

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

function CandidateCard({ candidate, onClick }) {
  const { name, appliedAt, score, isReferred, hasAssessment } = candidate

  return (
    <div className={styles.card} onClick={() => onClick && onClick(candidate)}>
      <div className={styles.cardHeader}>
        <Avatar name={name} />
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.date}>Applied at {formatDate(appliedAt)}</p>
        </div>
        <button
          className={styles.menuBtn}
          onClick={(e) => e.stopPropagation()}
          title="More options"
        >
          ···
        </button>
      </div>

      <div className={styles.cardFooter}>
        {score !== null && score !== undefined ? (
          <StarRating score={score} />
        ) : (
          <button className={styles.addAssessment}>+ Add Assessment</button>
        )}
        <div className={styles.badges}>
          {isReferred && <span className={styles.referredBadge}>↗ Referred</span>}
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
