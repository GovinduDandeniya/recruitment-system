const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const candidatesApi = {
  getAll(params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    ).toString()
    return request(`/candidates${qs ? `?${qs}` : ''}`)
  },

  getById(id) {
    return request(`/candidates/${id}`)
  },

  create(data) {
    return request('/candidates', { method: 'POST', body: JSON.stringify(data) })
  },

  update(id, data) {
    return request(`/candidates/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },

  updateStage(id, stage) {
    return request(`/candidates/${id}/stage`, { method: 'PATCH', body: JSON.stringify({ stage }) })
  },

  remove(id) {
    return request(`/candidates/${id}`, { method: 'DELETE' })
  },
}
