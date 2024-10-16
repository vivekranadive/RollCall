import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';

const SideMenuLink = ({ label, to, icon }) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(to);

    return (
        <NavLink
            to={to}
            className={`flex items-center p-2 text-white hover:bg-primary-600 transition duration-300 ${isActive ? 'bg-primary-800' : ''
                }`}
        >
            <img src={icon} alt={`${label} icon`} className="mr-2" />
            {label}
        </NavLink>
    );
};

const SideMenu = ({ menuItems }) => {
    const location = useLocation();
    return (
        <div className="bg-primary-500 h-screen w-64 overflow-y-auto">
            {menuItems.map((menuItem) => (
                <Fragment key={menuItem.label}>
                    {menuItem.children ? (
                        <Disclosure as="div" className="mb-2">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button
                                        className={`flex items-center p-2 w-5/6 text-white hover:bg-primary-600 transition duration-300 ${
                                            location.pathname.startsWith(menuItem.to) ? 'bg-primary-800' : ''
                                        }`}>
                                        <img src={menuItem.icon} alt={`${menuItem.label} icon`} className="mr-2" />
                                        {menuItem.label}
                                        <svg
                                            className={`ml-auto h-5 w-5 transform transition-transform ${open ? 'rotate-90' : ''
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6.928 5.293a1 1 0 011.414 0L10 8.586l1.658-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414 1 1 0 011.414 0L10 8.586l-1.293-1.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pl-4">
                                        {menuItem.children.map((childItem) => (
                                            <SideMenuLink key={childItem.label} {...childItem} />
                                        ))}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ) : (
                        <SideMenuLink key={menuItem.label} {...menuItem} />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default SideMenu;
