## Overview
This chatbot is designed to assist users with "how-to" questions related to four Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. It extracts relevant information from the official documentation of these CDPs to provide accurate responses.

## Features
### Core Functionalities
- **Answer "How-to" Questions**:
  - Understands and responds to user inquiries about performing specific tasks in each CDP.
  - Example: "How do I set up a new source in Segment?"
- **Extract Information from Documentation**:
  - Retrieves relevant information directly from the official CDP documentation.
  - Navigates through the documentation to extract necessary steps.
- **Handles Question Variations**:
  - Understands differently phrased questions.
  - Handles long questions without breaking.
  - Filters out irrelevant questions (e.g., non-CDP related queries).

### Bonus Features
- **Cross-CDP Comparisons**:
  - Answers comparative questions about features across different CDPs.
  - Example: "How does Segment's audience creation process compare to Lytics'?"
- **Advanced "How-to" Questions**:
  - Provides responses for complex platform-specific queries.
  - Includes advanced configurations and integrations.
- **Clear Chat Functionality**:
  - Allows users to reset the chat for a fresh start.
- **Dark Mode Support**:
  - Enhances UI experience with a dark mode theme.

## Project Structure
```
ZEOTAP2/
│── back/
│   ├── controllers/
│   ├── node_modules/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│── front/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chatbot.css
│   │   │   ├── Chatbot.js
│   │   │   ├── Message.css
│   │   │   ├── Message.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│── README.md
```

## Installation & Setup
### Prerequisites
- Node.js installed
- MongoDB (if using a database for logs or user interactions)

### Backend Setup
```bash
cd back
npm install
node server.js
```

### Frontend Setup
```bash
cd front
npm install
npm start
```

## Usage
1. Open the frontend in the browser.
2. Type your query related to Segment, mParticle, Lytics, or Zeotap.
3. The chatbot retrieves relevant information and displays an answer.
4. Use the **Clear Chat** button to reset the conversation.
5. Toggle **Dark Mode** for a better UI experience.
