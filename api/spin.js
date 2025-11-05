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
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const store = readStore();
  if (!store.participants || store.participants.length === 0) {
    return res.status(400).json({ message: 'No participants' });
  }
  // pick random
  const idx = Math.floor(Math.random() * store.participants.length);
  const winner = store.participants[idx];
  store.winners.push({ ...winner, drawnAt: new Date().toISOString() });
  // optionally remove the winner from participants
  // store.participants = store.participants.filter((p, i) => i !== idx);
  writeStore(store);
  return res.status(200).json({ winner });
};
