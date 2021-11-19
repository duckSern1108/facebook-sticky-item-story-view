import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Animated, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';

//styles
const ITEM_WIDTH = 80
const ITEM_HEIGHT = 120
const DEFAULT_BORDER_RADIUS = 16
const DEFAULT_SEPERATOR_SPACE = 8
const DEFAULT_TOP_STICKY = 48
//black-ava
const FINAL_AVATAR_WIDTH = 32
const FINAL_CONTAINER_HEIGHT = FINAL_AVATAR_WIDTH + DEFAULT_SEPERATOR_SPACE * 2

const DATA = [1,2,3,4,5,6,7,8,9,10,11]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable)

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const Header = () => {
    const width = scrollX.interpolate({
      inputRange: [0, ITEM_WIDTH],
      outputRange: [ITEM_WIDTH - DEFAULT_SEPERATOR_SPACE * 2,FINAL_AVATAR_WIDTH],
      extrapolate: "clamp"
    })
    const containerWidth = Animated.add(width,DEFAULT_SEPERATOR_SPACE * 2)
    const containerHeight = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [ITEM_HEIGHT,FINAL_CONTAINER_HEIGHT],
      extrapolate: 'clamp'
    })
    const translateX = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [0,-DEFAULT_SEPERATOR_SPACE],
      extrapolate: 'clamp'
    })
    const top = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [DEFAULT_TOP_STICKY,(ITEM_HEIGHT - FINAL_CONTAINER_HEIGHT) / 2 + DEFAULT_TOP_STICKY],
      extrapolate: 'clamp'
    })
    const textOpacity = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH / 2],
      outputRange: [1,0],
      extrapolate: 'clamp'
    })
    const borderLeft = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [DEFAULT_BORDER_RADIUS,0],
      extrapolate: 'clamp'
    }) 
    const borderRight = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [DEFAULT_BORDER_RADIUS,24],
      extrapolate: 'clamp'
    }) 
    const translateYIcon = Animated.add(scrollX,0).interpolate({
      inputRange: [0,ITEM_WIDTH],
      outputRange: [0,DEFAULT_SEPERATOR_SPACE],
      extrapolate: 'clamp'
    })
    return(
        <AnimatedTouchable
          onPress={() => {
            alert('hello')
          }}
          style={{
            height: containerHeight,
            width: containerWidth,
            borderTopLeftRadius: borderLeft,
            borderBottomLeftRadius: borderLeft,
            borderTopRightRadius: borderRight,
            borderBottomRightRadius: borderRight,
            backgroundColor: 'yellow',
            position: 'absolute',
            top: top,
            left: DEFAULT_SEPERATOR_SPACE,
            zIndex: 100,
            alignItems: 'center',
            padding: 8,
            overflow: 'hidden',
            transform: [{
              translateX
            }]
        }}
        >
        <Animated.View style={{
          backgroundColor: '#000000',
          height: width,
          borderRadius: DEFAULT_BORDER_RADIUS,
          width,
        }}/>
        <Animated.View style={[
          styles.icon,{
          transform: [{
            translateY: -12
          },{
            translateX: translateYIcon
          }]
        }]}>
          <Text style={styles.iconText}>+</Text>
        </Animated.View>
        <Animated.Text style={{opacity : textOpacity}}>
          Tạo tin
        </Animated.Text>
      </AnimatedTouchable>
    )
  }
  return (
    <View style={styles.container}>
      <AnimatedFlatList 
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset : {
              x: scrollX
            }
          }
        }])}
        data={DATA}
        style={styles.flatList}
        renderItem={({item}) => {
          return(
            <TouchableOpacity 
              onPress={() => alert('Item press')}
            >
              <View 
              style={styles.item}
            />
            </TouchableOpacity>
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
    flexDirection: 'row',
    position: 'relative'
  },
  item : {
    width: ITEM_WIDTH,
    backgroundColor: 'red',
    marginRight: DEFAULT_SEPERATOR_SPACE,
    borderRadius: DEFAULT_BORDER_RADIUS,
    height: ITEM_HEIGHT
  },
  icon : {
    borderRadius: 8,
    backgroundColor: '#4395FF',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {color: '#ffffff',fontWeight: 'bold'},
  flatList : {
    paddingLeft: ITEM_WIDTH + DEFAULT_SEPERATOR_SPACE,
  }
});
