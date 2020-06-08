import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../../components/Input';
import MainButton from '../../components/Button';

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.description}>Log back into your account</Text>
      <View style={styles.formContainer}>
        <Input
          id='email'
          keyboardType='default'
          autoCapitalize='none'
          returnKeyType='next'
          autoCorrect
          label='Your Email'
          errorText='Please enter a valid email!'
          onInputChange={() => {}}
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
          onInputChange={() => {}}
          initialValue=''
          initiallyValid={false}
          required
          password
          minLength={5}
        />
        <MainButton style={styles.submitBtn} title='Login' />
      </View>
      <View style={styles.footer}>
        <Image
          style={styles.footerImage}
          source={{
            uri:
              'https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
    marginBottom: 60,
  },
  submitBtn: {
    marginTop: 10,
  },
  footer: {
    flex: 1,
    width: '100%',
  },
  footerImage: {
    width: '100%',
    flex: 1,
  },
});

export default AuthScreen;
