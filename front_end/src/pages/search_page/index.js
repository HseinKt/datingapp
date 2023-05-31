import Header from "../../components/search_page/header";
import SearchInput from "../../components/search_page/search_input";
import { useEffect, useState } from "react";
import Dropdown from "../../components/search_page/dropdown";
import Cards from "../../components/search_page/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const [value, setValue] = useState('');
    const [token, setToken] = useState("");
    const [results, setResults] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            try {
                axios.get("http://localhost:8000/api/v0.0.1/get_all_users", {
                    headers : {
                        'Authorization' : "Bearer " + myToken,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    setResults(response.data.users);

                    const images = response.data.users.map(user => {
                        const newImageURL = `http://localhost:8000/storage/images/${user.img}`;
                        return newImageURL;
                    });
                    setImages(images);
                })
                .catch (error => {
                    console.log("axios error: " + error);
                })
            } catch (error) {
                console.log("Catcher error: " + error);
            }
        }
    }, []);

    const handleOptionClick = (optionId) => {
        setSelectedOption(optionId);
    }

    const handleChange = (e)=> {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedOption === 'age') {
            const formData = new FormData();
            formData.append('age', value);
            try {
                axios.post('http://localhost:8000/api/v0.0.1/get_user_by_age', formData, {
                    headers: {
                        'Authorization' : 'Bearer' + token,
                    }
                })
                .then (response => {
                    setResults(response.data.users)

                    setImages([])
                    const images = response.data.users.map(user => {
                        const newImageURL = `http://localhost:8000/storage/images/${user.img}`;
                        return newImageURL;
                    });
                    setImages(images);
                    setValue("");
                })
                .catch (err => {
                    console.log('Axios Error: ' + err.message);
                })
            } catch (error) {
                console.log('Catch error: ' + error);
            }
        }
        else if(selectedOption === 'location') {
            const formData = new FormData();
            formData.append('city', value);
            try {
                axios.post('http://localhost:8000/api/v0.0.1/get_user_by_location', formData, {
                    headers: {
                        'Authorization' : 'Bearer' + token,
                    }
                })
                .then (response => {
                    setResults(response.data.users)

                    setImages([])
                    const images = response.data.users.map(user => {
                        const newImageURL = `http://localhost:8000/storage/images/${user.img}`;
                        return newImageURL;
                    });
                    setImages(images);
                    setValue("");

                })
                .catch (err => {
                    console.log('Axios Error: ' + err.message);
                })
            } catch (error) {
                console.log('Catch error: ' + error);
            }
        }
        else {
            const formData = new FormData();
            formData.append('name', value);
            try {
                axios.post('http://localhost:8000/api/v0.0.1/get_user_by_name', formData, {
                    headers: {
                        'Authorization' : 'Bearer' + token,
                    }
                })
                .then (response => {
                    setResults(response.data.users)

                    setImages([])
                    const images = response.data.users.map(user => {
                        const newImageURL = `http://localhost:8000/storage/images/${user.img}`;
                        return newImageURL;
                    });
                    setImages(images);
                    setValue("");
                    
                })
                .catch (err => {
                    console.log('Axios Error: ' + err.message);
                })
            } catch (error) {
                console.log('Catch error: ' + error);
            }
        }
    }

    const handleEdit = () => {
        navigate("/edit")
    }

    const handleProfile = () => {
        localStorage.setItem('user_id', 0);
        navigate("/profile");
    }
    return ( 
        <div>
            <Header />
            <div className="search-container">
                <div className="search-dropdown">
                    <Dropdown selectedOption={selectedOption} handleOptionClick={handleOptionClick}/>
                </div>
                <div className="search">
                    <SearchInput value={value} searchBy={selectedOption} handleChange={handleChange} handleSubmit={handleSubmit} />
                </div>
                <div className="search-edit">
                    <button className="edit sendbtn btn message-btn " onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="edit sendbtn btn message-btn profile-btn" onClick={handleProfile}>
                        Profile
                    </button>
                </div>
            </div>
            <div className="cards">
                {results.map((user, index) => (
                    <div>
                        <Cards data={user} image={images[index]}/>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchPage;