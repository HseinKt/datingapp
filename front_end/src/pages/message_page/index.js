import { useState } from "react";
import Chat from "../../components/message_page/chat";
import Header from "../../components/search_page/header";
import ChatBox from "../../components/message_page/chat-box";

const MessagePage = () => {

    const [message, setMessage] = useState("Hi there!")
    const [value, setValue] = useState("");

    const handleValue = (e) => {
        setValue(e.target.value);
    }
    
    const handleMessageSend = (e) => {
        e.preventDefault();
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