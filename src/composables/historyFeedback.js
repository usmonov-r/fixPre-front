import {onMounted, ref} from "vue";

export function historyFeedback() {
    const history = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    onMounted(async () => {
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            error.value = "You are not logged in";
            isLoading.value = false;
            return
        }
        try {
            const response = await fetch('https://fixpre.api.kengroq.uz/api/feedback/history', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Could not fetch HISTORY');
            }
            history.value = await response.json();
        } catch (e) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    });

    return {
        isLoading,
        error,
        history,
    }
}