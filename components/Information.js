import * as React from 'react';
import { Text, View,StyleSheet,Image } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderColor:"black",
    borderWidth: 2,
    width:'100%',
    height:"100%",
    alignItems: 'center',
    fontWeight:"100",
        // justifyContent: 'center',
    padding:3,
    flexDirection: 'column'
  },
  image:{
    width:"100%",
    height:190,
    margin:4
  },
  title:{
    fontSize:20
  },
  description:{
    fontSize:16

  }
});



export default function Information({ image, name, description }) {

 return (
   <View style={styles.container}>
   <Image
      style={styles.image}
      source={{uri:image}}
    />
     <Text style={styles.title}>{name}</Text>
     <Text style={styles.description}>{description}</Text>
   </View>
 )
}
