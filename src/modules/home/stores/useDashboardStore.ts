import { defineStore } from 'pinia';
import { dbService } from '@/modules/database/services/sqlite.service';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    totalBalance: 0,
    totalInvestments: 0,
    categoryDistribution: [] as { name: string, value: number, color: string }[],
    recentActivity: [] as any[],
  }),
  getters: {
    netWorth: (state) => state.totalBalance + state.totalInvestments,
  },
  actions: {
    async loadDashboardData() {
      try {
        // 1. Total Balance from Accounts
        const balanceRes = dbService.query('SELECT SUM(balance) as total FROM accounts');
        this.totalBalance = balanceRes[0]?.total || 0;

        // 2. Total Investments Value
        const invRes = dbService.query('SELECT SUM(shares * current_price) as total FROM investments');
        this.totalInvestments = invRes[0]?.total || 0;

        // 3. Category Distribution (Current Month Expenses)
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const distRes = dbService.query(`
          SELECT c.name, SUM(ABS(t.amount)) as value, c.color
          FROM transactions t
          JOIN categories c ON t.category_id = c.id
          WHERE t.date LIKE ? AND t.amount < 0
          GROUP BY c.id
        `, [`${currentMonth}%`]);
        this.categoryDistribution = distRes;

        // 4. Recent Activity
        this.recentActivity = dbService.query(`
          SELECT t.*, c.name as category_name, c.icon as category_icon, c.color as category_color
          FROM transactions t
          LEFT JOIN categories c ON t.category_id = c.id
          ORDER BY t.date DESC, t.id DESC
          LIMIT 5
        `);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    }
  }
});
