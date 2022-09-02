import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import HomePage from './components/home';
import DrawerImage from './utils/customDrawer';
import SearchScreen from './components/search';
import Toggle from './components/toggle'
import React, { useEffect, useState, useRef } from 'react';
const Drawer = createDrawerNavigator();

export default function App() {
  const [lightMode, setLightMode] = useState(true);
  // NOTE: one useRef can't be used for multiple compoonents!

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='home'
        drawerContent={(props) => <DrawerImage {...props} isLightMode={lightMode} />}
        screenOptions={{
          drawerType: "back",
          gestureEnabled: true,
        }}
      >

        <Drawer.Screen 
        name='home' 
        children={
          () => <HomePage 
            isLightMode={lightMode} 
            heading={"Today for you"} 
            newsTopic={"news"} 
            needq={true}
          />
        }
        options={ // options can be an object or a function but if used as function can be passed the navigation prop!
          ({navigation, route}) => ({
          drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>World</Text>,
          drawerIcon: config => <Ionicons name="earth" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
          drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
          drawerActiveTintColor: lightMode ? "#fff" : "#121212",
          drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
          headerTitle: "",
          drawerItemStyle: {
            marginTop: 0,
          },
          headerLeft: () => (
            <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
              <StatusBar
                backgroundColor={lightMode ? "#fff" : "#121212"}
                barStyle={lightMode ? "dark-content" : "light-content"}
              />
              <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons 
                    name="ios-menu-sharp" 
                    size={31.3} 
                    color= {lightMode ? "#000" : "#fff"} 
                    style={{paddingLeft: 25}}
                  />
                </TouchableOpacity>
                <SearchScreen isLightMode={lightMode} />
              </View>
              <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
            </View>),
          headerStyle: {
            backgroundColor: lightMode ? "#fff" : "#121212"
          },
        })
      } />

        <Drawer.Screen 
        name='business' 
        children={
          () => <HomePage 
            isLightMode={lightMode} 
            heading={"Business"} 
            newsTopic={"stocks OR crypto OR business"} 
            needq={true}
            lottiePath={require("./assets/86898-briefcase-icon-animation.json")} 
          />
        } 
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Business</Text>,
            drawerIcon: config => <MaterialIcons name="business-center" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />

        <Drawer.Screen 
        name="food"
        children={
          () => <HomePage 
            isLightMode={lightMode} 
            heading={"Food"} 
            newsTopic={"recipes OR cuisine OR dining OR chef"} 
            needq={true} 
            lottiePath={require("./assets/54605-food-toss.json")}
            lottieTopMargin={"1%"}
          />
        }
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Food</Text>,
            drawerIcon: config => <Ionicons name="fast-food" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />


        <Drawer.Screen 
        name='health' 
        children={
          () => <HomePage 
            isLightMode={lightMode} 
            heading={"Health"} 
            newsTopic={"health"} 
            needq={true} 
            lottiePath={require("./assets/56120-medical-shield.json")}
            lottieSize={52} 
          />
        }
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Health</Text>,
            drawerIcon: config => <FontAwesome name="heartbeat" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />

        <Drawer.Screen 
        name='science' 
        children={
          () => <HomePage 
            isLightMode={lightMode} 
            heading={"Science"} 
            newsTopic={"science"} 
            needq={true} 
            lottiePath={
              lightMode ? require("./assets/51475-rocket-telescope.json") : require("./assets/74775-satellite-around-earth.json")
            }
            lottieSize={61}
            lottieTopMargin={lightMode ? "3.55%" : "1.8%"}
            lottieLeftMargin={"0%"}
          />
        } 
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Science</Text>,
            drawerIcon: config => <MaterialIcons name="science" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />

        <Drawer.Screen 
        name='sports' 
        children={
          () => <HomePage 
          isLightMode={lightMode} 
          heading={"Sports"} 
          newsTopic={"basketball OR football OR sports"} 
          needq={true} 
          lottiePath={require("./assets/58686-basketball.json")}
          lottieSize={61}
          lottieLeftMargin={"0%"} 
          />
        }
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Sports</Text>,
            drawerIcon: config => <MaterialIcons name="sports" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />

        <Drawer.Screen 
        name='travel' 
        children={
          () => <HomePage 
          isLightMode={lightMode} 
          heading={"Travel"} 
          newsTopic={"travel"} 
          needq={false} 
          lottiePath={require("./assets/38290-loading-51-monoplane.json")} 
          lottieSize={71}
          lottieTopMargin={"0%"}
          lottieLeftMargin={"0%"}
          />
        } 
        options={
          ({navigation, route}) => ({
            drawerLabel: config => <Text style={[styles.drawerLabelStyle, {color: lightMode ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")}]}>Travel</Text>,
            drawerIcon: config => <Entypo name="aircraft-take-off" size={25} color={(lightMode) ? (config.focused ? "#fff" : "#121212") : (config.focused ? "#121212" : "#fff")} />,
            drawerActiveBackgroundColor: lightMode ? "#121212" : "#fff",
            drawerActiveTintColor: lightMode ? "#fff" : "#121212",
            drawerInactiveTintColor: lightMode ? "#121212" : "#fff",
            headerTitle: "",
            drawerItemStyle: {
              marginTop: 18,
            },
            headerLeft: () => (
              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width, alignItems: "center"}}>
                <StatusBar
                  backgroundColor={lightMode ? "#fff" : "#121212"}
                  barStyle={lightMode ? "dark-content" : "light-content"}
                />
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons 
                      name="ios-menu-sharp" 
                      size={31.3} 
                      color= {lightMode ? "#000" : "#fff"} 
                      style={{paddingLeft: 25}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                style={{
                  borderWidth: 0,
                  borderColor: "crimson",
                  flex: 0.355,
                  height: "89%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  setLightMode(!lightMode);
                }}
              >
                <Toggle isLightMode={lightMode} />
              </TouchableOpacity>
              </View>),
            headerStyle: {
              backgroundColor: lightMode ? "#fff" : "#121212"
            },
            drawerLabelStyle: {
              fontSize: 14.2,
              letterSpacing: 1.8,
              marginLeft: 0,
              paddingLeft: 0,
              color: lightMode ? "#fff" : "#121212"
            },
          })
        } />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: "100%",
    width: "85%",
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingLeft: 25,
  },
  searchView: {
    height: "83.2%",
    width: "71%",
    backgroundColor: "#121212",
    borderRadius: 25,
    marginLeft: 34,
    flexDirection: "row",
    alignItems: "center"
  },
  goButton: {
    height: "88%",
    width: "16%",
    backgroundColor: "#000",
    borderRadius: 100,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    right: 5.2,
  },
  drawerLabelStyle: {
    fontSize: 14.2,
    letterSpacing: 1.8,
    marginLeft: 0,
    paddingLeft: 0,
    fontFamily: ""
  },
});
