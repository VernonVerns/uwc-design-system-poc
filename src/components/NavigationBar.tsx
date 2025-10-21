import React from "react";
import { NavLink } from "react-router-dom";

type NavLinkItem = {
    label: string;
    path: string;
};

type RightIconItem = {
  icon: React.ReactNode;
  href?: string; // optional link
  onClick?: () => void; // optional click action
  ariaLabel?: string; // accessibility
};

interface NavigationBarProps {
    fixed?: boolean; // Stick to top
    borderBottom?: boolean; // Show bottom border
    brand?: React.ReactNode; // Logo, text, etc.
    links: NavLinkItem[]; // Menu links
    rightIcons?: RightIconItem[]; // Buttons/icons on the right
    className?: string; // Custom class override
    backgroundColor?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    fixed = false,
    borderBottom = false,
    brand,
    links,
    rightIcons = [],
    className = "",
    backgroundColor = false,
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
        </div>
    );
};

export default NavigationBar;
