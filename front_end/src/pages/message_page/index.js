import { useEffect, useState } from "react";
import Chat from "../../components/message_page/chat";
import Header from "../../components/search_page/header";
import ChatBox from "../../components/message_page/chat-box";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessagePage = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("Hi there!")
    const [value, setValue] = useState("");
    const [token, setToken] = useState("");
    // const [body, setBody] = useState("Hi there!!!!!!!!");
    // const [receiver_id, setReceiver_id] = useState("");

    useEffect(() => {
        const myToken = localStorage.getItem("token");
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
        }
    })

    const handleValue = (e) => {
        setValue(e.target.value);
    }
    
    const handleMessageSend = (e) => {
        e.preventDefault();
        const receiver_id = localStorage.getItem('user_id');
        const formData = new FormData();
        formData.append('receiver_id',receiver_id);
        formData.append('body',value);
        try {
            axios.post("http://localhost:8000/api/v0.0.1/send_message", formData, {
                headers: {
                    'Authorization' : 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(err => console.log("Axios error: "+err.message))
        } catch (error) {
            console.log("Catch error: " + error);
        }
    }
    
    return ( 
        <div>
            <Header />
            <div className="ChatBox">
                <ChatBox message={message} />
            </div>
            <Chat value={value} handleValue={handleValue} handleMessageSend={handleMessageSend}/>
        </div>
     );
}
 
export default MessagePage;