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
    return res.status(200).json({ participants: store.participants });
  }
  if (method === 'POST') {
    try {
      const body = req.body || {};
      // expect { name: string }
      if (!body.name) return res.status(400).json({ message: 'Missing name' });
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
      const p = { id, name: body.name };
      store.participants.push(p);
      writeStore(store);
      return res.status(201).json(p);
    } catch (e) {
      return res.status(500).json({ message: 'Could not add participant' });
    }
  }
  if (method === 'DELETE') {
    // body { id }
    const body = req.body || {};
    if (!body.id) return res.status(400).json({ message: 'Missing id' });
    store.participants = store.participants.filter(x => x.id !== body.id);
    writeStore(store);
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ message: 'Method not allowed' });
};
