import fs from 'fs';
import path from 'path';

// Fix __dirname for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, '$1'));
const METADATA_PATH = path.join(process.cwd(), 'public/images/metadata.json');

export function addImageMetadata(productId, filename, originalname) {
  let metadata = [];
  if (fs.existsSync(METADATA_PATH)) {
    metadata = JSON.parse(fs.readFileSync(METADATA_PATH));
  }
  metadata.push({
    productId,
    filename,
    originalname,
    uploadedAt: new Date().toISOString()
  });
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}

export function getImagesByProduct(productId) {
  if (!fs.existsSync(METADATA_PATH)) return [];
  const metadata = JSON.parse(fs.readFileSync(METADATA_PATH));
  return metadata.filter(img => img.productId === productId);
}

export function removeImagesByProduct(productId) {
  if (!fs.existsSync(METADATA_PATH)) return;
  let metadata = JSON.parse(fs.readFileSync(METADATA_PATH));
  const imagesToRemove = metadata.filter(img => img.productId === productId);
  // Remove image files
  for (const img of imagesToRemove) {
    const imgPath = path.join(process.cwd(), 'public/images', img.filename);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
  // Remove from metadata
  metadata = metadata.filter(img => img.productId !== productId);
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}
