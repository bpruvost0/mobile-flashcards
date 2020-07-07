import React from 'react'
import { View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Constants from 'expo-constants'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AntDesign } from "@expo/vector-icons";
import reducer from './reducers'
import { handleInitialData } from './actions/decks'
import { AsyncStorage } from 'react-native'
import { dark, light, primary, white } from './utils/colors'

function StatusBarIndicator ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  DeckList:{
    name: "DeckList",
    component: DeckList,
    options: {tabBarIcon: ({color}) => <AntDesign name="bars" size={ 20 } color={ color }/>, title: 'Deck List'}
  }, 
  NewDeck:{
    component: NewDeck,
    name: "NewDeck",
    options: {tabBarIcon: ({color}) => <AntDesign name="pluscircleo" size={ 20 } color={ color }/>, title: 'New Deck'}
  }
}

const Tabs = createMaterialTopTabNavigator()

const TabNav = () => (
    <Tabs.Navigator
      initialRouteName="DeckList"
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? primary : white,
        showIcon: true,
        style: {
          height: 70,
          backgroundColor: Platform.OS === "ios" ? white : primary,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
      }}
    >
      <Tabs.Screen {...RouteConfigs['DeckList']} />
      <Tabs.Screen {...RouteConfigs['NewDeck']} />
    </Tabs.Navigator>
);

const Stack = createStackNavigator()

function MainNav() {
  return (
    <Stack.Navigator screenOptions={{
        headerStatusBarHeight: 0,
      }}>
      <Stack.Screen 
        name="Deck List" 
        component={TabNav} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="Deck" 
        component={Deck} 
        options={({ route }) => (
          { title: route.params.title,
            headerTintColor: light, 
            headerStyle: {
                backgroundColor: dark,
            } }
        )} 
      />
      <Stack.Screen name="NewCard" 
        component={NewCard} 
        options={({ route }) => ({ 
          title: `Add Card To ${route.params.title} Deck` 
        })} 
      />
      <Stack.Screen name="Quiz" 
        component={Quiz} 
        options={({ route }) => ({ 
          title: `${route.params.title} Quiz` 
          })}  
      />
    </Stack.Navigator>
  )
}

const store = createStore(reducer)

const STORAGE_KEY = 'storage'

store.subscribe(() => {
  let storingValue = JSON.stringify(store.getState())
  AsyncStorage.setItem(STORAGE_KEY, storingValue)
})

AsyncStorage
  .getItem(STORAGE_KEY)
  .then(JSON.parse)
  .then((data) => { store.dispatch(handleInitialData(data))
})

export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBarIndicator backgroundColor={dark} barStyle="light-content" />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  )
}
