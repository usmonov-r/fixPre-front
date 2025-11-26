<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div v-if="isLoading || statsLoading" class="flex flex-col items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mb-4"></div>
      <p class="text-slate-600">Loading dashboard data...</p>
    </div>
    
    <div v-else class="space-y-8">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-slate-500 text-sm font-medium">Total Presentations</h3>
            <p class="text-3xl font-bold text-slate-900">{{ totalPresentations }}</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-slate-500 text-sm font-medium">Your Average Score</h3>
            <p class="text-3xl font-bold text-slate-900">{{ averageScore.toFixed(1) }}/10</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-slate-500 text-sm font-medium">Platform Average</h3>
            <p class="text-3xl font-bold text-slate-900">{{ platformAverageScore.toFixed(1) }}/10</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md">
          <div class="flex items-center gap-2 mb-4">
            <h2 class="text-xl font-semibold text-slate-800">Performance Over Time</h2>
            <div class="relative group">
              <button class="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                <span class="text-slate-600 text-sm font-medium">?</span>
              </button>
              <div class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  <div class="text-xs">Track your presentation scores over time to see improvement trends</div>
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                <div class="text-xs">Track your presentation scores over time to see improvement trends</div>
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div class="w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="h-80">
              <div v-if="history.length === 0" class="flex items-center justify-center h-full text-slate-500">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p class="text-sm">No presentation data available yet</p>
                <p class="text-xs mt-1">Upload your first presentation to see performance trends</p>
              </div>
            </div>
            

            <Line v-else :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Recent Presentations</h2>
          <HistoryView :history="history" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import HistoryView from './HistoryView.vue';
import { historyFeedback } from "@/composables/historyFeedback.js";
import { useDashboardStats } from "@/composables/useDashboardStats.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const { isLoading, history, error } = historyFeedback();
const { isLoading: statsLoading, averageScore, totalPresentations, platformAverageScore, fetchDashboardStats } = useDashboardStats();

onMounted(() => fetchDashboardStats());

const chartData = computed(() => {
  if (!history.value || history.value.length === 0) {
    return {
      labels: [],
      datasets: [
        {
          label: 'Presentation Score',
          data: [],
          borderColor: '#9333ea',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.3,
          fill: true,
        }
      ]
    };
  }

  const sortedHistory = [...history.value].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const labels = sortedHistory.map(item => {
    try {
      return new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Unknown';
    }
  });
  
  const data = sortedHistory.map(item => {
    const score = item.overallScore || item.score || item.feedback?.overallScore || 0;
    return parseFloat(score) || 0;
  });
  
  const platformAverageLineData = new Array(data.length).fill(platformAverageScore.value);
  
  return {
    labels,
    datasets: [
      {
        label: 'Presentation Score',
        data,
        borderColor: '#9333ea',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return 'rgba(147, 51, 234, 0.4)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(147, 51, 234, 0.4)');
          gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
          return gradient;
        },
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#9333ea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Platform Average',
        data: platformAverageLineData,
        borderColor: '#06b6d4',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return 'rgba(6, 182, 212, 0.4)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
          return gradient;
        },
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
};

</script>
