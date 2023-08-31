import { useState } from "react";

const DnDImage = ({ setImagesToForm }) => {
  const [image, setImage] = useState("");

  const convertToBase64 = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log("result", reader.result);
      setImagesToForm("success");
      setImage(reader.result);
    };
    reader.onerror = (err) => console.log("Error ", err);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "120px",
        border: "1px dashed #000",
        backgroundColor: "#ccc",
      }}
    >
      <div>Upload image</div> <br />
      <input type="file" accept="image/*" onChange={convertToBase64} />
      {image !== "" && <img src={image} height={100} width={100} />}
    </div>
  );
};

export default DnDImage;
