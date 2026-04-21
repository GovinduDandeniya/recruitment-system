import { useState, useMemo } from 'react'
import JobHeader from '../components/JobHeader/JobHeader'
import FilterBar from '../components/FilterBar/FilterBar'
import KanbanBoard from '../components/KanbanBoard/KanbanBoard'
import CandidateModal from '../components/CandidateModal/CandidateModal'
import CreateCandidateModal from '../components/CreateCandidateModal/CreateCandidateModal'
import { useCandidates } from '../hooks/useCandidates'
import styles from './RecruitmentPage.module.css'

function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('Candidates')
  const [search, setSearch] = useState('')
  const [scoreFilter, setScoreFilter] = useState('Any')
  const [sort, setSort] = useState('appliedAt')
  const [stageFilter, setStageFilter] = useState(null) // null = show all
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showCreate, setShowCreate] = useState(false)

  const { candidates, loading, error, moveCandidate, deleteCandidate, createCandidate, addAssessment } =
    useCandidates({ sort, order: 'desc' })

  const filtered = useMemo(() => {
    let list = candidates

    if (stageFilter) {
      list = list.filter((c) => c.stage === stageFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) => c.name.toLowerCase().includes(q))
    }

    if (scoreFilter !== 'Any') {
      const min = parseInt(scoreFilter, 10)
      list = list.filter((c) => c.score !== null && c.score >= min)
    }

    return list
  }, [candidates, search, scoreFilter, stageFilter])

  function handleDetailClick(stage) {
    setStageFilter((prev) => (prev === stage ? null : stage))
  }

  return (
    <div className={styles.page}>
      <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar
        onSearch={setSearch}
        onScoreFilter={setScoreFilter}
        onSortChange={setSort}
        onNewCandidate={() => setShowCreate(true)}
        stageFilter={stageFilter}
        onClearStageFilter={() => setStageFilter(null)}
      />
      <div className={styles.content}>
        {loading && <p className={styles.status}>Loading candidates…</p>}
        {error && <p className={styles.statusError}>Error: {error}</p>}
        {!loading && !error && (
          <KanbanBoard
            candidates={filtered}
            allCandidates={candidates}
            onMoveCandidate={moveCandidate}
            onCardClick={setSelectedCandidate}
            onDetailClick={handleDetailClick}
            activeStageFilter={stageFilter}
            onAddAssessment={addAssessment}
          />
        )}
      </div>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onMoveStage={(id, stage) => {
            moveCandidate(id, stage)
            setSelectedCandidate(null)
          }}
          onDelete={(id) => {
            deleteCandidate(id)
            setSelectedCandidate(null)
          }}
        />
      )}

      {showCreate && (
        <CreateCandidateModal
          onClose={() => setShowCreate(false)}
          onCreate={createCandidate}
        />
      )}
    </div>
  )
}

export default RecruitmentPage

