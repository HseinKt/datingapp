const ChatBox = (props) => {
    return ( 
        <div className="chatBoxContainer">
            <div className="message">
                <ul className="listStyle">
                    <li className='name'> <span className='targetName'> { props.sender_name } </span> </li>
                    <li className="sendMessage">{props.message}</li>
                </ul>
            </div>
        </div>
     );
}
 
export default ChatBox;