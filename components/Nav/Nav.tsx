import React, { useState } from "react";
import Link from "next/link";
import cx from "classnames";
import ProfileMenu from "../ProfileMenu";
import Transition from "../Transition";
import { useRouter } from "next/router";
import { PreparedUser } from "../../util/auth";
import UserAvatar from "../Icons/UserAvatar";

type Props = { user?: PreparedUser; signOut: () => void };

const Nav: React.FC<Props> = ({ user, signOut }) => {
  const Router = useRouter();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={cx({ block: !mobileMenuOpen, hidden: mobileMenuOpen }, "w-6 h-6")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className={cx({ block: mobileMenuOpen, hidden: !mobileMenuOpen }, "w-6 h-6")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" passHref={true}>
                <a className="text-3xl">LVH</a>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {
                // TODO  determine active route and apply styles here
              }
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <a
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500"
              >
                Dashboard
              </a>
              <a
                href="/jobs"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              >
                Jobs
              </a>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  <span className="sr-only">Open user menu</span>
                  {user?.picture ? (
                    <img className="w-8 h-8 rounded-full" src={user.picture} alt="user" />
                  ) : (
                    <UserAvatar />
                  )}
                </button>
              </div>

              <Transition
                show={profileDropdown}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute right-0 z-10 w-auto mt-2 origin-top-right rounded-md shadow-lg">
                  <ProfileMenu
                    profileMenuItems={[
                      { name: "Your Profile", onClick: () => Router.push("/profile/your-profile-here") },
                      { name: "Settings", onClick: () => Router.push("/settings/general") },
                      { name: "Sign Out", onClick: () => signOut() },
                    ]}
                    closeMenu={() => setProfileDropdown(false)}
                  />
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      {/*
    MOBILE MENU
  */}
      <div className={cx({ block: mobileMenuOpen, hidden: !mobileMenuOpen }, "sm:hidden")}>
        <div className="pt-2 pb-4 space-y-1">
          {
            // TODO determine current here
          }
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
          <Link href="/dashboard" passHref={true}>
            <a className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50">
              Dashboard
            </a>
          </Link>
          <Link href="/jobs">
            <a className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Jobs
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
