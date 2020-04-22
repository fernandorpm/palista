import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import randHex from './Hex';

import styles from './styles';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const renderItem = ({ item }) =>
  (<TouchableOpacity
    style={[styles.listItem, backgroundSelected(item.selected)]} onPress={() => handleSelectItem(item.id)}>
    <Text style={[styles.listText, textSelected(item.selected)]}>{item.value}</Text>
    <TouchableOpacity style={styles.listButton} onPress={() => handleDeleteItem(item.id)}>
      <Feather name="x" size={18} color={item.selected? "#c5f0d4" : "#c1c1c1"} />
    </TouchableOpacity>
  </TouchableOpacity>);

  function backgroundSelected(selected) {
    return {
      backgroundColor: selected ? "#77d49c" : "#fff",
      borderBottomColor: selected ? "#5cbf83" : "#efefef",
    }
  };

  function textSelected(selected) {
    return {
      color: selected ? "#fff" : "#000",
      fontWeight: selected ? "bold" : "normal"
    }
  };

  function handleAddItem() {
    try {
      let newItems = items.map(item => {return item});
      newItems = newItems.concat({"id": randHex(12), "value": text});
      setItems(newItems);
      setText('');
    } 
    catch (error) {
      setItems([{"id": randHex(12), "value": text}]);
      setText('');
    }

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

  function handleFinishItem() {
    try {
      let newItems = items.filter(item => !item.selected);
      setItems(newItems);
    } catch (error) {
      console.log("Failed to finish items!");
    }
    
  };

  // GET ASYNC STORAGE DATA
  useEffect(() => {
    async function getData() {
      try {
        const list = await AsyncStorage.getItem('LIST_ITEMS');
        setItems(JSON.parse(list));
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
      try {
        await AsyncStorage.setItem('LIST_ITEMS', JSON.stringify(items));
      }
      catch (error) {
        alert("Couldn't store your data :(");
      }
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

      <TouchableOpacity style={styles.footer} onPress={handleFinishItem}>
        <Text style={styles.footerText}>Done!</Text>
      </TouchableOpacity>

    </View>

  );
}


