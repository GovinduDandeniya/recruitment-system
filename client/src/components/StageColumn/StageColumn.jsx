import CandidateCard from '../CandidateCard/CandidateCard'
import styles from './StageColumn.module.css'

const STAGE_COLORS = {
  'Applying Period': 'applying',
  'Screening': 'screening',
  'Interview': 'interview',
  'Test': 'test',
}

function StageColumn({ stage, candidates = [], onMoveCandidate, onCardClick }) {
  const colorKey = STAGE_COLORS[stage] || 'applying'

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={`${styles.stageLabel} ${styles[colorKey]}`}>
          {stage}
        </span>
        <span className={styles.count}>{candidates.length}</span>
        <div className={styles.spacer} />
        <button className={styles.detailBtn}>Detail ›</button>
      </div>

      <div className={styles.cards}>
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} onClick={onCardClick} />
        ))}
      </div>
    </div>
  )
}

export default StageColumn
