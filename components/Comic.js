import * as React from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container:{
     backgroundColor: '#46237A',
     borderColor:"black",
     border: "2px solid",
     height:360,
     width:240,
     alignItems: 'center',
     // justifyContent: 'center',
     borderRadius:2,
     margin:3,
     padding:3,
     direction: 'column'
   },
  image:{
    width:'100%',
    height:"80%",
    margin:2
  },
  title:{
    color:"#FCFCFC"
  }
});

export default function Comic({ name, image }) {
  
  return (
    <View style={styles.container}>
			<Image
      style={styles.image}
				source={{uri:image}}
			/>
			<Text style={styles.title}>{name}</Text>
    </View>
  )
}
