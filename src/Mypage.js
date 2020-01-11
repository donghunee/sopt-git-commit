import React,{ useState }  from 'react';
import queryString from 'query-string';
import TimePicker from 'react-time-picker';
import './Mypage.css';



const Mypage = ({location, match}) => {

    const [value, setValue] = useState('');


    const query = queryString.parse(location.search);

    return (
        <div className="wrap"  style={{height:'100%',display:'flex',justifyContent:'center',flexDirection:'row',background:'black'}}>
            <div className="item">
                <img src={query.image} className="img-responsive animated fadeIn slow" style={{width:100}} />
                <p className="animated fadeIn slow delay-1s">{query.name}님 안녕하세요</p>
                <button className="button animated fadeIn slow delay-2s">알림 시작</button>
            </div>
        </div>
    );
};

export default Mypage;