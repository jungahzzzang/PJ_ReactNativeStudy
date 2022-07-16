import React from "react";
import styled from "styled-components";
import UserContext from "../contexts/User";
import { UserConsumer } from "../contexts/User";

const StyledText = styled.Text`
    font-size: 24px;
    margin: 18px;
`;

// const User = () => {
//     return (
//         <UserContext.Provider value={{name: 'CodeArchive'}}>
//             <UserContext.Consumer>
//                 {value => <StyledText>Name: {value.name}</StyledText>}
//             </UserContext.Consumer>
//         </UserContext.Provider>
//     );
// };

const User = () => {
    return (
        <UserConsumer>
            {({user})=><StyledText>Name: {user.name}</StyledText>}
        </UserConsumer>
    );
};

export default User;