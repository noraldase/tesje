export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { PlayerID } = req.body;

  try {
    const response = await fetch('https://open-api.hidupcuan.org/api/player/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://toko.hidupcuan.org',
        'Referer': 'https://toko.hidupcuan.org/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({ "PlayerID": PlayerID.toString() })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
