// import validator from 'validator';
import client from '../models/database';

class MyDiaryController {
  createEntry(req, res) {
    const { userId, entrytitle, entrycontent } = req.body;
    const query = {
      text: 'INSERT INTO entries(userId, entrytitle, entrycontent) VALUES($1, $2, $3) RETURNING entryid, userid, entrytitle ,entrycontent',
      values: [userId, entrytitle, entrycontent],
    };
    client.query(query)
      .then((entry) => {
        res.status(201).json({
          success: true,
          message: 'Entry Successfully created',
          entry: entry.rows,
        });
      }).catch(error => res.status(500).json({ message: error.message }));
  }

  getAllEntries(req, res) {
    const { userId } = req.body;
    client.query('SELECT * FROM entries where userid = $1', [userId])
      .then((entry) => {
        if (entry.rowCount >= 1) {
          res.status(200).json({
            success: true,
            message: 'entries successfully retrieved',
            entry: entry.rows,
          });
        }
        res.status(404).json({
          success: false,
          message: 'Yet to create an entry',
        });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }


  getEntryById(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const { userId } = req.body;
    client.query({ text: 'SELECT * FROM entries where entryId = $1 and userId = $2 ', values: [entryId, userId] })
      .then((entry) => {
        if (entry.rowCount === 1) {
          res.status(200).json({
            success: true,
            entry: entry.rows
          });
        }
        res.status(404).json({
          success: false,
          message: 'Entry not found',
        });
        return null;
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

   editEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const { userId, entrytitle, entrycontent } = req.body;
    const query = {
      text: 'UPDATE entries SET entrytitle = ($1), entrycontent = ($2) WHERE entryId = ($3) and userId = ($4)  RETURNING entryid, entrytitle ,entrycontent',
      values: [entrytitle, entrycontent, entryId, userId],
    };
    client.query(query)
      .then((editEntry) => {
        if (editEntry.rowCount === 1) {
          return res.status(200).json({
            success: true,
            message: 'successfully updated',
            entry: editEntry.rows,
          });
        }else {
        return res.status(404).json({
          success: false,
          message: 'Entry not found',
        });}
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  deleteEntry(req, res) {
    const { userId } = req.body;
    const entryId = parseInt(req.params.entryId, 10);
    client.query('DELETE FROM entries WHERE entryId = $1 and userId = $2 RETURNING *', [entryId, userId])
      .then((entry) => {
        if (entry.rowCount === 1) {
          res.status(200).json({
            success: true,
            message: 'successfully deleted',
            entry: entry.rows,
          });
        }
        res.status(404).json({
          success: false,
          message: 'Entry not found',
        });
        return null;
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }
}
export default new MyDiaryController();
