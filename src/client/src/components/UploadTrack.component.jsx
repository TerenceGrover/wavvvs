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
    const newTrack = await postTrack(selectedFile);
    if (newTrack instanceof Error) {
      // todo setup error handling here. Load new modal?
    }
    setCurrentUser((currentUser) => ({
      // this is only to trigger a re render
      ...currentUser,
      tracks: [...currentUser.tracks, newTrack],
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <form className="h-12 mb-10" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full mb-9 ">
        <label className="flex items-center justify-evenly w-full h-12 border-2 border-neutral-800 border-dashed rounded bg-neutral-900 hover:border-neutral-700 ease-in transition duration-100">
          <input
            type="file"
            className="hidden"
            accept=".wav,.mp3,.flac"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <>
              <button type="submit">
                <FiUpload className="self-center text-neutral-700 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer" />
              </button>
            </>
          )}
        </label>
      </div>
    </form>
  );
}
