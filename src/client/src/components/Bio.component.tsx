import React from 'react';
import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';

const Bio = (props : { bio : string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [editing, setediting] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    setediting((e) => !e);
  };

  return (
    <section
      className="w-96"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="static flex w-full">
        {isHovering ? (
          <TbDotsVertical
            id='edit'
            className="relative text-neutral-300 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100"
            onClick={handleClick}
          />
        ) : (
          <div className="w-4 mr-4"></div>
        )}
        <p contentEditable={editing} className="text-xs text-neutral-400 text-left w-full">{props.bio}</p>
      </div>
    </section>
  );
};

export default Bio;
