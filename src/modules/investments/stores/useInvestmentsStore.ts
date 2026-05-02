import { defineStore } from 'pinia';
import { dbService } from '@/modules/database/services/sqlite.service';

export interface Investment {
  id: number;
  name: string;
  ticker: string;
  shares: number;
  average_price: number;
  current_price: number;
}

export const useInvestmentsStore = defineStore('investments', {
  state: () => ({
    investments: [] as Investment[],
  }),
  actions: {
    loadInvestments() {
      try {
        this.investments = dbService.query('SELECT * FROM investments ORDER BY name ASC') as Investment[];
      } catch (err) {
        console.error('Error loading investments:', err);
      }
    },
    addInvestment(name: string, ticker: string, shares: number, averagePrice: number, currentPrice: number) {
      try {
        dbService.execute(
          'INSERT INTO investments (name, ticker, shares, average_price, current_price) VALUES (?, ?, ?, ?, ?)',
          [name, ticker, shares, averagePrice, currentPrice]
        );
        this.loadInvestments();
      } catch (err) {
        console.error('Error adding investment:', err);
      }
    },
    updateCurrentPrice(id: number, currentPrice: number) {
      try {
        dbService.execute(
          'UPDATE investments SET current_price = ? WHERE id = ?',
          [currentPrice, id]
        );
        this.loadInvestments();
      } catch (err) {
        console.error('Error updating price:', err);
      }
    }
  }
});
