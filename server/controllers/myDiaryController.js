import client from '../models/database';

class myDiaryController {
  static createEntry(req, res) {
    const entry = {
      userId: req.body.userId,
      entrytitle: req.body.entrytitle,
      entrycontent: req.body.entrycontent,
    };
    const query = {
      text: 'INSERT INTO entries(userId, entrytitle, entrycontent) VALUES($1, $2, $3)',
      values: [entry.userId, entry.entrytitle, entry.entrycontent],
    };
    client.query(query).then(() => res.status(201).json({
      success: true,
      message: 'Entry Successfully created',
      entry,
    })).catch(error => res.status(500).json({ message: error.message }));
  }

  static getAllEntries(req, res) {
    client.query('SELECT * FROM entries')
      .then((entry) => {
        if (entry.rowCount === 1) {
          res.status(201).json({
            success: true,
            message: 'entries successfully retrieved',
            entry: entry.rows,
          });
        }
        res.status(404).json({
          success: false,
          message: 'No entry found',
        });
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  static processData(data) {
    const entry = data;
    const result = [];
    for (let i = 0; i < entry.length; i += 1) {
      const check = (entry[i].Title).trim();
      if (!check) {
        let pickEntry = entry[i].entry;
        let pickEntryArray = pickEntry.split(' ');
        if (pickEntryArray.length > 10) {
          pickEntryArray = pickEntryArray.slice(0, 10);
          pickEntry = `${pickEntryArray.join(' ')}...`;
          entry[i].Title = pickEntry;
        }
      }
      result.push(entry[i]);
    }
    return result;
  }

  static getEntryById(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    client.query({ text: 'SELECT * FROM entries where entryId = ($1) ', values: [entryId] })
      .then((entry) => {
        if (entry.rowCount === 1) {
          res.status(201).json({
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

  static editEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const entry = {
      entrytitle: req.body.entrytitle,
      entrycontent: req.body.entrycontent,
    };
    const query = {
      text: 'UPDATE entries SET entrytitle = ($1), entrycontent = ($2) WHERE entryId = ($3) RETURNING entrytitle ,entrycontent',
      values: [entry.entrytitle, entry.entrycontent, entryId],
    };
    client.query(query)
      .then((editEntry) => {
        if (editEntry.rowCount === 1) {
          res.status(201).json({
            success: true,
            message: 'successfully edited',
            entry: editEntry.rows,
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

  static deleteEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    client.query('DELETE FROM entries WHERE entryId = ($1) RETURNING *', [entryId])
      .then((entry) => {
        if (entry.rowCount === 1) {
          res.status(201).json({
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
export default myDiaryController;
