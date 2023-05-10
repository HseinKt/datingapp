import { useNavigate } from "react-router-dom"
import card from "../../images/card.jpg"
import logo from "../../images/logo2.png"
import { useEffect, useState } from "react";
import axios from "axios";

const Cards = (props) => {
    const navigate  = useNavigate();
    const [token, setToken] = useState("");
    const [clicked, setClicked] = useState(0);
    const [clickedBlock, setClickedBlock] = useState(0);

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message")
    }

    const handleCard = (e) => {
        const { id, name } = props.data;
        localStorage.setItem('user_id', id);
        localStorage.setItem('user_name', name);
        navigate("/profile");
    }

    const handleLove = () => {
        const { id } = props.data;
        console.log(id);

        if(clicked == 0) {
            if(clickedBlock == 2){
                setClickedBlock(0)
            }
            setClicked(1);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/add_favorite/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } else {
            setClicked(0);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/remove_favorite_Or_Block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        }
    }  
    
    const handleBlock = () => {
        // setClickedBlock(!clickedBlock);
        const { id } = props.data;
        if (clickedBlock == 0) {
            if(clicked == 1) {
                setClicked(0)
            }
            setClickedBlock(2);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/add_block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } else {
            setClickedBlock(0);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/remove_favorite_Or_Block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } 
    }

    return ( 
        <div className="user-container">
            <div className="card-container">
                <div className="image-container">
                    <img src={card} alt="card" className="card-image" onClick={handleCard}/>
                </div>
                <div className="details">
                    <h4 className="name">
                        <b>{props.data.name}</b>
                    </h4>
                    <h4 className="age">
                        {props.data.age && <b> {props.data.age} </b>}
                    </h4>
                    <h4 className="location">
                        {props.data.city && <b> {props.data.city} </b>}
                    </h4>
                </div>
                <div className="card-buttons">
                    <div className="love-block">
                        <img src={logo} alt="love" className={`love-card ${clicked ? 'clicked-card' : ''}`} onClick={handleLove} />
                        <button className={`block btn ${clickedBlock ? 'block-card' : ''}`} onClick={handleBlock} >
                            block
                        </button>
                    </div>
                    {/* <div className="messagebtn">
                        <button className="sendbtn btn" onClick={handleSubmit}>
                            send a message
                        </button>
                    </div>  */}
                </div>
            </div>
        </div>
     );
}
 
export default Cards;