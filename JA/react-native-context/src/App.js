import React from "react";
import styled from "styled-components";
import User from "./components/User";
import UserContext from "./contexts/User";
import { UserProvider } from "./contexts/User";
import Input  from "./components/Input";

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
`;

// const App = () => {
//     return (
//         <Container>
//             <User />
//         </Container>
//     );
// };

const App = () => {
    return(
        // <UserContext.Provider value={{name:'CodeArchive'}}>
        <UserProvider>
            <Container>
                <User />
                <Input />
            </Container>
        </UserProvider>
    // </UserContext.Provider>
    );
   
};

export default App;