import { defineStore } from 'pinia';
import { dbService } from '@/modules/database/services/sqlite.service';

export interface Transaction {
  id: number;
  account_id: number;
  category_id: number;
  amount: number;
  date: string;
  description: string;
  created_at: string;
  account_name?: string;
  category_name?: string;
  category_icon?: string;
  category_color?: string;
  category_type?: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  icon: string;
  color: string;
}

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
    categories: [] as Category[],
  }),
  actions: {
    loadTransactions() {
      try {
        const query = `
          SELECT t.*, 
                 a.name as account_name, 
                 c.name as category_name, 
                 c.icon as category_icon, 
                 c.color as category_color,
                 c.type as category_type
          FROM transactions t
          JOIN accounts a ON t.account_id = a.id
          LEFT JOIN categories c ON t.category_id = c.id
          ORDER BY t.date DESC, t.id DESC
          LIMIT 100
        `;
        this.transactions = dbService.query(query) as Transaction[];
      } catch (err) {
        console.error('Error loading transactions:', err);
      }
    },
    loadCategories() {
      try {
        this.categories = dbService.query('SELECT * FROM categories ORDER BY name ASC') as Category[];
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    },
    addTransaction(accountId: number, categoryId: number, amount: number, date: string, description: string) {
      try {
        dbService.execute(
          'INSERT INTO transactions (account_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)',
          [accountId, categoryId, amount, date, description]
        );
        
        // Actualizar balance de la cuenta
        dbService.execute(
          'UPDATE accounts SET balance = balance + ? WHERE id = ?',
          [amount, accountId]
        );
        
        this.loadTransactions();
      } catch (err) {
        console.error('Error adding transaction:', err);
      }
    }
  }
});
