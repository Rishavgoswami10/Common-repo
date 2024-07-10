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
        padding: '10px 0',
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
        icon={<HomeIcon style={{ color: value === '/home' ? '#DDB96B' : '#BFBFBF' }} />}
      />
  <BottomNavigationAction
  style={{ color: value === '/activity' ? '#DDB96B' : '#BFBFBF' }}
  label="Activity"
  value="/activity"
  icon={
    <RedeemIcon 
      style={{ 
        color: value === '/activity' ? '#DDB96B' : '#BFBFBF', // Add border directly to the icon
        padding: '5px' // Optional: Add some padding if needed
      }} 
    />
  }
/>


  <BottomNavigationAction
   
  label="Promotion"
  value="/promotion"
  icon={
    value === '/promotion' ? 
    <DiamondIcon style={{ 
      width: '40px', 
      height: '35px', 
      color:"#DDB96B",
      backgroundColor:"#333332",
      borderRadius:"50%",
      padding: '5px' 
    }} /> : 
    <DiamondIcon style={{ 
      width: '40px', 
      height: '35px', 
      color:"#DDB96B", 
      backgroundColor:"#333332",
      borderRadius:"50%",
      padding: '5px' 
    }} />
  }
  style={{
    color: value === '/promotion' ? '#DDB96B' : '#DDB96B',
    transform: 'scale(1.3)',
    marginTop: '-27px',
  }}
/>

      <BottomNavigationAction
        style={{ color: value === '/wallet' ? '#DDB96B' : '#BFBFBF' }}
        label="Wallet"
        value="/wallet"
        icon={<WalletIcon style={{ color: value === '/wallet' ? '#DDB96B' : '#BFBFBF',
          
         }} />}
      />
      <BottomNavigationAction
  style={{ color: value === '/account' ? '#DDB96B' : '#BFBFBF' }}
  label="Account"
  value="/account"
  icon={
    <AccountIcon 
      style={{ 
       
        color: value === '/account' ? '#DDB96B' : '#BFBFBF' // Ensuring both fill and color are set
      }} 
    />
  }
/>

    </BottomNavigation>
  );
};

export default BottomNavigationArea;