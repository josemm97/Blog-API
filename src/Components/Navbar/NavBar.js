import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { GoogleLogout } from 'react-google-login';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Box } from '@material-ui/core';
import styles from './NavBar.module.css';
import {
  selectSingedIn,
  selectUserData,
  setSignedIn,
  setUserData,
  setSearchInput,
} from '../../Features/userSlice';

function NavBar() {
  const isSignedIn = useSelector(selectSingedIn);
  const dataUser = useSelector(selectUserData);
  const dispatch = useDispatch(setUserData);
  const [inputValue, setInputValue] = React.useState('');

  const handleValue = (e) => {
    setInputValue(e.target.value);
  };
  // eslint-disable-next-line no-unused-vars
  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.navbar}>
      <h1 className={styles.navbar_header}> Blog 💬</h1>
      {isSignedIn ? (
        <div className={styles.blog_search}>
          <input
            className={styles.search}
            placeholder="Search for a blog"
            value={inputValue}
            onChange={handleValue}
          />
          <Button
            className={styles.submit}
            startIcon={<SearchIcon />}
            variant="outlined"
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
      ) : null}

      {isSignedIn ? (
        <div className={styles.navbar_user_data}>
          {dataUser === undefined ? <CircularProgress /> : (
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar
                className={styles.user}
                src={dataUser.imageUrl}
                alt={dataUser.name}
              />
              <h1 className={styles.signedIn}>{dataUser.givenName}</h1>

            </Box>
          ) }

          <GoogleLogout
            clientId="238111332792-emlrl2qv8t4ek83nag4prdguhrg7vl2p.apps.googleusercontent.com"
            render={(renderProps) => (
              // eslint-disable-next-line react/button-has-type
              <button
                className={styles.logout_button}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : <div className={styles.notSignedIn}>Do not login</div>}
    </div>
  );
}

export default NavBar;
