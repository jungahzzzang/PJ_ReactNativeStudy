import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { theme } from './theme';
import { Dimensions, StatusBar } from 'react-native';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({theme}) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({width})=>width -40}px;
`;

export default function App() {
    
    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    //할 일 추가
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID] : {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    };

    //할 일 삭제
    const _deleteTask = id => {
        const currentTasks = Object.assign({},tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    //할 일 완료
    const _toggleTask = id => {
        const currentTasks = Object.assign({},tasks);
        currentTasks[id]['completed']=!currentTasks[id]['completed'];
        setTasks(currentTasks);
    }

    //할 일 수정
    const _updateTask = item => {
        const currentTasks = Object.assign({},tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };
    
    const _handleTextChange = text => {
        setNewTask(text);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar barStyle="light-content" backgroundColor={theme.background}/>
                <Title>TODO List</Title>
                <Input
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task
                                key={item.id}
                                item={item}
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                        ))}
                </List>
                {/* <IconButton type={images.uncompleted} />
                <IconButton type={images.completed} />
                <IconButton type={images.delete} />
                <IconButton type={images.update} /> */}
            </Container>
        </ThemeProvider>
    );
};