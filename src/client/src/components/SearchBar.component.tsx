import React from 'react';

export default function SearchBar(props: { setSearch: (arg: boolean) => void }) {
  const { setSearch } = props;

  return (
    <input
    autoFocus
    className=" focus:outline-neutral-200 pr-3 pl-3 self-center justify-self-center w-[60%] rounded-xl h-[100%] bg-neutral-600"
    onBlur={() => {
      setSearch(false);
    }}
    ></input>
  )
};