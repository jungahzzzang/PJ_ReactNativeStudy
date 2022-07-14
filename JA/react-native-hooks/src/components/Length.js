import React, {useMemo, useState} from "react";
import styled from 'styled-components';
import Button from './Button';

const StyledText = styled.Text`
    font-size: 24px;
`;

const getLength = text => {
    console.log(`Target Text: ${text}`);
    return text.length;
};

const list = ['JavaScript', 'Expo', 'Expo', 'React Native'];

let idx = 0;
const Length = () => {
    const [text, setText] = useState(list[0]);
    //const [length, setLength] = useState('');
    const _onPress = () => {
        setLength(getLength(text));
        ++idx;
        if (idx < list.length) setLength(list(idx));
    };

    //useMemo를 사용해 text 값이 변경되었을 때에만 길이를 구하도록 수정
    const length = useMemo(()=>getLength(text), [text]);

    return (
        <>
            <StyledText>Text: {text}</StyledText>
            <StyledText>Length: {length}</StyledText>
            <Button title="Get Length" onPress={_onPress} />
        </>
    );
};

export default Length;