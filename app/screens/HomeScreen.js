import axios from 'axios';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchContact, setLoading, setError} from '../redux/contact';
import {API_URL} from '../constants/index';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

export function HomeScreen() {
  const {list, loading, error} = useSelector(state => state.contact);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchContactData = async () => {
    dispatch(setLoading());
    try {
      const {data} = await axios(API_URL + '/contact');
      console.log(JSON.stringify(data.data));
      dispatch(fetchContact(data.data));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading());
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact List</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchContactData} />
        }
        data={list}
        renderItem={({item}) => (
          <View style={styles.cardList}>
            <TouchableOpacity
              style={{flex: 7}}
              onPress={() =>
                navigation.navigate('Details', {
                  contactId: item?.id,
                })
              }>
              <View style={styles.contactItem}>
                <Image source={{uri: item.photo}} style={styles.tinyLogo} />
                <Text style={styles.name}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => {console.log(item.id)}
              }>
                <Text style={{color: 'pink'}}>Delete</Text>
              </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Form', {
        screen: "Add Contact",
      })}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 32,
  },
  cardList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  fab: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50 / 2,
  },
  fabText: {
    fontSize: 24,
    fontWeight: '500',
  },
  contactItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 25,
    borderWidth: 3,
    marginRight: 16,
  },
  name: {
    fontWeight: '300',
    fontSize: 18,
  },
});
