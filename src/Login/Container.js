import React, {Component, createRef} from 'react';
import {
  View,
  StyleSheet,
  WebView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image,
  CheckBox,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {RadioGroup} from 'react-native-btr';
import * as CONSTANT from '../Constants/Constant';
import {ScrollView} from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import constants from 'jest-haste-map/build/constants';
import Accordion from 'react-native-collapsible/Accordion';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();

// const SECTIONS = [
//   {
//     title: 'Tailor',
//     content: 'Lorem ipsum...',
//   },
//   {
//     title: 'Dressmaker',
//     content: null,
//   },
//   {
//     title: 'Seamstress',
//     content: null,
//   },
//   {
//     title: 'Sewing Machinist',
//     content: null,
//   },
//   {
//     title: 'Personal Consultant',
//     content: null,
//   },
// ];

class Container extends Component {
  //   state = {
  //     activeSections: [],
  //   };

  // _renderSectionTitle = section => {
  //   return (
  //     <View style={{backgroundColor: CONSTANT.primaryColor}}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };

  // _renderHeader = section => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //       onPress={() => this.props.navigation.navigate('Home')}>
  //       <View
  //         style={{
  //           backgroundColor: CONSTANT.primaryColor,
  //           width: 300,
  //           paddingVertical: 20,
  //           paddingHorizontal: 40,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           borderTopColor: '#f7f7f7',
  //           borderTopWidth: 5,
  //           borderBottomColor: '#f7f7f7',
  //           borderRadius: 5,
  //           // borderBottomWidth: 5,
  //           // borderTopRadius: 5,
  //           // borderLeftRadius: 5,
  //           // borderRightRadius: 5,
  //           // borderBottomRadius: 5,
  //           elevation: 5,
  //           shadowOffset: {width: 0, height: 2},
  //           shadowOpacity: 0.2,
  //           shadowColor: '#000',
  //         }}>
  //         <Text style={{color: '#f7f7f7', fontSize: 20, fontWeight: 'bold'}}>
  //           {section.title}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // _renderContent = section => {
  //   {
  //     content = null ? null : (
  //       <View
  //         style={{
  //           backgroundColor: '#f7f7f7',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <Text style={{color: CONSTANT.statusBarColor, fontSize: 16}}>
  //           {section.content}
  //         </Text>
  //       </View>
  //     );
  //   }
  // };

  // _updateSections = activeSections => {
  //   this.setState({activeSections});
  // };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f7f7',
        }}>
        {/* <ImageBackground
          source={require('../../src/Images/wizardbackground.png')}
          style={{
            width: '100%',
            height: '100%',
            activeOpacity: 0.4,
            position: 'relative',
          }}> */}
        {/* <View
            style={{
              flex: 1,
              backgroundColor: '#000000',
              position: 'relative',
              bottom: 0,
            }}>
            {Platform.OS === 'android' ? (
              <StatusBar
                backgroundColor={CONSTANT.statusBarColor}
                barStyle="light-content"
              />
            ) : (
              <StatusBar hidden />
            )} */}
        {/* <View /> */}
        <View
          style={{
            height: 100,
            width: '100%',
            backgroundColor: CONSTANT.statusBarColor,
            shadowOffset: {width: 0, height: 2},
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 200,
              resizeMode: 'center',
            }}
            source={require('./../../src/Images/logo.png')}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: CONSTANT.primaryColor,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            HOW CAN WE HELP YOU TODAY?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                width: 300,
                paddingVertical: 20,
                paddingHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#f7f7f7',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Tailor
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                width: 300,
                paddingVertical: 20,
                paddingHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#f7f7f7',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Dressmaker
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                width: 300,
                paddingVertical: 20,
                paddingHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#f7f7f7',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Seamstress
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                width: 300,
                paddingVertical: 20,
                paddingHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#f7f7f7',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Sewing Machinist
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                width: 300,
                paddingVertical: 20,
                paddingHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowColor: '#000',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#f7f7f7',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Personal Consultant
              </Text>
            </View>
          </TouchableOpacity>
          {/* <Accordion
            sectionContainerStyle={{}}
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          /> */}
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'white',
              backgroundColor: CONSTANT.primaryColor,
              borderRadius: 5,
              width: 240,
              height: 50,
            }}>
            <Text
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
              color: CONSTANT.color,
              fontSize: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Proceed to App
            </Text>
            </View>
          </TouchableOpacity> */}
          {/* </View> */}
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  }
}
export default Container;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
