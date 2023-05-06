const Dropdown = (props) => {
    return ( 
        <div className="dropdown">
            <button className="dropbtn" >Search by ...</button>
            <div className="dropdown-content">
                <p id="name" onClick={() => props.handleOptionClick('name')}>Name</p>
                <p id="age" onClick={() => props.handleOptionClick('age')}>Age</p>
                <p id="location" onClick={() =>props.handleOptionClick('location')}>Location</p>
            </div>
            {/* {props.selectedOption && <p> Selected: {props.selectedOption}</p>} */}
        </div>
     );
}
 
export default Dropdown;