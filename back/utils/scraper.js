const axios = require("axios");
const cheerio = require("cheerio");
const stringSimilarity = require("string-similarity");

const sources = {
    segment: "https://segment.com/docs/",
    mparticle: "https://docs.mparticle.com/",
    lytics: "https://docs.lytics.com/",
    zeotap: "https://docs.zeotap.com/home/en-us/"
};

const comparisonKeywords = ["compare", "difference", "vs", "between"];
const howToKeywords = ["how", "setup", "configure", "integrate", "use", "steps", "guide"];

const isComparisonQuestion = (question) =>
    comparisonKeywords.some((k) => question.toLowerCase().includes(k));
const isHowToQuestion = (question) =>
    howToKeywords.some((k) => question.toLowerCase().includes(k));

const fetchPageContent = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const $ = cheerio.load(data);
        const textSet = new Set();

        $("h2, h3, p, ol, ul").each((_, element) => {
            const text = $(element).text().trim();
            if (text.length > 10) textSet.add(text);
        });

        const sections = Array.from(textSet).slice(0, 10);
        return sections.length > 0 ? sections : ["No relevant content found."];

    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error.message);
        return ["Error fetching content."];
    }
};

const getRelevantData = async (question) => {
    let bestMatches = [];

    await Promise.allSettled(
        Object.entries(sources).map(async ([platform, url]) => {
            try {
                const sections = await fetchPageContent(url);
                const similarity = stringSimilarity.findBestMatch(question.toLowerCase(), sections);

                bestMatches.push({
                    platform,
                    url,
                    rating: similarity.bestMatch.rating,
                    content: similarity.bestMatch.target
                });
            } catch (error) {
                console.error(`Failed to process ${url}:`, error.message);
            }
        })
    );

    if (isComparisonQuestion(question)) {
        const topMatches = bestMatches.sort((a, b) => b.rating - a.rating).slice(0, 2);
        if (topMatches.length < 2) return "❌ Not enough data for a comparison.";

        return `🔍 **Comparison Between ${topMatches[0].platform} & ${topMatches[1].platform}**:\n\n
        **${topMatches[0].platform}**: ${topMatches[0].content}\n🔗 [Read more](${topMatches[0].url})\n\n
        **${topMatches[1].platform}**: ${topMatches[1].content}\n🔗 [Read more](${topMatches[1].url})`;
    }

    if (isHowToQuestion(question)) {
        const bestMatch = bestMatches.sort((a, b) => b.rating - a.rating)[0];
        return bestMatch && bestMatch.rating > 0.2
            ? `✅ **Step-by-step guide from ${bestMatch.platform}**:\n\n${bestMatch.content}\n🔗 [Read more](${bestMatch.url})`
            : "❌ No detailed steps found.";
    }

    const bestMatch = bestMatches.sort((a, b) => b.rating - a.rating)[0];
    return bestMatch && bestMatch.rating > 0.2
        ? `✅ **Found relevant info from ${bestMatch.platform}**:\n\n${bestMatch.content}\n🔗 [Read more](${bestMatch.url})`
        : "❌ No relevant data found.";
};

module.exports = { getRelevantData };
