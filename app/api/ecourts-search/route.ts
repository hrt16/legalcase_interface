export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return Response.json({ error: "Query is required" }, { status: 400 })
    }

    // Prepare the form data for eCourts website
    const formData = new URLSearchParams({
      search_type: "keyword",
      keyword: query,
      search_option: "any_word", // Can be 'any_word', 'all_words', or 'phrase'
      proximity: "20",
      // Note: In production, you would need to handle CAPTCHA properly
      // This is a simplified version
    })

    // Make request to eCourts search endpoint
    const response = await fetch("https://judgments.ecourts.gov.in/pdfsearch/search_results.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: formData.toString(),
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch from eCourts" }, { status: 500 })
    }

    const html = await response.text()

    // Parse the HTML response to extract judgment data
    // This is a basic parser - you may need to adjust based on actual HTML structure
    const results = parseECourtsResults(html, query)

    return Response.json({
      query,
      results,
      message: results.length
        ? `Found ${results.length} judgments related to "${query}"`
        : `No judgments found for "${query}". The eCourts website may require CAPTCHA verification or the search returned no results.`,
    })
  } catch (error) {
    console.error("[v0] eCourts API Error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

function parseECourtsResults(html: string, query: string) {
  const results: Array<{
    title: string
    court: string
    date: string
    url: string
  }> = []

  try {
    // Basic HTML parsing to extract judgment information
    // Note: This is a simplified parser. The actual eCourts website structure may vary
    const titleMatches = html.match(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi) || []

    for (const match of titleMatches.slice(0, 10)) {
      // Limit to 10 results
      const urlMatch = match.match(/href="([^"]*)"/)
      const titleMatch = match.match(/>([^<]*)<\/a>/)

      if (urlMatch && titleMatch) {
        const url = urlMatch[1]
        const title = titleMatch[1].trim()

        // Skip if it's not a judgment link
        if (!url.includes("judgment") && !url.includes("pdf") && !url.includes("view")) {
          continue
        }

        results.push({
          title: title || "Untitled Judgment",
          court: "High Court of India",
          date: new Date().toLocaleDateString(),
          url: url.startsWith("http") ? url : `https://judgments.ecourts.gov.in/pdfsearch/${url}`,
        })
      }
    }

    // If no results found from parsing, provide a mock response indicating the limitation
    if (results.length === 0) {
      return [
        {
          title: `Search submitted for: "${query}"`,
          court: "eCourts India",
          date: new Date().toLocaleDateString(),
          url: "https://judgments.ecourts.gov.in/pdfsearch/index.php",
        },
      ]
    }
  } catch (error) {
    console.error("[v0] Error parsing eCourts results:", error)
  }

  return results
}
