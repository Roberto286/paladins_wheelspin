const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class Database {
  constructor(dbFilePath) {
    if (Database.instance) {
      return Database.instance;
    }

    this.dbFilePath = dbFilePath;
    this.db = null;

    this.connect();

    Database.instance = this;
  }

  connect() {
    this.db = new sqlite3.Database(this.dbFilePath, err => {
      if (err) {
        console.error('Error while opening database:', err.message);
      } else {
        console.log('Connected to database');
        this.initializeDatabase();
      }
    });
  }

  initializeDatabase() {
    this.getChampionsCount()
      .then(rowCount => {
        if (rowCount === 0) {
          this.executeScript(path.join(__dirname, './tables_schema.sql'));
        } else {
          console.log('Skipping database creation');
        }
      })
      .catch(err => {
        console.error(err.message);
        this.executeScript(path.join(__dirname, './tables_schema.sql'));
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

  async getChampionsCount() {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT COUNT(*) AS count FROM champions', (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
  }

  async getChampionBy(fields, values) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(fields) || !Array.isArray(values) || fields.length !== values.length) {
        reject(new Error('Fields and values must be arrays of the same length.'));
        return;
      }

      const whereConditions = fields.map(field => `${field} = ?`).join(' AND ');
      const query = `SELECT * FROM champions WHERE ${whereConditions}`;

      this.db.get(query, values, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async getRandomChampion(role) {
    let whereClause = '';

    if (role) {
      whereClause = 'WHERE role = ?';
    }

    const query = `SELECT * FROM table ${whereClause} ORDER BY RANDOM() LIMIT 1`;

    return new Promise((resolve, reject) => {
      this.db.get(query, role, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
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
