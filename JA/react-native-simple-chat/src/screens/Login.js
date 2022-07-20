import React, {useState, useRef, useEffect, useContext} from "react";
import { ProgressContext, UserContext } from "../contexts";
import styled from "styled-components";
//import { Button } from 'react-native';
import { Image, Input, Button } from '../components';
import {images} from '../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Alert} from 'react-native';
import {login} from '../utils/firebase';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme })=> theme.background};
    padding: 0 20px;
    padding-top: ${({insets: {top}}) => top}px;
    padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

//로그인 화면에서 입력 값이 올바른 이메일 형식인지 확인
const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({theme})=>theme.errorText};
`;

const Login = ({ navigation }) => {

    const {dispatch} = useContext(UserContext);
    const insets = useSafeAreaInsets();
    const {spinner} = useContext(ProgressContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleLoginButtonPress = async () => {
        try{
            spinner.start();
            const user = await login({email, password});
            //Alert.alert('Login Success', user.email);
            //인증되면 UserContext의 user를 수정하도록
            dispatch(user);
        }catch(e){
            Alert.alert('Login Error', e.message);
        }finally{
            spinner.stop();
        }
    };

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : 'Please verify your email'
        );
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    return(
        //활성화된 키보드를 닫음.
        // <TouchableWithoutFeedback onPress={Keyboard.didmiss}>
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}>
        <Container insets={insets}>
            {/* <Text style={{fontSize: 30}}>Login Screen</Text> */}
            <Image url={images.logo} imageStyle={{borderRadius: 8}}/>
            <Input
                label="Email"
                value={email}
                /*onChangeText={text=>setEmail(text)}*/
                onChangeText={_handleEmailChange}
                onSubmitEditing={()=>passwordRef.current.focus()}
                placeholder="Email"
                returnKeyType="next"
            />
            <Input
                ref={passwordRef}
                label="Password"
                value={password}
                /*ChangeText={text=>setPassword(text)}*/
                onChangeText={_handlePasswordChange}
                /*onSubmitEditing={()=>{}}*/
                onSubmitEditing={_handleLoginButtonPress}
                placeholder="Password"
                returnKeyType="done"
                isPassword
            />
            {/* <Button title="Signup" onPress={()=>navigation.navigate('Signup')} /> */}
            <ErrorText>{errorMessage}</ErrorText>
            <Button title="Login" onPress={_handleLoginButtonPress} disabled={disabled} />
            <Button
                title="Sign up with email"
                onPress={()=>navigation.navigate('Signup')}
                isFilled={false}
            />
        </Container>
        {/* </TouchableWithoutFeedback> */}
        </KeyboardAwareScrollView>
    );
};

export default Login;