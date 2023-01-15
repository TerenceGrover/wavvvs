import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { TbDotsVertical } from 'react-icons/tb';

export default function MyDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-transparent py-2 text-sm font-medium text-neutral-300 hover:text-neutral-600">
          <TbDotsVertical className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" text-neutral-600 text-sm absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-neutral-400 rounded-md bg-neutral-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 p-3">
            <Menu.Item>
              {({ active }) => (
                <p className="cursor-pointer hover:underline">Edit</p>
              )}
            </Menu.Item>
          </div>
          <div className="py-2 p-3">
            <Menu.Item>
              {({ active }) => (
                <p className="cursor-pointer hover:underline">Delete</p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
