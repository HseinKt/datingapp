import Header from "../../components/search_page/header";
import Profile from "../../components/profile_page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [name, setName] = useState ("Hsein Kteish ");
    const [age, setAge] = useState ("20 ");
    const [gender, setGender] = useState ("man ");
    const [about, setAbout] = useState ("Travel, surprises, music, dancing, sports, books, last minute plans, open mind, photography, museum, craziness, spontaneity, going out (but also staying in), sharing, simplicity, respect, flip flops (yes, the sandals), down to earth (however fantasy is also very important), people, casual, word, news, work, sense of humor about yourself, awareness. ");
    const [address, setAddress] = useState ("Hamra ");
    const [city, setCity] = useState ("Beirut ");
    const [state, setState] = useState ("Lebanon ");


    const navigate  = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message")
    }

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
                handleSubmit={handleSubmit}
            />
        </div>
     );
}
 
export default ProfilePage;