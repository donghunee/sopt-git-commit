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

    // fet = () => {

    //     let userID = "donghunee"

    //     fetch(`https://api.github.com/users/${userID}/events`)
    //       .then(response => response.json())
    //       .then(json => {
    //           let co = 0
    //         for(var i in json) {
    //             var today = new Date()
    //             let date = new Date(json[i].created_at)
    //             if (date.getMonth()+1 === today.getMonth()+1 && date.getDate() === today.getDate()){
    //                 if (json[i].type === "PushEvent" || json[i].type =="PullRequestEvent" ) {
    //                     ipcRenderer.send('async-commit', 'sync ping');
    //                     co += 1
    //                     break
    //                 }
    //             }
    //         }
    //         if (co === 0) {
    //           ipcRenderer.send('async-uncommit', 'sync ping');
    //         }
    //       })
    //       .catch(err => console.log(err))

    // }

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
                        console.log(this.state)
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
        // ipcRenderer.on('async-reply', (event, arg) => {
        //     console.log(arg);  // async pong
        // });
        // this.StartClock()
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
