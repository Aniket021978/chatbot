import React from 'react';
import './Message.css';

function Message({ text, user }) {
    return <div className={user ? 'user-message' : 'bot-message'}>{text}</div>;
}

export default Message;