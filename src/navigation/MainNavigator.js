import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddJobScreen, JobsListScreen } from "../screens";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddJobScreen"
        component={AddJobScreen}
        options={{ title: "AddJobScreen" }}
      />
      <Stack.Screen
        name="JobsListScreen"
        component={JobsListScreen}
        options={{ title: "JobsListScreen" }}
        // options={({route}) => ({ title: `Login (${route.params.user})` })}
      />
    </Stack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
      <Tabs.Screen
          name="JobsListScreen"
          component={JobsListScreen}
          options={{
            title: "İş İlanları",
            tabBarIcon: (props) =>  <MaterialIcons name="my-library-books" {...props}/>,
          }}
        />
        <Tabs.Screen
          name="AddJobScreen"
          component={AddJobScreen}
          options={{
            title: "İş İlanı Ekle",
            tabBarIcon: (props) => <Entypo name="add-to-list" {...props}/>,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
