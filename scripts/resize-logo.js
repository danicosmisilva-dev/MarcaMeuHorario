const sharp = require('sharp');
const fs = require('fs');

const dir = 'assets/images/logo';
const input = `${dir}/logo-1.png`;
const backupDir = `${dir}/backup`;
const targetWidth = 150;

if (!fs.existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(1);
}
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
const backupPath = `${backupDir}/logo-1.original.png`;
fs.copyFileSync(input, backupPath);

(async () => {
  try {
    const metadata = await sharp(input).metadata();
    console.log('Original dimensions:', metadata.width, 'x', metadata.height);
    if (metadata.width === targetWidth) {
      console.log('Already target width:', targetWidth);
      process.exit(0);
    }
    await sharp(input)
      .resize({ width: targetWidth })
      .png({ compressionLevel: 9 })
      .toFile(input + '.tmp');
    fs.renameSync(input + '.tmp', input);
    const newMeta = await sharp(input).metadata();
    console.log('Resized to:', newMeta.width, 'x', newMeta.height);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
