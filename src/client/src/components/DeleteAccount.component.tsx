import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deleteAccount } from '../apiService/api-service';


export default function DeleteAccount(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const cancelButtonRef = React.useRef(null);
  const [typedPassword, setTypedPassword] = React.useState('');
  const [wrong, setwrong] = React.useState(false);

  React.useEffect(() => {
    if (!props.open) {
      setTypedPassword('');
      setwrong(false);
    }
  }, [props.open]);

  const checkIfPasswordIsCorrect = (password: string) => {
    deleteAccount(password).then(
      (response) => {
        if(response === 401) {
          setTypedPassword('');
          setwrong(true);
        }
        else {
          localStorage.removeItem('token');
          props.setOpen(false);
          window.location.reload();
        }
      }
    )
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded bg-neutral-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-neutral-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col items-center">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-900">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base leading-6 text-neutral-100"
                      >
                        DELETE ACCOUNT
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-xs font-normal text-neutral-400">
                          Are you sure you want to delete your account? All of
                          your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="password" className="mt-3 text-white text-xs">Input your password to continue</label>
                    <input
                      type="text"
                      className={` ${wrong && 'border-red-600 border-2'} mt-2 transition ease-in duration-200 w-[50%] rounded-lg bg-neutral-800 py-2 px-1 text-xs text-white hover:bg-neutral-700`}
                      placeholder="Password"
                      onChange={(e) => setTypedPassword(e.target.value)}
                      value={typedPassword}
                    />
                </div>
                <div className="bg-neutral-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="transition ease-in duration-200 w-20 rounded-lg bg-red-800 py-2 px-1 mt-2 text-xs text-white hover:bg-red-700 ml-3 disabled:opacity-30"
                    onClick={() => checkIfPasswordIsCorrect(typedPassword)}
                    disabled={typedPassword.length < 8}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="transition ease-in duration-200 w-20 rounded-lg bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
