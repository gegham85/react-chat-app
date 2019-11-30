import React from 'react';

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      message: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ message: '' });

    this.props.addNewMessage(this.state.message);
  }

  render() {
    return (
      <form className="message__form" onSubmit={this.handleSubmit}>
        <input
          className="message__form__input"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
        />

        <button>Submit</button>
      </form>
    )
  }
}

export default SendMessageForm;