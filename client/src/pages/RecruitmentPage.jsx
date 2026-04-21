import { useState, useMemo } from 'react'
import JobHeader from '../components/JobHeader/JobHeader'
import FilterBar from '../components/FilterBar/FilterBar'
import KanbanBoard from '../components/KanbanBoard/KanbanBoard'
import CandidateModal from '../components/CandidateModal/CandidateModal'
import { useCandidates } from '../hooks/useCandidates'
import styles from './RecruitmentPage.module.css'

function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('Candidates')
  const [search, setSearch] = useState('')
  const [scoreFilter, setScoreFilter] = useState('Any')
  const [sort, setSort] = useState('appliedAt')
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const { candidates, loading, error, moveCandidate, deleteCandidate } = useCandidates({ sort, order: 'desc' })

  const filtered = useMemo(() => {
    let list = candidates

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) => c.name.toLowerCase().includes(q))
    }

    if (scoreFilter !== 'Any') {
      const min = parseInt(scoreFilter, 10)
      list = list.filter((c) => c.score !== null && c.score >= min)
    }

    return list
  }, [candidates, search, scoreFilter])

  return (
    <div className={styles.page}>
      <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar
        onSearch={setSearch}
        onScoreFilter={setScoreFilter}
        onSortChange={setSort}
      />
      <div className={styles.content}>
        {loading && <p className={styles.status}>Loading candidates…</p>}
        {error && <p className={styles.statusError}>Error: {error}</p>}
        {!loading && !error && (
          <KanbanBoard
            candidates={filtered}
            onMoveCandidate={moveCandidate}
            onCardClick={setSelectedCandidate}
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
    </div>
  )
}

export default RecruitmentPage
