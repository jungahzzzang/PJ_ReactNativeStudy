import React from "react";
import { Button } from "react-native";
import styled from "styled-components";

const Container = styled.SafeAreaView`
    align-items: center;
    background-color: #ffffff;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;


// const Home = () => {
//     return(
//         <Container>
//             <StyledText>Home</StyledText>
//             <Button title="go to the list screen" />
//         </Container>
//     );
// };

/*
    Home 화면에서 props로 전달되는 navigation을 사용해서 버튼 클릭 시 List 화면으로 이동하도록
*/
const Home = ({navigation}) => {
    return(
        <Container>
            <StyledText>Home</StyledText>
            <Button title="go to the list screen"
            onPress={()=>navigation.navigate('List')}
            />
        </Container>
    );
};

export default Home;