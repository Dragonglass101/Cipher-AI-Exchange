import React, {useState, useEffect, useRef} from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getActiveAccount } from "../utils/wallet.js";
import "../firebase.js"

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";

import "../styles/create-item.css";
import { getRootStorage } from "../utils/api.js";

const item = {
  id: "01",
  title: "Guard",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  creator: "Trista Francis",
  creatorImg: avatar,
  currentBid: 7.89,
};

const Create = () => {
  const [wallet, setWallet] = useState();
  const [pklFile, setPklFile] = useState();
  const [driverFile, setDriverFile] = useState();
  const modelName = useRef(null);

  useEffect(() => {
    if(!wallet){
        (async () => {
        const activeAccount = await getActiveAccount();
        setWallet(activeAccount);
    })();}
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    if (!pklFile) return;
    if (!driverFile) return;
    if(!wallet) return;

    UploadFiles();

  }

  function UploadFiles() {
		console.log('uploading: ' + pklFile.name + " and " + driverFile.name);

    const storage = getStorage();
    // const storageRef = ref(storage, 'images/' + file.name);

    // 'file' comes from the Blob or File API
    uploadBytes(ref(storage, `${wallet.address}/` + pklFile.name), pklFile).then((snapshot) => {
          console.log('Uploaded a blob or file!');
    });
    uploadBytes(ref(storage, `${wallet.address}/` + driverFile.name), driverFile).then((snapshot) => {
          console.log('Uploaded a blob or file!');
    });
	}

  // function DownloadFile(){
  //   const storage = getStorage();
  //   getDownloadURL(ref(storage, 'images/' + "test.py"))
  //     .then(async (fileUrl) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.responseType = 'blob';
  //       xhr.onload = function() {
  //         const blob = xhr.response;
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = "test.py";
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       };
  //       xhr.open('GET', fileUrl);
  //       xhr.send();
  //       console.log("url ", fileUrl);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //     });
  // }
  

  async function appendHtml() {
      // const fullStorage = await getRootStorage();

      // const user = fullStorage["user_keys"][wallet.address];

      // if(user) return;

      // for (const userKey in fullStorage.user_keys) {
      //   if (fullStorage.user_keys.hasOwnProperty(userKey)) {
      //     const user = fullStorage.user_keys[userKey];
      //     console.log(`User Key: ${userKey}`);
      //     console.log(`Public Key: ${user.public_key}`);
      //     console.log(`Private Key: ${user.private_key}`);
      //     console.log('-----------------------');
      //   }
      // }

      // for (let key of obj) {
      //   console.log(key);
      // }

      // var div = document.getElementById('python_code');
      // div.innerHTML += `<py-script src=${pyfile}></py-script>`;
  }
  
  return (
    <>
      <CommonSection title="Create Model" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <button onClick={appendHtml}>Test</button>
                <form>
                  <div className="form__input">
                    <label htmlFor="">Model Name</label>
                    <input ref={modelName} type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Upload Pickle File</label>
                    <input onChange={(e)=>{setPklFile(e.target.files[0]);}} type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Upload Driver Code File</label>
                    <input onChange={(e)=>{setDriverFile(e.target.files[0]);}} type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Rental Price</label>
                    <input
                      type="number"
                      placeholder="Enter price for one item (TEZ)"
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
