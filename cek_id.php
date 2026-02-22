<?php
header('Content-Type: application/json');

// Mengambil data PlayerID dari request frontend
$input = json_decode(file_get_contents('php://input'), true);
$playerId = $input['PlayerID'] ?? '';

if (!$playerId) {
    echo json_encode(['status' => 'error', 'message' => 'ID Kosong']);
    exit;
}

$url = "https://open-api.hidupcuan.org/api/player/get";

$data = json_encode(["PlayerID" => (string)$playerId]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Origin: https://toko.hidupcuan.org',
    'Referer: https://toko.hidupcuan.org/',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
