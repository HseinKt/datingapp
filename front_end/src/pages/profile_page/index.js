import Header from "../../components/search_page/header";
import Profile from "../../components/profile_page";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const navigate  = useNavigate();
    const [name, setName] = useState ("");
    const [age, setAge] = useState ("");
    const [gender, setGender] = useState ("");
    const [about, setAbout] = useState ("");
    const [address, setAddress] = useState ("");
    const [city, setCity] = useState ("");
    const [state, setState] = useState ("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            const user_id = localStorage.getItem('user_id');
            const user_name = localStorage.getItem('user_name');
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/get_profile/${user_id}`, {
                    headers : {
                        'Authorization' : 'Bearer' + myToken,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    // console.log(response.data);
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
                        setImage(imageURL);
                    }
                })
                .catch(err => {
                    if(err.response.status === 404) {
                        console.log("user does not have a profile yet.")
                        setName(user_name);
                    } else {
                        console.log("axios error:" + err.message);
                    }
                })
            } catch (error) {
                console.log("Carch Error: " + error);
            }
        }
    }, [])

    return ( 
        <div>
            <Header />
            <Profile 
                name={name} 
                age={age} 
                gender={gender} 
                about={about} 
                address={address}
                city={city}
                state={state}
                image={image} 
            />
        </div>
     );
}
 
export default ProfilePage;