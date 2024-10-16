import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { RiSoundModuleLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const filterArr = [
  "Status",
  "Marketing",
  "Interviews",
  "Sales Person",
  "Woerk Status",
  "Job Title",
  "Technology",
];

export default function SettingsPopUp() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <Menu.Button className="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon">
              <path
                id="Star 5"
                d="M10.0285 3.91752C10.9596 2.49801 13.0404 2.49801 13.9715 3.91752C14.653 4.9566 15.8526 5.53433 17.0899 5.4193C18.7803 5.26216 20.0777 6.88906 19.5483 8.50201C19.1609 9.6827 19.4571 10.9808 20.3185 11.8765C21.4953 13.1 21.0322 15.1287 19.4411 15.7206C18.2765 16.1538 17.4463 17.1948 17.2831 18.4267C17.0602 20.1096 15.1854 21.0124 13.7306 20.1374C12.6658 19.497 11.3342 19.497 10.2694 20.1374C8.81464 21.0124 6.93984 20.1096 6.71691 18.4267C6.55373 17.1948 5.72354 16.1538 4.55886 15.7206C2.96776 15.1287 2.50473 13.1 3.68148 11.8765C4.54285 10.9808 4.83915 9.6827 4.45168 8.50201C3.92234 6.88906 5.21975 5.26216 6.91006 5.4193C8.14736 5.53433 9.34702 4.95661 10.0285 3.91752Z"
                stroke="currentColor"
              />
              <circle
                id="Ellipse 165"
                cx="12"
                cy="12"
                r="3.5"
                stroke="currentColor"
              />
            </g>
          </svg>{" "}
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
        <Menu.Items className="absolute  right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col gap-4 p-2">
            {/* {filterArr.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item}
                  </a>
                )}
              </Menu.Item>
            ))} */}
            <div className="flex gap-4 ">
              <h3 className="text-text-hint w-24">User Name</h3>
              <p className="font-medium text-black">Robert Cooper</p>
            </div>
            <div className="flex gap-4 ">
              <h3 className="text-text-hint w-24">User ID</h3>
              <p className="font-medium text-black">1237869</p>
            </div>
            <div className="flex gap-4 ">
              <h3 className="text-text-hint w-24">Roles</h3>
              <p className="font-medium text-black">Sales Manager</p>
            </div>
            <div className="flex gap-4 ">
              <h3 className="text-text-hint w-24">Last Sign In</h3>
              <p className="font-medium text-black">
                <span>10/10/2023</span>
                <br></br>
                <span>10:00 PM</span>
              </p>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
