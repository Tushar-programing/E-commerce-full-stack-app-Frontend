import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.email) {
      setLoader(true); // Show loader if email is not present yet
    } else if (userData.email !== "ttushar476@gmail.com") {
      navigate("/");
    } else {
      setLoader(false); // Hide loader when everything is okay
    }
  }, [userData, navigate]);

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

export default AuthLayout;
