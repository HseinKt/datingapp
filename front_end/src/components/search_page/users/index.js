import card from "../../images/card.jpg"

const Users = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return ( 
        <div className="user-container">
            <div className="card-container">
                <div className="image-container">
                    <img src={card} alt="card Image" />
                </div>
                <div className="details">
                    <h4 className="name">
                        <b>Name</b>
                    </h4>
                    <h4 className="age">
                        <p>Age</p>
                    </h4>
                    <h5 className="location">
                        <i>Location</i>
                    </h5>
                </div>
                <div className="card-buttons">
                    <div className="love-block">
                        <button className="love">love</button>
                        <button className="block">block</button>
                    </div>
                    <button className="messagebtn" onClick={handleSubmit}>
                        send a message
                    </button>
                </div> 
            </div>
        </div>
     );
}
 
export default Users;