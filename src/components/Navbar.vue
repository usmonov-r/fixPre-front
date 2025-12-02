<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuth} from '@/composables/useAuth';

const router = useRouter();
const {logout, isLoggedIn, token} = useAuth();
const dropdownOpen = ref(false);
const userEmail = ref('');

onMounted(() => {
  if (token.value) {
    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      userEmail.value = payload.username || 'User';
    } catch (e) {
      userEmail.value = 'User';
    }
  }
});

function handleLogout() {
  logout();
  dropdownOpen.value = false;
  router.push('/login');
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}

function navigateToHome() {
  router.push('/');
  closeDropdown();
}

function navigateToHistory() {
  router.push('/history');
  closeDropdown();
}
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 shadow-sm">
    <div class="w-full max-w-7xl mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <router-link class="flex items-center gap-3 hover:opacity-80 transition-opacity" to="/">
          <div
              class="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-slate-900" style="font-family: 'Sora', sans-serif;">FixPre</span>
        </router-link>

        <div class="flex items-center gap-6">
          <div v-if="isLoggedIn" class="hidden md:flex items-center gap-6">
            <router-link
                class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                style="font-family: 'Inter', sans-serif;"
                to="/"
            >
              Upload
            </router-link>
            <router-link
                class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                style="font-family: 'Inter', sans-serif;"
                to="/history"
            >
              History
            </router-link>
          </div>

          <div v-if="isLoggedIn" class="flex items-center gap-2 md:gap-3">
            <router-link
                class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 text-white font-medium hover:bg-slate-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-700"
                to="/dashboard"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <span class="hidden md:block">Dashboard</span>
            </router-link>

            <button
                class="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-100/60 transition-all border border-transparent hover:border-slate-200"
                @click="toggleDropdown"
            >
              <div
                  class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm font-semibold">{{ userEmail.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-slate-900 truncate" style="font-family: 'Inter', sans-serif;">
                  {{ userEmail }}
                </p>
              </div>
              <svg
                  :class="['w-4 h-4 text-slate-600 transition-transform', { 'rotate-180': dropdownOpen }]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
            </button>

            <div
                v-if="dropdownOpen"
                class="fixed inset-0 z-40"
                @click="closeDropdown"
            ></div>
            <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden z-50"
            >
              <div class="px-4 py-3 border-b border-slate-1 00 bg-slate-50">
                <p class="text-xs text-slate-500" style="font-family: 'Inter', sans-serif;">Signed in as</p>
                <p class="text-sm font-medium text-slate-900 truncate" style="font-family: 'Inter', sans-serif;">
                  {{ userEmail }}
                </p>
              </div>

              <div class="py-2">
                <button
                    class="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                    style="font-family: 'Inter', sans-serif;"
                    @click="navigateToHome"
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                  <span>Upload Presentation</span>
                </button>

                <button
                    class="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                    style="font-family: 'Inter', sans-serif;"
                    @click="navigateToHistory"
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                  <span>Feedback History</span>
                </button>
              </div>

              <div class="border-t border-slate-100"></div>

              <div class="py-2">
                <button
                    class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium"
                    style="font-family: 'Inter', sans-serif;"
                    @click="handleLogout"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center gap-3">
            <router-link
                class="px-4 py-2 text-slate-700 font-medium hover:text-slate-900 transition-colors"
                style="font-family: 'Inter', sans-serif;"
                to="/login"
            >
              Sign In
            </router-link>
            <router-link
                class="px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-br from-black to-slate-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.25)] transition-all"
                to="/register"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
