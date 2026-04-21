import CandidateCard from '../CandidateCard/CandidateCard'
import styles from './StageColumn.module.css'

const STAGE_COLORS = {
  'Applying Period': 'applying',
  'Screening': 'screening',
  'Interview': 'interview',
  'Test': 'test',
}

function StageColumn({
  stage,
  candidates = [],
  totalCount,
  onMoveCandidate,
  onCardClick,
  onDetailClick,
  isFiltered,
  onAddAssessment,
}) {
  const colorKey = STAGE_COLORS[stage] || 'applying'

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={`${styles.stageLabel} ${styles[colorKey]}`}>
          {stage}
        </span>
        <span className={styles.count}>{totalCount ?? candidates.length}</span>
        <div className={styles.spacer} />
        <button
          className={`${styles.detailBtn} ${isFiltered ? styles.detailBtnActive : ''}`}
          onClick={() => onDetailClick && onDetailClick(stage)}
          title={isFiltered ? 'Show all stages' : `Filter to ${stage} only`}
        >
          {isFiltered ? '✕ Clear' : 'Detail ›'}
        </button>
      </div>

      <div className={styles.cards}>
        {candidates.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📭</span>
            <p className={styles.emptyText}>No candidates here</p>
          </div>
        ) : (
          candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onClick={onCardClick}
              onAddAssessment={onAddAssessment}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default StageColumn

