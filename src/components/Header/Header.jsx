import React, { useRef, useEffect,useState } from "react";
import aes from "crypto-js/aes.js";
import { enc } from "crypto-js/core.js";
import { createUser } from "../../utils/operations";
import { connectWallet, getActiveAccount, disconnectWallet } from "../../utils/wallet";
import { removeRental } from "../../utils/operations";

import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { getRootStorage } from "../../utils/api";

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
    display: "Models Owned",
    url: "/modelsowned",
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
  const navigate = useNavigate();

  useEffect(() => {
    const createUserKeys = async () =>{
      try{
        const publicKey = makeid(10);
        const privateKey = makeid(10);
        await createUser(privateKey, publicKey, wallet.address);
        navigate("/market");
      }catch(error){
        alert("Transaction Failed:", error.message);
      }
    }

    const userExists = async() =>{
      const fullStorage = await getRootStorage();
      const user = fullStorage["user_keys"][wallet.address];
      if(!user) return false;
      else return true;
    }

    if(!wallet) return;
    if(userExists()) return;
    createUserKeys();
    //   const encryptWithAES = (text) => {
    //     return aes.encrypt(text, passphrase).toString();
    //   };
    // vbWRWqRswF
      
    //   const decryptWithAES = (ciphertext) => {
    //     const bytes = aes.decrypt(ciphertext, passphrase);
        
    //     const originalText = bytes.toString(enc.Utf8);
    //     return originalText;
    // };
    // const cipher = encryptWithAES("hello world");
    // console.log(decryptWithAES(cipher));
    
  }, [wallet]);


  const handleConnectWallet = async () => {
    if(wallet === null){
      const { wallet } = await connectWallet();
      setWallet(wallet);
    }
    else{
      await disconnectWallet();
      setWallet(null);
      console.log("Disconnected");
    }
  };

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

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
