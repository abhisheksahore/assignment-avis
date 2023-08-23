import React, { useEffect, useState } from 'react'
import { uploadImage } from '../services/httpService';

const UploadScreen = () => {
    const [files, setFiles] = useState([]);

    const handleFiles = (event) => {
        const filesToSend = event.target.files;
        for(let i = 0; i < filesToSend.length; i++) {
            // creating url from file
            const url = URL.createObjectURL(filesToSend[i]);

            const con = document.getElementById('image-container');
            // creating a new image element and setting the source to url that we created earlier.
            const img = document.createElement('img');
            img.setAttribute('src', url);
            img.setAttribute('width', "300px");
            con.append(img);

            setFiles((prev) => [...prev, filesToSend[i]]);
        }
    }

    const onFileUpload = () => {
        // creating formData
        const formData = new FormData();
        // appending data in formdata
        files.forEach(e => {   
            formData.append(e.name, e);
        })
        // making post request to api along with body.
        uploadImage('http://localhost:3002/upload', formData).then(result => {

            // creating image element and appending it in dom.
            const con = document.getElementById('merged-image-container');
            const img = document.createElement('img');
            img.setAttribute('src', result.data);
            img.setAttribute('width', "300px");
            con.append(img);
        })
    };

  return (
    <div className='container'>
        <div id={"image-container"}></div>
        <div id={"merged-image-container"}></div>
        <input type="file" multiple="multiple" name="images" onChange={handleFiles}/>

        <button className='button' onClick={onFileUpload}>
            upload images
        </button>
    </div>
  )
}

export default UploadScreen