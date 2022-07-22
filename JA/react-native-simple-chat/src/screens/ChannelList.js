import React, {useContext, useState, useEffect} from "react";
import styled, {ThemeContext} from "styled-components";
//import {Text, Button} from 'react-native';
import { FlatList } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import { app } from "../utils/firebase";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import moment from 'moment';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.listBorder};
    padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;

const ItemDescription = styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color: ${({theme}) => theme.listTime};
`;

const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({theme}) => theme.listTime};
`;

const channels = [];
    for(let idx=0; idx<1000; idx++){
        channels.push({
            id: idx,
            title: `title ${idx}`,
            description: `description ${idx}`,
            createdAt: idx,
        });
    }

const getDateOrTime = ts => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};
            //컴포넌트의 리렌더링 방지
const Item = React.memo(
    ({item: {id, title, description, createdAt}, onPress}) => {
    const theme = useContext(ThemeContext);
    console.log(`Item: ${id}`);

    return(
        <ItemContainer onPress={() => onPress({id, title})}>
            <ItemTextContainer>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemTextContainer>
            <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
            <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={theme.listIcon}
            />
        </ItemContainer>
    );
}

);

const ChannelList = ({navigation}) => {

    //렌더링할 데이터를 받아온 후 useState를 이용해 관리할 channels 생성
    const [channels, setChannels] = useState([]);

    const db = getFirestore(app);

    useEffect(() => {
        const collectionQuery = query(
            //최근에 만들어진 채널이 가장 위로 오도록 내림차순 설정
            collection(db,'channels'),
            orderBy('createdAt', 'desc')
        );
        //onSnapshot 함수를 이용해 데이터베이스에서 데이터를 수신
        //onSnapshot: 수신 대기 상태로 있다가 데이터베이스에 문서가 추가되거나 수정될 때마다 지정된 함수가 호출됨.
        const unsubscribe = onSnapshot(collectionQuery, snapshot => {
            const list = [];
            snapshot.forEach(doc=>{
                list.push(doc.data());
            });
            setChannels(list);
        });
        return () => unsubscribe();
    }, []);

    const _handleItemPress = params => {
        navigation.navigate('Channel',params);
    };

    return(
        <Container>
            {/* <Text style={{fontSize: 24}}>Channel List</Text> */}
            <FlatList
                keyExtractor={item=>item['id']}
                data={channels}
                renderItem={({item}) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
                //현재 화면과 앞뒤로 한 화면만큼만 렌더링되도록 조절
                windowSize={3}
            />
            {/* <Button
                title="Channel Creation"
                onPress={() => navigation.navigate('Channel Creation')}
            /> */}
        </Container>
    );
};

export default ChannelList;