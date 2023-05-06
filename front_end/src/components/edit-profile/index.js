import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadImage from "./upload-image";
import EditForm from "./edit-form";
import axios from "axios";

const EditProfile = () => {
    const navigate  = useNavigate();
    const [token, setToken] = useState("");
    const [name, setName] = useState ("Hsein Kteish ");
    const [age, setAge] = useState ("20 ");
    const [gender, setGender] = useState ("man ");
    const [about, setAbout] = useState ("Travel, surprises, music, dancing, sports, books, last minute plans, open mind, photography, museum, craziness, spontaneity, going out (but also staying in), sharing, simplicity, respect, flip flops (yes, the sandals), down to earth (however fantasy is also very important), people, casual, word, news, work, sense of humor about yourself, awareness. ");
    const [address, setAddress] = useState ("Hamra ");
    const [city, setCity] = useState ("Beirut ");
    const [state, setState] = useState ("Lebanon ");
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    
    // console.log(name);
    
    return ( 
        <div className="edit-container">

            <UploadImage previewImage={previewImage}  handleImageChange={handleImageChange}/>

            <div className="edit-box-container">
                <h3>Edit Your Profile</h3>
                <form onSubmit={handleSubmit} className="edit-form-text" >
                    <div className="edit-input-container">
                        <label htmlFor="name">Name</label>
                        <EditForm value={name} id="name" placeholder={"Name"} handleValue={(e) => setName(e.target.value)}/>
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="age">Age</label>
                        <EditForm value={age} id="age" placeholder={"Age"} handleValue={(e) => setAge(e.target.value)}/> 
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="gender">Gender</label>
                        <EditForm value={gender} id="gender" placeholder={"Gender"} handleValue={(e) => setGender(e.target.value)}/> 
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="address">Address</label>
                        <EditForm value={address} id="address" placeholder={"Address"} handleValue={(e) => setAddress(e.target.value)}/> 
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="city">City</label>
                        <EditForm value={city} id="city" placeholder={"City"} handleValue={(e) => setCity(e.target.value)}/> 
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="state">State</label>
                        <EditForm value={state} id="state" placeholder={"State"} handleValue={(e) => setState(e.target.value)}/> 
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="about">About</label>
                        <textarea 
                            type="text" 
                            id="about" 
                            className="textarea"
                            placeholder="about" 
                            value={about}
                            onChange={(e) => setAbout(e.target.value)} 
                        />
                    </div> 
                    <button type="submit" className="btn edit-btn" id="btn-container" >Save</button>
                </form>
            </div>
        </div>
     );
}
 
export default EditProfile;