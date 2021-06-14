import axios from 'axios';

const BASE_URL = "http://localhost:8080/"

class SucoTalkService {

    getRooms() {
        return axios.get(BASE_URL + 'rooms');
    }

    getMyRooms() {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'get',
            url: BASE_URL + 'rooms/my',
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }

    getAccessibleRooms() {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'get',
            url: BASE_URL + 'rooms/accessible',
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }

    getRoomDetail(roomId) {
        return axios.get(BASE_URL + 'rooms/detail/' + roomId);
    }

    getFriends() {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'get',
            url: BASE_URL + 'member/friends',
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }

    createRoom(roomInfo) {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'post',
            url: BASE_URL + 'rooms',
            headers :{
                Authorization: auth_token,
            },
            data : roomInfo,
            withCredentials: true,
        });
    }

    enterRoom(roomId) {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'post',
            url: BASE_URL + 'rooms/enter/'+roomId,
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }

    exitRoom(roomId) {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'post',
            url: BASE_URL + 'rooms/exit/' + roomId,
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }

    login(loginInfo) {
        return axios.post(BASE_URL + 'login/', loginInfo, { withCredentials: true });
    }

    logout() {
        localStorage.removeItem("authorization")
    }

    isLogged() {
        const auth_token = "Bearer "+ localStorage.getItem("authorization")
        return axios({
            method: 'get',
            url: BASE_URL + 'member/me',
            headers :{
                Authorization: auth_token,
            },
            withCredentials: true,
        });
    }
}
export default new SucoTalkService();