import styles from './JobHeader.module.css'

const TABS = ['Candidates', 'Job Info', 'Calendar', 'Score Card', 'Activity', 'Application Form', 'Automation']

function JobHeader({ activeTab = 'Candidates', onTabChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <button className={styles.backBtn}>←</button>
        <h2 className={styles.jobTitle}>Research and Development Officer</h2>
        <button className={styles.chevron}>▾</button>
        <div className={styles.nav}>
          <button className={styles.navArrow}>‹</button>
          <span className={styles.pageCount}>1 of 8</span>
          <button className={styles.navArrow}>›</button>
        </div>
        <div className={styles.spacer} />
        <button className={styles.moreBtn}>···</button>
        <button className={styles.shareBtn}>↗ Share &amp; Promote</button>
      </div>

      <div className={styles.metaRow}>
        <span className={`${styles.badge} ${styles.open}`}>● Open</span>
        <span className={styles.dot}>·</span>
        <span className={styles.meta}>🔬 Researcher</span>
        <span className={styles.dot}>·</span>
        <span className={styles.meta}>🖥 Onsite</span>
        <span className={styles.dot}>·</span>
        <span className={styles.meta}>Created by <strong>Bagus Fikri</strong></span>
      </div>

      <nav className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => onTabChange && onTabChange(tab)}
          >
            {tab}
            {tab === 'Automation' && <span className={styles.tabBadge}>5</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default JobHeader
