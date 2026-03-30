import * as cheerio from "cheerio";

export interface ScrapedPage {
  url: string;
  title: string;
  content: string;
  content_raw: string;
}

/**
 * Scrapes a single URL and extracts clean text content.
 */
export async function scrapeUrl(url: string): Promise<ScrapedPage> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise
    $("script, style, nav, footer, header, iframe, noscript").remove();

    const title = $("title").text().trim() || url;
    const content = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    return { url, title, content, content_raw: html };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    throw error;
  }
}

/**
 * Recursively crawls a website starting from a root URL.
 */
export async function crawlWebsite(
  rootUrl: string,
  maxPages: number = 20,
  maxDepth: number = 2
): Promise<ScrapedPage[]> {
  const visited = new Set<string>();
  const results: ScrapedPage[] = [];
  const queue: { url: string; depth: number }[] = [{ url: rootUrl, depth: 0 }];
  const domain = new URL(rootUrl).hostname;

  while (queue.length > 0 && results.length < maxPages) {
    const { url, depth } = queue.shift()!;

    if (visited.has(url) || depth > maxDepth) continue;
    visited.add(url);

    try {
      console.log(`Crawling: ${url} (Depth: ${depth})`);
      const page = await scrapeUrl(url);
      results.push(page);

      // Find links for further crawling
      if (depth < maxDepth) {
        const $ = cheerio.load(page.content_raw); // We'll need to store the raw HTML temporarily or re-scrape

        $("a[href]").each((_, el) => {
          try {
            const href = $(el).attr("href");
            if (!href) return;

            const absoluteUrl = new URL(href, url).href.split("#")[0].split("?")[0];
            const urlObj = new URL(absoluteUrl);

            // Only stay within the same domain and avoid non-http links
            if (
              urlObj.hostname === domain &&
              (urlObj.protocol === "http:" || urlObj.protocol === "https:") &&
              !visited.has(absoluteUrl)
            ) {
              queue.push({ url: absoluteUrl, depth: depth + 1 });
            }
          } catch (e) {
            // Ignore invalid URLs
          }
        });
      }
    } catch (error) {
      console.warn(`Skipping ${url} due to error:`, error);
    }
  }

  return results;
}
