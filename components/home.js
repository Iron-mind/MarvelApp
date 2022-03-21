import * as React from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import CharacterCard from "./character";
import { Searchbar } from "react-native-paper";
import apiParams from "../config.js";
import axios from "axios";

export default function Home(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [dataInPage, setDataInPage] = React.useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    axios
      .get(`${baseURL}/v1/public/characters`, {
        params: {
          ts,
          apikey,
          hash,
          limit: 100, //more characters for infinity escroll
        },
      })
      .then((response) => {
        setData(response.data.data.results);
        setDataInPage(
          response.data.data.results.slice(0, 10 * currentPage - 1)
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderMoreItems = () => {
    setDataInPage(data.slice(0, 10 * (currentPage + 1) - 1));
    setCurrentPage(currentPage + 1);
  };

  const renderLoader = () => {
    return (
      <View style={{ margin: 20, padding: 20 }}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  };

  function searchCharacter() {
    if (search) {
      setLoading(true);
      axios
        .get(`${baseURL}/v1/public/characters`, {
          params: {
            ts,
            apikey,
            hash,
            nameStartsWith: search,
          },
        })
        .then((response) => setData(response.data.data.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }
  return (
    <View>
      <Searchbar
        placeholder="Search for character..."
        onChangeText={(value) => setSearch(value)}
        value={search}
        onIconPress={searchCharacter}
        onSubmitEditing={searchCharacter}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={dataInPage}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <CharacterCard
              {...props}
              id={item.id}
              image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`}
              name={item.name}
            />
          )}
          ListFooterComponent={renderLoader}
          onEndReached={renderMoreItems}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
}
