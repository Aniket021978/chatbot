# 📌 Customer Data Platform (CDP) Support Chatbot

## 🚀 Overview
This chatbot is designed to assist users with "how-to" questions related to four major Customer Data Platforms (CDPs): **Segment, mParticle, Lytics, and Zeotap**. The chatbot efficiently extracts relevant information from official CDP documentation to provide precise responses. It ensures accurate guidance on platform-specific functionalities and supports cross-platform comparisons.

## 🌟 Key Features
### 🔹 Core Functionalities
- **Answer "How-to" Questions**
  - Accurately understands and responds to platform-related queries.
  - Example: *"How do I set up a new source in Segment?"*
- **Documentation Extraction**
  - Automatically retrieves and extracts necessary steps from official documentation.
- **Natural Language Processing (NLP)**
  - Handles different phrasings of questions and long-form queries efficiently.
  - Filters out non-relevant queries to maintain accuracy.

### 🎯 Advanced Features
- **Cross-CDP Comparisons**
  - Provides insights into feature differences between CDPs.
  - Example: *"How does Lytics compare to Segment for audience segmentation?"*
- **Advanced "How-to" Support**
  - Handles complex, platform-specific queries.
  - Includes step-by-step guidance for advanced configurations and integrations.
- **Conversation Management**
  - **Clear Chat Functionality:** Resets the chat interface for a fresh start.
  - **Dark Mode Support:** Enhances UI with a dark theme option.

## 🏗️ Project Structure
```
ZEOTAP2/
│── back/                  # Backend Implementation
│   ├── controllers/       # Handles chatbot logic and responses
│   ├── node_modules/      # Dependencies
│   ├── routes/            # API routes for chatbot interactions
│   ├── services/          # Documentation extraction and NLP processing
│   ├── utils/             # Helper functions
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Main backend server file
│
│── front/                 # Frontend Implementation
│   ├── node_modules/      # Dependencies
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components for chatbot UI
│   │   │   ├── Chatbot.css
│   │   │   ├── Chatbot.js
│   │   │   ├── Message.css
│   │   │   ├── Message.js
│   │   ├── App.js         # Main React application file
│   │   ├── index.js       # Application entry point
│   ├── package.json       # Frontend dependencies
│
│── README.md              # Documentation
```

## ⚡ Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (LTS version recommended)
- **MongoDB** (If storing logs or user interactions)

### 🔧 Backend Setup
```bash
cd back
npm install   # Install dependencies
node server.js   # Start the backend server
```

### 🎨 Frontend Setup
```bash
cd front
npm install   # Install dependencies
npm start   # Start the frontend application
```

## 🔥 Usage
1. **Launch the Frontend**: Open the chatbot interface in your browser.
2. **Ask Questions**: Type queries related to Segment, mParticle, Lytics, or Zeotap.
3. **Receive Instant Answers**: The chatbot fetches relevant information and provides accurate responses.
4. **Clear Chat**: Reset the conversation anytime using the *Clear Chat* button.
5. **Dark Mode**: Switch between light and dark themes for an enhanced UI experience.

## 🛠️ Technologies Used
### Backend
- **Node.js & Express.js** - REST API and chatbot logic
- **Cheerio** - Scrapes and retrieves documentation details
- **NLP.js** - Natural language processing for question handling

### Frontend
- **React.js** - Modern UI framework
- **CSS** - Responsive styling
- **Material-UI** - UI components

