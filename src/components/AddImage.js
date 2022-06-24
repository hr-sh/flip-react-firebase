import React from "react";
import { useState } from "react";

export default function AddImage({ title, pic, setPic, setFileError }) {
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (e) => {
    setPic(null);
    let file = e.target.files[0];

    // if (!file) {
    //   setFileError("Please select a file");
    //   return;
    // }
    if (!file.type.includes("image")) {
      setFileError("file must be a image");
      setFileSelected(false);
      return;
    }
    if (file.size > 500000) {
      setFileError("Image file size must be less than 500kb");
      setFileSelected(false);
      return;
    }
    setFileSelected(true);
    setFileError(null);
    setPic(file);
    console.log("picture updated");
  };

  const handleRemove = () => {
    setFileSelected(false);
    setPic(null);
  };

  return (
    <div className="imagediv">
      <div className="view-image">
        {!pic && (
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flip-site-45ca9.appspot.com/o/profilepics%2Fdefault%2Fdownload.png?alt=media&token=1b869d8a-5361-4df7-a67e-326799e203f7"
            alt="user profile"
          />
        )}

        {pic && (
          <div className="img-hover" onClick={handleRemove}>
            <span>remove image</span>
          </div>
        )}
        {pic && fileSelected && (
          <img src={URL.createObjectURL(pic)} alt="user profile" />
        )}
        {pic && !fileSelected && <img src={pic} alt="user profile" />}
      </div>

      <label>
        <span>{pic ? "change image" : "upload image"}</span>
        <input type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
}
