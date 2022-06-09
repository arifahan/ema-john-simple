import * as firebase from 'firebase/app'
import "firebase/auth"
import firebaseConfig from '../../firebase.config'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
      return signInWithPopup(auth, provider)
      .then((res) => {
        const {displayName, photoURL, email, uid} = res.user;
        const signedInUser = {
      signedInUser: true,
      name: displayName,
      email: email,
      id: uid,
      photoURL: photoURL,
      success : true
    };
    return signedInUser;
  })
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    
    const auth = getAuth();
      return signInWithPopup(auth, fbProvider)
        .then(result => {
          const {displayName, email, photoURL, uid} = result.user;
          const signedInUser = {
            signedInUser: true,
            name: displayName,
            email: email,
            photoURL: photoURL,
            id: uid,
            success : true
          }
          return signedInUser;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;

          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);

          // ...
    });
  }

  export const handleSignOut = () => {
  
    const auth = getAuth();
    return signOut(auth)
    .then(res => {
      // Sign-out successful.
      const signedOutUser = {
        signedInUser: false,
        name: '',
        email: '',
        photoURL: '',
        error: '',
        success: false
      }
      return signedOutUser;
      }).catch((error) => {
        
        // An error happened.
      });
   
  }

  export const createUserWithEmail = (name,  email, password) => {
      const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
          .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true
            updateUserName(name);
            verifyEmail();
            return newUserInfo;

          })
          .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
          });
  }
  
  // console.log(verifyEmail);

  
  export const signInWithEmail = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(res => {

        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true
       return newUserInfo;

      })
      .catch(error => {
        const newUserInfo = {}
        newUserInfo.error = error.message;
        newUserInfo.success = false
        return newUserInfo;
      });
  }

  const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
        })
        .then(() => {
          console.log('user name update successfully')
        }).catch((error) => {
          console.log(error);
        });
  }



const verifyEmail = (email) => {
  const auth = getAuth();
sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

export const resetPassword = email => {
  const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}



