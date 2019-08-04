import client from '../models/database';


class transactionController {
  static createTransaction(req, res) {
    const {
      userId, coin, type, price, quantity, date, time, note,
    } = req.body;
    const query = {
      text: 'INSERT INTO transactions(userId, coin, type, price, quantity, transdate, transtime, note) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING coin, type, price, quantity',
      values: [userId, coin, type, price, quantity, date, time, note],
    };
    client.query(query)
      .then((purchase) => {
        res.status(201).json({
          success: true,
          message: 'Purchase Successfully made',
          purchase: purchase.rows,
        });
      }).catch(error => res.status(500).json({ message: error.message }));
  }

  static getTransactionByDate(req, res) {
    const puchaseDate = req.params.date;
    const { userId } = req.body;
    client.query({ text: 'SELECT * FROM transactions where transdate = $1 and userId = $2 ', values: [puchaseDate, userId] })
      .then((trans) => {
        if (trans.rowCount !== 0) {
          res.status(200).json({
            success: true,
            transactions: trans.rows
          });
        }
        res.status(404).json({
          success: false,
          message: 'No transaction was found',
        });
        return null;
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}

export default transactionController;
