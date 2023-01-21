import React from 'react';
import { updateUser } from '../apiService/api-service';

export default function CreateUser(props : {email : string}) {

  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [profile_pic_path, setProfile_pic_path] = React.useState('');

  const uploadProfilePic = async (file : File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'frameit');
    fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/image/upload', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json())
      .then((data) => {
        setProfile_pic_path(data.url);
      })
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const profilePictureContainer = document.getElementById(
              'profilePictureContainer'
            );
            if (profilePictureContainer) {
              profilePictureContainer.style.backgroundImage = `url(${reader.result})`;
              profilePictureContainer.style.backgroundSize = 'cover';
              profilePictureContainer.style.backgroundPosition = 'center';
            }
          };
          reader.readAsDataURL(file);
          uploadProfilePic(file);
          //upload file to cloudinary
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(bio, name, profile_pic_path)
    if (profile_pic_path) {
      updateUser({ name, email : props.email, bio, profile_pic_path });
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className=" flex flex-row justify-center max-w-screen-xl w-[60vw] h-[75vh] md:h-[55vh] bg-neutral-800 rounded-2xl drop-shadow-xl">
        <form className="flex flex-col justify-center" onSubmit={(e) => handleSubmit(e)}>
          <div
            id="filed-containers"
            className="flex flex-col md:flex-row gap-x-[12vw]"
          >
            <div className="flex flex-col justify-center items-center">
              <div
                id="profilePictureContainer"
                className=" w-48 h-48 bg-neutral-700 rounded-full ring-2 ring-neutral-600 "
              ></div>
              <label
                htmlFor="profilePicture"
                className="bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 rounded-md shadow-sm px-4 py-2 text-sm font-medium transition ease-in-out duration-150 inline-flex items-center justify-center border border-transparent mt-4"
              >
                Upload
              </label>
              <input
                className="hidden"
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept=".jpg,.jpeg,.heic,.png"
                onChange={(e) => handleUpload(e)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <label htmlFor="name" className="mb-2 text-md text-neutral-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="What's your name..."
                className="text-neutral-200 bg-neutral-600 p-1 rounded hover:bg-neutral-500 mb-6"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="bio" className="mb-2 text-md text-neutral-200">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                style={{ resize: 'none' }}
                id="bio"
                placeholder='Tell us about yourself...'
                className="text-neutral-200 bg-neutral-600 p-1 rounded hover:bg-neutral-500 mb-6"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 rounded-md shadow-sm px-4 py-2 text-sm font-medium transition ease-in-out duration-150 inline-flex items-center justify-center border border-transparent mt-8"
          >
            ADD INFO
          </button>
        </form>
      </div>
    </div>
  );
}
