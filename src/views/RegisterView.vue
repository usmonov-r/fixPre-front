<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuth} from '@/composables/useAuth';

const router = useRouter();
const {register, isLoading, error} = useAuth();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const formError = ref('');

async function handleRegister() {
  formError.value = '';

  if (!email.value || !password.value || !confirmPassword.value) {
    formError.value = 'Please fill in all fields.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    formError.value = 'Passwords do not match.';
    return;
  }

  if (password.value.length < 6) {
    formError.value = 'Password must be at least 6 characters long.';
    return;
  }

  const result = await register(email.value, password.value);

  if (result.success) {
    navigateToLogin();
  } else {
    formError.value = result.error || 'Registration failed.';
  }
}

const handleGoogleLogin = () => {
  const clientId = '634429682543-e3c0nalg4kd6pn7ia7g0g7koq6lmdmeh.apps.googleusercontent.com';
  const redirectUri = 'https://fixpre.kengroq.uz/auth/callback';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'consent'
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};


function navigateToLogin() {
  router.push('/login');
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center mb-6">
          <div
              class="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-100 rounded-2xl flex items-center justify-center">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5"></path>
            </svg>
          </div>
        </div>
        <h1 class="text-4xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">FixPre</h1>
        <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Create your account</p>
      </div>

      <div class="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
        <div v-if="formError || error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-red-700 text-sm font-medium" style="font-family: 'Inter', sans-serif;">
            {{ formError || error }}
          </p>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-slate-700 mb-2" for="email"
                 style="font-family: 'Inter', sans-serif;">
            Email Address
          </label>
          <input
              id="email"
              v-model="email"
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
              placeholder="you@example.com"
              style="font-family: 'Inter', sans-serif;"
              type="email"
          />
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-slate-700 mb-2" for="password"
                 style="font-family: 'Inter', sans-serif;">
            Password
          </label>
          <input
              id="password"
              v-model="password"
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
              placeholder="••••••••"
              style="font-family: 'Inter', sans-serif;"
              type="password"
          />
          <p class="text-xs text-slate-500 mt-1" style="font-family: 'Inter', sans-serif;">
            At least 6 characters
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-2" for="confirm-password"
                 style="font-family: 'Inter', sans-serif;">
            Confirm Password
          </label>
          <input
              id="confirm-password"
              v-model="confirmPassword"
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
              placeholder="••••••••"
              style="font-family: 'Inter', sans-serif;"
              type="password"
          />
        </div>

        <button
            :disabled="isLoading"
            class="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            style="font-family: 'Inter', sans-serif;"
            @click="handleRegister"
        >
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-slate-200"></div>
          <span class="px-3 text-sm text-slate-500" style="font-family: 'Inter', sans-serif;">or</span>
          <div class="flex-1 border-t border-slate-200"></div>
        </div>

        <button
            :disabled="isLoading"
            class="w-full px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            style="font-family: 'Inter', sans-serif;"
            @click="navigateToLogin"
        >
          Sign In to Existing Account
        </button>

        <button
            class=" mt-2 w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-slate-700 hover:bg-gray-50 font-medium transition-all duration-200"
            type="button"
            @click="handleGoogleLogin"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"/>
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"/>
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"/>
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>


      </div>

      <p class="text-center text-sm text-slate-500 mt-6" style="font-family: 'Inter', sans-serif;">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>
