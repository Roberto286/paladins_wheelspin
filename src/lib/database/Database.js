const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const schemaCreationsScriptPath = path.join(__dirname, './tables_schema.sql'); // TODO: Make it configurable

class Database {
  constructor(dbPath) {
    if (Database.instance) {
      return Database.instance;
    }

    this.db = new sqlite3.Database(dbPath, err => {
      if (err) {
        console.error('Error while opening database:', err.message);
      } else {
        console.log('Connected to database');
        this.initializeDatabase();
      }
    });

    Database.instance = this;
  }

  initializeDatabase() {
    this.db.get('SELECT COUNT(*) AS count FROM champions', (err, row) => {
      if (err) {
        console.error(err.message);
        this.executeScript(schemaCreationsScriptPath);
      } else {
        const { count: rowCount } = row;
        if (rowCount === 0) {
          this.executeScript(schemaCreationsScriptPath);
        } else {
          console.log('Skipping database creation');
        }
      }
    });
  }

  executeScript(sqlScriptPath) {
    try {
      const script = fs.readFileSync(sqlScriptPath, 'utf-8');
      this.db.exec(script, err => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Database created');
        }
      });
    } catch (error) {
      console.error('Error while reading the script file:', error.message);
    }
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
