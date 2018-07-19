import winston from 'winston';

const myDiary = [
  {
    id: 1,
    Title: 'The two solider sons',
    entry: 'The eldest son in a family of three boys, Aricles had no desire to be a soldier',
  },
  {
    id: 2,
    // Title: '                  Falling in love',
    Title: '      ',
    entry: 'Everything happened with millsecond, beautiful girl passsing by with alovely smile',
  },
];

class myDiaryController {
  static createEntry(req, res) {
    const entry = req.body;
    if (!entry.id) {
      res.status(500).json({ message: 'error while creating entry' });
    } else {
      myDiary.push(entry);
      res.status(201).json({
        success: 'entry created successfully',
        result: myDiary,
      });
    }
  }

  static getAllEntries(req, res) {
    // const entry = myDiary.map(s => s.trim());
    const entry = myDiary;
    const result = [];
    if (!entry) {
      res.status(404).json({ message: 'No Entry Available' });
    } else {
      winston.log('info', entry.length);
      for (let i = 0; i < entry.length; i += 1) {
        const check = (entry[i].Title).trim();
        if (!check) {
          let pickEntry = entry[i].entry;
          let pickEntryArray = pickEntry.split(' ');
          winston.log('info', pickEntryArray);
          if(pickEntryArray.length > 10) {
            pickEntryArray = pickEntryArray.slice(0, 10);
            pickEntry = pickEntryArray.join(' ')+'...';
            entry[i].Title = pickEntry;
          }
        }
        result.push(entry[i]);
      }
      res.status(201).json({
        success: 'success',
        result,
      });
    }
  }
}
export default myDiaryController;
