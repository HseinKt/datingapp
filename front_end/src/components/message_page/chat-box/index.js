const ChatBox = (props) => {
    const receiver_id = localStorage.getItem('user_id');
    return ( 
        <div >
            {props.sender_id != receiver_id && (
                <div className="chatBoxContainer">
                    <div className="message">
                        <ul className="listStyle">
                            <li className='name'> <span className='targetName'> { props.sender_name } </span> </li>
                            <li className="sendMessage">{props.message}</li>
                        </ul>
                    </div>
                </div>
            )}

            {props.sender_id == receiver_id && (
                <div className="chatBoxContainer">
                    <div className="message message-receiver">
                        <ul className="listStyle">
                            <li className='name'> <span className='targetName'> { props.sender_name } </span> </li>
                            <li className="sendMessage">{props.message}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default ChatBox;