import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ViewBase } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';

export default function TodoApp({ user }) {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                Alert.alert('Error signing out:', error.message);
            } else {
                Alert.alert('Signed out successfully!');
            }
        } catch (error) {
            Alert.alert('Error signing out:', error.message);
        }
    };

    const fetchTasks = async () => {
        const { data: todos, error } = await supabase.from('todos').select('*');
        if (error) {
            console.error('Error fetching tasks:', error.message);
        } else {
            setTasks(todos);
        }
    };

    const TaskBoxes = tasks.map((item) => {
        return (
            <Task
                key={item.id}
                id={item.id}
                text={item.task}
                is_complete={item.is_complete}
                onPress={() => handleToggleTask(item.id, item.is_complete)}
                onDelete={() => handleDeleteTask(item.id)}
            />
        );
    });

    function Task({ id, text, is_complete, onPress, onDelete }) {
        return (
            <TouchableOpacity style={styles.tasksItemContainer} onPress={onPress}>
                <Ionicons
                    style={styles.box}
                    name={is_complete ? 'checkbox-outline' : 'square-outline'}
                    size={30}
                    color={is_complete ? 'green' : 'black'}
                />
                <Text style={[styles.taskItem, is_complete ? styles.is_completeTask : null]}>{text}</Text>
                <TouchableOpacity style={styles.tasksDeleteContainer} onPress={onDelete}>
                    <Ionicons style={styles.del} name="trash-outline" size={30} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    const handleAddTask = async () => {
        if (task.trim() === '') {
            return;
        }
        const { data, error } = await supabase.from('todos').insert([{ task, user_id: user.id }]).select();
        console.log(data);
        if (error) {
            console.error('Error adding task:', error.message);
        } else {
            const insertedTask = data ? data[0] : {};
            console.log(data, insertedTask);
            setTasks([...tasks, insertedTask]);
            setTask('');
        }
    };

    const handleToggleTask = async (id, is_complete) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ is_complete: !is_complete })
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error updating task:', error.message);
        } else {
            const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, is_complete: !is_complete } : t));
            setTasks(updatedTasks);
        }
    };

    const handleDeleteTask = async (id) => {
        const { error } = await supabase.from('todos').delete().eq('id', id);
        if (error) {
            console.error('Error deleting task:', error.message);
        } else {
            const updatedTasks = tasks.filter((t) => t.id !== id);
            setTasks(updatedTasks);
        }
    };

    const handleClearTasks = async () => {
        const { error } = await supabase.from('todos').delete().eq('user_id', user.id);
        if (error) {
            console.error('Error clearing tasks:', error.message);
        } else {
            setTasks([]);
        }
    };

    return (
        <View>
        <View style={styles.container}>
            <View style={styles.tasksSignOutContainer}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Ionicons style={styles.signOut} name="log-out-outline" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.boldText}>Todo App</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add Task"
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <Button title="Add Task" disabled={task.length < 1} onPress={handleAddTask} />
            </View>
            <View style={styles.tasksContainer}>{TaskBoxes}</View>
            <View style={styles.clearButtonContainer}>
                <Button style={styles.btn} title="Clear Tasks" onPress={handleClearTasks} />
            </View>
        </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginLeft: '130px',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
    },
    header: {
        position: 'absolute',
        top: 0,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: '16px',
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        position: 'absolute',
        top: '10%',
        marginRight: 30,
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    tasksContainer: {
        position: 'absolute',
        top: '20%',
        width: '311%',
    },
    taskItem: {
        fontWeight: 'bold',
        fontSize: '20px',
        width: '75%',
    },
    clearButtonContainer: {
        marginTop: '500px',
    },
    tasksItemContainer: {
        flexDirection: 'row',
        padding: '10px',
    },
    box: {
        marginRight: '5%',
    },
    is_completeTask: {
        textDecorationLine: 'line-through',
    },
    tasksSignOutContainer: {
        position: 'absolute',
        top: '1%',
        left: '200%',
    },
});