(async function () {
  // Define the calculateIntegrityValue function
  async function calculateIntegrityValue(url) {
    const response = await fetch(url);
    const fileContent = await response.text();

    const encoder = new TextEncoder();
    const data = encoder.encode(fileContent);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // const hashArray = Array.from(new Uint8Array(hashBuffer));
    // const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));


    return `sha256-${hashBase64}`;
  }

  // Example usage
  const scriptUrl = 'https://cdn.labiba.ai/static/js/bundle-Absher-Business.js';
  const scriptUrlEn = 'https://cdn.labiba.ai/static/js/bundle-Absher-Business-en.js';

  const integrity = await calculateIntegrityValue(scriptUrl);
  const integrityEn = await calculateIntegrityValue(scriptUrlEn);

  console.log(scriptUrl + " Ar " + integrity);
  console.log(scriptUrlEn + " En " + integrityEn);

  // Rest of your startup code goes here
  // ...

})();
