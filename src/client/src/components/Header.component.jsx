import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  return (
    <>
      <header className="text-white bg-neutral-800">
        <div className="p-2 flex justify-between">
          <AiOutlineMenu className="text-neutral-200 h-7 w-7" />
          <div>
            <AiOutlineSearch className="text-neutral-200 h-7 w-7" />
          </div>
        </div>
      </header>
    </>
  );
}
