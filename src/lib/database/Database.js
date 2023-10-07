const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const sqlScriptPath = './tables_schema.sql'; //TODO -> make it configurable

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, err => {
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
      this.db.get('SELECT COUNT(*) AS count FROM champions', (err, row) => {
        if (err) {
          console.error(err.message);
        } else {
          const { count: rowCount } = row;
          if (rowCount === 0) {
            const script = fs.readFileSync(sqlScriptPath, 'utf-8');

            this.db.exec(script, err => {
              if (err) {
                console.error(err.message);
              } else {
                console.log('Database created');
              }
            });
          } else {
            console.log('Skipping database creation');
          }
        }
      });
    });
  }

  close() {
    this.db.close(err => {
      if (err) {
        console.error('Error while closing db connection:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = Database;
