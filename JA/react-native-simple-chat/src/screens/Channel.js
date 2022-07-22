import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import styled, {ThemeContext} from "styled-components";
// import { Text, FlatList } from "react-native";
import { app, createMessage, getCurrentUser } from "../utils/firebase";
import { getFirestore, collection, onSnapshot, query, doc, orderBy } from "firebase/firestore";
// import { Input } from "../components";
import { Alert } from "react-native";
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {MaterialIcons} from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const SendButton = props => {
    const theme = useContext(ThemeContext);

    return(
        <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
        }}
        >
            <MaterialIcons
                name="send"
                size={24}
                color={
                    props.text ? theme.sendButtonActivate : theme.sendButtonInactivate
                }
            />
        </Send>
    );
};

const Channel = ({navigation, route}) => {

    const theme = useContext(ThemeContext);
    const [messages, setMessages] = useState([]);
    const {uid, name, photoUrl} = getCurrentUser();
    
    const db = getFirestore(app);
    useEffect(() => {
        const docRef = doc(db, 'channels', route.params.id);
        const collectionQuery = query(
            collection(db, `${docRef.path}/messages`),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(collectionQuery, snapshot => {
            const list = [];
            snapshot.forEach(doc => {
                list.push(doc.data());
            });
            setMessages(list);
        });
        return () => unsubscribe();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: route.params.title || 'Channel' });
    }, []);

    const _handleMessageSend = async messageList => {
        const newMessage = messageList[0];
        try{
            await createMessage({channelId: params.id, message: newMessage});
        }catch(e){
            Alert.alert('Send Message Error', e.message);
        }
    };

    return(
        <Container>
            {/* <Text style={{ fontSize:24 }}>Channel</Text> */}
            {/* <Text style={{fontSize: 24}}>ID : {route.params?.id}</Text>
            <Text style={{fontSize: 24}}>Title : {route.params?.title}</Text> */}
            {/* <FlatList
                keyExtractor={item => item[id]}
                data={messages}
                renderItem={({item}) => (
                    <Text style={{fontSize: 24}}>{item.text}</Text>
                )}
            />
            <Input
                value={messages}
                onChangeText={messages => setMessages(messages)}
                onSubmitEditing={()=>createMessage({channelId: params.id, messages})}
            /> */}
            <GiftedChat
                listViewProps={{
                    style: {backgroundColor: theme.background},
                }}
                placeholder="Enter a message..."
                messages={messages}
                user={{_id: uid, name, avatar: photoUrl}}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',    //iOS only
                    underlineColorAndroid: 'transparent',   //Android only
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={props => <SendButton {...props} />}
            />
        </Container>
    );
};

export default Channel;