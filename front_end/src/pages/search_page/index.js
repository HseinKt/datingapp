import Header from "../../components/search_page/header";
import SearchInput from "../../components/search_page/search_input";
import { useState } from "react";
import Dropdown from "../../components/search_page/dropdown";
import Cards from "../../components/search_page/card";


const SearchPage = () => {
    const [value, setValue] = useState('');

    const handleChange = (e)=> {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return ( 
        <div>
            <Header />
            <div className="search-container">
                <div className="search-dropdown">
                    <Dropdown />
                </div>
                <div className="search">
                    <SearchInput value={value} handleChange={handleChange} handleSubmit={handleSubmit} />
                </div>
            </div>
            <div className="cards">
                <Cards />
                <Cards /><Cards />
            </div>
        </div>
     );
}
 
export default SearchPage;