import * as React from 'react';
import { Text, View,  Image ,StyleSheet, TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#256EFF',
    borderColor:"black",
    border: "2px solid",
    width:'100%',
    maxHeight:80,
    alignItems: 'center',
    // justifyContent: 'center',
    padding:3,
    flexDirection: 'row'
  },
  previewImage:{
    height:70,
    width:90,
    margin:4
  }
});
export default function CharacterCard({image,id, name,navigation}) {

  return (

    <TouchableOpacity style={styles.container} onPress={()=>{ navigation.navigate("Detail",{name,image,id})}}>
			<Image
        style={styles.previewImage}
				source={image}
			/>
      <Text name={name}>{name}</Text>
    </TouchableOpacity>
  );
}
