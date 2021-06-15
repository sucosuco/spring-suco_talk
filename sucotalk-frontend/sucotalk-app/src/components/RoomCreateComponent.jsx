import React, { Component } from 'react';
import SucoTalkService from '../service/SucoTalkService';
import { withRouter } from 'react-router-dom';

class CreateRoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomName : '',
            friends : []
        }
    }

    componentDidMount() {
        SucoTalkService.getFriends().then(res => {
            this.setState(
                {
                    friends: res.data
                }
            )
        });
    }

    createRoom() {
        const elements = document.getElementsByClassName('active');
        const ids = [];
        for (let i = 0; i < elements.length; i++) {
            ids.push(elements[i].getAttribute('data-id'));
        }

        const roomInfo = {
            name: this.state.roomName,
            members: ids
        }

        if(roomInfo.name == null || roomInfo.name.trim() == ""){
            alert("방 이름은 빈칸일 수 없습니다.")
            return;
        }

        SucoTalkService.createRoom(roomInfo)
            .then(res => {
                this.props.history.push("/room/" + res.data.id);
            })
            .catch(error => {
                if(error.response.data.message != null){
                    alert(error.response.data.message)
                } else{
                    alert(error)
                }
            })
    }

    changeNameHandler = (event) => {
        this.setState({roomName: event.target.value})
    }

    clickItem(e) {
        e.target.classList.toggle('active');
    }

    render() {
        return (
            <div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text">방 제목</label>
                    </div>
                    <input type="text" class="form-control" value = {this.state.name} onChange={this.changeNameHandler}/>
                    <div class="input-group-append">
                        <button id="createRoomBtn" class="btn btn-primary" type="button" onClick={() => this.createRoom()}>완료</button>
                    </div>
                </div>
                <ul class="list-group">
                    {
                         this.state.friends.map(
                            friend => 
                            <li class = "list-group-item list-group-item-action" key = {friend.id} data-id = {friend.id} onClick = {(e) => this.clickItem(e)}> 
                                {friend.name}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default withRouter(CreateRoomList);