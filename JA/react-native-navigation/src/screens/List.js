import React from "react";
import { Button } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const items = [
    {_id: 1, name: 'React Native'},
    {_id: 2, name: 'React Navigation'},
    {_id: 3, name: 'JavaScript'},
];

const List = ({navigation}) => {
    const _onPress = item => {
        //List 화면에서 목록 클릭 시 해당 항목의 정보와 함께 Item 화면으로 이동
        navigation.navigate('Detail',{id: item._id, name: item.name});
    };

    return(
        <Container>
            <StyledText>List</StyledText>
            {items.map(item=>(
                <Button
                    key={item._id}
                    title={item.name}
                    onPress={()=>_onPress(item)}
                />
            ))}
        </Container>
    );
};

export default List;
