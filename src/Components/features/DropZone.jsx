import { useEffect, useState } from "react";
import classes from '../../assets/css/module/fileUp.module.scss';
// eslint-disable-next-line react/prop-types
const DropZone = ({dataOnLoad, imgFormat, setError, error}) => {
    const [isDragging, setIsDragging] = useState(false);

      // Drag And Drop
    const handleDragEnter = (event) => {
        event.preventDefault()
        setIsDragging(true);
    };

    const handleDrop = (event) => {
        setIsDragging(false);
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        dataOnLoad(file);
      };
    
      //  Image Uploader
      const handleImageUploader = (event) => {
        const file = event.target.files[0];
        dataOnLoad(file);
      };

      useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (!error.status) return;
        const timer = setTimeout(() => {
          setError({ status: false })
        }, 4000)
    
        return () => clearTimeout(timer)

      }, [error.status])
    return (
        <div className={classes.row}>
            <div className={classes.container}>
                {error.status && <div className={classes.containerUnvalid}>
                    <div className={classes.content}>
                    <p>{error.msg}</p>
                    </div>
                </div>}
                {!error.status && <div className={`{drop-zone ${isDragging ? 'dragging' : ''}} ${classes.containerItem}`} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={event => event.preventDefault()}>
                    <label htmlFor="file-input" className="custom-file-label">
                    <h6 className={classes.btnDrag}>Add images</h6>
                    </label>
                    <input type="file" accept={imgFormat} onChange={handleImageUploader} style={{ display: 'none' }} id="file-input" />
                    <p>or darg and drop</p>
                </div>}
            </div>
        </div>
    );
}

export default DropZone;
