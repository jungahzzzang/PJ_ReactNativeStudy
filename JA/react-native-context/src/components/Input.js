import React, {useState} from "react";
import styled from "styled-components";
import { UserConsumer } from "../contexts/User";

//UserProvider 컴포넌트의 value로 전달되는 세터함수를 이용해 입력되는 값으로
//Context의 값을 변경하는 컴포넌트

const StyledInput = styled.TextInput`
    border: 1px solid #686860;
    width: 250px;
    padding: 10px 15px;
    margin: 10px;
    font-size: 24px;
`;

const Input = () => {
    const [name, setName] = useState('');

    return(
        <UserConsumer>
            {({dispatch})=>{
                return(
                    <StyledInput
                        value={name}
                        onChangeText={text=>setName(text)}
                        onSubmitEditing={()=>{
                            dispatch(name);
                            setName('');
                        }}
                        placeholder="Enter a name..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                    />
                );
            }}
        </UserConsumer>
    );
};

export default Input;