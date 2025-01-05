(async function () {
  const fs = require('fs').promises;
  const crypto = require('crypto');
  const axios = require('axios');
  const path = require('path');

  async function calculateIntegrityValue(input) {
    let fileContent;

    if (isValidUrl(input)) {
      console.log(`Fetching from URL: ${input}`);
      const response = await axios.get(input, { responseType: 'arraybuffer' });
      fileContent = response.data; 
    } else {
      console.log(`Reading from file path: ${input}`);
      fileContent = await fs.readFile(input);
    }

    const hash = crypto.createHash('sha256').update(fileContent).digest('base64');

    return `sha256-${hash}`;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  try {
    const scriptUrl = '../Labiba Bundle/absher_business_ar/build/static/js/bundle-Absher-Business.js';
    const scriptUrlEn = '../Labiba Bundle/absher_business_en/build/static/js/bundle-Absher-Business-en.js';

    const integrity = await calculateIntegrityValue(scriptUrl);
    const integrityEn = await calculateIntegrityValue(scriptUrlEn);

    console.log("Ar: " + integrity);
    console.log("En: " + integrityEn);
  } catch (error) {
    console.error('Error calculating integrity values:', error.message);
  }
})();
