import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

export class SQLiteService {
  private db: any = null;
  private sqlite3: any = null;

  async init() {
    if (this.db) return this.db;

    try {
      console.log('Initializing SQLite...');
      this.sqlite3 = await sqlite3InitModule({
        print: console.log,
        printErr: console.error,
      });

      console.log('SQLite3 version', this.sqlite3.version.libVersion);
      
      if ('opfs' in this.sqlite3.oo1) {
        this.db = new this.sqlite3.oo1.OpfsDb('/atlas_finanzas.sqlite3');
        console.log('OPFS database ready.');
      } else {
        this.db = new this.sqlite3.oo1.DB('/atlas_finanzas.sqlite3', 'ct');
        console.warn('OPFS not supported. Using transient database.');
      }

      this.runMigrations();
      return this.db;
    } catch (err) {
      console.error('Initialization error:', err);
      throw err;
    }
  }

  private runMigrations() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        currency TEXT NOT NULL DEFAULT 'EUR',
        balance REAL NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        icon TEXT,
        color TEXT
      );
      
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        category_id INTEGER,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES accounts(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ticker TEXT,
        shares REAL NOT NULL DEFAULT 0,
        average_price REAL NOT NULL DEFAULT 0,
        current_price REAL NOT NULL DEFAULT 0
      );
    `);
    
    // Seed default categories if empty
    const result = this.query('SELECT COUNT(*) as count FROM categories');
    if (result[0].count === 0) {
      this.db.exec(`
        INSERT INTO categories (name, type, icon, color) VALUES 
        ('Sueldo', 'income', 'briefcase', '#10b981'),
        ('Comida', 'expense', 'utensils', '#f59e0b'),
        ('Transporte', 'expense', 'car', '#3b82f6'),
        ('Ocio', 'expense', 'coffee', '#8b5cf6'),
        ('Traspaso', 'transfer', 'arrow-right-left', '#64748b');
      `);
    }
  }

  query(sql: string, bind?: any[]) {
    if (!this.db) throw new Error('Database not initialized');
    
    const results: any[] = [];
    this.db.exec({
      sql,
      bind,
      rowMode: 'object',
      callback: (row: any) => {
        results.push(row);
      }
    });
    return results;
  }

  execute(sql: string, bind?: any[]) {
    if (!this.db) throw new Error('Database not initialized');
    this.db.exec({ sql, bind });
  }
}

export const dbService = new SQLiteService();
