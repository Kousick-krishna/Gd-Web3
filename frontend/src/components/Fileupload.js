import React, { useState } from 'react';
import axios from 'axios';

const Fileupload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handle = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "9863a4592364d28c15df",
            pinata_secret_api_key: "6e6013c8f8b861a5ee714ddba472605974e6b8a1549d7c2c947c9ab88467295b",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        if (contract) {
          await contract.add(account, ImgHash);
          alert("Successfully Image Uploaded");
        } else {
          console.error("Contract is not loaded.");
          alert("Contract is not loaded.");
        }

        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(error.message);
      }
    }
  };

  const retrieve = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className='mt-10'>
      <form onSubmit={handle}>
        <label htmlFor='file-upload'></label>
        <input type='file' onChange={retrieve}/>
        <button type="submit" className='border border-black rounded-md p-1 bg-gray-100 hover:bg-gray-200'>
          Upload image
        </button>
      </form>
    </div>
  );
};

export default Fileupload;
