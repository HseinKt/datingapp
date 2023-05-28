const UploadImage = (props) => {
    return ( 
        <div className="edit-image">
            <label htmlFor="image" className="edit-label">
                <div className="image-preview-container">
                    {props.previewImage && (
                        <img src={props.previewImage} alt="previewImage" className="image-preview" />
                    )}
                    {!props.previewImage && <div className="image-placeholder" />}
                </div>
            </label>
            <input id="image" type="file" accept="images/*" onChange={props.handleImageChange} hidden/>
        </div>
     );
}
 
export default UploadImage;