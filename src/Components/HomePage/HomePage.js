/* eslint-disable no-unused-vars */
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSingedIn,
  setSignedIn,
  setUserData,
  selectUserData,
} from '../../Features/userSlice';
import styles from './HomePage.module.css';

function HomePage() {
  const isSigned = useSelector(selectSingedIn);
  const [loading, setLoading] = React.useState(Boolean);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  console.log(isSigned);
  //
  const login = async (response) => {
    await dispatch(setUserData(response.profileObj));
    // eslint-disable-next-line no-console
    console.log(response);
    await dispatch(setSignedIn(true));
    setLoading(false);
  };
  // eslint-disable-next-line no-console
  React.useEffect(() => {
    if (isSigned) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isSigned]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.home_page}>
      {!isSigned ? (
        <div className={styles.login_messages}>
          <h2>📗</h2>
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
            clientId="622263829623-niaq485ar6i9rq2t3b9qpfgpn6i1u6rj.apps.googleusercontent.com"
            render={(renderProps) => (
              // eslint-disable-next-line react/button-has-type
              <button
                className={styles.login_button}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn
          // eslint-disable-next-line react/jsx-curly-brace-presence
            cookiePolicy={'single_host_origin'}
          />
        </div>
      ) : null }
    </div>
  );
}

export default HomePage;
