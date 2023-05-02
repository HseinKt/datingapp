import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadImage from "./upload-image";

const EditProfile = () => {
    const navigate  = useNavigate();
    const [name, setName] = useState ("Hsein Kteish ");
    const [age, setAge] = useState ("20 ");
    const [gender, setGender] = useState ("man ");
    const [about, setAbout] = useState ("Travel, surprises, music, dancing, sports, books, last minute plans, open mind, photography, museum, craziness, spontaneity, going out (but also staying in), sharing, simplicity, respect, flip flops (yes, the sandals), down to earth (however fantasy is also very important), people, casual, word, news, work, sense of humor about yourself, awareness. ");
    const [address, setAddress] = useState ("Hamra ");
    const [city, setCity] = useState ("Beirut ");
    const [state, setState] = useState ("Lebanon ");
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message")
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    console.log(name);
    
    return ( 
        <div className="edit-container">
            
            <UploadImage previewImage={previewImage}  handleImageChange={handleImageChange}/>

            <div className="edit-box-container">
                <h3>Edit Your Profile</h3>
                <form  className="edit-form-text">
                    <div className="edit-input-container">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="edit-input"
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div> 
                    <div className="edit-input-container">
                        <label htmlFor="age">Age</label>
                        <input 
                            type="text" 
                            id="age" 
                            className="edit-input"
                            placeholder="Age" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)} 
                        />                    
                    </div> 
                    
                    <button type="submit" className="" id="btn-container" >Save</button>
                    {/* btn-container edit-input-container */}
                </form>
            </div>
        </div>
     );
}
 
export default EditProfile;