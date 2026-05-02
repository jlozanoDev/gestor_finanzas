<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieChartIcon,
  Activity
} from 'lucide-vue-next';
import { Doughnut } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale 
} from 'chart.js';
import { useDashboardStore } from '../stores/useDashboardStore';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.loadDashboardData();
});

const chartData = computed(() => ({
  labels: dashboardStore.categoryDistribution.map(d => d.name),
  datasets: [
    {
      backgroundColor: dashboardStore.categoryDistribution.map(d => d.color || '#cbd5e1'),
      data: dashboardStore.categoryDistribution.map(d => d.value),
      borderWidth: 0,
      hoverOffset: 4
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  },
  cutout: '70%'
};

const formatCurrency = (val: number) => {
  return val.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
};
</script>

<template>
  <div class="space-y-8">
    <!-- Top Stats -->
    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-white/10 dark:bg-slate-900/50">
        <div class="flex items-center gap-3 text-brand-600 dark:text-brand-400">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <Activity class="h-5 w-5" />
          </div>
          <span class="text-sm font-bold uppercase tracking-wider">Patrimonio Neto</span>
        </div>
        <p class="mt-4 text-3xl font-black text-slate-900 dark:text-white">
          {{ formatCurrency(dashboardStore.netWorth) }}
        </p>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-white/10 dark:bg-slate-900/50">
        <div class="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
            <Wallet class="h-5 w-5" />
          </div>
          <span class="text-sm font-bold uppercase tracking-wider">Liquidez</span>
        </div>
        <p class="mt-4 text-3xl font-black text-slate-900 dark:text-white">
          {{ formatCurrency(dashboardStore.totalBalance) }}
        </p>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-white/10 dark:bg-slate-900/50">
        <div class="flex items-center gap-3 text-purple-600 dark:text-purple-400">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10">
            <TrendingUp class="h-5 w-5" />
          </div>
          <span class="text-sm font-bold uppercase tracking-wider">Inversiones</span>
        </div>
        <p class="mt-4 text-3xl font-black text-slate-900 dark:text-white">
          {{ formatCurrency(dashboardStore.totalInvestments) }}
        </p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_350px]">
      <!-- Recent Activity -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Actividad Reciente</h3>
          <router-link :to="{ name: 'transactions' }" class="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">Ver todo</router-link>
        </div>
        
        <div class="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/50">
          <ul v-if="dashboardStore.recentActivity.length > 0" class="divide-y divide-slate-100 dark:divide-white/5">
            <li v-for="tx in dashboardStore.recentActivity" :key="tx.id" class="flex items-center justify-between p-4">
              <div class="flex items-center gap-4">
                <div :class="[
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  tx.amount < 0 ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                ]">
                  <ArrowDownRight v-if="tx.amount < 0" class="h-5 w-5" />
                  <ArrowUpRight v-else class="h-5 w-5" />
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">{{ tx.description || tx.category_name }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ tx.date }} • {{ tx.category_name }}</p>
                </div>
              </div>
              <span :class="['font-bold', tx.amount < 0 ? 'text-slate-900 dark:text-white' : 'text-emerald-600 dark:text-emerald-400']">
                {{ formatCurrency(tx.amount) }}
              </span>
            </li>
          </ul>
          <div v-else class="py-12 text-center text-slate-500 dark:text-slate-400">
            Sin actividad reciente.
          </div>
        </div>
      </section>

      <!-- Distribution Chart -->
      <section class="space-y-4">
        <div class="flex items-center gap-2">
          <PieChartIcon class="h-5 w-5 text-brand-500" />
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Gastos del Mes</h3>
        </div>
        
        <div class="flex h-[350px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
          <div v-if="dashboardStore.categoryDistribution.length > 0" class="relative h-full w-full">
            <Doughnut :data="chartData" :options="chartOptions" />
          </div>
          <div v-else class="text-center text-slate-500 dark:text-slate-400">
            Sin datos de gastos este mes.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
