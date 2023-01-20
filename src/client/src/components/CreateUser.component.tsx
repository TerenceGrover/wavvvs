import React from "react";

export default function CreateUser () {

  const handleUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const profilePictureContainer = document.getElementById('profilePictureContainer');
            if (profilePictureContainer) {
              profilePictureContainer.style.backgroundImage = `url(${reader.result})`;
              profilePictureContainer.style.backgroundSize = 'cover';
              profilePictureContainer.style.backgroundPosition = 'center';
            }
          }
          reader.readAsDataURL(file);
      }
    }
    }
  }


  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className=" flex flex-row justify-center w-[60vw] h-[75vh] md:h-[50vh] bg-neutral-800 rounded-2xl drop-shadow-xl">
        <form className="flex flex-col md:flex-row justify-center items-center gap-x-[12vw]">
          <div className="flex flex-col justify-center items-center">
            <div id="profilePictureContainer" className=" w-48 h-48 bg-neutral-700 rounded-full ring-2 ring-neutral-600 ">
              
            </div>
            <label htmlFor='profilePicture' className="bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 rounded-md shadow-sm px-4 py-2 text-sm font-medium transition ease-in-out duration-150 inline-flex items-center justify-center border border-transparent mt-4">
              Upload
            </label>
            <input className="hidden" type="file" name="profilePicture" id="profilePicture" accept=".jpg,.jpeg,.heic,.png" onChange={(e) => handleUpload(e)} />
          </div>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="name" className="mb-2 text-md text-neutral-200">Name</label>
            <input type="text" name="name" id="name" className="bg-neutral-600 p-1 rounded hover:bg-neutral-500 mb-6" />
            <label htmlFor="bio" className="mb-2 text-md text-neutral-200">Bio</label>
            <input type="text" name="bio" id="bio" className="bg-neutral-600 p-1 rounded hover:bg-neutral-500 mb-6" />
          </div>
        </form>
      </div>
    </div>

  )
}