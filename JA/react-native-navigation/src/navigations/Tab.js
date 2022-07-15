import React from "react";
import {ceateBottomNavigator, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Mail, Meet, Settings } from "../screens/TabScreens";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const TabIcon = ({name, size, color})=>{
    return <MaterialCommunityIcons name={name} size={size} color={color}/>;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return(
        <Tab.Navigator
        /*
            탭 버튼 순서는 변경하지 않고, 렌더링되는
            첫 번째 화면을 변경하고 싶은 경우 : initialRouteName 속성 이용
        */
        initialRouteName="Settings"
        tabBarOptions={{
            //비활성화된 상태 색 설정
            //activeTintColor: '#ffffff',
            inactiveTintColor: '#0B92E9',
            //탭 바 스타일 변경
            style: {
                backgroundColor: '#54b7f9',
                borderTopColor: '#ffffff',
                borderTopWidth: 2,
            },
            //버튼 아이콘의 아래가 아닌 아이콘 옆에 렌더링
            labelPosition: 'beside-icon',
            //아이콘만 나타나도록
            showLabel: false,
        }}
        >
        <Tab.Screen
            name="Mail"
            component={Mail}
            options={{
                tabBarLabel: 'Inbox',
                tabBarIcon: props =>
                TabIcon({...props,
                name: props.focused ? 'email' : 'email-outline',
            }),
        }}
      />
      <Tab.Screen
        name="Meet"
        component={Meet}
        options={{
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: props.focused ? 'video' : 'video-outline',
            }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: props =>
            TabIcon({
              ...props,
              name: props.focused ? 'settings' : 'settings-outline',
            }),
        }}
      />
    </Tab.Navigator>
  );
};
//컴포넌트마다 아이콘을 지정하지 않고 한 곳에서 모든 버튼의 아이콘을 관리
// screenOptions={({route})=>({
//     tabBarIcon: props => {
//         let name = '';
//         if (route.name === 'Mail') name = 'email';
//         else if (route.name === 'Meet') name = 'video';
//         else name = 'settings';
//         return TabIcon({...props, name});
//     },
// })}

export default TabNavigation;