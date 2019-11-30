import React from 'react';

class Message extends React.Component {
  render() {
    if (this.props.selectedRoom !== this.props.room) {
      return null;
    }

    return (
      <div className="message">
        <div className="message__username">{this.props.message}</div>
        <div className="message__username">{this.props.username}</div>
      </div>
    );
  }
}

export default Message;