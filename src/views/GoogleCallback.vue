<script setup>
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuth} from '@/composables/useAuth.js'

const route = useRoute();
const router = useRouter();
const {loginWithGoogleCode, error} = useAuth();

onMounted(async () => {
  const code = route.query.code;
  console.log("code: ", code);
  if (!code) {
    router.push('/login');
    return;
  }

  const success = await loginWithGoogleCode(code);

  if (success) {
    router.push('/dashboard');
  } else {
    setTimeout(() => router.push('/login'), 7000);
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div v-if="!error" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h2 class="text-xl font-semibold text-gray-700">Logging you in with Google...</h2>
    </div>

    <div v-else class="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100">
      <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl">⚠️</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Login Failed</h2>
      <p class="text-gray-600">{{ error }}</p>
      <p class="text-sm text-gray-400 mt-4">Redirecting to login...</p>
    </div>
  </div>
</template>

<style scoped>

</style>