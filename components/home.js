import * as React from 'react';
import { Text, View , ActivityIndicator,FlatList} from 'react-native';
import CharacterCard from './character';
import { Searchbar } from 'react-native-paper';
import apiParams from '../config.js';
import axios from 'axios';

export default function Home(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;
const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    axios.get(`${baseURL}/v1/public/characters`, {
      params: {
        ts,
        apikey,
        hash
      }
    })
      .then(response => setData(response.data.data.results))
      .catch(error => console.error(error))
      .finally(() => {setLoading(false)});
  }, []);

  function searchCharacter() {
if(search) {
 setLoading(true);
 axios.get(`${baseURL}/v1/public/characters`, {
   params: {
     ts,
     apikey,
     hash,
     nameStartsWith: search
   }
 })
   .then(response => setData(response.data.data.results))
   .catch(error => console.error(error))
   .finally(() => setLoading(false));
}
}
  return (
    <View >
    <Searchbar
placeholder="Search for character..."
onChangeText={value => setSearch(value)}
value={search}
onIconPress={searchCharacter}
onSubmitEditing={searchCharacter}
/>
      {isLoading
        ? <ActivityIndicator size="large" color="#00ff00" />
        : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <CharacterCard
              {...props}
                id={item.id}
                image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`}
                name={item.name} />
            )}
          />
        )
      }
    </View>
  );
}
