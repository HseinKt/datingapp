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
    const [token, setToken] = useState("")

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            try {
                axios.get("http://localhost:8000/api/v0.0.1/get_profile", {
                    headers : {
                        'Authorization' : 'Bearer' + myToken,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setName(response.data.name);
                    setAge(response.data.age);
                    setGender(response.data.gender);
                    setAbout(response.data.description);
                    setAddress(response.data.address);
                    setCity(response.data.city);
                    setState(response.data.state);
                })
                .catch(err => {
                    if(err.response.status === 404) {
                        console.log("user does not have a profile yet.")
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
            />
        </div>
     );
}
 
export default ProfilePage;