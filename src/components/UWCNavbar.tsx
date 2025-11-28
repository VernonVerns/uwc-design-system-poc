import React from 'react'
import { Search, Menu, Close, LogoFacebook, LogoInstagram, LogoX, LogoLinkedin } from '@carbon/icons-react';
import { Link, NavLink } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@carbon/react';

type NavLinkItem = {
    label: string;
    path: string;
};

interface NavigationBarProps {
    fixed?: boolean; // Stick to top
    borderBottom?: boolean; // Show bottom border
    brand?: React.ReactNode; // Logo, text, etc.
    links: NavLinkItem[]; // Menu links
    mainMenu: {
        label: string;
        onClick: () => void;
        subLinks: NavLinkItem[];
    }[];
    className?: string; // Custom class override
    backgroundColor?: boolean;
    search?: {
        data?: any[]; // optional: local data to filter
        onSearch?: (query: string) => Promise<any[]> | any[]; // optional: async or sync handler
    };
    generalMenuItems: NavLinkItem[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    fixed = false,
    borderBottom = false,
    brand,
    links,
    className = "",
    backgroundColor = false,
    search,
    mainMenu = [],
    generalMenuItems = [],
}) => {
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [showMenu, setShowMenu] = React.useState(false);
    const [activeMainMenu, setActiveMainMenu] = React.useState<number | null>(null);

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
        const searchPopup = document.querySelector('.search-popup') as HTMLElement;
        if (searchPopup) {
            searchPopup.setAttribute('aria-hidden', showSearch ? 'true' : 'false');
        }
    };
    
    const resultsTabs = [
        { id: 'pages', label: 'Pages' },
        { id: 'news', label: 'UWC News' },
        { id: 'articles', label: 'UWC Articles' },
        { id: 'events', label: 'UWC Events' },
        { id: 'calendar', label: 'UWC Calendar' },
    ];

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!search) return;

        if (search.onSearch) {
        // Use external async or sync handler
            const results = await Promise.resolve(search.onSearch(query));
            setSearchResults(results);
        } else if (search.data) {
        // Filter local data
        const results = search.data.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
        );
            setSearchResults(results);
        }
    };

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div id='uwc_navigation_bar'
            className={`uwc-navbar-container 
                ${fixed ? "nav-fixed" : ""} 
                ${borderBottom ? "nav-border-bottom" : ""}
                ${backgroundColor ? "background-color": ""}
                ${className}
                ${showMenu ? "nav-fixed background-color" : ""}
            `}
        >
            <div className='uwc-top-navbar'>
                <div className="action-btns">
                    {!showMenu ? (
                        <button className="menu-btn" aria-label="Menu" onClick={handleShowMenu}>
                            <Menu size={'20'} /> <span>Menu</span>
                        </button>
                    ) : (
                        <button className='close-btn' aria-label="Close Menu" onClick={() => setShowMenu(false)}>
                            <Close size={'20'} /> <span>Menu</span>
                        </button>
                    )}
                    {!showMenu && (
                        <button className="search-btn" aria-label="Search" onClick={handleSearchClick}>
                            <Search size={'20'} /> <span>Search</span>
                        </button>
                    )}
                </div>
                <div className="brand-logo">
                    {brand ? brand : <Link to="/">UWC Design System</Link>}
                </div>
                <ul className="menu-items">
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
            </div>
            {showSearch && (
                <div className="search-popup" aria-hidden="true">
                    <div className='btn-container'>
                        <button className='close-btn' aria-label="Close Search" onClick={() => setShowSearch(false)}>
                            <Close size={22} /> <span>Close</span>
                        </button>
                    </div>
                    <div className="search-container">
                        <div className="search-input-container">
                            <input 
                                type="search" 
                                placeholder="Search UWC" 
                                className="search-input"
                                aria-label="Search input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className='search-btn'>Go</button>
                        </div>
                    </div>
                    {searchResults.length > 0 && (
                        <div className="search-results-container">
                            <div className="search-results">
                                <Tabs>
                                    <TabList>
                                        {resultsTabs.map((tab) => (
                                            <Tab key={tab.id}>
                                                {tab.label}
                                            </Tab>
                                        ))}
                                    </TabList>
                                    <TabPanels>
                                        {resultsTabs.map((tab) => (
                                            <TabPanel key={tab.id}>
                                                {searchResults.length === 0 ? (
                                                        <p>No results found for "{searchQuery}"</p>
                                                    ) : (
                                                    <div className='results-container'>
                                                        <div className='results-list'>
                                                            {searchResults.map((result, idx) => (
                                                                <div className='result-item' key={idx}>
                                                                    <h4><Link to={result.link}>{result.title}</Link></h4>
                                                                    <p>{result.desc}</p>
                                                                    <a href={result.link}>{result.link}</a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className='featured-results'>
                                                            <h3>Featured Results</h3>
                                                            <div className='featured-list'>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </TabPanel>
                                        ))}
                                    </TabPanels>
                                </Tabs>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {showMenu && (
                <div className="menu-popup">
                    <div className='menu-container'>
                        <ul className="menu-items-vertical">
                            <div className='dynamic-menu'>
                                {mainMenu.map((item, id) => (
                                    <li key={id} className="menu-item-vertical">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setActiveMainMenu(activeMainMenu === id ? null : id);
                                                item.onClick?.();
                                            }}
                                            className={activeMainMenu === id ? "active-main-menu" : ""}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </div>
                            <div className='static-menu'>
                                <div className='static-links'>
                                    {generalMenuItems.map((item, id) => (
                                        <li key={id} className="menu-item-vertical">
                                            <NavLink to={item.path}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active-tab" : ""}`
                                                }
                                            >
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </div>
                                <div className='social-links'>
                                    <a href="" aria-label="UWC Facebook" target="_blank" rel="noopener noreferrer"><LogoFacebook size={20} /></a>
                                    <a href="" aria-label="UWC Instagram" target="_blank" rel="noopener noreferrer"><LogoInstagram size={20} /></a>
                                    <a href="" arial-label="UWC Twitter" target="_blank" rel="noopener noreferrer"><LogoX size={20} /></a>
                                    <a href="" arial-label="UWC LinkedIn" target="_blank" rel="noopener noreferrer"><LogoLinkedin size={20} /></a>
                                </div>
                            </div>
                        </ul>
                        {activeMainMenu !== null && (
                            <ul className="main-menu-sub-links">
                                {mainMenu[activeMainMenu].subLinks.map((sublink, idx) => (
                                <li key={idx} className="sublink-item">
                                    <NavLink
                                    to={sublink.path}
                                    className={({ isActive }) => `${isActive ? "active-tab" : ""}`}
                                    >
                                    {sublink.label}
                                    </NavLink>
                                </li>
                                ))}
                            </ul>
                        )}
                        <div className='related-news'>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavigationBar