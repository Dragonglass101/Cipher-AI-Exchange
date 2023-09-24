import React, { useState } from "react";
import { Link } from "react-router-dom";
import { rentModel } from "../../../utils/operations";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import aes from "crypto-js/aes.js";
import { enc } from "crypto-js/core.js";

import "./nft-card.css";

import Modal from "../Modal/Modal";

const NftCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator, accuracy } = props.item;
  const [wallet, setWallet] = useState(null);
  const public_key = "vueii34N"; const private_key = "Ububuu298";

  const [showModal, setShowModal] = useState(false);
  const testLink = "https://firebasestorage.googleapis.com/v0/b/cipher-ai-exchange.appspot.com/o/tz1cDiwhxGMuFCHzaTQgbhSuheXz1rDo6XHh%2Fdriver.py?alt=media&token=c828fd20-6faa-48f4-aec4-e90e09267466";
  const encryptWithAES = (text) => {
    const passphrase = public_key + private_key;
    return aes.encrypt(text, passphrase).toString();
  };
  const cipher = encryptWithAES(testLink);

  if(wallet){
    const storage = getStorage();
    getDownloadURL(ref(storage, `${wallet.address}/driver.py`))
    .then(async (fileUrl) => {
      console.log("url ", fileUrl);
    })
  }

  async function handleBuy(currentBid){
    console.log("buying for", currentBid);
    
    await rentModel(cipher, currentBid);
  }

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Accuracy</h6>
              <p>{accuracy} %</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={()=>{handleBuy(currentBid)}}
          >
            <i className="ri-shopping-bag-line"></i> {currentBid} TEZ
          </button>

          {/* {showModal && <Modal setShowModal={setShowModal} />} */}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
