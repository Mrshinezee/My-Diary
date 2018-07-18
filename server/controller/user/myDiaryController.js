const myDiary = [
  {
    id: 1,
    Title: 'The two solider sons',
    entry: 'The eldest son in a family of three boys, Aricles had no desire to be a soldier',
  },
  {
    id: 2,
    Title: 'Falling in love',
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
}
export default myDiaryController;
