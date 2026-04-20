import styles from './Layout.module.css'

function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>FIK</div>
        <nav className={styles.sideNav}>
          <button className={styles.navIcon} title="Dashboard">
            <span className={styles.iconBox} />
          </button>
          <button className={styles.navIcon} title="Calendar">
            <span className={styles.iconBox} />
          </button>
          <button className={styles.navIcon} title="Candidates">
            <span className={styles.iconBox} />
          </button>
          <button className={styles.navIcon} title="Reports">
            <span className={styles.iconBox} />
          </button>
          <button className={styles.navIcon} title="Settings">
            <span className={styles.iconBox} />
          </button>
        </nav>
      </aside>
      <div className={styles.body}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}

export default Layout
