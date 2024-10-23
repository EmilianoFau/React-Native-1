
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Task from '../components/Task/Task';
import luke from '../images/luke.jpg';
import beer from '../images/beer.jpg';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [taskList, setTaskList] = useState<string[]>([]);
  const [image, setImage] = useState(true);

  const toggleImage = () => {
    setImage(!image);
  };

  const addTask = () => {
    if (taskText.trim()) {
      setTaskList([...taskList, taskText]);
      setTaskText(''); 
    }
  };

  const deleteTask = (index: number) => {
    const newTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(newTaskList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.countText}>{count}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Increment" onPress={() => setCount(count + 1)} />
          <Button title="Decrement" onPress={() => setCount(count - 1)} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='si' value={text} onChangeText={setText} />
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.taskInputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Task' 
          value={taskText} 
          onChangeText={setTaskText} 
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
      <View>
        <FlatList
          data={taskList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Task task={item} onDelete={() => deleteTask(index)} />
          )}
        />
      </View>

      <TouchableOpacity onPress={toggleImage}>
        <Image 
          source={image ? luke : beer} 
          style={styles.image} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  countText: {
    fontSize: 48,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  inputContainer: {
    alignItems: 'center',
    width: '80%',
  },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
  image: {
    width: 200,  
    height: 200, 
    marginBottom: 20, 
  },
});

