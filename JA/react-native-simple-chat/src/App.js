import React, { useState } from "react";
import { StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from "styled-components";
import { theme } from './theme';
import Navigation from './navigations';
import {images } from './utils/images';
import { ProgressProvider, UserProvider } from "./contexts";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync().catch(console.warn);

const cacheImages = images => {
    return images.map(image=>{
        if(typeof image === 'string'){
            return Image.prefetch(image);
        }else{
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

/*
    앞으로 프로젝트에서 사용할 이미지, 폰트를 미리 불러와 사용할 수 있도록
*/

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
    const [isReady, setIsReady] = useState(false);

    const _loadAssets = async () => {
        const imageAssets = cacheImages([require('../assets/splash.png'), ...Object.values(images),]);
        const fontAssets = cacheFonts([]);

        await Promise.all([...imageAssets, ...fontAssets]);
    };

    return isReady? (
        <ThemeProvider theme={theme}>
            <UserProvider>
            <ProgressProvider>
            <StatusBar barStyle="dark-content"/>
            <Navigation />
            </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync={_loadAssets}
            onFinish={()=>setIsReady(true)}
            onError={console.warn}
        />
    );
};

export default App;