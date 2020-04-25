import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, TextInput, FlatList, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import randHex from '../../Hex';

import styles from './styles';

export default function Lists() {
  const [text, setText] = useState('');
  const [items, setitems] = useState([]);

  const navigation = useNavigation();

  function navigateToItems(list) {
    navigation.navigate('Items', { list });
  };

  // LISTS HANDLER _____________________________________________________________
  function handleAddItem() {
    try {
      let newitems = items.map(item => { return item });
      newitems = newitems.concat({ "id": randHex(12), "value": text });
      setitems(newitems);
      setText('');
    }
    catch (error) {
      setitems([{ "id": randHex(12), "value": text }]);
      setText('');
    }

  };

  function handleDeleteItem(id) {
    let newitems = items.filter(item => item.id !== id);
    setitems(newitems);
  };

  // ASYNC STORAGE _____________________________________________________________
  // GET ASYNC STORAGE DATA
  useEffect(() => {
    async function getData() {
      try {
        const list = await AsyncStorage.getItem('LISTS');
        setitems(JSON.parse(list));
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
        await AsyncStorage.setItem('LISTS', JSON.stringify(items));
      }
      catch (error) {
        alert("Couldn't store your data :(");
      }
    };
    setData();
  }, [items]);

  // RENDER ITEM _______________________________________________________________
  const renderItem = ({ item }) =>
    (<TouchableOpacity
      style={styles.listItem} onPress={() => navigateToItems(item)}>
      <Text style={styles.listText}>{item.value}</Text>
      <TouchableOpacity style={styles.listButton} onPress={() => handleDeleteItem(item.id)}>
        <Feather name="x" size={18} color="#fbadff" />
      </TouchableOpacity>
    </TouchableOpacity>);

  // VISUAL ____________________________________________________________________
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.headerSearch}>
          <TextInput
            style={styles.headerInput}
            placeholder="Create List"
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