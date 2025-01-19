import React, { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    // Load the Google API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '875099837158-s9m81hec4gjbg7frr491fqhof3a0hhj8.apps.googleusercontent.com', // Replace with your own Client ID
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const id_token = googleUser.getAuthResponse().id_token;

      // Send the ID token to your Django backend
      fetch('http://127.0.0.1:8000/user/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: id_token }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login success:', data);
        // Handle the response, e.g., store user info or redirect
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
    }).catch((error) => {
      console.error('Google login error:', error);
    });
  };

  return (
    <div>
      <h2>Google Sign-In</h2>
      <button className="google-signin-btn" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Test;














// import React, { useEffect, useState } from 'react';

// const Test = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Load the Google API script
//     const script = document.createElement("script");
//     script.src = "https://apis.google.com/js/platform.js";
//     script.async = true;
//     script.onload = () => {
//       window.gapi.load('auth2', () => {
//         window.gapi.auth2.init({
//           client_id: '875099837158-s9m81hec4gjbg7frr491fqhof3a0hhj8.apps.googleusercontent.com', // Replace with your own Client ID
//         });
//       });
//     };
//     document.body.appendChild(script);
//   }, []);

//   const handleSignIn = () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signIn().then(
//       (googleUser) => {
//         const id_token = googleUser.getAuthResponse().id_token;

//         // Send the ID token to your Django backend
//         fetch('http://127.0.0.1:8000/user/auth/google/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id_token: id_token }),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Login success:', data);
//           setUserInfo(data.user);  // Store the user info in the state
//         })
//         .catch((error) => {
//           console.error('Error during login:', error);
//           setError('Login failed. Please try again later.');
//         });
//       },
//       (error) => {
//         if (error.error === "popup_closed_by_user") {
//           alert("The popup was closed before the login was completed. Please try again.");
//         } else {
//           console.error('Google login error:', error);
//           setError('An error occurred during login. Please try again later.');
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <h2>Google Sign-In</h2>
//       <button className="google-signin-btn" onClick={handleSignIn}>
//         Sign in with Google
//       </button>

//       {userInfo && (
//         <div>
//           <h3>Welcome, {userInfo.name}!</h3>
//           <p>Email: {userInfo.email}</p>
//         </div>
//       )}

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Test;
