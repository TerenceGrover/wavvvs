import { FiUpload } from 'react-icons/fi';

export default function UploadTrack() {
  return (
    <div className="flex items-center justify-center w-full mb-9 ">
      <label
        htmlFor="dropzone-file"
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
        />
      </label>
    </div>
  );
}
