import { useState, useEffect, useCallback } from 'react'
import { candidatesApi } from '../services/api'

export function useCandidates(params = {}) {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCandidates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await candidatesApi.getAll(params)
      setCandidates(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  const moveCandidate = useCallback(async (id, stage) => {
    try {
      const res = await candidatesApi.updateStage(id, stage)
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      )
    } catch (err) {
      setError(err.message)
    }
  }, [])

  const deleteCandidate = useCallback(async (id) => {
    try {
      await candidatesApi.remove(id)
      setCandidates((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }, [])

  return { candidates, loading, error, moveCandidate, deleteCandidate, refetch: fetchCandidates }
}
