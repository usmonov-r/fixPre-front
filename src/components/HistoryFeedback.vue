<script setup>
import {computed, ref} from 'vue';
import {historyFeedback} from '@/composables/historyFeedback';

const {history, isLoading, error} = historyFeedback();
const selectedFeedback = ref(null);
const showModal = ref(false);
const modalContent = ref(null);


function openFeedback(item) {
  selectedFeedback.value = item;
  showModal.value = true;


  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (modalContent.value) {
      modalContent.value.scrollTop = 0;
    }
  }, 100);
}

function closeFeedback() {
  showModal.value = false;
  selectedFeedback.value = null;

  document.body.style.overflow = '';
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getScoreColor(score) {
  if (score >= 8) return 'bg-green-100 text-green-700';
  if (score >= 6) return 'bg-blue-100 text-blue-700';
  if (score >= 4) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

const colorPalette = [
  {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'bg-blue-500',
    text: 'text-blue-900',
    accent: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700'
  },
  {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'bg-purple-500',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700'
  },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'bg-emerald-500',
    text: 'text-emerald-900',
    accent: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700'
  },
  {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'bg-orange-500',
    text: 'text-orange-900',
    accent: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-700'
  },
  {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    icon: 'bg-pink-500',
    text: 'text-pink-900',
    accent: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-700'
  },
  {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    icon: 'bg-cyan-500',
    text: 'text-cyan-900',
    accent: 'text-cyan-600',
    badge: 'bg-cyan-100 text-cyan-700'
  },
];

const formattedSlides = computed(() => {
  if (!selectedFeedback.value?.feedback?.slides) return [];

  const feedbackSlides = selectedFeedback.value.feedback.slides;
  const slides = [];

  Object.keys(feedbackSlides)
      .filter(key => key.startsWith('slide_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_')[1]);
        const numB = parseInt(b.split('_')[1]);
        return numA - numB;
      })
      .forEach((slideKey, slideIndex) => {
        const slideData = feedbackSlides[slideKey];
        const slideNumber = slideKey.split('_')[1];

        slides.push({
          slideNumber: parseInt(slideNumber),
          title: `Slide ${slideNumber}`,
          clarityFeedback: slideData.clarity_feedback || 'No clarity feedback available.',
          concisenesFeedback: slideData.conciseness_feedback || 'No conciseness feedback available.',
          typosGrammar: slideData.typos_grammar || 'No grammar issues found.',
          quickFixSuggestion: slideData.quick_fix_suggestion || 'No quick fixes suggested.',
          color: colorPalette[slideIndex % colorPalette.length]
        });
      });

  return slides;
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
    <!-- Main Container -->
    <div class="w-full max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">
          Feedback History
        </h1>
        <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">
          View all your presentation feedback
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-16">
        <div class="text-center">
          <div class="inline-block">
            <div class="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
          </div>
          <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">Loading your feedback history...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div class="flex items-start">
          <svg class="w-6 h-6 text-red-600 mt-0.5 mr-4 flex-shrink-0" fill="none" stroke="currentColor"
               viewBox="0 0 24 24">
            <path d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"></path>
          </svg>
          <div>
            <h3 class="text-red-900 font-semibold mb-1" style="font-family: 'Sora', sans-serif;">Error Loading
              History</h3>
            <p class="text-red-700" style="font-family: 'Inter', sans-serif;">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="history.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-width="1.5"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">No Feedback
          Yet</h3>
        <p class="text-slate-600 mb-6" style="font-family: 'Inter', sans-serif;">
          Upload a presentation to get started with AI-powered feedback
        </p>
        <router-link
            class="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
            style="font-family: 'Inter', sans-serif;"
            to="/"
        >
          Upload Presentation
        </router-link>
      </div>

      <!-- History List -->
      <div v-else class="space-y-4">
        <div
            v-for="(item, index) in history"
            :key="index"
            class="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer group"
            @click="openFeedback(item)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-xl flex items-center justify-center group-hover:from-slate-300 group-hover:to-slate-200 transition-all">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900" style="font-family: 'Sora', sans-serif;">
                    {{ item.filename || 'Presentation' }}
                  </h3>
                  <p class="text-sm text-slate-500" style="font-family: 'Inter', sans-serif;">
                    {{ formatDate(item.createdAt || item.created_at) }}
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                    v-if="item.overallScore || item.overall_score"
                    :class="getScoreColor(item.overallScore || item.overall_score)"
                    class="px-3 py-1 rounded-lg text-sm font-medium"
                    style="font-family: 'Inter', sans-serif;"
                >
                  Score: {{ item.overallScore || item.overall_score }}/10
                </span>
                <span
                    v-if="item.slides"
                    class="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                    style="font-family: 'Inter', sans-serif;"
                >
                  {{ item.slides }} slides
                </span>
                <span
                    v-if="item.status"
                    class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                    style="font-family: 'Inter', sans-serif;"
                >
                  {{ item.status }}
                </span>
              </div>
            </div>

            <div class="ml-4 flex-shrink-0">
              <svg class="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col">
        <div class="flex-shri nk-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900" style="font-family: 'Sora', sans-serif;">
              {{ selectedFeedback.filename || 'Presentation Feedback' }}
            </h2>
            <p class="text-sm text-slate-500 mt-1" style="font-family: 'Inter', sans-serif;">
              {{ formatDate(selectedFeedback.createdAt || selectedFeedback.created_at) }}
            </p>
          </div>
          <button
              class="p-2 hover:bg-slate-100 rounded-lg transition-all"
              @click="closeFeedback"
          >
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </button>
        </div>

        <div class="relative flex-1 overflow-hidden">
          <div ref="modalContent" class="absolute inset-0 overflow-y-auto p-6 space-y-6">
            <div v-if="selectedFeedback.overallScore || selectedFeedback.overall_score"
                 class="bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl overflow-hidden border border-slate-100/50">
              <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0"
                     style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23000000&quot; fill-opacity=&quot;0.4&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
              </div>

              <div class="relative p-8 text-center">
                <div class="mb-6">
                  <h2 class="text-2xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Overall
                    Score</h2>
                  <p class="text-slate-500 text-sm" style="font-family: 'Inter', sans-serif;">AI-powered presentation
                    analysis</p>
                </div>

                <div class="flex justify-center">
                  <div class="relative w-48 h-48">
                    <div class="absolute inset-0 rounded-full bg-purple-100 opacity-10"></div>

                    <div class="absolute inset-1 rounded-full bg-white shadow-inner">
                      <svg class="w-full h-full" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            fill="none"
                            r="80"
                            stroke="#e2e8f0"
                            stroke-width="16"
                        />

                        <circle
                            :stroke-dasharray="`${(selectedFeedback.overallScore || selectedFeedback.overall_score) * 50.27} 502.7`"
                            :stroke-dashoffset="0"
                            class="transition-all duration-1500 ease-out"
                            cx="100"
                            cy="100"
                            fill="none"
                            r="80"
                            stroke="#9333ea"
                            stroke-linecap="round"
                            stroke-width="16"
                            transform="rotate(-90 100 100)"
                        />
                      </svg>
                    </div>

                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <div class="relative">
                        <div class="text-5xl font-black text-purple-700" style="font-family: 'Sora', sans-serif;">
                          {{ (selectedFeedback.overallScore || selectedFeedback.overall_score || 0).toFixed(1) }}
                        </div>
                        <div class="absolute -top-2 -right-8 text-xl font-bold text-slate-400">/10</div>
                      </div>

                      <div
                          class="mt-2 px-4 py-2 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-400 text-white">
                        <div class="flex items-center gap-1">
                          <span class="text-lg">⭐</span>
                          <span class="text-xs font-bold" style="font-family: 'Inter', sans-serif;">
                          {{
                              (selectedFeedback.overallScore || selectedFeedback.overall_score || 0) >= 7 ? 'Excellent' : (selectedFeedback.overallScore || selectedFeedback.overall_score || 0) >= 5 ? 'Good' : 'Needs Work'
                            }}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedFeedback.feedback && selectedFeedback.feedback.slides" class="space-y-8">
              <h3 class="text-lg font-semibold text-slate-900" style="font-family: 'Sora', sans-serif;">Slide-by-Slide
                Analysis</h3>

              <div
                  v-for="(slide, slideIndex) in formattedSlides"
                  :key="slide.title"
                  class="space-y-4"
              >
                <div :class="`${slide.color.bg} ${slide.color.border} border-2 rounded-2xl p-6 mb-6`">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div
                          :class="`flex-shrink-0 w-14 h-14 ${slide.color.icon} rounded-xl flex items-center justify-center`">
                        <span class="text-white font-bold text-2xl"
                              style="font-family: 'Sora', sans-serif;">{{ slide.slideNumber }}</span>
                      </div>
                      <div>
                        <h3 :class="`text-2xl font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                          {{ slide.title }}</h3>
                        <p :class="`text-sm ${slide.color.accent}`" style="font-family: 'Inter', sans-serif;">Slide
                          Analysis</p>
                      </div>
                    </div>
                    <div :class="slide.color.badge" class="px-3 py-1 rounded-full text-sm font-medium">
                      Slide {{ slide.slideNumber }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                      :class="`${slide.color.bg} ${slide.color.border} border rounded-2xl p-5 transition-all duration-300 hover:shadow-md`">
                    <div class="flex items-start gap-3 mb-3">
                      <div
                          :class="`flex-shrink-0 w-8 h-8 ${slide.color.icon} rounded-full flex items-center justify-center mt-0.5`">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path clip-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                fill-rule="evenodd"></path>
                        </svg>
                      </div>
                      <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                        Clarity</h4>
                    </div>
                    <p :class="`${slide.color.text} text-sm leading-relaxed`" style="font-family: 'Inter', sans-serif;">
                      {{ slide.clarityFeedback }}</p>
                  </div>

                  <div
                      :class="`${slide.color.bg} ${slide.color.border} border rounded-2xl p-5 transition-all duration-300 hover:shadow-md`">
                    <div class="flex items-start gap-3 mb-3">
                      <div
                          :class="`flex-shrink-0 w-8 h-8 ${slide.color.icon} rounded-full flex items-center justify-center mt-0.5`">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path clip-rule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                fill-rule="evenodd"></path>
                        </svg>
                      </div>
                      <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                        Conciseness</h4>
                    </div>
                    <p :class="`${slide.color.text} text-sm leading-relaxed`" style="font-family: 'Inter', sans-serif;">
                      {{ slide.concisenesFeedback }}</p>
                  </div>

                  <div
                      :class="`${slide.color.bg} ${slide.color.border} border rounded-2xl p-5 transition-all duration-300 hover:shadow-md`">
                    <div class="flex items-start gap-3 mb-3">
                      <div
                          :class="`flex-shrink-0 w-8 h-8 ${slide.color.icon} rounded-full flex items-center justify-center mt-0.5`">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path clip-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.050A3.066 3.066 0 0114.734 16h-9.504a3.066 3.066 0 01-3.062-3.062v-6.05a3.066 3.066 0 012.812-3.062zM9 13a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z"
                                fill-rule="evenodd"></path>
                        </svg>
                      </div>
                      <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                        Typos & Grammar</h4>
                    </div>
                    <p :class="`${slide.color.text} text-sm leading-relaxed`" style="font-family: 'Inter', sans-serif;">
                      {{ slide.typosGrammar }}</p>
                  </div>

                  <div
                      :class="`${slide.color.bg} ${slide.color.border} border-2 rounded-2xl p-5 transition-all duration-300 hover:shadow-md`">
                    <div class="flex items-start gap-3 mb-3">
                      <div
                          :class="`flex-shrink-0 w-8 h-8 ${slide.color.icon} rounded-full flex items-center justify-center mt-0.5`">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path clip-rule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"
                                fill-rule="evenodd"></path>
                        </svg>
                      </div>
                      <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                        Quick Fix</h4>
                    </div>
                    <p :class="`${slide.color.text} text-sm leading-relaxed`" style="font-family: 'Inter', sans-serif;">
                      {{ slide.quickFixSuggestion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="selectedFeedback.feedback" class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900" style="font-family: 'Sora', sans-serif;">Raw Feedback
                Data</h3>
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <pre class="text-sm text-slate-700 whitespace-pre-wrap break-words"
                     style="font-family: 'Inter', sans-serif;">{{
                    JSON.stringify(selectedFeedback.feedback, null, 2)
                  }}</pre>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900" style="font-family: 'Sora', sans-serif;">Presentation
                Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <div
                    class="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 border border-blue-100 transition-all duration-300 hover:shadow-md">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path clip-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              fill-rule="evenodd"></path>
                      </svg>
                    </div>
                    <h4 class="text-sm font-bold text-blue-700" style="font-family: 'Sora', sans-serif;">Status</h4>
                  </div>
                  <p class="font-medium text-slate-900" style="font-family: 'Inter', sans-serif;">
                    {{ selectedFeedback.status || 'Completed' }}</p>
                </div>

                <div
                    class="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-4 border border-emerald-100 transition-all duration-300 hover:shadow-md">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path clip-rule="evenodd"
                              d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012-2v2h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                              fill-rule="evenodd"></path>
                      </svg>
                    </div>
                    <h4 class="text-sm font-bold text-emerald-700" style="font-family: 'Sora', sans-serif;">Slides</h4>
                  </div>
                  <p class="font-medium text-slate-900" style="font-family: 'Inter', sans-serif;">
                    {{ selectedFeedback.slides || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
            <button
                class="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-all"
                style="font-family: 'Inter', sans-serif;"
                @click="closeFeedback"
            >
              Close
            </button>
            <button
                class="flex-1 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
                style="font-family: 'Inter', sans-serif;"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
