// import {initializeApp} from 'firebase/compat/app';
// import {getAuth} from 'firebase/compat/auth';
// import config from '../firebase.json';

// export const app = initializeApp(config);

// const Auth = getAuth(app);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import config from '../firebase.json';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import 'firebase/compat/firestore';

export const app = firebase.initializeApp(config);

export const authService = firebase.auth();

//로그인
export const login = async ({email, password}) => {
    const {user} = await authService.signInWithEmailAndPassword(email, password);
    return user;
}

//프로필 사진 업로드 & url 반환 함수
const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            resolve(xhr.response);
        };
        xhr.onerror = function(e){
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = authService.currentUser;
    //const ref = config.storageBucket().ref(`profile/${user.uid}/photo.png`);
    const ref = app.storage().ref(`profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, {contentType: 'image/png'});

    blob.close();
    return await snapshot.ref.getDownloadURL();
};

//회원가입
export const signup = async ({email, password, name, photoUrl}) => {
    const {user} = await authService.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({
        displayName: name,
        photoURL: storageUrl,
    });
    return user;
}

//로그아웃
export const logout = async() => {
    return await authService.signOut();
};

//현재 접속한 사용자 정보 반환
export const getCurrentUser = () => {
    const {uid, displayName, email, photoURL} = authService.currentUser;
    return {uid, name: displayName, email, photoUrl: photoURL};
};

//사용자 사진 수정
export const updateUserPhoto = async photoUrl => {
    const user = authService.currentUser;
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({photoURL: storageUrl});
    return {name: user.displayName, email: user.email, photoUrl: user.photoURL};
};

export const db = getFirestore(app);

//DB 채널 생성
export const createChannel = async ({title, description}) => {
    const channelCollection = collection(db, 'channels');
    const newChannelRef = doc(channelCollection);
    const id = newChannelRef.id;
    const newChannel = {
        id,
        title,
        description,
        createdAt: Date.now(),
    };
    await setDoc(newChannelRef, newChannel);
    return id;
};

//메시지 전송
export const createMessage = async ({channelId, message}) => {
    const docRef = doc(db, `channels/${channelId}/messages`, message._id);
    await setDoc(docRef, {...message, createdAt: Date.now()});
}

