<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { register, isLoading, error } = useAuth();

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
    window.location.href('/login');
  } else {
    formError.value = result.error || 'Registration failed.';
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
          <div class="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-100 rounded-2xl flex items-center justify-center">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
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
          <label for="email" class="block text-sm font-medium text-slate-700 mb-2" style="font-family: 'Inter', sans-serif;">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            style="font-family: 'Inter', sans-serif;"
            :disabled="isLoading"
          />
        </div>

        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-slate-700 mb-2" style="font-family: 'Inter', sans-serif;">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            style="font-family: 'Inter', sans-serif;"
            :disabled="isLoading"
          />
          <p class="text-xs text-slate-500 mt-1" style="font-family: 'Inter', sans-serif;">
            At least 6 characters
          </p>
        </div>

        <div class="mb-6">
          <label for="confirm-password" class="block text-sm font-medium text-slate-700 mb-2" style="font-family: 'Inter', sans-serif;">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            style="font-family: 'Inter', sans-serif;"
            :disabled="isLoading"
          />
        </div>

        <button
          @click="handleRegister"
          :disabled="isLoading"
          class="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          style="font-family: 'Inter', sans-serif;"
        >
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-slate-200"></div>
          <span class="px-3 text-sm text-slate-500" style="font-family: 'Inter', sans-serif;">or</span>
          <div class="flex-1 border-t border-slate-200"></div>
        </div>

        <button
          @click="navigateToLogin"
          :disabled="isLoading"
          class="w-full px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          style="font-family: 'Inter', sans-serif;"
        >
          Sign In to Existing Account
        </button>
      </div>

      <p class="text-center text-sm text-slate-500 mt-6" style="font-family: 'Inter', sans-serif;">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>
