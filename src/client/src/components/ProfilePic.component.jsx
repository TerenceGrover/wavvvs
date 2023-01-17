import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';

const { REACT_APP_BACKEND_HOST } = process.env;
const serverUrl = REACT_APP_BACKEND_HOST;

const ProfilePic = ({ path }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, editing] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {};

  return (
    <div
      className="flex w-96 justify-center"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering ? (
        <TbDotsVertical
          className="relative text-neutral-300 right-16 backdrop:top-2 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100"
          onClick={handleClick}
        />
      ) : (
        <div className="w-4 mr-4"></div>
      )}
      <img
        className="relative right-5 w-60 h-60 rounded"
        src={`${serverUrl}/pics/${path}`}
        alt="profile-pic"
      />
    </div>
  );
};
export default ProfilePic;
