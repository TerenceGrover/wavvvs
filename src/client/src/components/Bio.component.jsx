import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
const Bio = ({ bio }) => {
  const [isHovering, setIsHovering] = useState(true);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {};

  return (
    <section
      className="w-96"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {' '}
      <div className="static flex w-full">
        {isHovering ? (
          <TbDotsVertical
            className="relative text-neutral-300 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100"
            onClick={handleClick}
          />
        ) : (
          <div className="w-4 mr-4"></div>
        )}
        <p className="text-xs text-neutral-400 text-left w-full">{bio}</p>
      </div>
    </section>
  );
};

export default Bio;
