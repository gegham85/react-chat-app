import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  render() {
    return (
      <div className="message__list">
        {this.props.messages.map((message, index) => {
          console.log(message.parts);

          return (
            <Message
              selectedRoom={this.props.selectedRoom}
              username={message.senderId}
              message={message.parts[0].payload.content}
              room={message.roomId}
              key={index}/>
          )
        })}
      </div>
    );
  }
}

export default MessageList;