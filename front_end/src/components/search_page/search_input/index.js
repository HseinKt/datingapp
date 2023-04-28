
const SearchInput = (props) => {

    return ( 
        <div>
            <form onSubmit={props.handleSubmit} className="searchBar">
                <input 
                    type="text"
                    className="searchInput" 
                    placeholder="Search here ..."
                    value={props.value}
                    onChange={props.handleChange}
                />
                <input type="submit" hidden/>
            </form>
        </div>
     );
}
 
export default SearchInput;