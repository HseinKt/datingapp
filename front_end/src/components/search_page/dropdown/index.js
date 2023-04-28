const Dropdown = () => {
    return ( 
        <div className="dropDown">
            <button className="dropbtn">Search by ...</button>
            <div className="dropDown-content">
                <p id="name">Name</p>
                <p id="age">Age</p>
                <p id="location">Location</p>
            </div>
        </div>
     );
}
 
export default Dropdown;