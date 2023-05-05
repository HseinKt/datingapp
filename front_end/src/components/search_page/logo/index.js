import logo from "../../images/logo2.png"

const Logo = (props) => {
    return ( 
        <div>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={props.handleChange}/>
            </div> 
        </div>
     );
}
 
export default Logo;