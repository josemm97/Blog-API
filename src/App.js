import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from './Components/HomePage/HomePage';
import NavBar from './Components/Navbar/NavBar';
import Blogs from './Components/Blogs/Blogs';
import { selectSingedIn } from './Features/userSlice';

function App() {
  const isSignedIn = useSelector(selectSingedIn);
  const [loading, setLoding] = React.useState(Boolean);
  // eslint-disable-next-line no-console
  console.log('signed', isSignedIn);
  React.useEffect(() => {
    if (isSignedIn) {
      setLoding(true);
    } else {
      setLoding(false);
    }
  }, [isSignedIn]);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="app">
      <NavBar />
      {isSignedIn ? (<Blogs />) : null }

      {!loading ? <HomePage /> : null}
    </div>
  );
}

export default App;
