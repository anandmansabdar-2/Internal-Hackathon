import { Stack } from 'expo-router';
import React from 'react';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerShown: false,
          title: 'Register',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        options={{
          title: 'Dashboard',
        }}
      />
    </Stack>
  );
};

export default AppLayout;