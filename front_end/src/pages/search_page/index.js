import Header from "../../components/search_page/header";
import SearchInput from "../../components/search_page/search_input";
import { useState } from "react";


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
            Search page
        </div>
     );
}
 
export default SearchPage;