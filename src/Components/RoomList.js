import React from 'react';

class RoomList extends React.Component {

  render() {
    return (
      <div className="room__list">
        <h2>Room List</h2>
        { this.props.rooms.map((room, index) => {
          return (
            <div
              className={`room__list__item` + (room.id === this.props.selectedRoom ? 'active' : '')}
              key={room.id}
              onClick={() => this.props.handleRoomChange(room.id) }
            >
               {room.name}
             </div>
          );
        })}
      </div>
    )
  }
}

export default RoomList;