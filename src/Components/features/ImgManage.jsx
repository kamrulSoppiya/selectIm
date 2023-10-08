import DropZone from "./DropZone";
import classes from '../../assets/css/module/mainDesign.module.scss';
import { useState } from "react";
import SortData from "./SortData";

// eslint-disable-next-line react/prop-types
const ImgManage = ({onImageUpload, imgFormat}) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [showMore, setShowMore] = useState();
    const [error, setError] = useState({status: false, msg: ''});
    const [searchInputs, setSearchInputs] = useState({ filterMinData: '',filterMaxData: '', searchItem: ''});
    const [filteredImages, setFilteredImages] = useState([]);
    const [sortData, setSortData] = useState();
    // Show Data
    function showMoreClick() {
        setShowMore(!showMore);
    }

    // get All Search Input Data
    const handleInputChange  = (event) => {
        const { name, value } = event.target;
        setSearchInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    // Function for base64 and Data onLoad   
    const dataOnLoad = (file) => {
        if (file && isSupportedImageFormat(file, imgFormat)) {
        const newFile = {
            baseData:'', 
            imgSize: 0, 
            imgName: ''
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            newFile.baseData = event.target.result;
            newFile.imgSize = file.size/(1024);
            newFile.imgName = file.name;
            setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, newFile]);
            onImageUpload(file, newFile.baseData);
        };
        reader.readAsDataURL(file);
        } else {
        setError(
            {
            status: true,
            msg: `Invalid image format. Please upload an Valid image.`
            });
        }
    }
    const isSupportedImageFormat = (file, imgFormat) => {
        // eslint-disable-next-line react/prop-types
        const conCatData = imgFormat.map(element => 'image/' + element);
        return conCatData.includes(file.type)
    };

    // min max
    const searchImages = () => {
        // eslint-disable-next-line react/prop-types
        const filtered = selectedFile.filter((image) => {
        const size = image.imgSize;
        console.log(size);
        return size >= searchInputs.filterMinData && size <= searchInputs.filterMaxData;
        });

        setFilteredImages(filtered);
    };

    return (
        <div className={classes.row}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h4>Select Image</h4>
                    <p>Close</p>
                </div>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarTopContent}>
                        <div className={classes.sidebarOption}>
                            <p>Store Library</p>
                            <p>Icon</p>
                        </div>
        
                        <div className={classes.sidebarOption}>
                            <p>Images</p>
                            <p>{selectedFile.length}</p>
                        </div>
        
                        <div className={classes.sidebarOption}>
                            <p>Selected</p>
                            <p>Icon</p>
                        </div>
                    </div>
                    <div className={classes.sidebarBottomContent}>
                        <div className={classes.sidebarOption}>
                            <p>Saved Views</p>
                            <p>Icon</p>
                        </div>
                        <div className= {classes.sidebarOption}>
                            <p>No saved views found</p>
                        </div>
                    </div>
                </div>
                <div className={classes.mainBody}>
                    <div className={classes.navFilter}>
                        <div className="searchBox">
                            <input type="text" name="searchItem" placeholder="Search files" value={searchInputs.searchItem} onChange={handleInputChange}/>
                        </div>
                        <div className={classes.filterOption}>
                            <button type="button" onClick={showMoreClick}>Filter</button>
                            <SortData />
                            <h5>View</h5>
                        </div>
                    </div>
                    {showMore && <>
                            <label style={{display:'flex', flexDirection:'column', width:'40%'}} htmlFor="">Min Size (MB)
                            <input type="number" name="filterMinData" value={searchInputs.filterMinData} onChange={handleInputChange} />
                            </label>
                            <label style={{display:'flex', flexDirection:'column', width:'40%'}} htmlFor="">Max Size (MB)
                                <input type="number" name="filterMaxData" value={searchInputs.filterMaxData} onChange={handleInputChange} />
                            </label>
                            <button onClick={searchImages}>Search</button>
                        </>
                    }
                    
                    <div className={classes.scrollBar}>
                        <DropZone dataOnLoad={dataOnLoad} imgFormat={imgFormat} setError={setError} error={error} />
                        {
                            searchInputs.searchItem.length > 0 ? (
                                selectedFile.filter((item) => item.imgName.includes(searchInputs.searchItem))
                                    .map((item, index) => (
                                        <div key={index} className={classes.images}>
                                            <div className={classes.imageBox} height="60px"  width="60px">
                                                <img src={item.baseData} alt="Uploaded" height="60px !important"  width="60px"/>
                                                <p style={{ fontSize: '10px', display: 'flex', textAlign: 'center' }}>
                                                {item.imgName}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )  : (
                                <div className={classes.images}>
                                    {selectedFile.map((selectFile, index) => (
                                    <div key={index} className={classes.imageBox} height="60px"  width="60px">
                                        <img src={selectFile.baseData} alt="Uploaded" height="60px !important"  width="60px" />
                                        <p style={{ fontSize: '10px', display: 'flex', textAlign: 'center' }}>
                                        {selectFile.imgName}
                                        </p>
                                    </div>
                                    ))}
                                </div>
                            )
                        }
                                
                        {filteredImages.map((image, index) => (
                            // console.log(image)
                            <img key={index} src={image.baseData} alt="" height="60px !important"  width="60px"/>
                        ))}
                        
                    </div>
                </div>
                <div className={classes.footer}>
                    <button type="button">Close</button>
                    <button type="button">Done</button>
                </div>
            </div>
        </div> 
    )
}

export default ImgManage;
