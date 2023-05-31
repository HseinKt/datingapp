import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadImage from "./upload-image";
import EditForm from "./edit-form";
import axios from "axios";

const EditProfile = () => {
    const navigate  = useNavigate();
    const [token, setToken] = useState("");
    const [name, setName] = useState ("");
    const [age, setAge] = useState ("");
    const [gender, setGender] = useState ("");
    const [about, setAbout] = useState ("");
    const [address, setAddress] = useState ("");
    const [city, setCity] = useState ("");
    const [state, setState] = useState ("");
    const [image, setImage] = useState("");
    const [uploadImage, setUploadImage] = useState("");

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            const user_id = 0;
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/get_profile/${user_id}`, {
                    headers : {
                        'Authorization' : 'Bearer ' + myToken,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    setName(response.data.name);
                    setAge(response.data.age);
                    setGender(response.data.gender);
                    setAbout(response.data.description);
                    setAddress(response.data.address);
                    setCity(response.data.city);
                    setState(response.data.state);
                    const imageFileName = response.data.image;
                    if(imageFileName) {
                        const imageURL = `http://localhost:8000/storage/images/${imageFileName}`;
                        setUploadImage(imageURL);
                    }
                })
                .catch(err => {
                    if(err.response.status === 404) {
                        console.log("user does not have a profile yet.")
                    } else {
                        console.log("axios error (get Profile):" + err.message);
                    }
                })
            } catch (error) {
                console.log("Carch Error: " + error);
            }
        }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();

        reader.onload = (e) => {
            setUploadImage(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name==="" || age==="" || gender==="" ||about==="" || address==="" || city==="" || state==="") {
            alert('please make sure all the data are filled IN');
        }
        else {
            const formData = new FormData();
            formData.append('name',name);
            formData.append('age',age);
            formData.append('gender',gender);
            formData.append('about',about);
            formData.append('address',address);
            formData.append('city',city);
            formData.append('state',state);

            console.log(formData); 
            try {
                axios.post("http://localhost:8000/api/v0.0.1/edit_profile", formData, {
                    headers : {
                        'Authorization' : 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {

                    if(image) 
                    {
                        const imageData = new FormData();
                        imageData.append('img',image);
                        console.log(image);
                        try {
                            axios.post("http://localhost:8000/api/v0.0.1/add_image", imageData, {
                                headers : {
                                    'Authorization' : 'Bearer ' + token,
                                    'Content-Type': 'multipart/form-data',
                                    'Access-Control-Allow-Origin': '*'
                                }
                            })
                            .then(response => {
                                navigate("/profile");
                            })
                            .catch(err => {
                                console.log("AXIOS Image error: " + err.message);
                            })
                        } catch (error) {
                            console.log("Carch Image Error: " + error);
                        }
                    } else {
                        navigate("/profile");
                    }
                })
                .catch(err => {
                    console.log("AXIOS error: " + err.message);
                })
            } catch (error) {
                console.log("Carch Error: " + error);
            }
        }
    }
        
    return ( 
        <div className="edit-container">

            <UploadImage previewImage={uploadImage}  handleImageChange={handleImageChange}/>

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