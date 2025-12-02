import {computed, ref} from 'vue';

const resetSuccess = ref(null);
const resetError = ref(null);
const isLoadingPwd = ref(false);


export function useAuth() {
    const isLoading = ref(false);
    const error = ref(null);
    const token = ref(localStorage.getItem('jwt_token') || null);
    const authError = ref(null)
    const isLoggedIn = computed(() => !!token.value);
    const authLoading = ref(false);

    async function login(email, password) {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch('https://fixpre.api.kengroq.uz/api/users/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            const jwt = data.accessToken;

            if (!jwt) {
                throw new Error('No token received from server.');
            }

            token.value = jwt;
            localStorage.setItem('jwt_token', jwt);
            isLoading.value = false;

            return {success: true};
        } catch (e) {
            error.value = e.message;
            isLoading.value = false;
            return {success: false, error: e.message};
        }
    }

    const loginWithGoogleCode = async (code) => {
        isLoading.value = true;
        error.value = null;

        try {
            const reponse = await fetch('https://fixpre.api.kengroq.uz/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: code})
            });

            const data = await reponse.json();
            if (!reponse.ok) {
                throw new Error(data.error || 'Google login failed');
            }

            const jwt = data.token;
            if (jwt) {
                token.value = jwt;
                localStorage.setItem('jwt_token', jwt);
            }

            isLoading.value = false;
            return true;  // succeess
        } catch (e) {
            error.value = e.message;
            isLoading.value = false;
            return false; // failed
        }
    };

    async function register(email, password) {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch('https://fixpre.api.kengroq.uz/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed.');
            }

            const data = await response.json();
            const jwt = data.token || data.jwt;

            if (jwt) {
                token.value = jwt;
                localStorage.setItem('jwt_token', jwt);
            }

            isLoading.value = false;
            return {success: true};
        } catch (e) {
            error.value = e.message;
            isLoading.value = false;
            return {success: false, error: e.message};
        }
    }

    function logout() {
        token.value = null;
        localStorage.removeItem('jwt_token');
        error.value = null;
    }

    //    PWD RESET FUNCTION
    const requestPasswordReset = async (email) => {
        isLoadingPwd.value = true;
        resetError.value = null;
        resetSuccess.value = null;

        try {
            const response = await fetch('https://fixpre.api.kengroq.uz/api/users/password/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json'
                },
                body: JSON.stringify({email})
            });

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 404) {
                    resetSuccess.value = data.message || "If an account exists, a link has been sent"
                } else {
                    throw new Error(data.detail || 'An error occurred. ');
                }
            } else {
                resetSuccess.value = data.message
            }
        } catch (err) {
            resetError.value = err.message;
        } finally {
            isLoadingPwd.value = false;
        }
    };

    const resetPassword = async (token, newPassword) => {
        authLoading.value = true;
        resetError.value = null;
        resetSuccess.value = null;

        try {
            const response = await fetch('https://fixpre.api.kengroq.uz/api/users/password/reset', {
                method: 'POST',
                headers: {'Content-Type': 'application/ld+json'},
                body: JSON.stringify({token, newPassword})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Password reset failed.');
            }

            resetSuccess.value = data.message;
            return true;
        } catch (err) {
            resetError.value = err.message;
            return false;
        } finally {
            authLoading.value = false;
        }
    };

    return {
        isLoading,
        // authLoading,
        authError,
        error,
        token,
        isLoggedIn,
        resetSuccess,
        resetError,
        isLoadingPwd,

        requestPasswordReset,
        resetPassword,
        login,
        loginWithGoogleCode,
        register,
        logout,
    };
}
