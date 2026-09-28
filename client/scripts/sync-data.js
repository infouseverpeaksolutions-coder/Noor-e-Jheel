import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '../../server/data');
const targetDir = path.resolve(__dirname, '../public/api/data');

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const srcFile = path.join(sourceDir, file);
        const destFile = path.join(targetDir, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`Synced data: ${file} -> client/public/api/data/${file}`);
      }
    }
  }
} catch (err) {
  console.error('Failed to sync data:', err);
}
