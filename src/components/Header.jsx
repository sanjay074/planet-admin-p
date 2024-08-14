import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Badge } from '@mui/material';
import { MdEmail } from 'react-icons/md'; // Import email icon from react-icons
import { IoIosNotifications } from "react-icons/io";
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
  width: '40px',
  height: 'auto',
});

const HeaderText = styled(Typography)({
  marginLeft: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  color:"black"
});

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, zIndex: 1000, width: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo src="https://tse2.mm.bing.net/th?id=OIP.CEJZdk7LfdT0LWq3KwIjAwHaE7&pid=Api&P=0&h=180" alt="Logo" />
          <HeaderText variant="h6">Planet Clothing</HeaderText>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <IconButton color="inherit" aria-label="Email">
            <MdEmail />
          </IconButton>
          <IconButton color="inherit" aria-label="Notifications">
            <Badge badgeContent={4} color="error">
              <IoIosNotifications />
            </Badge>
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src="https://tse2.mm.bing.net/th?id=OIP.CEJZdk7LfdT0LWq3KwIjAwHaE7&pid=Api&P=0&h=180" alt="Profile" sx={{ width: 30, height: 30, marginRight: '10px' }} />
            <Typography variant="body1">Aksh</Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
