import React from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import NewRoomForm from './Components/NewRoomForm';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joinableRooms: [],
      joinedRooms: [],
      selectedRoom: process.env.REACT_APP_DEFAULT_ROOM,
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);
  }

  componentDidMount() {
    this.chatManager = new ChatManager({
      instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
      userId: process.env.REACT_APP_DEFAULT_USER_ID,
      tokenProvider: new TokenProvider({
        url: process.env.REACT_APP_TOKEN_URL
      })
    });

    this.chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;

        this.currentUser.subscribeToRoomMultipart({
          roomId: process.env.REACT_APP_DEFAULT_ROOM,
          hooks: {
            onMessage: message => {
              this.setState(prevState => ({
                messages: [...prevState.messages, message]
              }));
            }
          },
          messageLimit: 10
        });

        this.currentUser.getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
            })
          })
          .catch(err => {
            console.log(`Error getting joinable rooms: ${err}`)
          })
      })
      .catch(err => {
        console.log('Error on connection', err)
      })

  }

  addNewMessage(message) {
    this.currentUser.sendSimpleMessage({
      roomId: this.state.selectedRoom,
      text: message,
    }).catch(err => {
        console.log(`Error adding message to: ${err}`)
      });
  }

  handleRoomChange(roomId) {
    if (roomId === this.state.selectedRoom) {
      return;
    }

    this.setState({
      messages: [],
      selectedRoom: roomId
    });

    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState(prevState => ({
            messages: [...prevState.messages, message],
            selectedRoom: roomId
          }));
        }
      },
      messageLimit: 10
    });
  }

  createNewRoom(room) {
    const roomName = room.charAt(0).toUpperCase() + room.slice(1);
    const roomId = room.toLowerCase();

    this.currentUser.createRoom({
      id: roomId,
      name: roomName,
      private: false,
      addUserIds: [process.env.REACT_APP_DEFAULT_USER_ID],
    }).then(room => this.handleRoomChange(room.id))
      .catch(err => {
        console.log(`Error creating room ${err}`)
      })
  }

  render() {
    return (
      <div className="app">
        <RoomList
          handleRoomChange={this.handleRoomChange}
          selectedRoom={this.state.selectedRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList
          selectedRoom={this.state.selectedRoom}
          messages={this.state.messages}/>
        <SendMessageForm
          addNewMessage={this.addNewMessage}
        />
        <NewRoomForm
          createNewRoom={this.createNewRoom}/>
      </div>
    )
  }
}

export default App;
