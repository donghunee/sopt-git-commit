import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
const { ipcRenderer } = window.require('electron'); // type에러 잡기

const {app} = window.require('electron').remote;

class App extends Component {

    state = {
        userID : "",
        userImage : "",
        userName : "",
        verify : true
    }

    handleSubmit = (event) => {
        try {
            fetch(`https://api.github.com/users/${this.state.userID}`)
                .then(response => response.json())
                .then(json => {
                    if(json.message == "Not Found") {
                        this.setState({
                            verify:false
                        })
                    }else {
                        this.setState({
                            verify:true,
                            userImage : json.avatar_url,
                            userName : json.name
                        })
                        localStorage.setItem('userID',this.state.userID)
                        localStorage.setItem('userImage',this.state.userImage)
                        localStorage.setItem('userName',this.state.userName)
                        window.location.hash = `/mypage?image=${this.state.userImage}&name=${this.state.userName}`;
                    }
                  })
                .catch(err => console.log("e"))         
        } catch (error) {   
            
        }
        event.preventDefault();
    }

    // StartClock() {    
    //     this.fet()
    //     let timerId = setInterval(this.fet, 100000);
    // }
    
    handleChange = (event) => {
        console.log(event.target)
        const { target: { name, value } } = event // 비구조화 할당
        this.setState({[name] : value,verify:true}) // dynamic key
    }

    componentDidMount() {
        if (localStorage.userID !== undefined) {
          window.location.hash = `/mypage?image=${localStorage.userImage}&name=${localStorage.userName}`;
        }
    }

  render() {
    return (
    <div className="wrap" style={{height:'100%',display:'flex',justifyContent:'center',flexDirection:'row',background:'black'}}>
        <form onSubmit={this.handleSubmit}>
            <div style={{textAlign:'center'}}>
                <label style={{color:'white'}}>GitHub UserName</label><br />
                <input className="input" type="text" placeholder="깃허브 유저네임을 적어주세요" name="userID" value={this.state.userID} onChange={this.handleChange} /><p style={{color:'red'}}>{this.state.verify? "":"유효하지 않은 유저네임입니다"}</p>
                <input className="login" type="submit" value="Login" />
            </div>
        </form>
    </div>
    );
  }
}

export default App;
