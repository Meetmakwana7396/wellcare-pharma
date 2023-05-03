import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ show, children, title }) => {
    let [isOpen, setIsOpen] = useState(show);
    console.log(show ,isOpen, "show in modal");

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {/* {children} */}
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Facilis quibusdam magni debitis laboriosam cum nostrum nobis
                    alias quia, vero sequi iste exercitationem at enim quam
                    provident, eum impedit quidem consectetur maiores sint
                    temporibus eaque culpa. Accusamus perferendis natus
                    doloribus temporibus rem reprehenderit, beatae esse,
                    obcaecati excepturi delectus voluptatem, assumenda hic.
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
