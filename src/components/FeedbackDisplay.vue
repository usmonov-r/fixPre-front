<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
  feedback: {
    type: Object,
    required: true
  }
});

const expandedQuickFix = ref({});
const copiedSlide = ref(null);

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

const overallScore = computed(() => {
  if (!props.feedback?.feedback?.overall_score) return null;
  const score = parseFloat(props.feedback.feedback.overall_score);
  return isNaN(score) ? null : score;
});

const formattedSlides = computed(() => {
  if (!props.feedback?.feedback?.slides) return [];

  const feedbackSlides = props.feedback.feedback.slides;
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

function getScoreColor(score) {
  if (score === null || score === undefined) return getDefaultScoreColor();

  const numScore = parseFloat(score);
  if (isNaN(numScore)) return getDefaultScoreColor();

  if (numScore <= 2) return {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'text-red-500',
    ringColor: '#ef4444',
    gradient: 'from-red-500 to-red-400',
    bgGradient: 'bg-gradient-to-r from-red-500 to-red-400'
  };
  if (numScore <= 3) return {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    ring: 'text-yellow-500',
    ringColor: '#eab308',
    gradient: 'from-yellow-500 to-yellow-400',
    bgGradient: 'bg-gradient-to-r from-yellow-500 to-yellow-400'
  };
  if (numScore <= 4) return {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'text-blue-500',
    ringColor: '#3b82f6',
    gradient: 'from-blue-500 to-blue-400',
    bgGradient: 'bg-gradient-to-r from-blue-500 to-blue-400'
  };
  if (numScore <= 4.5) return {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    ring: 'text-emerald-500',
    ringColor: '#10b981',
    gradient: 'from-emerald-500 to-emerald-400',
    bgGradient: 'bg-gradient-to-r from-emerald-500 to-emerald-400'
  };
  return {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    ring: 'text-purple-500',
    ringColor: '#a855f7',
    gradient: 'from-purple-500 to-purple-400',
    bgGradient: 'bg-gradient-to-r from-purple-500 to-purple-400'
  };
}

function getDefaultScoreColor() {
  return {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    ring: 'text-gray-400',
    ringColor: '#9ca3af',
    gradient: 'from-gray-400 to-gray-300',
    bgGradient: 'bg-gradient-to-r from-gray-400 to-gray-300'
  };
}

function getScoreGrade(score) {
  if (score === null || score === undefined) return 'N/A';

  const numScore = parseFloat(score);
  if (isNaN(numScore)) return 'N/A';

  if (numScore >= 9) return 'A+';
  if (numScore >= 8.5) return 'A';
  if (numScore >= 8) return 'A-';
  if (numScore >= 7.5) return 'B+';
  if (numScore >= 7) return 'B';
  if (numScore >= 6.5) return 'B-';
  if (numScore >= 6) return 'C+';
  if (numScore >= 5.5) return 'C';
  if (numScore >= 5) return 'C-';
  if (numScore >= 4) return 'D';
  return 'F';
}

function getScoreLabel(score) {
  if (score === null || score === undefined) return {text: 'No Score', emoji: '❓'};

  const numScore = parseFloat(score);
  if (isNaN(numScore)) return {text: 'No Score', emoji: '❓'};

  if (numScore <= 2) return {text: 'Needs Work', emoji: '😕'};
  if (numScore <= 3) return {text: 'Fair', emoji: '😐'};
  if (numScore <= 4) return {text: 'Good', emoji: '🙂'};
  if (numScore <= 4.5) return {text: 'Great', emoji: '😊'};
  return {text: 'Excellent', emoji: '🌟'};
}

function getScoreRing(score) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  if (score === null || score === undefined) {
    return {radius, circumference, offset: circumference, progress: 0};
  }

  const numScore = parseFloat(score);
  if (isNaN(numScore)) {
    return {radius, circumference, offset: circumference, progress: 0};
  }

  const progress = (Math.min(Math.max(numScore, 0), 10) / 10) * 100; // Ensure score is between 0-10
  const offset = circumference - (progress / 100) * circumference;
  return {radius, circumference, offset, progress};
}

function toggleQuickFix(slideNumber) {
  const key = `slide_${slideNumber}`;
  expandedQuickFix.value[key] = !expandedQuickFix.value[key];
}

async function copyQuickFix(slideNumber, text) {
  try {
    await navigator.clipboard.writeText(text);
    copiedSlide.value = slideNumber;
    setTimeout(() => {
      copiedSlide.value = null;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Presentation
        Feedback</h1>
      <p class="text-slate-500 mb-8" style="font-family: 'Inter', sans-serif;">AI-powered analysis of each slide with
        actionable insights</p>

      <div v-if="overallScore !== null" class="max-w-lg mx-auto mb-12">
        <div
            class="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100/50 backdrop-blur-sm">
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0"
                 style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23000000&quot; fill-opacity=&quot;0.4&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
          </div>

          <div class="relative p-8 text-center">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-2" style="font-family: 'Sora', sans-serif;">Overall
                Score</h2>
              <p class="text-slate-500 text-sm" style="font-family: 'Inter', sans-serif;">AI-powered presentation
                analysis</p>
            </div>

            <div class="flex justify-center mb-8">
              <div class="relative w-56 h-56">
                <div :class="getScoreColor(overallScore).bg + ' opacity-10'"
                     class="absolute inset-0 rounded-full"></div>

                <div class="absolute inset-1 rounded-full bg-white shadow-inner">
                  <svg class="w-full h-full" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        fill="none"
                        r="90"
                        stroke="#e2e8f0"
                        stroke-width="8"
                    />

                    <circle
                        v-if="overallScore !== null && overallScore !== undefined"
                        :stroke="getScoreColor(overallScore).ringColor"
                        :stroke-dasharray="`${getScoreRing(overallScore).circumference} ${getScoreRing(overallScore).circumference}`"
                        :stroke-dashoffset="getScoreRing(overallScore).offset"
                        :style="`--final-offset: ${getScoreRing(overallScore).offset}px; animation: fillCircle 2s ease-out forwards`"
                        class="transition-all duration-1500 ease-out"
                        cx="100"
                        cy="100"
                        fill="none"
                        r="90"
                        stroke-linecap="round"
                        stroke-width="8"
                        transform="rotate(-90 100 100)"
                    />

                    <g v-for="i in 8" v-if="overallScore !== null && overallScore !== undefined" :key="i"
                       :transform="`rotate(${(i-1) * 45} 100 100)`">
                      <circle
                          :fill="i <= Math.round((overallScore / 10) * 8) ? getScoreColor(overallScore).ringColor : '#e2e8f0'"
                          :style="`animation-delay: ${(i-1) * 0.1}s`"
                          class="transition-all duration-500"
                          cx="100"
                          cy="10"
                          r="2"
                          style="animation: dotAppear 0.3s ease-out forwards"
                      />
                    </g>
                  </svg>
                </div>

                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <div class="relative">
                    <div :class="getScoreColor(overallScore).text" class="text-6xl font-black"
                         style="font-family: 'Sora', sans-serif;">
                      {{ (overallScore || 0).toFixed(1) }}
                    </div>
                    <div class="absolute -top-2 -right-8 text-2xl font-bold text-slate-400">/10</div>
                  </div>

                  <div
                      :class="getScoreColor(overallScore).bgGradient + ' text-white'"
                      class="mt-2 px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <div class="flex items-center gap-1">
                      <span class="text-lg">{{ getScoreLabel(overallScore).emoji }}</span>
                      <span class="text-xs font-bold" style="font-family: 'Inter', sans-serif;">
                        {{ getScoreLabel(overallScore).text }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="overallScore >= 7" :class="getScoreColor(overallScore).bg"
                     class="absolute inset-0 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            <div class="flex justify-center gap-8 text-center">
              <div class="flex flex-col items-center">
                <div class="text-2xl font-bold text-slate-900" style="font-family: 'Sora', sans-serif;">
                  {{ formattedSlides.length }}
                </div>
                <div class="text-xs text-slate-500 uppercase tracking-wide" style="font-family: 'Inter', sans-serif;">
                  Slides
                </div>
              </div>
              <div class="w-px h-8 bg-slate-200"></div>
              <div class="flex flex-col items-center">
                <div class="text-2xl font-bold text-slate-900" style="font-family: 'Sora', sans-serif;">
                  {{ Math.round((overallScore || 0) * 10) }}%
                </div>
                <div class="text-xs text-slate-500 uppercase tracking-wide" style="font-family: 'Inter', sans-serif;">
                  Quality
                </div>
              </div>
              <div class="w-px h-8 bg-slate-200"></div>
              <div class="flex flex-col items-center">
                <div class="text-2xl font-bold text-slate-900" style="font-family: 'Sora', sans-serif;">
                  {{ getScoreGrade(overallScore) }}
                </div>
                <div class="text-xs text-slate-500 uppercase tracking-wide" style="font-family: 'Inter', sans-serif;">
                  Grade
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div
          v-for="(slide, slideIndex) in formattedSlides"
          :key="slide.title"
          class="space-y-4"
      >
        <div :class="`${slide.color.bg} ${slide.color.border} border-2 rounded-2xl p-6 mb-6`">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div :class="`flex-shrink-0 w-14 h-14 ${slide.color.icon} rounded-xl flex items-center justify-center`">
                <span class="text-white font-bold text-2xl"
                      style="font-family: 'Sora', sans-serif;">{{ slide.slideNumber }}</span>
              </div>
              <div>
                <h3 :class="`text-2xl font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">
                  {{ slide.title }}</h3>
                <p :class="`text-sm ${slide.color.accent}`" style="font-family: 'Inter', sans-serif;">Slide Analysis</p>
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
              <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">Clarity</h4>
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
              <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">Typos &
                Grammar</h4>
            </div>
            <p :class="`${slide.color.text} text-sm leading-relaxed`" style="font-family: 'Inter', sans-serif;">
              {{ slide.typosGrammar }}</p>
          </div>

          <div
              :class="`${slide.color.bg} ${slide.color.border} border-2 rounded-2xl p-5 transition-all duration-300 hover:shadow-md md:col-span-1`">
            <button
                class="w-full flex items-center justify-between gap-3 focus:outline-none"
                @click="toggleQuickFix(slide.slideNumber)"
            >
              <div class="flex items-center gap-3">
                <div :class="`flex-shrink-0 w-8 h-8 ${slide.color.icon} rounded-full flex items-center justify-center`">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path clip-rule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"
                          fill-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 :class="`text-sm font-bold ${slide.color.text}`" style="font-family: 'Sora', sans-serif;">Quick
                  Fix</h4>
              </div>
              <svg
                  :class="`w-5 h-5 ${slide.color.text} transition-transform duration-300 ${expandedQuickFix[`slide_${slide.slideNumber}`] ? 'rotate-180' : ''}`"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
              </svg>
            </button>

            <div
                v-if="expandedQuickFix[`slide_${slide.slideNumber}`]"
                :class="slide.color.border"
                class="mt-4 pt-4 border-t transition-all duration-300"
            >
              <p :class="`${slide.color.text} text-sm leading-relaxed font-medium mb-4`"
                 style="font-family: 'Inter', sans-serif;">{{ slide.quickFixSuggestion }}</p>

              <button
                  :class="`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  copiedSlide === slide.slideNumber
                    ? 'bg-green-100 text-green-700'
                    : `${slide.color.badge} hover:opacity-80`
                }`"
                  style="font-family: 'Inter', sans-serif;"
                  @click="copyQuickFix(slide.slideNumber, slide.quickFixSuggestion)"
              >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      v-if="copiedSlide !== slide.slideNumber"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                  ></path>
                  <path
                      v-else
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                  ></path>
                </svg>
                <span class="text-sm font-medium">
                  {{ copiedSlide === slide.slideNumber ? 'Copied!' : 'Copy' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white mt-12 shadow-lg">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2.5"></path>
          </svg>
        </div>
        <div>
          <p class="font-bold text-lg mb-1" style="font-family: 'Sora', sans-serif;">✨ Analysis Complete</p>
          <p class="text-sm text-white text-opacity-90" style="font-family: 'Inter', sans-serif;">Review the feedback
            above and apply these insights to elevate your presentation to the next level!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover {
  transform: translateY(-2px);
}


@keyframes dotAppear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>