export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { PlayerID } = req.body;

  try {
    const response = await fetch('https://open-api.hidupcuan.org/api/player/get', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/json',
        'Origin': 'https://toko.hidupcuan.org',
        'Referer': 'https://toko.hidupcuan.org/',
        'Sec-Ch-Ua': '"Not:A-Brand";v="99", "Brave";v="145", "Chromium";v="145"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({ "PlayerID": PlayerID.toString() })
    });

    const data = await response.json();
    
    // Kirim hasil kembali ke frontend kamu
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Gagal menyambung ke server pusat" });
  }
}
