import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import config from '../firebase.json';

const app = initializeApp(config);

const Auth = getAuth(app);

export const login = async ({email, password}) => {
    const {user} = await Auth.signInWithEmailAndPassword(email, password);
    return user;
}