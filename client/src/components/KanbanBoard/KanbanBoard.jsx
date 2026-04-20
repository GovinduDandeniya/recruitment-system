import StageColumn from '../StageColumn/StageColumn'
import styles from './KanbanBoard.module.css'

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test']

function KanbanBoard({ candidates = [], onMoveCandidate }) {
  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage] = candidates.filter((c) => c.stage === stage)
    return acc
  }, {})

  return (
    <div className={styles.board}>
      {STAGES.map((stage) => (
        <StageColumn
          key={stage}
          stage={stage}
          candidates={grouped[stage]}
          onMoveCandidate={onMoveCandidate}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
