import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductItem = (props) => (
  <TouchableOpacity style={styles.card} onPress={props.onClick}>
    <View>
      <Image style={styles.image} source={{ uri: props.imageUrl }} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {props.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${props.price}</Text>
          <FontAwesome5 name='shopping-bag' size={24} color='#ccc' />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    minHeight: 300,
    marginHorizontal: 10,
    marginBottom: 30,
    width: Dimensions.get('window').width / 2 - 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    padding: 10,
  },
  image: {
    maxWidth: '100%',
    maxHeight: 300,
    minHeight: '40%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 18,
    marginVertical: 20,
  },
  description: {
    color: '#888',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProductItem;
