import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { postTrack } from '../apiService/api-service.js';

export default function UploadTrack({ setUserTracksFileNames }) {
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrack = await postTrack(selectedFile);
    setUserTracksFileNames((tracks) => [...tracks, newTrack]);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <form className="h-20" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full mb-9 ">
        <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-neutral-800 border-dashed rounded cursor-pointer bg-neutral-900">
          <div className="flex items-center justify-center py-5">
            <FiUpload className="text-neutral-700" />
          </div>
          <input
            type="file"
            className="hidden"
            accept=".wav,.mp3,.flac"
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value="Upload track"
            className="cursor-pointer text-xs bg-transparent text-neutral-500 py-1 px-4 border border-neutral-700 rounded "
          />
        </label>
      </div>
    </form>
  );
}
