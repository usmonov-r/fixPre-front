import {ref} from 'vue';

export function useFeedback() {
    const isLoading = ref(false);
    const feedback = ref(null);
    const error = ref(null);

    async function poolForResult(jobId, headers) {
        try {
            const resultResponse = await fetch(`https://fixpre.api.kengroq.uz/api/results/${jobId}`, {
                method: 'GET',
                headers: headers,
            });
            if (!resultResponse.ok) {
                throw new Error('Failed to get results. ');
            }
            const data = await resultResponse.json()
            if (data.status === 'pending') {
                setTimeout(() => poolForResult(jobId, headers), 2000);
            } else if (data.status === 'complete') {
                isLoading.value = false;
                feedback.value = data;
            } else if (data.status === 'failed') {
                throw new Error("File processing failed. ");
            }
        } catch (e) {
            error.value = e.message;
            isLoading.value = false;

        }
    }

    async function uploadFile(selectedFile) {
        if (!selectedFile) {
            error.value = "Please select a file first. ";
        }

        isLoading.value = true
        error.value = null;
        feedback.value = null;

        const formData = new FormData();
        formData.append('presentation', selectedFile);

        const token = localStorage.getItem('jwt_token');
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const uploadResponse = await fetch('https://fixpre.api.kengroq.uz/api/upload', {
                method: 'POST',
                body: formData,
                headers: headers
            });
            if (!uploadResponse.ok) {
                throw new Error('File upload failed. ');
            }
            const uploadData = await uploadResponse.json();
            const {jobId} = uploadData;
            setTimeout(() => poolForResult(jobId, headers), 3000);

        } catch (e) {
            error.value = e.message;
            isLoading.value = false;
        }
    }

    function startOver() {
        isLoading.value = false;
        feedback.value = null;
        error.value = null;
    }

    return {
        isLoading,
        feedback,
        error,
        uploadFile,
        startOver
    };
}