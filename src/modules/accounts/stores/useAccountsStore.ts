import { defineStore } from 'pinia';
import { dbService } from '@/modules/database/services/sqlite.service';

export interface Account {
  id: number;
  name: string;
  type: string;
  currency: string;
  balance: number;
  created_at: string;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    loadAccounts() {
      try {
        this.accounts = dbService.query('SELECT * FROM accounts ORDER BY name ASC') as Account[];
      } catch (err) {
        console.error('Error loading accounts:', err);
      }
    },
    addAccount(name: string, type: string, balance: number) {
      dbService.execute(
        'INSERT INTO accounts (name, type, balance) VALUES (?, ?, ?)',
        [name, type, balance]
      );
      this.loadAccounts();
    }
  }
});
