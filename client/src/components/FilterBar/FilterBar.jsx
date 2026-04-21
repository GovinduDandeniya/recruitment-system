import { useState, useEffect, useRef } from 'react'
import styles from './FilterBar.module.css'

const SCORE_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5']

function FilterBar({ onSearch, onScoreFilter, onSortChange, onNewCandidate, stageFilter, onClearStageFilter }) {
  const [search, setSearch] = useState('')
  const [scoreRange, setScoreRange] = useState('Any')
  const [scoreOpen, setScoreOpen] = useState(false)
  const [sort, setSort] = useState('appliedAt')
  const [view, setView] = useState('kanban')
  const scoreRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (scoreRef.current && !scoreRef.current.contains(e.target)) {
        setScoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  function handleSearch(e) {
    setSearch(e.target.value)
    onSearch && onSearch(e.target.value)
  }

  function handleScore(val) {
    setScoreRange(val)
    setScoreOpen(false)
    onScoreFilter && onScoreFilter(val)
  }

  function handleSort(e) {
    setSort(e.target.value)
    onSortChange && onSortChange(e.target.value)
  }

  return (
    <div className={styles.barWrapper}>
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

          <div
            className={`${styles.dropdown} ${scoreOpen ? styles.dropdownOpen : ''}`}
            ref={scoreRef}
            onClick={() => setScoreOpen((o) => !o)}
          >
            <span>⭐ {scoreRange === 'Any' ? 'Score Range' : `Score ≥ ${scoreRange.replace('+', '')}`}</span>
            <span className={styles.arrow}>{scoreOpen ? '▴' : '▾'}</span>
            {scoreOpen && (
              <div className={styles.dropdownMenu}>
                {SCORE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    className={`${styles.dropdownItem} ${scoreRange === opt ? styles.dropdownItemActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleScore(opt) }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.dropdown}>
            <span>⚡ Advance Filter</span>
            <span className={styles.arrow}>▾</span>
          </div>
        </div>

        <div className={styles.right}>
          <button className={styles.newCandidateBtn} onClick={onNewCandidate} id="btn-new-candidate">
            + New Candidate
          </button>
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

      {stageFilter && (
        <div className={styles.activeFilter}>
          <span className={styles.filterChip}>
            Showing: <strong>{stageFilter}</strong>
            <button
              className={styles.clearChip}
              onClick={onClearStageFilter}
              title="Clear filter"
            >
              ✕
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

export default FilterBar

