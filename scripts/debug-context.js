require('dotenv').config({ path: '.env.local' });
const { ingestManualContext } = require('../src/lib/ingest');

async function test() {
  try {
    console.log("Starting manual context injection test...");
    const result = await ingestManualContext("test-user-123", "This is a test manual context.", "Test Label");
    console.log("Result:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
