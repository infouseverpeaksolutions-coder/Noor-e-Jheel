<?php
// Noor-e-Jheel Tour & Travel - Standalone API for Hostinger LiteSpeed / Apache PHP
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataPath = __DIR__ . '/data';
$endpoint = isset($_GET['endpoint']) ? trim($_GET['endpoint'], '/') : '';

if (empty($endpoint)) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $apiPrefix = '/api/';
    $pos = strpos($uri, $apiPrefix);
    if ($pos !== false) {
        $endpoint = trim(substr($uri, $pos + strlen($apiPrefix)), '/');
    }
}

$parts = explode('/', $endpoint);
$resource = $parts[0] ?? '';
$slug = $parts[1] ?? null;

function loadJson($file) {
    if (!file_exists($file)) return null;
    $content = file_get_contents($file);
    return json_decode($content, true);
}

switch ($resource) {
    case 'packages':
        $data = loadJson($dataPath . '/packages.json') ?? [];
        if ($slug) {
            foreach ($data as $item) {
                if (isset($item['slug']) && $item['slug'] === $slug) {
                    echo json_encode($item, JSON_UNESCAPED_UNICODE);
                    exit;
                }
            }
            http_response_code(404);
            echo json_encode(['error' => 'Package not found']);
            exit;
        }

        $cat = $_GET['category'] ?? null;
        $dest = $_GET['destination'] ?? null;
        if ($cat || $dest) {
            $data = array_values(array_filter($data, function($item) use ($cat, $dest) {
                if ($cat && (!isset($item['category']) || strtolower($item['category']) !== strtolower($cat))) {
                    return false;
                }
                if ($dest) {
                    $hasDest = false;
                    foreach ($item['destinations'] ?? [] as $d) {
                        if (stripos($d, $dest) !== false) { 
                            $hasDest = true; 
                            break; 
                        }
                    }
                    if (!$hasDest) return false;
                }
                return true;
            }));
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        break;

    case 'destinations':
        $data = loadJson($dataPath . '/destinations.json') ?? [];
        if ($slug) {
            foreach ($data as $item) {
                if (isset($item['slug']) && $item['slug'] === $slug) {
                    echo json_encode($item, JSON_UNESCAPED_UNICODE);
                    exit;
                }
            }
            http_response_code(404);
            echo json_encode(['error' => 'Destination not found']);
            exit;
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        break;

    case 'testimonials':
        $data = loadJson($dataPath . '/testimonials.json') ?? [];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        break;

    case 'blog':
        $data = loadJson($dataPath . '/blog.json') ?? [];
        if ($slug) {
            foreach ($data as $item) {
                if (isset($item['slug']) && $item['slug'] === $slug) {
                    echo json_encode($item, JSON_UNESCAPED_UNICODE);
                    exit;
                }
            }
            http_response_code(404);
            echo json_encode(['error' => 'Blog not found']);
            exit;
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        break;

    case 'settings':
        $data = loadJson($dataPath . '/settings.json') ?? [];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        break;

    case 'enquiries':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if ($input) {
                $enquiriesFile = $dataPath . '/enquiries.json';
                $enquiries = loadJson($enquiriesFile) ?? [];
                $input['id'] = 'enq-' . time() . '-' . rand(100, 999);
                $input['created_at'] = date('c');
                array_unshift($enquiries, $input);
                if (count($enquiries) > 500) {
                    $enquiries = array_slice($enquiries, 0, 500);
                }
                @file_put_contents($enquiriesFile, json_encode($enquiries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            }
            echo json_encode(['success' => true, 'message' => 'Enquiry recorded']);
            exit;
        }
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found', 'endpoint' => $endpoint]);
        break;
}
