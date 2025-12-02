`
<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useFeedback} from "@/composables/useFeedback.js";
import FeedbackDisplay from "@/components/FeedbackDisplay.vue";
import FeedbackExample from "@/components/FeedbackExample.vue";

const router = useRouter();

const {
  isLoading,
  feedback,
  error,
  uploadFile: performUpload,
  startOver: clearFeedback
} = useFeedback();

const selectedFile = ref(null);
const isLoggedIn = ref(false);
const showRegistrationPrompt = ref(false);

const checkAuthStatus = () => {
  const token = localStorage.getItem('jwt_token');
  isLoggedIn.value = !!token;

  if (!isLoggedIn.value) {
    setTimeout(() => {
      showRegistrationPrompt.value = true;
    }, 3000);
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const handleUpload = async () => {
  if (selectedFile.value) {
    await performUpload(selectedFile.value);
  }
};

const startOver = () => {
  selectedFile.value = null;
  clearFeedback();
  scrollToUpload();
};

const scrollToUpload = () => {
  const uploadElement = document.querySelector('[data-upload-section]');
  if (uploadElement) {
    uploadElement.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
};

const goToRegister = () => {
  router.push('/register');
};

onMounted(() => {
  checkAuthStatus();
});


</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.star-rating svg {
  animation: shimmer 2s ease-in-out infinite;
}

.star-rating svg:nth-child(2) {
  animation-delay: 0.1s;
}

.star-rating svg:nth-child(3) {
  animation-delay: 0.2s;
}

.star-rating svg:nth-child(4) {
  animation-delay: 0.3s;
}

.star-rating svg:nth-child(5) {
  animation-delay: 0.4s;
}
</style>

<template>
  <div class="min-h-screen relative overflow-hidden bg-slate-50">
    <div class="mesh-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    <div class="relative z-10 w-full max-w-6xl mx-auto px-6 py-8">
      <div v-if="!isLoggedIn && showRegistrationPrompt"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
            class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
          <div class="text-center">
            <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Unlock More
              Features!</h3>

            <p class="text-slate-600 mb-6" style="font-family: 'Inter', sans-serif;">
              Join FixPre to save your feedback history, track your progress, and watch your presentations improve over
              time.
            </p>

            <div class="space-y-3 mb-6 text-left">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path clip-rule="evenodd"
                          d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          fill-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-700"
                      style="font-family: 'Inter', sans-serif;">Save feedback history</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-700" style="font-family: 'Inter', sans-serif;">Dashboard for tracking feedback</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path clip-rule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          fill-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm text-slate-700" style="font-family: 'Inter', sans-serif;">Track presentation improvement</span>
              </div>
            </div>

            <div class="flex gap-3">
              <button class="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium"
                      style="font-family: 'Inter', sans-serif;"
                      @click="showRegistrationPrompt = false">
                Maybe Later
              </button>
              <button class="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                      style="font-family: 'Inter', sans-serif;"
                      @click="goToRegister">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-6xl mx-auto px-6 py-8">
        <header v-if="!feedback" class="text-center mb-12">
          <div class="inline-flex items-center justify-center mb-6">
            <div
                class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5"></path>
              </svg>
            </div>
          </div>
          <h1 class="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
              style="font-family: 'Sora', sans-serif;">FixPre</h1>

          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Make Your Slides
              Shine ✨</h2>
            <p class="text-lg text-slate-600 leading-relaxed" style="font-family: 'Inter', sans-serif;">AI-powered
              insights that save you hours and upgrade your presentations instantly</p>
          </div>
        </header>

        <div v-if="!isLoading && !feedback" class="max-w-4xl mx-auto mb-10">
          <!-- Upload Form -->
          <div class="space-y-5">

            <div class="relative" data-upload-section>
              <label class="block" for="file-upload">
                <div
                    class="group relative border-2 border-dashed border-slate-300 bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-500 hover:border-indigo-400 hover:shadow-md overflow-hidden">
                  <div
                      class="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                  <div class="relative z-10">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"></path>
                      </svg>
                    </div>

                    <p class="text-slate-700 font-medium mb-1" style="font-family: 'Inter', sans-serif;">
                      {{ selectedFile ? selectedFile.name : 'Drop your PowerPoint file here' }}
                    </p>
                    <p class="text-sm text-slate-500" style="font-family: 'Inter', sans-serif;">.pptx, .ppt • Max
                      20MB</p>
                  </div>
                </div>
                <input
                    id="file-upload"
                    accept=".pptx, .ppt"
                    class="sr-only"
                    type="file"
                    @change="handleFileSelect"
                />
              </label>
            </div>

            <div v-if="isLoading" class="flex flex-col items-center justify-center py-8">
              <div class="relative w-16 h-16 mb-4">
                <div class="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div
                    class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>

                <div
                    class="absolute inset-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>

                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
                  </svg>
                </div>
              </div>

              <div class="text-center">
                <p class="text-slate-700 font-medium mb-1" style="font-family: 'Inter', sans-serif;">Analyzing your
                  presentation...</p>
                <p class="text-sm text-slate-500" style="font-family: 'Inter', sans-serif;">This usually takes 10-15
                  seconds</p>

                <div class="flex justify-center gap-1 mt-3">
                  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                  :disabled="!selectedFile"
                  class="flex-1 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:ring-offset-2 transform hover:scale-[1.03] disabled:hover:scale-100"
                  style="font-family: 'Inter', sans-serif;"
                  @click="handleUpload"
              >
              <span class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"></path>
                </svg>
                Analyze My Presentation
              </span>
              </button>
              <button
                  v-if="selectedFile"
                  class="px-6 py-5 bg-white/80 backdrop-blur-sm text-slate-700 font-medium rounded-2xl transition-all duration-300 hover:bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                  style="font-family: 'Inter', sans-serif;"
                  @click="selectedFile = null"
              >
                Clear
              </button>
            </div>
          </div>

          <div class="text-center mb-6 mt-8">
            <div class="inline-flex items-center gap-2 mb-4">
              <span class="text-3xl">📤</span>
              <span class="text-2xl">→</span>
              <span class="text-3xl">🔍</span>
              <span class="text-2xl">→</span>
              <span class="text-3xl">✨</span>
            </div>
            <h2 class="text-3xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Upload → Analyze
              →
              Improve</h2>
            <p class="text-lg text-slate-600" style="font-family: 'Inter', sans-serif;">Get instant AI-powered feedback
              on
              your slides</p>
          </div>
        </div>
        <div v-if="isLoading" class="py-16 text-center space-y-6">
          <div class="flex justify-center">
            <div class="relative w-16 h-16">
              <svg class="animate-spin w-full h-full text-slate-300" fill="none" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
              </svg>
              <svg class="absolute inset-0 animate-spin w-full h-full text-slate-600"
                   fill="none" style="animation-direction: reverse; animation-duration: 2s;"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Analyzing
              your
              presentation</h3>
            <p class="text-slate-500" style="font-family: 'Inter', sans-serif;">This may take up to a minute. Please
              wait...</p>
          </div>
        </div>

        <div v-if="feedback" class="space-y-8">
          <FeedbackDisplay :feedback="feedback"/>
          <div class="flex gap-4 justify-center pt-4">
            <button
                class="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                style="font-family: 'Inter', sans-serif;"
                @click="startOver"
            >
              Upload Another
            </button>
          </div>
        </div>

        <div v-if="error" class="space-y-6">
          <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div class="flex gap-4">
              <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24">
                <path d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
              <div>
                <h3 class="font-semibold text-red-900 mb-1" style="font-family: 'Sora', sans-serif;">Something went
                  wrong</h3>
                <p class="text-red-700 text-sm mb-4" style="font-family: 'Inter', sans-serif;">{{ error }}</p>
                <p class="text-red-600 text-sm" style="font-family: 'Inter', sans-serif;">Please check your internet
                  connection or try a different file.</p>
              </div>
            </div>
          </div>
          <button
              class="w-full px-8 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              style="font-family: 'Inter', sans-serif;"
              @click="startOver"
          >
            Try Again
          </button>
        </div>

        <div v-if="!isLoading && !feedback && !error" class="max-w-4xl mx-auto mb-6">
          <div
              class="relative bg-gradient-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold mb-3" style="font-family: 'Sora', sans-serif;">Transform Your
                    Presentations Today</h3>
                  <p class="text-white/90 mb-4" style="font-family: 'Inter', sans-serif;">Join thousands of presenters
                    who've improved their slides with AI-powered feedback</p>
                  <button
                      class="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      style="font-family: 'Inter', sans-serif;">
                    View sample output
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
                <div class="hidden md:block">
                  <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Proof Section -->
        <div v-if="!isLoading && !feedback && !error" class="max-w-4xl mx-auto mb-10">
          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm">
            <div class="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <img alt="Student" class="w-6 h-6 rounded-full border-2 border-white object-cover"
                       src="/profile-pics/female-student.png">
                  <img alt="Student" class="w-6 h-6 rounded-full border-2 border-white object-cover"
                       src="/profile-pics/male-student.png">
                  <img alt="Student" class="w-6 h-6 rounded-full border-2 border-white object-cover"
                       src="/profile-pics/female-student2.png">
                  <img alt="Student" class="w-6 h-6 rounded-full border-2 border-white object-cover"
                       src="/profile-pics/male-student-2.png">
                </div>
                <span class="text-slate-600" style="font-family: 'Inter', sans-serif;">Trusted by students, professionals, and designers</span>
              </div>
              <div class="flex items-center gap-1 star-rating">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-slate-600 font-medium" style="font-family: 'Inter', sans-serif;">4/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isLoading && !feedback && !error" class="mb-10 animate-fade-in">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Why Choose
              FixPre?
              🚀</h3>
            <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">The smartest way to improve your
              presentations</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div
                class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div
                  class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Instant
                Insights</h4>
              <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Get comprehensive feedback in seconds,
                not hours. Our AI analyzes every aspect of your presentation instantly.</p>
            </div>

            <div
                class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Actionable
                Advice</h4>
              <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Receive specific, practical
                recommendations you can implement immediately to improve your slides.</p>
            </div>

            <div
                class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
              <div
                  class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Expert-Level
                Analysis</h4>
              <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Our AI is trained on thousands of
                professional presentations to give you expert-level feedback every time.</p>
            </div>
          </div>
        </div>

        <div v-if="!isLoading && !feedback && !error" class="mb-10">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">How It Works
              📋</h3>
            <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Three simple steps to presentation
              perfection</p>
          </div>

          <div class="bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 border border-slate-100">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 relative">
              <div class="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 text-slate-300">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
              <div class="hidden md:block absolute top-1/2 left-2/4 -translate-y-1/2 text-slate-300">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>

              <div class="text-center">
                <div
                    class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="text-3xl font-bold text-white">1</span>
                </div>
                <h4 class="text-lg font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Upload Your
                  Slides</h4>
                <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Drag and drop your PowerPoint
                  file</p>
              </div>

              <div class="text-center">
                <div
                    class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="text-3xl font-bold text-white">2</span>
                </div>
                <h4 class="text-lg font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">AI
                  Analysis</h4>
                <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Our AI reviews every aspect of your
                  presentation</p>
              </div>

              <div class="text-center">
                <div
                    class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="text-3xl font-bold text-white">3</span>
                </div>
                <h4 class="text-lg font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Get
                  Feedback</h4>
                <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Receive actionable insights
                  instantly</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isLoading && !feedback && !error" class="mb-10">
          <div class="text-center bg-gradient-to-r from-slate-50 to-white rounded-3xl p-10 border border-slate-100">
            <h3 class="text-3xl font-bold text-slate-900 mb-4" style="font-family: 'Sora', sans-serif;">Ready to improve
              your presentation?</h3>
            <p class="text-slate-600 mb-6" style="font-family: 'Inter', sans-serif;">Join thousands of presenters who've
              transformed their slides with AI-powered feedback</p>
            <button
                class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                style="font-family: 'Inter', sans-serif;"
                @click="scrollToUpload"
            >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5"></path>
              </svg>
              Upload & Analyze
            </span>
            </button>
          </div>
        </div>

        <div v-if="!isLoading && !feedback && !error" class="mb-10 animate-fade-in">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">What People Say
              💬</h3>
            <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Join thousands of satisfied
              presenters</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
              <div class="flex items-center gap-1 mb-3 star-rating">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-slate-700 mb-3 italic" style="font-family: 'Inter', sans-serif;">"FixPre helped me
                transform
                my pitch deck from good to exceptional. The AI feedback was spot-on and actionable!"</p>
              <div class="flex items-center gap-3">
                <img alt="Sarah Chen" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                     src="/profile-pics/female-student.png">
                <div>
                  <p class="font-semibold text-slate-900" style="font-family: 'Inter', sans-serif;">Sarah Chen</p>
                  <p class="text-sm text-slate-600" style="font-family: 'Inter', sans-serif;">Product Manager</p>
                </div>
              </div>
            </div>

            <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
              <div class="flex items-center gap-1 mb-3 star-rating">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-slate-700 mb-3 italic" style="font-family: 'Inter', sans-serif;">"As a student, this tool
                has
                been a game-changer for my presentations. My grades have improved significantly!"</p>
              <div class="flex items-center gap-3">
                <img alt="Michael Rodriguez" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                     src="/profile-pics/male-student.png">
                <div>
                  <p class="font-semibold text-slate-900" style="font-family: 'Inter', sans-serif;">Michael
                    Rodriguez</p>
                  <p class="text-sm text-slate-600" style="font-family: 'Inter', sans-serif;">Graduate Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeedbackExample :error="error" :feedback="feedback" :isLoading="isLoading"/>
        <div v-if="!isLoading && !feedback && !error" class="mb-16 md:mb-20 scroll-fade-in">
          <div
              class="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white">
            <div class="relative">
              <p class="inline-block text-sm md:text-base font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-slate-800/80"
                 style="font-family: 'Inter', sans-serif;">
                <span>✨</span> Elevate Your Presentation <span>✨</span>
              </p>

              <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8"
                  style="font-family: 'Sora', sans-serif;">
                <span class="relative inline-block">
                  <span class="relative z-10">
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300">Fix</span> Your
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300">Pre</span>sentation
                  </span>
                  <span
                      class="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-emerald-500/30 to-purple-500/30 rounded-full transform -rotate-1 scale-x-110"></span>
                </span>
                <span class="block mt-2 md:mt-3 text-2xl md:text-3xl font-medium text-slate-200">
                  Start Your Journey to <span class="text-emerald-300">Confidence</span> Today
                </span>
              </h2>

              <p class="max-w-2xl mx-auto text-slate-300 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed"
                 style="font-family: 'Inter', sans-serif;">
                Transform your presentations with AI-powered feedback
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                    class="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                    style="font-family: 'Inter', sans-serif; min-width: 200px;"
                    @click="scrollToUpload"
                >
                  <span class="flex items-center justify-center gap-2">
                    <span>Get Started Now</span>
                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"></path>
                    </svg>
                  </span>
                </button>

                <router-link
                    v-if="!isLoggedIn"
                    class="px-8 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    style="font-family: 'Inter', sans-serif; min-width: 200px;"
                    to="/register"
                >
                  <span>Create Free Account</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-20 pt-12 border-t border-slate-200">
        <div class="text-center space-y-6">
          <p class="text-slate-600 text-sm font-medium" style="font-family: 'Inter', sans-serif;">AI-powered
            presentation feedback.</p>

          <div class="flex justify-center items-center gap-6">
            <a class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all duration-300"
               href="#">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all duration-300"
               href="#">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all duration-300"
               href="#">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <p class="text-slate-400 text-xs opacity-50" style="font-family: 'Inter', sans-serif;">© 2025 FixPre. All
            rights reserved.</p>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}


@keyframes scrollFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-fade-in {
  animation: scrollFadeIn 0.8s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes scrollPopUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.scroll-pop-up {
  animation: scrollPopUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

.mesh-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: #F8FAFC;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 15s infinite ease-in-out;
  transform-origin: center center;
}


.blob-1 {
  top: -15%;
  left: -15%;
  width: 55vw;
  height: 55vw;
  background: #A855F7;
  animation-delay: 0s;
  animation-duration: 18s;
}

.blob-2 {
  bottom: -15%;
  right: -15%;
  width: 55vw;
  height: 55vw;
  background: #3B82F6;
  animation-delay: -5s;
  animation-duration: 16s;
}

.blob-3 {
  top: 30%;
  left: 30%;
  width: 40vw;
  height: 40vw;
  background: #F472B6;
  opacity: 0.4;
  animation-delay: -10s;
  animation-duration: 20s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-30px, 40px) scale(0.98);
  }
  75% {
    transform: translate(10px, -20px) scale(1.02);
  }
}

.relative.z-10.w-full.max-w-6xl.mx-auto {
  background-color: transparent;
}
</style>