import { useState } from 'react'
import styles from './CreateCandidateModal.module.css'

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test']

const DEFAULT_FORM = {
  name: '',
  stage: 'Applying Period',
  appliedAt: new Date().toISOString().slice(0, 10),
  score: '',
  isReferred: false,
  hasAssessment: false,
}

function CreateCandidateModal({ onClose, onCreate }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.appliedAt) errs.appliedAt = 'Application date is required'
    if (form.score !== '' && (isNaN(Number(form.score)) || Number(form.score) < 1 || Number(form.score) > 5)) {
      errs.score = 'Score must be between 1 and 5'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      await onCreate({
        name: form.name.trim(),
        stage: form.stage,
        appliedAt: new Date(form.appliedAt).toISOString(),
        score: form.score === '' ? null : Number(form.score),
        isReferred: form.isReferred,
        hasAssessment: form.hasAssessment,
      })
      onClose()
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Add New Candidate</h3>
          <button className={styles.closeBtn} onClick={onClose} type="button">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cc-name">Full Name *</label>
            <input
              id="cc-name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Jane Anderson"
              autoFocus
            />
            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
          </div>

          {/* Stage */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cc-stage">Application Stage *</label>
            <select
              id="cc-stage"
              className={styles.input}
              name="stage"
              value={form.stage}
              onChange={handleChange}
            >
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Applied At */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cc-date">Application Date *</label>
            <input
              id="cc-date"
              className={`${styles.input} ${errors.appliedAt ? styles.inputError : ''}`}
              type="date"
              name="appliedAt"
              value={form.appliedAt}
              onChange={handleChange}
            />
            {errors.appliedAt && <span className={styles.errorMsg}>{errors.appliedAt}</span>}
          </div>

          {/* Score */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cc-score">
              Overall Score <span className={styles.optional}>(1–5, optional)</span>
            </label>
            <input
              id="cc-score"
              className={`${styles.input} ${errors.score ? styles.inputError : ''}`}
              type="number"
              name="score"
              value={form.score}
              onChange={handleChange}
              placeholder="Leave blank if not scored"
              min="1"
              max="5"
              step="0.5"
            />
            {errors.score && <span className={styles.errorMsg}>{errors.score}</span>}
          </div>

          {/* Checkboxes */}
          <div className={styles.checkRow}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="isReferred"
                checked={form.isReferred}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span>Referred candidate</span>
            </label>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="hasAssessment"
                checked={form.hasAssessment}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span>Assessment completed</span>
            </label>
          </div>

          {errors.submit && <p className={styles.submitError}>{errors.submit}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? 'Adding…' : 'Add Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCandidateModal
