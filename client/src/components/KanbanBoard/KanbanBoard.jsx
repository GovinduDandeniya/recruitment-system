import StageColumn from '../StageColumn/StageColumn'
import styles from './KanbanBoard.module.css'

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test']

function KanbanBoard({
  candidates = [],
  allCandidates = [],
  onMoveCandidate,
  onCardClick,
  onDetailClick,
  activeStageFilter,
  onAddAssessment,
}) {
  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage] = candidates.filter((c) => c.stage === stage)
    return acc
  }, {})

  // For total count badge, use allCandidates (unfiltered)
  const totalByStage = STAGES.reduce((acc, stage) => {
    acc[stage] = allCandidates.filter((c) => c.stage === stage).length
    return acc
  }, {})

  return (
    <div className={styles.board}>
      {STAGES.map((stage) => (
        <StageColumn
          key={stage}
          stage={stage}
          candidates={grouped[stage]}
          totalCount={totalByStage[stage] ?? grouped[stage].length}
          onMoveCandidate={onMoveCandidate}
          onCardClick={onCardClick}
          onDetailClick={onDetailClick}
          isFiltered={activeStageFilter === stage}
          onAddAssessment={onAddAssessment}
        />
      ))}
    </div>
  )
}

export default KanbanBoard

