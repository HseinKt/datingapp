import Header from "../../components/search_page/header";
import SearchInput from "../../components/search_page/search_input";
import { useState } from "react";
import Dropdown from "../../components/search_page/dropdown";


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
            <SearchInput value={value} handleChange={handleChange} handleSubmit={handleSubmit}/>
            <Dropdown />
            Search page iiiiiiiiiiiiiiiiiiiiiiiiiiii
        </div>
     );
}
 
export default SearchPage;