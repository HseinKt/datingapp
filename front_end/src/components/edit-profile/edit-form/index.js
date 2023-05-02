const EditForm = (props) => {
    return ( 
        <input 
            type="text" 
            id={props.id}
            className="edit-input"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleValue} 
        />
     );
}
 
export default EditForm;