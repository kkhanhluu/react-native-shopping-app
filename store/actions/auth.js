import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

let timer;

export const authentication = (mode, email, password) => {
  return async (dispatch) => {
    const url =
      mode === 'signup'
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrRyq4hZ-tXTyr5T6T183fm2YTmqEipZI'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrRyq4hZ-tXTyr5T6T183fm2YTmqEipZI';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errResData = await response.json();
      const errorId = errResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'The password is invalid';
      } else if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: mode === 'signup' ? SIGNUP : LOGIN,
      payload: {
        token: resData.idToken,
        userId: resData.localId,
      },
    });

    dispatch(setLogoutTimer(+resData.expiresIn * 1000));

    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );

    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expirationDate,
    })
  );
};
