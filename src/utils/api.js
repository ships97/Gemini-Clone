// Fetch a list of country codes, then fetch details for those codes
export async function fetchCountries() {
  // Step 1: Get all country codes
  const codesRes = await fetch('https://restcountries.com/v3.1/all?fields=cca2');
  const codesData = await codesRes.json();
  const codes = codesData.map(c => c.cca2).filter(Boolean);

  // Step 2: Fetch details for all codes in batches (API limit is 20 per request)
  const batchSize = 20;
  let countries = [];
  for (let i = 0; i < codes.length; i += batchSize) {
    const batchCodes = codes.slice(i, i + batchSize).join(',');
    const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${batchCodes}`);
    const data = await res.json();
    countries = countries.concat(data);
  }

  // Step 3: Map to { code, name, dial_code }
  return countries
    .filter(c => c.idd && c.idd.root)
    .map(c => ({
      code: c.cca2,
      name: c.name.common,
      dial_code: c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : ''),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchChatrooms(query = '') {
  // Simulate fetching chatrooms with search
  const all = [
    { id: '1', title: 'General' },
    { id: '2', title: 'AI Talk' },
    { id: '3', title: 'Random' },
  ];
  if (!query) return all;
  return all.filter(room => room.title.toLowerCase().includes(query.toLowerCase()));
} 