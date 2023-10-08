import ImgManage from "./Components/features/ImgManage"

function App() {
    const handelImageUploada =(file, base64Image)=>{
      // console.log(`getFile - `,file.name);
      // console.log(`base64ImageUrl - `,base64Image);
    }

    const imgFormat = ["jpg", "jpeg", "png" ];
    return(
        <div className="">
          <ImgManage onImageUpload={handelImageUploada} imgFormat={imgFormat} />
        </div>
    )
}

export default App
