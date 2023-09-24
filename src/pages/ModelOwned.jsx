import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import model_1 from "../assets/images/ava-01.png";

import { Link } from "react-router-dom";

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

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 10000);
    }
  };


  return (
    <>
      <CommonSection title="HelloKitty" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={model_1}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{"Model1"}</h2>

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
                    <img src={model_1} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{"Creator"}</h6>
                  </div>
                </div>

                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.
                </p>
                <form>
                  <div className="form__input">
                    <label htmlFor="" className="fw-bold">UPLOAD INPUT FILE</label>
                    <input type="file" className="upload__input" />
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
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="OUTPUT"
                  className="bg-white w-100 text-center my-3 fw-bold"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default ModelOwned;
