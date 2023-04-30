import { useState } from "react";
import Chat from "../../components/message_page/chat";
import ChatText from "../../components/message_page/chat-text";
import Header from "../../components/search_page/header";

const MessagePage = () => {

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
            <ChatText />
            <Chat value={value} handleValue={handleValue} handleMessageSend={handleMessageSend}/>
        </div>
     );
}
 
export default MessagePage;