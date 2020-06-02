import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProductScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>User product Screen!</Text>
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

export default UserProductScreen;
