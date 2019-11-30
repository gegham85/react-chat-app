import React from 'react';

class NewRoomForm extends React.Component {
  constructor(props) {
   super(props);

   this.state = {roomName: ''};

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.roomName) {
      return;
    }

    this.setState({ roomName: '' });

    this.props.createNewRoom(this.state.roomName)
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({ roomName: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="room__form">
        <input
          value={this.state.roomName}
          name="newroom"
          onChange={this.handleChange}
        />
        <button>New Room</button>
      </form>
    )
  }
}

export default NewRoomForm;