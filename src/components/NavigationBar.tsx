import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UWCAvatar } from "./UWCAvatar";

type NavLinkItem = {
    label: string;
    path: string;
};

type RightIconItem = {
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

interface NavigationBarProps {
    fixed?: boolean;
    borderBottom?: boolean;
    brand?: React.ReactNode;
    links: NavLinkItem[];
    rightIcons?: RightIconItem[];
    className?: string;
    backgroundColor?: boolean;
    userAccount?: boolean
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    fixed = false,
    borderBottom = false,
    brand,
    links,
    rightIcons = [],
    className = "",
    backgroundColor = false,
    userAccount = true
}) => {
    return (
        <div
            id="navigation_bar"
            className={`uwc-navbar 
                ${fixed ? "nav-fixed" : ""} 
                ${borderBottom ? "nav-border-bottom" : ""}
                ${backgroundColor ? "background-color": ""}
                ${className}`}
            >
                
            <div className="navbar-brand">{brand}</div>

            <ul className="nav-menu flex space-x-6">
                {links.map((link, idx) => (
                    <li key={idx} className="menu-item">
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `${isActive ? "active-tab" : ""}`
                            }
                            >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="icon-side">
                {rightIcons.length > 0 && (
                    <div className="icon-btns">
                        {rightIcons.map((item, idx) =>
                            item.href ? (
                            <a
                                key={idx}
                                href={item.href}
                                className="icon-item"
                                aria-label={item.ariaLabel}
                            >
                                {item.icon}
                            </a>
                            ) : (
                            <button
                                key={idx}
                                onClick={item.onClick}
                                className="icon-item"
                                aria-label={item.ariaLabel}
                            >
                                {item.icon}
                            </button>
                            )
                        )}
                    </div>
                )}
                {userAccount && (
                    <>
                        <UWCAvatar 
                            shape="circle"
                            size="md"
                            onClick={() => {}}
                        />
                        {/* <div className="dropdown">
                            <ul className="dropdown-menu">
                                {}
                            </ul>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
