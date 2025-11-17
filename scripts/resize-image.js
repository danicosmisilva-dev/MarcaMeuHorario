const sharp = require('sharp');
const fs = require('fs');

const input = 'assets/images/banner/hero-banner-1.jpg';
const output = input; // overwrite

(async () => {
  try {
    const metadata = await sharp(input).metadata();
    console.log('Original dimensions:', metadata.width, 'x', metadata.height);

    if (metadata.width <= 1920) {
      console.log('Image is already <= 1920px wide; no resize needed.');
      return;
    }

    await sharp(input)
      .resize({ width: 1920 })
      .jpeg({ quality: 82 })
      .toFile(output + '.tmp');

    fs.renameSync(output + '.tmp', output);

    const newMeta = await sharp(output).metadata();
    console.log('Resized to:', newMeta.width, 'x', newMeta.height);
  } catch (err) {
    console.error('Error resizing image:', err);
    process.exit(1);
  }
})();
