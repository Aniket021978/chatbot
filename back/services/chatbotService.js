const scraper = require('../utils/scraper')

exports.fetchAnswer = async (question) => {
    const response = await scraper.getRelevantData(question)
    return response || 'No relevant information found.'
}