(async function () {
  // Define the calculateIntegrityValue function
  const fs = require('fs').promises;
  const crypto = require('crypto');

  async function calculateIntegrityValue(filePath) {
    const fileContent = await fs.readFile(filePath, 'utf8');

    const encoder = new TextEncoder();
    const data = encoder.encode(fileContent);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // const hashArray = Array.from(new Uint8Array(hashBuffer));
    // const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));


    return `sha256-${hashBase64}`;
  }

  // Example usage
  const scriptUrl = '../absher_business_ar/build/static/js/bundle-Absher-Business.js';
  const scriptUrlEn = '../absher_business_en/build/static/js/bundle-Absher-Business-en.js';

  const integrity = await calculateIntegrityValue(scriptUrl);
  const integrityEn = await calculateIntegrityValue(scriptUrlEn);

  console.log("Ar: " + integrity);
  console.log("En: " + integrityEn);

  // Rest of your startup code goes here
  // ...

})();
