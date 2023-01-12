import { useState } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';

export default function UploadTrack() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('track', selectedFile);
    
    const result = await axios.post(
      'http://localhost:3001/1/tracks',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  };

  return (
    <form
      encType="multipart/form-data"
      className="h-20"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center w-full mb-9 ">
        <label
          // htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-12 border-2 border-neutral-800 border-dashed rounded cursor-pointer bg-neutral-900"
        >
          <div className="flex items-center justify-center py-5">
            <FiUpload className="text-neutral-700" />
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".wav,.mp3"
            name="uploaded_track"
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value="Upload track"
            className="text-xs bg-transparent text-neutral-500 py-1 px-4 border border-neutral-700 rounded "
          />
        </label>
      </div>
    </form>
  );
}
