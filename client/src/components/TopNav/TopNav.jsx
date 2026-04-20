import styles from './TopNav.module.css'

function TopNav() {
  return (
    <header className={styles.topNav}>
      <div className={styles.left}>
        <h1 className={styles.title}>Recruitment</h1>
      </div>
      <div className={styles.center}>
        <button className={styles.navTab}>
          Jobs <span className={styles.badge}>8</span>
        </button>
        <button className={`${styles.navTab} ${styles.active}`}>
          Candidate <span className={`${styles.badge} ${styles.badgeGreen}`}>551</span>
        </button>
        <button className={styles.navTab}>Career Site</button>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn} title="Add">＋</button>
        <button className={styles.iconBtn} title="Search">🔍</button>
        <button className={styles.iconBtn} title="Notifications">🔔</button>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  )
}

export default TopNav
