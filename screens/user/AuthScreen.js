import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../../components/Input';
import MainButton from '../../components/Button';
import { useDispatch } from 'react-redux';
import { authentication } from '../../store/actions/auth';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.payload.input]: action.payload.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.payload.input]: action.payload.validity,
      };
      let isValid = true;
      for (let key in updatedValidities) {
        isValid = isValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        isFormValid: isValid,
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await dispatch(
          authentication(
            'signup',
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
        props.navigation.navigate('Shop');
      } else {
        await dispatch(
          authentication(
            'login',
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
        props.navigation.navigate('Shop');
      }
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        payload: {
          input: inputIdentifier,
          value: inputValue,
          validity: inputValidity,
        },
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <Text style={styles.title}>
        {isSignUp ? 'Create account' : 'Welcome back!'}
      </Text>
      <Text style={styles.description}>
        {isSignUp ? 'Signup and start shopping' : 'Log back into your account'}
      </Text>
      <View style={styles.formContainer}>
        <Input
          id='email'
          keyboardType='default'
          autoCapitalize='none'
          returnKeyType='next'
          autoCorrect
          label='Your Email'
          errorText='Please enter a valid email!'
          onInputChange={inputChangeHandler}
          initialValue=''
          initiallyValid={false}
          required
          email
        />

        <Input
          id='password'
          keyboardType='default'
          secureTextEntry
          returnKeyType='next'
          label='Password'
          errorText='Please enter a valid password!'
          onInputChange={inputChangeHandler}
          initialValue=''
          initiallyValid={false}
          required
          minLength={5}
        />
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <MainButton
            onPress={() => authHandler()}
            style={styles.submitBtn}
            title={isSignUp ? 'Sign up' : 'Log in'}
          />
        )}
        <Text style={styles.customLink} onPress={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? 'Already have an account? Log in'
            : "Don't have any account? Sign up"}
        </Text>
      </View>
      <View style={styles.footer}>
        <Image
          style={styles.footerImage}
          source={{
            uri: isSignUp
              ? 'https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
              : 'https://images.unsplash.com/photo-1488901512066-cd403111aeb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
          resizeMode='stretch'
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 80,
    paddingBottom: 0,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  submitBtn: {
    marginTop: 10,
  },
  footer: {
    flex: 2,
    width: '100%',
  },
  footerImage: {
    width: '100%',
    flex: 1,
  },
  customLink: {
    color: '#999',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
});

export default AuthScreen;
