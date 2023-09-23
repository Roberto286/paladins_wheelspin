const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error while opening database:', err.message);
      } else {
        console.log('Connected to database');
        this.initializeDatabase();
      }
    });
  }

  initializeDatabase() {
    this.db.serialize(() => {
      this.db.run(/*query di creazione delle tabelle*/);
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error while closing db connection:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = Database;
