import React from 'react';
import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';

const ProfilePic = (props : { path : string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="flex w-96 justify-center"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {// make the TbDotsVertical a label for a type file to upload a new profile pic
      }
      {isHovering && !editing ? (
        <>
        <input
          type="file"
          id="file"
          className="hidden"
          accept='.jpg, .jpeg, .png, .heic'
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (!target.files) return;
            const file = target.files[0];
            console.log(file);
          }}
          />
        <label
          htmlFor="file"
          >
        <TbDotsVertical
          className="relative text-neutral-300 right-16 backdrop:top-2 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100"
          onClick={() => setEditing(true)}
          />
        </label>
          </>
      ) : (
        <div className="w-4 mr-4"></div>
      )}
      <img
        className="relative right-5 w-60 h-60 rounded-full object-cover"
        src={props.path}
        alt="profile-pic"
      />
    </div>
  );
};
export default ProfilePic;
