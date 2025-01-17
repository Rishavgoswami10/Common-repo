import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountIcon from '@mui/icons-material/AccountCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DiamondIcon from '@mui/icons-material/Diamond';

const BottomNavigationArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));


  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        padding: '6px 0',
        backgroundColor: '#333332',
        marginLeft: '-5px',
        borderRadius:"20px",
        width: '99%', // make BottomNavigation responsive
        maxWidth: matches ? '396px' : 'none', // limit maximum width for larger devices
        margin: 'auto', // center BottomNavigation
      }}
    >
      <BottomNavigationAction
        style={{ color: value === '/home' ? '#DDB96B' : '#BFBFBF' }}
        label="Home"
        value="/home"
        icon={ <img 
          src={value === '/home' ? '/assets/images/home-r-0e9d3a12.png':'/assets/images/home-3e6a9291.png'} 
          width="30px" 
          height="30px" 
          style={{ 
            color: value === '/home' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
          }} 
          alt="icon"
        />} 
      />
  <BottomNavigationAction
  style={{ color: value === '/activity' ? '#DDB96B' : '#BFBFBF' }}
  label="Activity"
  value="/activity"
  icon={
    <img 
    src={value === '/activity' ? '/assets/images/activity-r-8eb2eaaa.png':'/assets/images/activity-bb37b07c.png'} 
    width="30px" 
    height="30px" 
    style={{ 
      color: value === '/activity' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
    }} 
    alt="icon"
  />
    
  }
/>


  <BottomNavigationAction
   
  label="Promotion"
  value="/promotion"
  icon={
    value === '/promotion' ? 
    <DiamondIcon style={{ 
      width: '35px', 
      height: '33px', 
      color:"#DDB96B",
      backgroundColor:"#333332",
      borderRadius:"50%",
      padding: '2px' 
    }} /> : 
    <DiamondIcon style={{ 
      width: '35px', 
      height: '33px', 
      color:"#DDB96B", 
      backgroundColor:"#333332",
      borderRadius:"50%",
      padding: '2px' 
    }} />
  }
  style={{
    color: value === '/promotion' ? '#DDB96B' : '#DDB96B',
    transform: 'scale(1.3)',
    marginTop: '-25px',
  }}
/>

      <BottomNavigationAction
        style={{ color: value === '/wallet' ? '#DDB96B' : '#BFBFBF' }}
        label="Wallet"
        value="/wallet"
        icon ={
        <img 
        src={value === '/wallet' ? '/assets/images/wallet-r-5ca037e5.png':'/assets/images/wallet-dd37d20a.png'} 
        width="30px" 
        height="30px" 
        style={{ 
          color: value === '/wallet' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
        }} 
        alt="icon"
      />}
      />
      <BottomNavigationAction
  style={{ color: value === '/account' ? '#DDB96B' : '#BFBFBF' }}
  label="Account"
  value="/account"
  icon={
    <img 
    src={value === '/account' ? '/assets/images/main-r-d2aeb055.png':'/assets/images/main-53f64122.png'} 
    width="30px" 
    height="30px" 
    style={{ 
      color: value === '/account' ? '#DDB96B' : '#BFBFBF' // hide image when src is empty
    }} 
    alt="icon"
  />
  }
/>

    </BottomNavigation>
  );
};

export default BottomNavigationArea;