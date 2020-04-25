import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, TouchableOpacity, TextInput, FlatList, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import randHex from '../../Hex';
import styles from './styles';

export default function Items() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const [listItems, setListItems] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  function navigateToLists() {
    navigation.navigate('Lists');
  };

  // ITEMS HANDLER _____________________________________________________________
  function handleAddItem() {
    try {
      let newItems = items.map(item => { return item });
      newItems = newItems.concat({ "id": randHex(12), "value": text, "list": listName });
      setItems(newItems);
      setText('');
    }
    catch (error) {
      setItems([{ "id": randHex(12), "value": text, "list": listName }]);
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

  // LIST HANDLER ______________________________________________________________
  // GET LIST NAME FROM CURRENT LIST
  useEffect(() => {
    let list = route.params.list.value;
    setListName(list.toString());
  }, []);

  // GET LIST ITEMS NAME FROM CURRENT LIST
  useEffect(() => {
    let newListItems = items.filter(item => item.list === listName);
    setListItems(newListItems);
  }, [items]);

  // ASYNC STORAGE _____________________________________________________________
  // GET ASYNC STORAGE DATA
  useEffect(() => {
    async function getData() {
      try {
        const list = await AsyncStorage.getItem('ITEMS');
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
        await AsyncStorage.setItem('ITEMS', JSON.stringify(items));
      }
      catch (error) {
        alert("Couldn't store your data :(");
      }
    };
    setData();
  }, [items]);

  // RENDER ITEM _______________________________________________________________
  // BACKGROUND FOR RENDER ITEM
  function backgroundSelected(selected) {
    return {
      backgroundColor: selected ? "#77d49c" : "#fff",
      borderBottomColor: selected ? "#5cbf83" : "#efefef",
    }
  };

  // TEXT FOR RENDER ITEM
  function textSelected(selected) {
    return {
      color: selected ? "#fff" : "#000",
      fontWeight: selected ? "bold" : "normal"
    }
  };

  // RENDER ITEM FOR FLATLIST
  const renderItem = ({ item }) =>
  (<TouchableOpacity
    style={[styles.listItem, backgroundSelected(item.selected)]} onPress={() => handleSelectItem(item.id)}>
    <Text style={[styles.listText, textSelected(item.selected)]}>{item.value}</Text>
    <TouchableOpacity style={styles.listButton} onPress={() => handleDeleteItem(item.id)}>
      <Feather name="x" size={18} color={item.selected ? "#c5f0d4" : "#c1c1c1"} />
    </TouchableOpacity>
  </TouchableOpacity>);

  // VISUAL ____________________________________________________________________
  return (
    <View style={styles.container}>
      <View style={styles.headerName}>
        <TouchableOpacity style={styles.headerButtonBack} onPress={navigateToLists}>
          <Feather name="arrow-left" size={22} color="#fdcfff" />
        </TouchableOpacity>
        <Text style={styles.headerNameText}>{listName}</Text>

      </View>

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
        data={listItems}
        renderItem={renderItem}
        keyExtractor={item => (item.id)}
      />

      <TouchableOpacity style={styles.footer} onPress={handleFinishItem}>
        <Text style={styles.footerText}>Done!</Text>
      </TouchableOpacity>

    </View>
  );

}