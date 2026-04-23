const { crawlWebsite } = require("./src/lib/scraper");

async function testScraper() {
  const url = "https://example.com";
  console.log(`Testing scraper with URL: ${url}`);
  try {
    const results = await crawlWebsite(url, 5, 1);
    console.log(`Scraped ${results.length} pages.`);
    results.forEach((p, i) => {
      console.log(`Page ${i+1}: ${p.url} (${p.content.length} chars)`);
    });
  } catch (err) {
    console.error("Scraper failed:", err);
  }
}

testScraper();
