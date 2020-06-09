import React, { useEffect, useRef } from 'react';

import Navigator from './shoppingAppNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const NavigatorContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);
  return <Navigator ref={navRef} />;
};

export default NavigatorContainer;
