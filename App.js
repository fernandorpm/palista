import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, AsyncStorage, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import randHex from './Hex';

import styles from './styles';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const renderItem = ({ item }) =>
  (<TouchableOpacity
    style={[styles.listItem, itemSelected(item.selected)]} onPress={() => handleSelectItem(item.id)}>
    <Text style={styles.listText}>{item.value}</Text>
    <TouchableOpacity style={styles.listButton} onPress={() => handleDeleteItem(item.id)}>
      <Feather name="x" size={18} color="#c1c1c1" />
    </TouchableOpacity>
  </TouchableOpacity>);

  function itemSelected(selected) {
    return {
      backgroundColor: selected ? "#2fc495" : "#fff",
      borderBottomColor: selected ? "#22a37b" : "#efefef",
    }
  };

  function handleAddItem() {
    setItems([...items, {
      "id": randHex(12),
      "value": text
    }]);
    setText('');
  };

  function handleDeleteItem(id) {
    let newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  function handleSelectItem(id) {
    let newSelected = items.map(item => {
      if (item.id === id) {
        item.selected = !item.selected;
        return item;
      } else {
        return item;
      }
    });
    setItems(newSelected);
  };

  // GET ASYNC STORAGE DATA
  useEffect(() => {
    async function getData() {
      try {
        const list = await AsyncStorage.getItem('LIST_ITEMS');
        if (list !== null) {
          setItems(JSON.parse(list));
          console.log('entrou try e if getItem');

        }
      }
      catch (error) {
        alert("Couldn't load your data :(");
      }
    };
    getData();
  }, []);

  // SET ASYNC STORAGE DATA
  useEffect(() => {
    async function setData() {
      //if (items.length > 0) {
      try {
        await AsyncStorage.setItem('LIST_ITEMS', JSON.stringify(items));
        console.log('entrou try setItem');
      }
      catch (error) {
        alert("Couldn't store your data :(");
      }
      //}
    };
    setData();
  }, [items]);

  // VISUAL
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.headerSearch}>
          <TextInput
            style={styles.headerInput}
            placeholder="Add Item"
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
          <TouchableOpacity style={styles.headerButton} onPress={handleAddItem}>
            <Feather name="plus" size={20} color="#000" />
          </TouchableOpacity>
        </View>

      </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => (item.id)}
        />

    </View>

  );
}


