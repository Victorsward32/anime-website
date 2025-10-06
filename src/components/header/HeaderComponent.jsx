import React, { useId, useState } from 'react'
import { header } from '../../utils/TextConstants';
import { NavLink } from '../../utils/StaticData';
import searchIcon from '../../assets/icons/search.svg'
import '../../scss/components/header.scss'
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';


const HeaderComponent = ({ search }) => {
    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const headerId = useId()
    const handleSearch = (event) => {
        setSearchValue(event);
        search(event);
    }
    useOutSideTouch({
        className: ('[data-component="header"]'),
        id: headerId,
        isOpen: isOpen,
        handler: () => setIsOpen(false)
    })
    return (
        <div data-component="header" id={headerId}>
            <button
                className='hamburger'
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✖" : "☰"}
            </button>
            <div className='logo-contianer'>
                <label className='web-title'>{header?.title || header.notAvailable}</label>
            </div>
            <div className='link-container' >
                {NavLink?.map((item, index) => (
                    <label className='nav-links' key={index}>{item?.name}</label>
                ))}
            </div>
            <div className='search-bar-container'>
                <div className='searchBar-Wrapper'>
                    <img alt='search-icon' src={searchIcon} className='search-Icon' />
                    <input className='search-input' placeholder='Anime,Manga,etc...' value={searchValue} onChange={(e) => handleSearch(e.target.value)} />
                </div>

            </div>

            <div className='auth-container'>
                <label className='signIN'>{header.signIn || header.notAvailable}{" "}</label>
                <label>/</label>
                <label className='signIN'>{" "}{header.signOut || header.notAvailable}</label>
            </div>
            {
                isOpen && (
                    <div className='header-mobile-menue'>
                        <div className='mobile-nav'>
                            {NavLink?.map((item, index) => (
                                <label className='nav-links' key={index}>{item?.name}</label>
                            ))}
                        </div>
                        <div className='gap-container'></div>
                        <div className='mobile-auth-container'>
                            <label className='signIN'>{"➜] "}{header.signOut || header.notAvailable}{" "}</label>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default HeaderComponent