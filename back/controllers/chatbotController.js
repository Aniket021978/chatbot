const chatbotService = require('../services/chatbotService')

exports.getAnswer = async (req, res) => {
    const { question } = req.body
    const answer = await chatbotService.fetchAnswer(question)
    res.json({ answer })
}