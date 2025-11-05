const fs = require('fs');
const path = require('path');
const storagePath = path.resolve(__dirname, '..', 'data', 'storage.json');

function readStore(){
  try {
    return JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
  } catch(e) {
    return {participants: [], winners: []};
  }
}
function writeStore(obj){
  fs.writeFileSync(storagePath, JSON.stringify(obj, null, 2));
}

module.exports = async (req, res) => {
  const method = req.method;
  const store = readStore();
  if (method === 'GET') {
    return res.status(200).json({ winners: store.winners });
  }
  if (method === 'POST') {
    try {
      const body = req.body || {};
      // expect { winner: { id, name } }
      if (!body.winner) return res.status(400).json({ message: 'Missing winner' });
      store.winners.push({ ...body.winner, drawnAt: new Date().toISOString() });
      writeStore(store);
      return res.status(201).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ message: 'Could not add winner' });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
};
