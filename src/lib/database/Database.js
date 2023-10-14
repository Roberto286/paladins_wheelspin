const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const initDbScriptPath = process.env.INIT_DB_SCRIPT_PATH || '';

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
          this.executeScript(initDbScriptPath);
        } else {
          console.log('Skipping database creation');
        }
      })
      .catch(err => {
        console.error(err.message);
        this.executeScript(initDbScriptPath);
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

  getChampionsCount() {
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

  getChampionsBy(fields, values) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(fields) || !Array.isArray(values) || fields.length !== values.length) {
        reject(new Error('Fields and values must be arrays of the same length.'));
        return;
      }

      let whereClause = '';

      if (fields.length > 0) {
        whereClause = 'WHERE ' + fields.map(field => `${field} = ?`).join(' AND ');
      }
      const query = `SELECT * FROM champions_view ${whereClause}`;

      this.db.all(query, values, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getRandomChampion(roles) {
    let whereClause = '';

    if (roles?.length > 0) {
      whereClause = 'WHERE ' + roles.map(() => 'role = ?').join(' OR ');
    }

    const query = `SELECT * FROM champions_view ${whereClause} ORDER BY RANDOM()`;

    return new Promise((resolve, reject) => {
      this.db.get(query, roles, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getAllChampions(reversed) {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM champions ${reversed ? 'ORDER BY id DESC' : ''}`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getChampionsByRoles(roles, reversed) {
    if (!Array.isArray(roles) || !roles.length) {
      return Promise.reject(new Error('Invalid or empty roles array'));
    }

    const placeholders = roles.map(() => 'role = ?').join(' OR ');

    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM champions_view WHERE ${placeholders} ${reversed ? 'ORDER BY id DESC' : ''}`;
      this.db.all(query, roles, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
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
