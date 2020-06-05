import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { editProduct, addProduct } from '../../store/actions/product';
import MainButton from '../../components/Button';
import Product from '../../models/product';

const EditProductScreen = (props) => {
  const dispatch = useDispatch();

  const productId = props.navigation.getParam('productId');
  let product;
  if (productId) {
    product = useSelector((state) =>
      state.products.products.find((p) => p.id === productId)
    );
  }

  const [title, setTitle] = useState(
    product && product.title ? product.title : ''
  );
  const [imageUrl, setImageUrl] = useState(
    product && product.imageUrl ? product.imageUrl : ''
  );
  const [description, setDescription] = useState(
    product && product.description ? product.description : ''
  );

  const submitHandler = () => {
    if (product) {
      console.log(productId, title, imageUrl, description);
      dispatch(
        editProduct({
          productId,
          productTitle: title,
          productImageUrl: imageUrl,
          productDescription: description,
        })
      );
    } else {
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        title,
        imageUrl,
        description,
        10.99
      );
      dispatch(addProduct(newProduct));
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Edit Product</Text>
      <View style={styles.formContainer}>
        <View style={styles.input}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            placeholder='title'
            style={styles.textInput}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            value={imageUrl}
            placeholder='Image URL'
            style={styles.textInput}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            placeholder='Description'
            style={styles.textInput}
            numberOfLines={3}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
      <View style={styles.buttonSubmit}>
        <MainButton title='Save' onPress={() => submitHandler()} />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam('productTitle');
  return {
    headerTitle: productTitle || 'Create Product',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  formContainer: {
    marginVertical: 30,
    height: '120%',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 30,
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default EditProductScreen;
