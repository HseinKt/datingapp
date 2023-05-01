import { useNavigate } from "react-router-dom"
import card from "../../images/card.jpg"
import logo from "../../images/logo2.png"

const Cards = () => {
    const navigate  = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message")
    }
    return ( 
        <div className="user-container">
            <div className="card-container">
                <div className="image-container">
                    <img src={card} alt="card" className="card-image" onClick={()=>navigate("/profile")}/>
                </div>
                <div className="details">
                    <h4 className="name">
                        <b>Name</b>
                    </h4>
                </div>
                <div className="card-buttons">
                    <div className="love-block">
                        <img src={logo} alt="love" className="love-card" />
                        <button className="block btn">
                            block
                        </button>
                    </div>
                    <div className="messagebtn">
                        <button className="sendbtn btn" onClick={handleSubmit}>
                            send a message
                        </button>
                    </div> 
                </div>
            </div>
        </div>
     );
}
 
export default Cards;