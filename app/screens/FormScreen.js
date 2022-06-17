import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {API_URL} from '../constants/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Toast } from '../components/Toast';

export function FormScreen() {
  const {params} = useRoute();
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    age: '',
  });
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (params.contact) {
      setContact(params.contact);
    }
  }, [params]);

  const navigation = useNavigation();

  const submitData = async () => {
    setLoading(true)
    try {
      const method = params.screen === 'Add Contact' ? "post" : "put"
      const api_endpoint = params?.screen == 'Add Contact' ? API_URL + '/contact'  : API_URL + '/contact/' + params.contact.id
      await axios[method](api_endpoint, contact, {
        headers: {
          'Accept': 'application/json'
        }
      });
      navigation.replace('Home')
    } catch (error) {
      if(error.response.data.statusCode >= 400) Toast("Error " + error.response.data.message);
      else Toast("Success submit contact")
    } finally {
      setLoading(false)
    }
  };

  const changeInput = (name, value) => {
    setContact({
      ...contact,
      [name]: name !== 'age' ? value : value == +value ? +value : 0,
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>{params.screen}</Text>
      </View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={value => changeInput('firstName', value)}
          value={contact?.firstName}
          placeholder="First Name"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => changeInput('lastName', value)}
          value={contact?.lastName}
          placeholder="Last Name"
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          onChangeText={value => changeInput('photo', value)}
          value={contact?.photo}
          placeholder="Photo Url"
          keyboardType="url"
        />

        <TextInput
          style={styles.input}
          onChangeText={value => changeInput('age', value)}
          value={String(contact?.age)}
          placeholder="Age"
          keyboardType="number-pad"
        />

        <TouchableOpacity style={styles.submit} onPress={submitData} disabled={loading}>
          <Text style={styles.submitText}>{loading ? 'Loading...': 'Submit'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: "pink",
    padding: 12,
    margin: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  submitText: {
    fontWeight: "500",
    color: "#fff"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "pink",
  },
  back: {
    padding: 16,
  },
  backText: {
    fontWeight: '300',
  },
  titleText: {
    fontWeight: '500',
  },
  contactItem: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "pink",
    padding: 10,
  },
});
