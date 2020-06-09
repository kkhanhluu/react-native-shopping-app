import React, { useEffect } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { LOGIN, setLogoutTimer } from '../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (!data) {
        props.navigation.navigate('Auth');
        return;
      }
      const userData = JSON.parse(data);
      const { token, userId, expirationDate } = userData;

      if (userData && new Date(expirationDate) > new Date()) {
        const expirationTime =
          new Date(expirationDate).getTime() - new Date().getTime();
        dispatch(setLogoutTimer(expirationTime));

        props.navigation.navigate('Shop');
        await dispatch({
          type: LOGIN,
          payload: {
            token: token,
            userId: userId,
          },
        });
      } else {
        props.navigation.navigate('Auth');
        return;
      }
    };

    autoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
