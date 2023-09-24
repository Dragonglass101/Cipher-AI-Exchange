import React, { useRef, useEffect,useState } from "react";
import { connectWallet, getActiveAccount, disconnectWallet } from "../../utils/wallet";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Contact",
    url: "/contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  /****************************************************************************/

  const [wallet, setWallet] = useState(null);
  const handleConnectWallet = async () => {
    if(wallet === null){
      const { wallet } = await connectWallet();
      setWallet(wallet);
    }
    else{
      await disconnectWallet();
      setWallet(null);
      // const activeAccount = await getActiveAccount();
      // console.log(activeAccount);
      // setWallet(activeAccount);
      console.log("Disconnected");
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className="ri-fire-fill"></i>
              </span>
              dAIs
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button onClick={handleConnectWallet} style={{color: 'white'}} className="btn d-flex gap-2 align-items-center">
              <span>
                <i className="ri-wallet-line"></i>
              </span>
              {wallet
            ? wallet.address.slice(0, 4) +
              "..." +
              wallet.address.slice(wallet.address.length - 4, wallet.address.length)
            : "Connect Wallet"}
            </button>

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
