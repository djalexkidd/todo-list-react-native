import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Charger les tâches depuis le stockage local lors du montage du composant
        loadTasks();
      }, []);

    useEffect(() => {
    // Enregistrer les tâches dans le stockage local chaque fois qu'elles sont mises à jour
    saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        }
    } catch (error) {
        console.error('Erreur lors du chargement des tâches depuis le stockage local', error);
    }
    };

    const saveTasks = async () => {
    try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des tâches dans le stockage local', error);
    }
    };
    
    const addTask = () => {
        if (task.trim() !== '') {
        setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
        setTask('');
        }
    };

    const toggleTask = (taskId) => {
        const updatedTasks = tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
      };
    
    const removeTask = (taskId) => {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
    };
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
        },
        inputContainer: {
          flexDirection: 'row',
          marginBottom: 16,
        },
        input: {
          flex: 1,
          marginRight: 8,
          padding: 8,
          borderWidth: 1,
          borderRadius: 4,
        },
        taskContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        },
      });

      const renderSeparator = () => (
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            width: "100%"
          }}
        />
      );

      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ajouter une tâche"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <Button title="Ajouter" onPress={addTask} />
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <CheckBox
                  value={item.completed}
                  onValueChange={() => toggleTask(item.id)}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    textDecorationLine: item.completed ? 'line-through' : 'none',
                  }}
                >
                  {item.text}
                </Text>
                <Ionicons name="trash-outline" size={32} onPress={() => removeTask(item.id)} />
              </View>
            )}
          />
        </View>
      );
};