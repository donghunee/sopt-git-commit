import React,{ useState }  from 'react';
import queryString from 'query-string';
import TimePicker from 'react-time-picker';
import './Mypage.css';
import { useCountdownTimer } from 'use-countdown-timer';
const { ipcRenderer } = window.require('electron'); // type에러 잡기


const fet = () => {

    let userID = "donghunee"

    fetch(`https://api.github.com/users/${userID}/events`)
      .then(response => response.json())
      .then(json => {
          let co = 0
        for(var i in json) {
            var today = new Date()
            let date = new Date(json[i].created_at)
            if (date.getMonth()+1 === today.getMonth()+1 && date.getDate() === today.getDate()){
                if (json[i].type === "PushEvent" || json[i].type =="PullRequestEvent" ) {
                    ipcRenderer.send('async-commit', 'sync ping');
                    co += 1
                    break
                }
            }
        }
        if (co === 0) {
          ipcRenderer.send('async-uncommit', 'sync ping');
        }
      })
      .catch(err => console.log(err))

}

const StartClock = () => {    
    fet()
    let timerId = setInterval(fet, 100000);
}


const Mypage = ({location, match}) => {
    const { countdown, start, reset } = useCountdownTimer({ timer: 5 });
    const [value, setValue] = useState(true);


    const query = queryString.parse(location.search);

    return (
        <div className="wrap"  style={{height:'100%',display:'flex',justifyContent:'center',flexDirection:'row',background:'black'}}>
            <div className="item">
                <img src={query.image} className="img-responsive animated fadeIn slow" style={{width:100}} />
                <p className="animated fadeIn slow delay-1s">{query.name}님 안녕하세요</p>
                <button onClick={StartClock} className="button animated fadeIn slow delay-2s">알림 시작</button>
                <div>{countdown}</div>
                <button onClick={reset}>Reset</button>
                <button onClick={start}>Start</button>
            </div>
        </div>
    );
};

export default Mypage;