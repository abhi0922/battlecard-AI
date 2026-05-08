const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testHealth() {
  try {
    const res = await axios.get(`${BASE_URL}/health`);
    console.log('Health check:', res.data);
    return true;
  } catch (err) {
    console.error('Health check failed:', err.message);
    return false;
  }
}

async function testBattlecard() {
  try {
    const res = await axios.post(`${BASE_URL}/api/generate`, {
      competitor: 'Stripe'
    }, { timeout: 60000 });
    console.log('Battlecard generated for:', res.data.competitor);
    console.log('Has markdown:', !!res.data.markdown);
    console.log('Sources count:', res.data.sources?.length || 0);
    return true;
  } catch (err) {
    console.error('Battlecard test failed:', err.response?.data || err.message);
    return false;
  }
}

async function main() {
  console.log('Testing backend...\n');
  
  const healthOk = await testHealth();
  if (!healthOk) {
    console.log('Make sure backend is running: cd backend && npm run dev');
    return;
  }
  
  console.log('\nTesting battlecard generation (this may take up to 60s)...\n');
  await testBattlecard();
}

main();
