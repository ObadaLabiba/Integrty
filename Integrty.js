(async function () {
  const fs = require('fs').promises;
  const crypto = require('crypto');

  async function calculateIntegrityValue(filePath) {
    const fileContent = await fs.readFile(filePath);

    const hash = crypto.createHash('sha256').update(fileContent).digest('base64');

    return `sha256-${hash}`;
  }

  try {
    const scriptUrl = '../Labiba Bundle/absher_business_ar/build/static/js/bundle-Absher-Business.js';
    const scriptUrlEn = '../Labiba Bundle/absher_business_en/build/static/js/bundle-Absher-Business-en.js';

    const integrity = await calculateIntegrityValue(scriptUrl);
    const integrityEn = await calculateIntegrityValue(scriptUrlEn);

    console.log("Ar: " + integrity);
    console.log("En: " + integrityEn);

  } catch (error) {
    console.error('Error calculating integrity values:', error);
  }
})();
