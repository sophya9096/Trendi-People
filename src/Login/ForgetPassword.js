import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import {CalloutSubview} from 'react-native-maps';
import axios from 'axios';
import home from '../Home/home';
import CustomHeader from '../Header/CustomHeader';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as CONSTANT from '../Constants/Constant';
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }
  RestPassword = () => {
    const {username} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == '') {
      Alert.alert('Please enter Email address');
      this.setState({email: 'Please enter Email address'});
    } else if (reg.test(username) === false) {
      Alert.alert('Email is Not Correct');
      this.setState({email: 'Email is Not Correct'});
      return false;
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'user/forgot_password', {
          email: username,
        })
        .then(async response => {
          if (response.status == 200) {
            Alert.alert(response.data.message);
          } else if (response.status == 203) {
            Alert.alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}>
        <Image
          source={require('../../src/Images/wizardbackground.png')}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.4,
            position: 'relative',
          }}
        />
        <View
          style={{
            position: 'absolute',
            flex: 1,
            left: 0,
            // top: '5%',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{}}>
            <Image
              style={{
                width: 250,
                resizeMode: 'center',
              }}
              source={require('../../src/Images/logo.png')}
            />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 26,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 2,
              fontWeight: '100',
            }}>
            {CONSTANT.ForgetHeader}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 2,
              fontWeight: '100',
            }}>
            enter your registered email to get code
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 300,
                borderColor: '#ffffff',
                borderRadius: 5,
                height: 60,
                borderWidth: 2,
                paddingHorizontal: 20,
                marginTop: 20,
                display: 'flex',
              }}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                placeholder="Email"
                placeholderTextColor="white"
                style={{
                  color: 'white',
                  flex: 1,
                  backgroundColor: 'transparent',
                }}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                underlineColorAndroid="transparent"
                name="username"
                onChangeText={username => this.setState({username})}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={this.RestPassword}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: CONSTANT.primaryColor,
                borderRadius: 5,
                width: 140,
                height: 40,
                marginTop: 20,
              }}>
              <Text
                style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  color: CONSTANT.color,
                  fontSize: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                Send
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  fontWeight: '100',
                }}>
                Don't have an account?
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    fontWeight: 'bold',
                    marginLeft: 4,
                  }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  fontWeight: '100',
                }}>
                or
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('Login')}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'white',
                    backgroundColor: CONSTANT.primaryColor,
                    borderRadius: 5,
                    width: 140,
                    height: 30,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      color: CONSTANT.color,
                      fontSize: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      // <View style={{ flex: 1 }}>

      //   <View
      //     style={{
      //       height: 60,
      //       paddingLeft: 15,
      //       paddingRight: 15,
      //       width: "100%",
      //       backgroundColor: CONSTANT.statusBarColor,
      //       flexDirection: "row",
      //       shadowOffset: { width: 0, height: 2 },
      //       shadowColor: "#000",
      //       shadowOpacity: 0.2,
      //       shadowRadius: 2,
      //       elevation: 10
      //     }}
      //   >
      //     <TouchableOpacity
      //       onPress={() => this.props.navigation.goBack(null)}
      //       style={{
      //         flexDirection: "column",
      //         width: "20%",
      //         display: "flex",
      //         alignContent: "center",
      //         alignSelf: "center",
      //         justifyContent: "center"
      //       }}
      //     >
      //       <AntIcon name="back" size={25} color={"#fff"} />
      //     </TouchableOpacity>
      //     <View
      //       style={{
      //         flexDirection: "column",
      //         width: "60%",
      //         display: "flex",
      //         alignContent: "center",
      //         alignSelf: "center",
      //         justifyContent: "center"
      //       }}
      //     >
      //       <View
      //         style={{
      //           flexDirection: "row",
      //           display: "flex",
      //           alignSelf: "center"
      //         }}
      //       >
      //         <Text numberOfLines={1}
      //           style={{
      //             fontSize: 18,
      //             fontWeight: "500",
      //             color: "#fff",
      //             height: 30,
      //             marginTop: 9
      //           }}
      //         >
      //           {CONSTANT.ForgetHeader}
      //         </Text>
      //       </View>
      //     </View>
      //   </View>

      //   <View style={styles.container}>
      //     <Text style={{ padding: 10, margin: 10, color: "red" }}>

      //     </Text>
      //     <Image
      //       style={{ width: 150, resizeMode: "center", alignSelf: "center" }}
      //       source={require("../Images/logologin.png")}
      //     />
      //     <Text
      //       style={{
      //         textAlign: "center",
      //         alignSelf: "center",
      //         color: "#807f7f"
      //       }}
      //     >
      //       {CONSTANT.Forgetmain}
      //     </Text>
      //     <View
      //       style={{
      //         width: "90%",
      //         borderWidth: 0.6, borderRadius: 4, margin: 10, borderColor: '#dddddd'
      //       }}
      //     >
      //       <TextInput
      //         style={{ fontSize: 15, padding: 5, height: 40 }}
      //         underlineColorAndroid="transparent"
      //         name="username"
      //         placeholder={CONSTANT.ForgetEmail}
      //         placeholderTextColor="#807f7f"
      //         onChangeText={username => this.setState({ username })}
      //       />
      //     </View>

      //     <TouchableOpacity
      //       onPress={this.RestPassword}
      //       style={{
      //         alignItems: "center",
      //         height: 40,
      //         margin: 10,
      //         borderRadius: 4,
      //         width: "50%",
      //         alignSelf: "center",
      //         backgroundColor: CONSTANT.primaryColor
      //       }}
      //     >
      //       <Text
      //         style={{
      //           alignSelf: "center",
      //           alignItems: "center",
      //           textAlign: "center",
      //           color: "#fff",
      //           paddingTop: 10
      //         }}
      //       >
      //         {CONSTANT.ForgetButton}
      //       </Text>
      //     </TouchableOpacity>
      //   </View>

      //   <View style={{ height: 55 }}>
      //     <Text
      //       onPress={() => this.props.navigation.navigate("Signup")}
      //       style={{
      //         textAlign: "center",
      //         alignSelf: "center",
      //         justifyContent: "center",
      //         color: "#000",
      //         fontSize: 18,
      //         margin: 15
      //       }}
      //     >
      //       {CONSTANT.ForgetMoveSignup}
      //     </Text>
      //   </View>
      // </View>
    );
  }
}
export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    height: '77%',
    marginBottom: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
