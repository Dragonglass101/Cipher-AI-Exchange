import React, { useRef, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getActiveAccount } from "../utils/wallet";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import model_1 from "../assets/images/img-01.jpg";
import ava_1 from "../assets/images/ava-01.png";

import { Link } from "react-router-dom";
import { getRootStorage } from "../utils/api";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ModelOwned = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [wallet, setWallet] = useState();
  const outputRef = useRef();
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  function checkload(){setOutput("5");}


  async function DownloadFile(){
    const storage = getStorage();
    const fullStorage = await getRootStorage();
    const user = fullStorage["user_keys"][wallet.address];
    const fileEncLink = fullStorage["creators"].link_encoding;

    const fileUrl = decryptAES(fileEncLink);

    console.log("url ", fileUrl);

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "driver.py";
      a.click();
      window.URL.revokeObjectURL(url);
    };
    xhr.open('GET', fileUrl);
    xhr.send();
  }

  async function DisplayOutput(){
      await DownloadFile();
      var div = document.getElementById('python_code');
      div.innerHTML += `<py-script src=driver.py></py-script>`;
  }

  function decryptAES(link){
    // decrypt AES encrypted file link using user's private key
    return link
  }

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        checkload();
      }, 6000);
    }
  };


  return (
    <>
      <CommonSection title="Car Count Detection Model" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={file ? file : model_1}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{"Car Count Detection"}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={ava_1} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{"Trista Francis"}</h6>
                  </div>
                </div>

                <p className="my-4">
                A car count detection model is a computer vision model that is trained to identify and count the number of cars present in an image or video frame. This model uses deep learning techniques, typically convolutional neural networks (CNNs), to analyze visual features in the input data and make predictions about the presence and quantity of cars. It is commonly used in various applications such as traffic management, parking space monitoring, and vehicle analytics. The model can output the count of cars
                </p>
                <form>
                  <div className="form__input">
                    <label htmlFor="" className="fw-bold">UPLOAD INPUT FILE</label>
                    <input onChange={(e)=>{setFile(URL.createObjectURL(e.target.files[0]))}} type="file" className="upload__input" />
                  </div>
                </form>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                      aria-label="save"
                      color="primary"
                      sx={buttonSx}
                      onClick={handleButtonClick}
                    >
                      {success ? <CheckIcon /> : <PlayArrowIcon />}
                    </Fab>
                    {loading && (
                      <CircularProgress
                        size={68}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: -6,
                          left: -6,
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box> */}
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                      onClick={handleButtonClick}
                    >
                      Run Model
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
                
                <h2 style={{marginTop: "20px"}}>Output</h2>
                <div className="bg-white w-50 text-center my-3 fw-bold"
                style={{padding: "20px", fontSize: "25px"}}>
                  {!output & !loading ? "OUTPUT" : loading ? "Model is running..." : output}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <LiveAuction /> */}
    </>
  );
};

export default ModelOwned;
