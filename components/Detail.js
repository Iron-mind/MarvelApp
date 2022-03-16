

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { Text, View,  Image } from 'react-native';
import Information from './Information.js'
import Comics from './Comics.js'
const Tab = createBottomTabNavigator();

import { ActivityIndicator } from 'react-native';
import apiParams from '../config.js';
import axios from 'axios';


export default function Detail({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;

  useEffect(() => {
    axios.get(`${baseURL}/v1/public/characters/${route.params.id}`, {
      params: {
        ts,
        apikey,
        hash
      }
    })
      .then(response => setData(response.data.data.results[0]))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Information"
      tabBarOptions={{
        activeTintColor: 'darkred'
      }}
    >
      <Tab.Screen
        name="Information"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information-circle" color={color} size={size} />
          )
        }}
      >
        {() =>
          (isLoading
            ? <ActivityIndicator size="large" color="#00ff00" />
            : <Information
                image={`${data?.thumbnail?.path}.${data.thumbnail.extension}`}
                name={data.name}
                description={data.description}
              />
          )
        }
      </Tab.Screen>

      <Tab.Screen
        name="Comics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          )
        }}
      >
        {() =>
          (isLoading
            ? <ActivityIndicator size="large" color="#00ff00" />
            : <Comics
                listComics={data?.comics?.items}
              />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
