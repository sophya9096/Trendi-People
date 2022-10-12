import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Sockets from 'react-native-sockets';
import io from 'socket.io-client';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import MessageSingleListCard from './MessageSigleListCard';
import {Header} from 'react-native-elements';
import * as CONSTANT from '../Constants/Constant';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class DetailMessageScreen extends Component {
  clientAddr;
  messagecount = 1;
  port = 3232;
  constructor() {
    super();
    this.state = {
      clientStatus: 'Disconnected',
      serverStatus: 'Disconnected',
      serverMessage: '',
      clientMessage: '',
      serverError: '',
      clientError: '',
      ipAddress: '',
      data: [],
      default_color: '#fff',
      storedValue: '',
      storedType: '',
      profileImg: '',
      type: '',
      id: '',
      Pid: '',
      isLoading: false,
      message: '',
      fetchMessageDetail: [],
      image: null,
      images: null,
    };

    // //client events
    // DeviceEventEmitter.addListener('socketClient_error', (d) => {
    //   console.log('socketClient_error', d);
    //   this.setState({ clientError: d.error });
    // });
    // DeviceEventEmitter.addListener('socketClient_connected', (d) => {
    //   console.log('socketClient_connected', d);
    //   this.setState({ clientStatus: 'Connected' })
    // });
    // DeviceEventEmitter.addListener('socketClient_closed', (d) => {
    //   console.log('socketClient_closed', d);
    //   this.setState({ clientStatus: 'Disconnected' })
    // });
    // DeviceEventEmitter.addListener('socketClient_data', (d) => {
    //   console.log('socketClient_data', d);
    //   this.setState({ clientMessage: d.data });
    // });

    //server events
    // DeviceEventEmitter.addListener('socketServer_connected', (d) => {
    //   console.log('socketServer_connected', d);
    //   this.setState({ serverStatus: 'Connected' });
    // });
    // DeviceEventEmitter.addListener('socketServer_error', (d) => {
    //   console.log('socketServer_error', d);
    //   this.setState({ serverError: d.error });
    // });
    // DeviceEventEmitter.addListener('socketServer_clientConnected', (d) => {
    //   console.log('socketServer_clientConnected', d);
    //   this.clientAddr = d.id;
    // });
    // DeviceEventEmitter.addListener('socketServer_data', (d) => {
    //   console.log('socketServer_data', d);
    //   this.setState({ serverMessage: d.data });
    // });
    // DeviceEventEmitter.addListener('socketServer_closed', (d) => {
    //   console.log('socketServer_closed', d);
    //   this.setState({ serverStatus: 'Disconnected' });
    // });
    // DeviceEventEmitter.addListener('socketServer_clientDisconnected', (d) => {
    //   console.log('socketServer_clientDisconnected', d);
    // });
  }

  // startServer() {
  //   Sockets.startServer(this.port);
  // }

  // connectClient() {
  //   Sockets.startClient({
  //     address: this.state.ipAddress,
  //     port: this.port,
  //     reconnect: true
  //   });
  // }

  // sendServer(isLong) {
  //   if (!isLong) Sockets.write("message to server: " + this.messagecount++);
  //   if (isLong) Sockets.write("Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog message!");
  // }

  // sendClient(isLong) {
  //   if (!isLong) Sockets.emit("message to client: " + this.messagecount++, this.clientAddr);
  //   if (isLong) Sockets.emit("Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog message!", this.clientAddr);
  // }

  // disconnectServer() {
  //   Sockets.close();
  //   this.setState({ serverStatus: 'Disconnected' })
  // }

  // disconnectClient() {
  //   Sockets.disconnect();
  // }

  // pingServer() {
  //   let ip = this.state.ipAddress;
  //   Sockets.isHostAvailable(ip, 500, success => {
  //     Alert.alert(ip + " is available");
  //   }, err => {
  //     Alert.alert(ip + " is not available", e);
  //   });
  // }

  // serverAvailable() {
  //   Sockets.isServerAvailable(this.state.ipAddress, this.port, 1000, success => {
  //     Alert.alert("Socket server is available");
  //   }, err => {
  //     Alert.alert("Socket server is not available");
  //   });
  // }

  componentDidMount() {
    //  this.socket = io("http://192.168.18.11:3000")
    //  this.socket.on("chat message" , msg => {
    //    this.setState({fetchMessageDetail : [...this.state.fetchMessageDetail , msg] })
    //  })
    this.fetchMessages();
  }
  fetchMessages = async () => {
    const Pid = await AsyncStorage.getItem('projectUid');
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'chat/list_user_messages?current_id=' +
        Pid +
        '&reciver_id=' +
        params.receiver_id +
        '&msg_id=' +
        params.message_id,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchMessageDetail: [], isLoading: false}); // empty data set
    } else {
      this.setState({
        fetchMessageSenderDetail: json.chat_sidebar,
        isLoading: false,
      });
      this.setState({fetchMessageDetail: json.chat_nodes, isLoading: false});
    }
  };
  SendMessage = async () => {
    // this.socket.emit("chat message" , this.state.message);
    // this.setState({message : ""});
    const {message} = this.state;
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');
    if (message == '') {
      //alert("Please enter Email address");
      this.setState({email: 'Please add message'});
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'chat/sendUserMessage', {
          sender_id: Uid,
          receiver_id: params.receiver_id,
          message: message,
        })
        .then(async response => {
          this.setState({
            message: '',
          });
          this.fetchMessages();
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  pickMultiple() {
    try {
      DocumentPicker.pickMultiple({})
        .then(images => {
          this.setState({
            image: null,
            images: images,
          });
        })
        .catch(e => alert(e));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={CONSTANT.statusBarColor}
          barStyle="light-content"
        />
        <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%',
            backgroundColor: CONSTANT.statusBarColor,
            flexDirection: 'row',
            shadowOffset: {width: 0, height: 2},
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              flexDirection: 'column',
              width: '10%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <AntIcon name="back" size={25} color={'#fff'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              width: '70%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}>
              {this.state.fetchMessageSenderDetail && (
                <Image
                  style={{height: 30, width: 30, borderRadius: 15}}
                  source={{
                    uri: `${this.state.fetchMessageSenderDetail.avatar}`,
                  }}
                />
              )}
              {this.state.fetchMessageSenderDetail && (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 15,
                    top: 5,
                    fontWeight: '700',
                    color: '#fff',
                  }}>
                  {this.state.fetchMessageSenderDetail.username}
                </Text>
              )}
            </View>
          </View>
        </View>
        {isLoading && (
          <View style={{justifyContent: 'center', height: '100%'}}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 60,
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                elevation: 5,
              }}
            />
          </View>
        )}

        {this.state.fetchMessageDetail ? (
          <FlatList
            style={{height: '80%', marginBottom: 15, marginTop: 15}}
            data={this.state.fetchMessageDetail}
            keyExtractor={(a, b) => b.toString()}
            renderItem={({item}) => (
              // <TouchableOpacity>
              //   <Text>{item}</Text>
              // </TouchableOpacity>
              <TouchableOpacity>
                {item.chat_is_sender == 'no' ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      margin: 5,
                      width: '100%',
                      paddingLeft: 10,
                    }}>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        maxWidth: '80%',
                        backgroundColor: '#fff',
                        borderWidth: 0.6,
                        borderRadius: 6,
                        borderColor: '#dddddd',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 13,
                          color: '#323232',
                          padding: 10,
                        }}>
                        {item.chat_message}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#767676',
                        fontSize: 10,
                        marginTop: 2,
                        marginLeft: 5,
                      }}>
                      {item.chat_date}
                    </Text>
                  </View>
                ) : item.chat_is_sender == 'yes' ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      margin: 5,
                      width: '100%',
                      paddingRight: 15,
                    }}>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        maxWidth: '80%',
                        backgroundColor: CONSTANT.primaryColor,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        borderWidth: 0.6,
                        borderRadius: 6,
                        borderColor: '#dddddd',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 13,
                          padding: 10,
                          color: '#fff',
                        }}>
                        {item.chat_message}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: '#767676',
                          fontSize: 10,
                          marginTop: 2,
                          marginLeft: 10,
                        }}>
                        {item.chat_date}
                      </Text>
                      <AntIcon
                        style={{marginLeft: 5}}
                        name="check"
                        size={13}
                        color={'#4B8B3B'}
                      />
                    </View>
                  </View>
                ) : null}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : null}

        <View style={{flexDirection: 'row'}}>
          <TextInput
            multiline={true}
            placeholder="Please Type Message here..."
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            value={this.state.message}
            style={styles.TextInputLayout}
            onSubmitEditing={() => this.SendMessage()}
            onChangeText={message => this.setState({message})}
          />
          <TouchableOpacity
            onPress={() => this.pickMultiple()}
            style={{
              backgroundColor: '#3DE176',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              height: 51,
              width: '15%',
            }}>
            <AntIcon name="addfile" size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.SendMessage}
            style={{
              backgroundColor: CONSTANT.primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              height: 51,
              width: '15%',
            }}>
            <FontAwesome name="send" size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default DetailMessageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  TextInputLayout: {
    height: 51,
    width: '65%',
    color: '#323232',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginLeft: 10,
    marginBottom: 10,
  },
});
