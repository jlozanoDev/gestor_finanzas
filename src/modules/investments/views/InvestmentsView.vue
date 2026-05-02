<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { TrendingUp, Plus, Briefcase } from 'lucide-vue-next';
import { useInvestmentsStore } from '../stores/useInvestmentsStore';
import BaseButton from '@/shared/components/base/BaseButton.vue';

const investmentsStore = useInvestmentsStore();

const isAdding = ref(false);
const newInv = ref({
  name: '',
  ticker: '',
  shares: 0,
  average_price: 0,
  current_price: 0
});

onMounted(() => {
  investmentsStore.loadInvestments();
});

const saveInvestment = () => {
  if (!newInv.value.name) return;
  investmentsStore.addInvestment(
    newInv.value.name,
    newInv.value.ticker,
    newInv.value.shares,
    newInv.value.average_price,
    newInv.value.current_price || newInv.value.average_price
  );
  isAdding.value = false;
  newInv.value = { name: '', ticker: '', shares: 0, average_price: 0, current_price: 0 };
};

const updatePrice = (id: number, e: any) => {
  const newPrice = Number(e.target.value);
  if (!isNaN(newPrice)) {
    investmentsStore.updateCurrentPrice(id, newPrice);
  }
};

const totalPortfolioValue = computed(() => {
  return investmentsStore.investments.reduce((sum, inv) => sum + (inv.shares * inv.current_price), 0);
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Inversiones</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Controla tu portafolio y rendimiento.</p>
      </div>
      <BaseButton @click="isAdding = true" v-if="!isAdding">
        <Plus class="mr-2 h-4 w-4" />
        Nuevo Activo
      </BaseButton>
    </div>

    <div class="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-500/20 dark:bg-brand-500/10">
      <p class="text-sm font-medium text-brand-600 dark:text-brand-300">Valor Total del Portafolio</p>
      <h3 class="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
        {{ totalPortfolioValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
      </h3>
    </div>

    <!-- Formulario para nueva inversión -->
    <div v-if="isAdding" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
      <h3 class="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Añadir Activo</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
          <input v-model="newInv.name" type="text" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white" placeholder="Ej. S&P 500" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Ticker</label>
          <input v-model="newInv.ticker" type="text" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white" placeholder="Ej. VOO" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Acciones / Cantidad</label>
          <input v-model.number="newInv.shares" type="number" step="0.0001" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Precio de Compra</label>
          <input v-model.number="newInv.average_price" type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white" />
        </div>
      </div>
      <div class="mt-4 flex gap-3">
        <BaseButton @click="saveInvestment">Guardar</BaseButton>
        <BaseButton variant="ghost" @click="isAdding = false">Cancelar</BaseButton>
      </div>
    </div>

    <!-- Lista de Inversiones -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="inv in investmentsStore.investments" :key="inv.id" class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/50">
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <TrendingUp class="h-6 w-6" />
          </div>
          <div>
            <h3 class="font-semibold text-slate-800 dark:text-white">{{ inv.name }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ inv.ticker || 'Sin ticker' }} • {{ inv.shares }} uds.</p>
          </div>
        </div>
        
        <div class="mt-2 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 dark:border-white/5">
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Valor actual</p>
            <p class="font-semibold text-slate-900 dark:text-white">{{ (inv.shares * inv.current_price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</p>
          </div>
          <div :class="[(inv.current_price - inv.average_price) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400']">
            <p class="text-xs text-slate-500 dark:text-slate-400">P&L Total</p>
            <p class="font-semibold">
              {{ ((inv.current_price - inv.average_price) / inv.average_price * 100).toFixed(2) }}%
            </p>
          </div>
        </div>

        <div class="mt-2">
          <label class="mb-1 block text-xs text-slate-500 dark:text-slate-400">Actualizar Precio Actual (€)</label>
          <input :value="inv.current_price" @change="updatePrice(inv.id, $event)" type="number" step="0.01" class="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-950 dark:text-white" />
        </div>
      </div>
      <div v-if="investmentsStore.investments.length === 0 && !isAdding" class="col-span-full py-10 text-center text-slate-500 dark:text-slate-400">
        No tienes inversiones registradas.
      </div>
    </div>
  </div>
</template>
