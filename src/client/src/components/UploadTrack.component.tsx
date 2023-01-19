import React from 'react';
import { CurrentUser } from '../Interfaces';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { postTrack } from '../apiService/api-service';

export default function UploadTrack(props : { setCurrentUser : React.Dispatch<React.SetStateAction<CurrentUser | undefined>> }) {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thereIsAnError, setError] = useState<Boolean>(false);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if(selectedFile) {
        await postTrack(selectedFile, props.setCurrentUser);
      }
    } catch (error) {
      console.log({ error });
      setError(true);
    }
  };

  const handleFileChange = (e : React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files?.[0]) {
      setSelectedFile(target.files[0]);
    };
  };
    
  return (
    <form className="h-12 mb-10" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full mb-9 ">
        <label className="flex items-center justify-evenly w-full h-12 border-2 border-neutral-800 border-dashed rounded bg-neutral-900 hover:border-neutral-700 ease-in transition duration-100">
          <input
            type="file"
            className="hidden"
            accept=".wav,.mp3,.flac,.m4a"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <>
              <button type="submit">
                <FiUpload className="self-center text-neutral-700 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer" />
              </button>
            </>
          )}
          {thereIsAnError && (
            <p className="text-neutral-500 text-xs italic">
              {'The file size must be < 100MB, or try again later'}
            </p>
          )}
        </label>
      </div>
    </form>
  );
}