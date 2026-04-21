import { useState } from 'react'
import JobHeader from '../components/JobHeader/JobHeader'
import FilterBar from '../components/FilterBar/FilterBar'
import styles from './RecruitmentPage.module.css'

function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('Candidates')
  const [search, setSearch] = useState('')
  const [scoreFilter, setScoreFilter] = useState('Any')
  const [sort, setSort] = useState('appliedAt')

  return (
    <div className={styles.page}>
      <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar
        onSearch={setSearch}
        onScoreFilter={setScoreFilter}
        onSortChange={setSort}
      />
      <div className={styles.content}>
        {/* KanbanBoard will be wired in Commit 11 */}
        <p style={{ padding: 24, color: '#6b7280' }}>Kanban board — connecting to API next…</p>
      </div>
    </div>
  )
}

export default RecruitmentPage
