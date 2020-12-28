import React, { useRef } from "react";
import cx from "classnames";
import useOnClickOutside from "../../util/useOnClickOutside";
import LinkBase from "../LinkBase";

export type ProfileMenuItem = {
  name: string;
  subName?: string;
  link?: string;
  renderIcon?: (props) => React.ReactNode;
  disabled?: boolean;
  onClick?: () => any;
  borderBottom?: boolean;
  isExternalLink?: boolean;
};

type Props = {
  profileMenuItems: ProfileMenuItem[];
  closeMenu: () => void;
};

const ProfileMenu: React.FC<Props> = ({ profileMenuItems, closeMenu }) => {
  const dropdownRef = useRef();

  useOnClickOutside(dropdownRef, () => {
    if (closeMenu) {
      closeMenu();
    }
  });

  return (
    <div
      className="py-1 bg-white rounded-md shadow-xs"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
      ref={dropdownRef}
    >
      {profileMenuItems.map(item => {
        const externalLinkProps = item.isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return (
          <LinkBase
            key={item.name}
            className={cx(
              "block px-4 py-2 text-sm transition duration-150 ease-in-out text-charcoal hover:bg-charcoal-100 whitespace-no-wrap w-full text-left whitespace-nowrap",
              { "border-b border-charcoal-300": item.borderBottom }
            )}
            role="menuitem"
            onClick={
              item.onClick
                ? () => {
                    item.onClick();
                    closeMenu();
                  }
                : null
            }
            href={item.link}
            {...externalLinkProps}
          >
            {item.name} <span className="text-charcoal-600">{item.subName}</span>
          </LinkBase>
        );
      })}
    </div>
  );
};

export default ProfileMenu;
