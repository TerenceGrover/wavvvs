import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

const placeholderImgUrl =
  'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2563.jpg?w=2000';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <header className="h-14  text-white bg-neutral-800">
        <div className="p-3.5 flex justify-between">
          <AiOutlineMenu className="text-neutral-200 h-7 w-7" />
          <div className="flex w-16 justify-between items-center">
            <AiOutlineSearch className="text-neutral-200 h-7 w-7" />
            <img
              className="w-6 h-6 rounded-full"
              src={placeholderImgUrl}
              alt="profile.pic"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
