<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Wallet, Plus, CreditCard, Building } from 'lucide-vue-next';
import { useAccountsStore } from '../stores/useAccountsStore';
import BaseButton from '@/shared/components/base/BaseButton.vue';

const accountsStore = useAccountsStore();

const isAdding = ref(false);
const newAccount = ref({ name: '', type: 'checking', balance: 0 });

onMounted(() => {
  accountsStore.loadAccounts();
});

const saveAccount = () => {
  if (!newAccount.value.name) return;
  accountsStore.addAccount(newAccount.value.name, newAccount.value.type, newAccount.value.balance);
  isAdding.value = false;
  newAccount.value = { name: '', type: 'checking', balance: 0 };
};

const getIconForType = (type: string) => {
  if (type === 'savings') return Building;
  if (type === 'credit') return CreditCard;
  return Wallet;
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Mis Cuentas</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Gestiona tu liquidez y balances actuales.</p>
      </div>
      <BaseButton @click="isAdding = true" v-if="!isAdding">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Cuenta
      </BaseButton>
    </div>

    <!-- Formulario para nueva cuenta -->
    <div v-if="isAdding" class="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-500/20 dark:bg-brand-500/5">
      <h3 class="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Añadir Nueva Cuenta</h3>
      <div class="grid gap-4 md:grid-cols-4">
        <div class="col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
          <input v-model="newAccount.name" type="text" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white" placeholder="Ej. BBVA, Efectivo..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo</label>
          <select v-model="newAccount.type" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white">
            <option value="checking">Corriente</option>
            <option value="savings">Ahorro</option>
            <option value="credit">Crédito</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Balance Inicial</label>
          <input v-model.number="newAccount.balance" type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
        </div>
      </div>
      <div class="mt-4 flex gap-3">
        <BaseButton @click="saveAccount">Guardar</BaseButton>
        <BaseButton variant="ghost" @click="isAdding = false">Cancelar</BaseButton>
      </div>
    </div>

    <!-- Lista de Cuentas -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="account in accountsStore.accounts" :key="account.id" class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/50">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <component :is="getIconForType(account.type)" class="h-6 w-6" />
        </div>
        <div>
          <h3 class="font-semibold text-slate-800 dark:text-white">{{ account.name }}</h3>
          <p class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ account.balance.toLocaleString('es-ES', { style: 'currency', currency: account.currency }) }}</p>
        </div>
      </div>
      <div v-if="accountsStore.accounts.length === 0 && !isAdding" class="col-span-full py-10 text-center text-slate-500 dark:text-slate-400">
        No tienes cuentas creadas.
      </div>
    </div>
  </div>
</template>
