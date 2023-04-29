const Dropdown = () => {
    return ( 
        <div className="dropdown">
            <button className="dropbtn">Search by ...</button>
            <div className="dropdown-content">
                <p id="name">Name</p>
                <p id="age">Age</p>
                <p id="location">Location</p>
            </div>
        </div>
     );
}
 
export default Dropdown;