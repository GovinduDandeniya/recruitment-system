import { useState } from 'react'
import styles from './FilterBar.module.css'

const SCORE_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5']

function FilterBar({ onSearch, onScoreFilter, onSortChange }) {
  const [search, setSearch] = useState('')
  const [scoreRange, setScoreRange] = useState('Any')
  const [sort, setSort] = useState('appliedAt')
  const [view, setView] = useState('kanban')

  function handleSearch(e) {
    setSearch(e.target.value)
    onSearch && onSearch(e.target.value)
  }

  function handleScore(val) {
    setScoreRange(val)
    onScoreFilter && onScoreFilter(val)
  }

  function handleSort(e) {
    setSort(e.target.value)
    onSortChange && onSortChange(e.target.value)
  }

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.dropdown}>
          <span>📅 Date Range</span>
          <span className={styles.arrow}>▾</span>
        </div>

        <div className={styles.dropdown}>
          <span>⭐ Score Range</span>
          <span className={styles.arrow}>▾</span>
          <div className={styles.dropdownMenu}>
            {SCORE_OPTIONS.map((opt) => (
              <button
                key={opt}
                className={`${styles.dropdownItem} ${scoreRange === opt ? styles.dropdownItemActive : ''}`}
                onClick={() => handleScore(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.dropdown}>
          <span>⚡ Advance Filter</span>
          <span className={styles.arrow}>▾</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.referBtn}>↗ Refer People</button>
        <button className={styles.iconBtn} title="Settings">⚙</button>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'kanban' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('kanban')}
            title="Kanban"
          >
            ⊞ Kanban
          </button>
        </div>

        <select className={styles.sortSelect} value={sort} onChange={handleSort}>
          <option value="appliedAt">Date Applied</option>
          <option value="name">Name</option>
          <option value="score">Score</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
