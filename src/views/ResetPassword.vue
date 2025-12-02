<script setup>
import {onMounted, ref} from 'vue';
import {useAuth} from '@/composables/useAuth.js'
import {useRoute, useRouter} from 'vue-router';

const {authError, isLoadingPwd, resetSuccess, resetPassword} = useAuth();
const route = useRoute();
const router = useRouter();

const token = ref(null);
const newPassword = ref('');
const confirmPassword = ref('');
const localError = ref(null);

onMounted(() => {
  token.value = route.query.token || null;
  if (!token.value) {
    authError.value = "Invalid or missing reset token.";
  }
});

const handleSubmit = async () => {
  localError.value = null;

  if (newPassword.value !== confirmPassword.value) {
    localError.value = "Password do not match.";
    return;
  }

  if (!token.value) {
    localError.value = "No Token Provided. ";
    return;
  }

  const success = await resetPassword(token.value, newPassword.value);

  if (success) {
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
}

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
        <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Set your new password</p>
      </div>

      <div class="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
        <div v-if="resetSuccess" class="text-center">
          <div
              class="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Password
            Reset!</h2>
          <p class="text-slate-600 mb-6" style="font-family: 'Inter', sans-serif;">
            {{ resetSuccess }} You will be redirected to login...
          </p>
          <button
              class="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              style="font-family: 'Inter', sans-serif;"
              @click="navigateToLogin"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5"></path>
            </svg>
            Go to Login
          </button>
        </div>

        <div v-else>
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Set New
              Password</h2>
            <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">
              Please enter your new password.
            </p>
          </div>

          <div v-if="authError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-red-700 text-sm font-medium" style="font-family: 'Inter', sans-serif;">
              {{ authError }}
            </p>
          </div>
          <div v-if="localError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-red-700 text-sm font-medium" style="font-family: 'Inter', sans-serif;">
              {{ localError }}
            </p>
          </div>

          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-2" for="password"
                   style="font-family: 'Inter', sans-serif;">
              New Password
            </label>
            <input
                id="password"
                v-model="newPassword"
                :disabled="isLoadingPwd"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                style="font-family: 'Inter', sans-serif;"
                type="password"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-slate-700 mb-2" for="confirm-password"
                   style="font-family: 'Inter', sans-serif;">
              Confirm New Password
            </label>
            <input
                id="confirm-password"
                v-model="confirmPassword"
                :disabled="isLoadingPwd"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                style="font-family: 'Inter', sans-serif;"
                type="password"
            />
          </div>

          <button
              :disabled="isLoadingPwd"
              class="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              style="font-family: 'Inter', sans-serif;"
              @click="handleSubmit"
          >
            {{ isLoadingPwd ? 'Resetting...' : 'Save New Password' }}
          </button>

          <div class="mt-6 text-center">
            <button
                :disabled="isLoadingPwd"
                class="text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style="font-family: 'Inter', sans-serif;"
                @click="navigateToLogin"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>