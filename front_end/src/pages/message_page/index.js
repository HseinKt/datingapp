import { useEffect, useState } from "react";
import Chat from "../../components/message_page/chat";
import Header from "../../components/search_page/header";
import ChatBox from "../../components/message_page/chat-box";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessagePage = () => {

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [token, setToken] = useState("");
    // const [name, setName] = useState("");
    // const [body, setBody] = useState("Hi there!!!!!!!!");
    // const [receiver_id, setReceiver_id] = useState("");

    useEffect(() => {
        const myToken = localStorage.getItem("token");
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            const receiver_id = localStorage.getItem('user_id');
            const formData = new FormData();
            formData.append('receiver_id',receiver_id);
            try {
                axios.post("http://localhost:8000/api/v0.0.1/get_messages", formData, {
                    headers: {
                        'Authorization' : 'Bearer ' + myToken,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then (response => {
                    console.log(response.data);
                    setMessages(response.data.user_message)
                })
                .catch(err => console.log("Axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        }
    }, [])

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
                console.log(messages);
                console.log(response.data.user_message);
                setMessages([...messages,response.data.user_message]);
                // setName(response.data.sender_name)
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
                {!!messages && messages.map((message, index) => {
                    return <ChatBox message={message.body} key={index} sender_name={message.sender_name} receiver_name={message.receiver_name} />
                })}
            </div>
            <Chat value={value} handleValue={handleValue} handleMessageSend={handleMessageSend}/>
        </div>
     );
}
 
export default MessagePage;