import { useEffect, useRef, useState } from "react";
import classes from "./DragAndDropImage.module.css";

const DragAndDropImage = ({ setImagesToForm, className, type = "", name }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (type !== "registration") {
      setImagesToForm(images);
    } else {
      setImagesToForm(images[0]);
    }
  }, [images]);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      newImages.push(files[i]);
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const deleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      newImages.push(files[i]);
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <div className={`${classes.card} ${className}`}>
      <div
        className={classes["drag-area"]}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className={classes.select}>Drop images here</span>
        ) : (
          <>Drag & Drop images here or &darr;</>
        )}

        {type !== "registration" && (
          <input
            name={name}
            type="file"
            accept="image/*"
            className={classes.file}
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        )}

        {type === "registration" && (
          <input
            name={name}
            type="file"
            accept="image/*"
            className={classes.file}
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        )}
      </div>

      <div className={classes.container}>
        {images &&
          images.map((image, index) => {
            return (
              <div className={classes.image} key={index}>
                <span className="delete" onClick={() => deleteImage(index)}>
                  &times;
                </span>
                <img src={URL.createObjectURL(image)} alt={image.name} />
              </div>
            );
          })}
      </div>
      <button type="button" onClick={selectFiles} className={classes.select}>
        Select photos
      </button>
    </div>
  );
};

export default DragAndDropImage;
