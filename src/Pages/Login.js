import React, { useState } from "react";
import Mobile from "../Components/Mobile";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TranslateIcon from "@mui/icons-material/Translate";
import FlagIcon from "@mui/icons-material/Flag";
import ReactCountryFlag from "react-country-flag";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { domain } from "../Components/config";

const Login = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setOpenDrawer(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [mobile, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  console.log(mobile, password);
  const handleEmailLogin = async (event) => {
    console.log("handleEmailLogin called");
    event.preventDefault();
    try {
      const response = await axios.post(`${domain}/login`, {
        mobile,
        password,
      });
      if (response.status === 200) {
        // Save the token in a cookie
        const isAdmin = response.data.user.accountType === "Admin";
        login(response.data.token, isAdmin);
        console.log(response);

        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert(
          "An error occurred while creating your account. Please try again"
        );
      }
    }
  };

  const handleregister = async () => {
    // Signup logic here...

    // After successful signup, redirect to the login page
    navigate("/register");
  };

  return (
    <div>
      <Mobile>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "rgb(58,58,58)",
            padding: "8px 16px",

            color: "black",
          }}
        >
          <Grid item xs={4} textAlign="left">
            <IconButton sx={{ marginLeft: "-8px" }} color="inherit">
              <ArrowBackIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <img
              src="assets/logo.png"
              alt="logo"
              style={{ width: "100px", height: "40px" }}
            />
          </Grid>
          <Grid item xs={4} textAlign="right">
            <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
              <TranslateIcon sx={{ color: "white" }} />
              {selectedLanguage && (
                <>
                  {selectedLanguage === "EN" && (
                    <FlagIcon
                      component="span"
                      fontSize="small"
                      sx={{ marginLeft: "4px" }}
                    />
                  )}
                  {selectedLanguage === "HN" && (
                    <FlagIcon
                      component="span"
                      fontSize="small"
                      sx={{ marginLeft: "4px" }}
                    />
                  )}
                  <span>{selectedLanguage}</span>
                </>
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Drawer
          anchor="bottom"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            sx={{ padding: "16px" }}
          >
            <Button onClick={() => handleLanguageSelect("EN")}>
              <ReactCountryFlag countryCode="US" svg />
              EN
            </Button>
            <Button onClick={() => handleLanguageSelect("HN")}>
              <ReactCountryFlag countryCode="IN" svg />
              HN
            </Button>
          </Grid>
        </Drawer>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            backgroundColor: "rgb(58,58,58)",
            padding: "16px",
            color: "white",
            minHeight: "fit-content",
          }}
          direction="column"
        >
          <Typography variant="h5">Login</Typography>
          <Typography variant="subtitle2">
            Please login with your phone number or email{" "}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            backgroundColor: "rgb(36,36,36)",
            padding: "16px",
            color: "white",
            minHeight: "fit-content",
          }}
        >
          <Grid item xs={12} sx={{ marginBottom: "50px" }}>
            <form onSubmit={handleEmailLogin}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: tabValue === 0 ? "#FF7172" : "grey",
                  },
                }}
              >
                <Tab
                  icon={
                    <EmailIcon
                      style={{
                        color: tabValue === 0 ? "rgb(203,158,76)" : "grey",
                      }}
                    />
                  }
                  label="Login With Mobile"
                  style={{ color: tabValue === 0 ? "rgb(203,158,76)" : "grey" }}
                />
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <Box display="flex" alignItems="center" mt={2}>
                  <EmailIcon sx={{ color: "rgb(203,158,76)" }} />
                  <FormLabel sx={{ color: "white" }}>Mobile</FormLabel>
                </Box>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={mobile}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    backgroundColor: "rgb(58,58,58)",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgb(217,172,78) !important", // Initial border color
                      },
                      "&:hover fieldset": {
                        borderColor: "rgb(217,172,78) !important", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgb(217,172,78) !important", // Border color when focused
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white", // Text color
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", // Label color
                    },
                  }}
                  InputProps={{
                    style: { borderRadius: "10px", color: "white" },
                  }}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box display="flex" alignItems="center" mt={2}>
                  <PhoneIcon sx={{ color: "rgb(42,50,112)" }} />
                  <FormLabel>Phone Number</FormLabel>
                </Box>
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: "#FFFFFF" }}
                  InputProps={{
                    style: { borderRadius: "10px" },
                  }}
                />
              </TabPanel>
              <Box display="flex" alignItems="center" mt={2}>
                <LockIcon sx={{ color: "rgb(203,158,76)" }} />
                <FormLabel sx={{ color: "white" }}>
                  Please enter Password
                </FormLabel>
              </Box>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: "rgb(58,58,58)",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(217,172,78) !important", // Initial border color
                    },
                    "&:hover fieldset": {
                      borderColor: "rgb(217,172,78) !important", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(217,172,78) !important", // Border color when focused
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // Label color
                  },
                }}
                InputProps={{
                  style: { borderRadius: "10px", color: "white" },
                  endAdornment: (
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "16px 0 8px",
                }}
              >
                <RadioGroup row style={{ color: "#cb9e4b" }}>
                  <FormControlLabel
                    value="remember"
                    control={<Radio style={{ color: "#cb9e4b" }} />}
                    label="Remember Password "
                    labelPlacement="end"
                    style={{ color: "white" }}
                  />
                </RadioGroup>
              </Box>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                style={{
                  marginBottom: "8px",
                  backgroundColor: "rgb(203,158,76)",
                  borderRadius: "300px",
                  fontWeight: "bold",
                }}
              >
                Log in
              </Button>
              <Button
                onClick={handleregister}
                variant="outlined"
                color="primary"
                fullWidth
                style={{
                  borderRadius: "300px",
                  borderColor: "rgb(203,158,76)",
                }}
              >
                <span
                  style={{
                    color: "rgb(203,158,76)",
                    marginLeft: "3px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Register
                </span>
              </Button>
            </form>
          </Grid>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              backgroundColor: "rgb(36,36,36)",
              padding: "16px",
              color: "white",
              minHeight: "fit-content",
            }}
          >
            {/* Your form grid code */}
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: "16px" }}
          >
            <SupportAgentIcon
              style={{ fontSize: 60, color: "rgb(203,158,76)" }}
            />
            <Typography
              variant="subtitle1"
              style={{ color: "white", marginBottom: "150px" }}
            >
              Customer Service
            </Typography>
          </Grid>
        </Grid>
      </Mobile>
    </div>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

export default Login;
