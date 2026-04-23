require('dotenv').config({ path: '.env.local' });

async function testHF() {
  const token = process.env.HF_TOKEN;
  const model = "BAAI/bge-small-en-v1.5";
  const url = `https://api-inference.huggingface.co/models/${model}`;
  
  console.log(`Testing HF Token: ${token.substring(0, 7)}...`);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: "This is a test." })
    });
    
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Body:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testHF();
