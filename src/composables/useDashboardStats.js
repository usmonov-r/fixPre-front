import {computed, ref} from 'vue'
import axios from 'axios'

export function useDashboardStats() {
    const stats = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    const fetchDashboardStats = async () => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('jwt_token')
            if (!token) {
                throw new Error('No authentication token found')
            }

            const response = await axios.get('https://fixpre.api.kengroq.uz/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            stats.value = response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch dashboard stats'
        } finally {
            isLoading.value = false
        }
    }

    const averageScore = computed(() => stats.value?.averageScore || 0)
    const totalPresentations = computed(() => stats.value?.totalPresentations || 0)
    const platformAverageScore = computed(() => stats.value?.platformAverageScore || 0)

    return {
        stats,
        isLoading,
        error,
        fetchDashboardStats,
        averageScore,
        totalPresentations,
        platformAverageScore
    }
}
