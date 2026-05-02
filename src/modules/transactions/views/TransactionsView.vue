<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { ArrowDownRight, ArrowUpRight, Plus, Calendar } from 'lucide-vue-next';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import { useAccountsStore } from '@/modules/accounts/stores/useAccountsStore';
import BaseButton from '@/shared/components/base/BaseButton.vue';

const transactionsStore = useTransactionsStore();
const accountsStore = useAccountsStore();

const isAdding = ref(false);
const newTx = ref({
  account_id: '',
  category_id: '',
  amount: 0,
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
  description: ''
});

onMounted(() => {
  transactionsStore.loadTransactions();
  transactionsStore.loadCategories();
  accountsStore.loadAccounts();
});

const filteredCategories = computed(() => {
  return transactionsStore.categories.filter(c => c.type === newTx.value.type);
});

const saveTransaction = () => {
  if (!newTx.value.account_id || !newTx.value.category_id) return;
  
  let finalAmount = newTx.value.amount;
  if (newTx.value.type === 'expense') {
    finalAmount = -Math.abs(finalAmount);
  } else {
    finalAmount = Math.abs(finalAmount);
  }

  transactionsStore.addTransaction(
    Number(newTx.value.account_id),
    Number(newTx.value.category_id),
    finalAmount,
    newTx.value.date,
    newTx.value.description
  );
  
  isAdding.value = false;
  newTx.value = { ...newTx.value, amount: 0, description: '' };
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Movimientos</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Registra tus ingresos y gastos.</p>
      </div>
      <BaseButton @click="isAdding = true" v-if="!isAdding">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Transacción
      </BaseButton>
    </div>

    <!-- Formulario para nueva transacción -->
    <div v-if="isAdding" class="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-500/20 dark:bg-brand-500/5">
      <h3 class="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Añadir Movimiento</h3>
      
      <div class="mb-6 flex gap-4">
        <label class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="radio" v-model="newTx.type" value="expense" class="text-brand-500" /> Gasto
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="radio" v-model="newTx.type" value="income" class="text-brand-500" /> Ingreso
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Cuenta</label>
          <select v-model="newTx.account_id" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white">
            <option value="" disabled>Selecciona cuenta</option>
            <option v-for="acc in accountsStore.accounts" :key="acc.id" :value="acc.id">{{ acc.name }} ({{ acc.balance }} €)</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Categoría</label>
          <select v-model="newTx.category_id" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white">
            <option value="" disabled>Selecciona categoría</option>
            <option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Monto</label>
          <input v-model.number="newTx.amount" type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Fecha</label>
          <input v-model="newTx.date" type="date" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
        </div>
        <div class="col-span-full">
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Descripción (Opcional)</label>
          <input v-model="newTx.description" type="text" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white" placeholder="Ej. Compra en supermercado" />
        </div>
      </div>
      <div class="mt-4 flex gap-3">
        <BaseButton @click="saveTransaction">Guardar Transacción</BaseButton>
        <BaseButton variant="ghost" @click="isAdding = false">Cancelar</BaseButton>
      </div>
    </div>

    <!-- Lista de Transacciones -->
    <div class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/50">
      <div v-if="transactionsStore.transactions.length === 0" class="p-8 text-center text-slate-500 dark:text-slate-400">
        No hay movimientos registrados.
      </div>
      <ul v-else class="divide-y divide-slate-100 dark:divide-white/5">
        <li v-for="tx in transactionsStore.transactions" :key="tx.id" class="flex items-center justify-between p-4 transition hover:bg-slate-50 dark:hover:bg-white/5">
          <div class="flex items-center gap-4">
            <div :class="[
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              tx.amount < 0 ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
            ]">
              <ArrowDownRight v-if="tx.amount < 0" class="h-5 w-5" />
              <ArrowUpRight v-else class="h-5 w-5" />
            </div>
            <div>
              <p class="font-medium text-slate-900 dark:text-slate-100">{{ tx.description || tx.category_name }}</p>
              <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span class="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-white/10">{{ tx.account_name }}</span>
                <span>{{ formatDate(tx.date) }}</span>
              </div>
            </div>
          </div>
          <div :class="['font-bold', tx.amount < 0 ? 'text-slate-900 dark:text-white' : 'text-emerald-600 dark:text-emerald-400']">
            {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
