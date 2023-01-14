import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { postTrack } from '../apiService/api-service.js';

export default function UploadTrack({
  setUserTracksFileNames,
  setCurrentUser,
}) {
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTrack(selectedFile);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <form className="h-12 mb-10" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full mb-9 ">
        <label className="flex items-center justify-evenly w-full h-12 border-2 border-neutral-800 border-dashed rounded bg-neutral-900 hover:border-neutral-700 ease-in transition duration-100">
          <FiUpload className="self-center text-neutral-700 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer" />
          <input
            type="file"
            className="hidden"
            accept=".wav,.mp3,.flac"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <input
              type="submit"
              value="Upload track"
              className="cursor-pointer text-xs bg-transparent text-neutral-500 mt-1 py-1 px-4 border border-neutral-700 rounded hover:text-neutral-400 ease-in transition duration-100"
            />
          )}
        </label>
      </div>
    </form>
  );
}
