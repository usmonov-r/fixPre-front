  <script setup>
defineProps({
  isLoading: Boolean,
  feedback: [Object, Array],
  error: String
})
</script>
<template>
 <div v-if="!isLoading && !feedback && !error" class="mb-64">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-3" style="font-family: 'Sora', sans-serif;">Sample Feedback Examples</h2>
          <p class="text-slate-600" style="font-family: 'Inter', sans-serif;">See the types of insights you'll receive</p>
        </div>

        <div class="space-y-6">
          <div class="flex flex-wrap gap-4 justify-start">
            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Content</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Stronger opening hook needed for better engagement.</p>
            </div>

            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.2s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Hierarchy</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Improve font size contrast for clarity.</p>
            </div>

            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.2s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Flow</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Add visuals to break up text.</p>
            </div>

            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.3s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Colors</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Standardize palette to 3-4 colors.</p>
            </div>

            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.4s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Typography</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Limit fonts to 2 maximum.</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 justify-start">
            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.1s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">CTA</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Add clear call-to-action.</p>
            </div>

            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.2s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Spacing</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Increase white space between elements.</p>
            </div>

            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.3s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Alignment</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Align elements consistently.</p>
            </div>

            <!-- Example 9 - Images -->
            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.4s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Images</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Use high-quality images.</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 justify-start">
            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.1s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Contrast</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Improve text-background contrast.</p>
            </div>

            <div class="flex-1 min-w-48 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.2s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Animation</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Use subtle transitions.</p>
            </div>

            <div class="flex-1 min-w-48 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 scroll-pop-up" style="animation-delay: 0.3s;">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="font-semibold text-slate-900 text-xs" style="font-family: 'Sora', sans-serif;">Readability</h3>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed" style="font-family: 'Inter', sans-serif;">Improve line spacing.</p>
            </div>
          </div>
        </div>
      </div>    
</template>