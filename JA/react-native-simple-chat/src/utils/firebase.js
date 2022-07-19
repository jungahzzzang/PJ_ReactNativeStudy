// import {initializeApp} from 'firebase/compat/app';
// import {getAuth} from 'firebase/compat/auth';
// import config from '../firebase.json';

// export const app = initializeApp(config);

// const Auth = getAuth(app);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import config from '../firebase.json';

export default firebase.initializeApp(config);

export const authService = firebase.auth();

export const login = async ({email, password}) => {
    const {user} = await Auth.signInWithEmailAndPassword(email, password);
    return user;
}

