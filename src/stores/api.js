import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fixpre.api.kengroq.uz/api'

  /**
   * Fetch data from API using GET request
   * @param {string} endpoint - The API endpoint (e.g., '/presentations/feedback')
   * @param {object} options - Optional configuration (headers, params, etc.)
   * @returns {Promise} - Returns the API response data
   */
  async function fetchFromApi(endpoint, options = {}) {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const url = new URL(`${API_BASE_URL}/results/{e481bd68-389f-4b72-a30a-cdb7aade902a}`)

      if (options.params) {
        Object.keys(options.params).forEach(key => {
          url.searchParams.append(key, options.params[key])
        })
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      data.value = result
      return result
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching data'
      console.error('API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get presentation feedback from API
   * @param {string} presentationUrl - The URL of the presentation
   * @returns {Promise} - Returns feedback data
   */
  async function getPresentationFeedback(presentationUrl) {
    return fetchFromApi('/presentations/feedback', {
      params: {
        url: presentationUrl,
      },
    })
  }

  function resetState() {
    loading.value = false
    error.value = null
    data.value = null
  }
  
  return {
    loading,
    error,
    data,
    fetchFromApi,
    getPresentationFeedback,
    resetState,
  }
})
