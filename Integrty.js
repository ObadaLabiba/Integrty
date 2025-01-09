(async function () {
  const fs = require('fs').promises;
  const crypto = require('crypto');
  const axios = require('axios');

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
    const scriptUrl = 'https://abshersa2.labibabot.com/static/js/bundle-Absher-BusinessTest.js';
    const scriptUrlEn = 'https://abshersa2.labibabot.com/static/js/bundle-Absher-Business-enTest.js';

    const integrity = await calculateIntegrityValue(scriptUrl);
    const integrityEn = await calculateIntegrityValue(scriptUrlEn);

    console.log("Ar: " + integrity);
    console.log("En: " + integrityEn);
  } catch (error) {
    console.error('Error calculating integrity values:', error.message);
  }
})();
