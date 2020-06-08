import React, { useState, useReducer, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { editProduct, addProduct } from '../../store/actions/product';
import MainButton from '../../components/Button';
import Product from '../../models/product';
import Input from '../../components/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReudcer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.payload.input]: action.payload.value,
      };
      const updatedValidites = {
        ...state.inputValidities,
        [action.payload.input]: action.payload.isValid,
      };
      let formIsValid = true;
      for (let key in updatedValidites) {
        formIsValid = formIsValid && updatedValidites[key];
      }
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidites,
        isFormValid: formIsValid,
      };
    default:
      return state;
  }
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();

  const productId = props.navigation.getParam('productId');
  let product;
  if (productId) {
    product = useSelector((state) =>
      state.products.products.find((p) => p.id === productId)
    );
  }

  const [formState, dispatchFormState] = useReducer(formReudcer, {
    inputValues: {
      title: product && product.title ? product.title : '',
      imageUrl: product && product.imageUrl ? product.imageUrl : '',
      description: product && product.description ? product.description : '',
      price: product && product.price ? product.price : 0,
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    isFormValid: product ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        payload: {
          value: inputValue,
          isValid: inputValue,
          input: inputIdentifier,
        },
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    console.log('aa');
    if (!formState.isFormValid) {
      Alert.alert('Wrong input', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (product) {
      dispatch(
        editProduct({
          productId,
          productTitle: formState.inputValues.title,
          productImageUrl: formState.inputValues.imageUrl,
          productDescription: formState.inputValues.description,
        })
      );
    } else {
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        formState.inputValues.price
      );
      dispatch(addProduct(newProduct));
    }
  }, [dispatch, product, formState]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <Text style={styles.title}>Edit Product</Text>
        <View style={styles.formContainer}>
          <Input
            id='title'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            autoCorrect
            label='Title'
            errorText='Please enter a valid title!'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ''}
            initiallyValid={!!product}
            required
          />

          <Input
            id='imageUrl'
            keyboardType='default'
            returnKeyType='next'
            label='Image Url'
            errorText='Please enter a valid image url!'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imageUrl : ''}
            initiallyValid={!!product}
            required
          />

          {product ? null : (
            <Input
              id='price'
              keyboardType='decimal-pad'
              returnKeyType='next'
              label='Price'
              errorText='Please enter a valid price!'
              onInputChange={inputChangeHandler}
              initialValue={product ? product.price : ''}
              initiallyValid={!!product}
            />
          )}

          <Input
            id='description'
            keyboardType='default'
            returnKeyType='next'
            label='Description'
            multiline
            numberOfLines={3}
            errorText='Please enter a valid description!'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.description : ''}
            initiallyValid={!!product}
            required
          />
        </View>
        <View style={styles.buttonSubmit}>
          <MainButton title='Save' onPress={() => submitHandler()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    height: '100%',
  },
});

export default EditProductScreen;
