import { useState } from 'react'
import JobHeader from '../components/JobHeader/JobHeader'
import styles from './RecruitmentPage.module.css'

function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('Candidates')

  return (
    <div className={styles.page}>
      <JobHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.content}>
        {/* Kanban board will be added in next commit */}
        <p style={{ padding: 24, color: '#6b7280' }}>Kanban board coming soon…</p>
      </div>
    </div>
  )
}

export default RecruitmentPage
