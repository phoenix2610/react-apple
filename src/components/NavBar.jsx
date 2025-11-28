import React from "react"
import { navlinks } from "./constants"
const NavBar = () => {
    return (
        <header className="navbar">
            <nav className="nav-container">
                <div className="nav-logo">
                    <img src="/logo.svg" alt="Apple logo" width="16" height="20" />
                </div>

                <ul className="nav-links">
                    {navlinks.map((item) => (
                        <li key={item.label}>
                            <a href={`#${item.label}`}>{item.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="nav-icons">
                    <button className="icon-btn">
                        <img src="/search.svg" alt="Search" width="18" height="18" />
                    </button>
                    <button className="icon-btn">
                        <img src="/cart.svg" alt="Cart" width="18" height="18" />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
