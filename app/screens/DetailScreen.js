import axios from 'axios';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchContactDetail} from '../redux/contactDetail';
import {API_URL} from '../constants/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../components/Loading';

export function DetailScreen() {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {detail, loading} = useSelector(state => state.contactDetail);
  const dispatch = useDispatch();

  const fetchContactData = async () => {
    try {
      const {data} = await axios(API_URL + '/contact/' + params.contactId);
      dispatch(fetchContactDetail(data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContactData();
    return () => {
      dispatch(fetchContactDetail({}))
    }
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View>
      <View style={styles.header}>
      <TouchableOpacity style={styles.back} onPress={() => {
        dispatch(fetchContactDetail({}))
        navigation.goBack()
      }}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Form', {
        screen: "Edit Contact",
        contact: detail
      })}>
        <Text style={styles.backText}>Edit</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.contactItem}>
        <Image source={{uri: detail.photo}} style={styles.tinyLogo} />
        <Text style={styles.name}>
          {detail.firstName} {detail.lastName} - ({detail.age} years)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: "pink",
  },
  back: {
    padding: 16,
  },
  backText: {
    fontWeight: '300'
  },
  contactItem: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 150/2,
    borderWidth: 3,
    marginRight: 16,
  },
  name: {
    margin: 8,
    fontWeight: '300',
    fontSize: 24,
  },
});
