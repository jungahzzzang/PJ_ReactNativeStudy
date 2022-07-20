import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from "../components";
import { ProgressContext, UserContext } from "../contexts";
import MainStack from "./MainStack";

const Navigation = () => {

    const {inProgress} = useContext(ProgressContext);
    const {user} = useContext(UserContext);

    return(
        <NavigationContainer>
            {/* <AuthStack /> */}
            {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
            {/* <MainStack /> */}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;