const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

class User {
  static create(name, email, password, callback) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, name, email });
        }
      }
    );
  }

  static findByEmail(email, callback) {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        callback(err, row);
      }
    );
  }

  static findById(id, callback) {
    db.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id],
      (err, row) => {
        callback(err, row);
      }
    );
  }

  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  }
}

module.exports = User;
