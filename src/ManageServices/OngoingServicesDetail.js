import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Share,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import AntIcon from 'react-native-vector-icons/AntDesign';
import JobAttachments from '../DetailJobs/JobAttachments';
import ServiceSkill from '../DetailServices/ServiceSkill';
import {Header} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as CONSTANT from '../Constants/Constant';
import {NavigationEvents} from 'react-navigation';
import StarRating from 'react-native-star-rating';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import DocumentPicker from 'react-native-document-picker';
import SelectedDocLayout from '../CompleteEmployers/SelectedDocLayout';
import RBSheet from 'react-native-raw-bottom-sheet';
import HTML from 'react-native-render-html';
console.disableYellowBox = true;

const {width: viewportWidth} = Dimensions.get('window');
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class OngoingServicesDetail extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: CONSTANT.primaryColor,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };
  state = {
    data: [],
    isLoading: true,
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    showAlert: false,
    SaveStatus: 'Save',
    fetchImages: [],
    fetchHistory: [],
  };
  componentDidMount() {
    this.getUser();
    this.fetchProjectHistory();
  }
  fetchProjectHistory = async () => {
    const {params} = this.props.navigation.state;
    const Pid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl +
        'dashboard/get_ongoing_job_chat?id=' +
        params.data.order_id +
        '&user_id=' +
        Pid,
    );
    const json = await response.json();
    this.setState({fetchHistory: json, isLoading: false});
    // this.getUser();
  };
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem('chatPermission');
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({storedValue});
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({storedType});
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({profileImg});
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({type});
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({id});
      } else {
        //  alert('something wrong')
      }
      if (permissionChat !== null) {
        this.setState({permissionChat});
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
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
  SubmitMessage = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const {params} = this.props.navigation.state;
    const {Description, images} = this.state;
    const formData = new FormData();
    formData.append('sender_id', Uid);
    formData.append('id', params.data.order_id);
    formData.append('chat_desc', Description);
    formData.append('size', images.length);
    images.forEach((item, i) => {
      var path = item.uri;
      var filename = item.name;
      formData.append('project_files' + i, {
        uri: path,
        type: item.type,
        name: filename || `filename${i}.jpg`,
      });
    });
    fetch(CONSTANT.BaseUrl + 'proposal/sendproposal_chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        if (response.status == '200') {
          Alert.alert('I am in 200');
          // console.log(response);
          // this.showSuccessAlert();
        } else if (response.status == '203') {
          Alert.alert('I am in 203');
          // console.log(response);
          // this.showAlert();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {params} = this.props.navigation.state;
    const {
      storedValue,
      storedType,
      profileImg,
      permissionChat,
      showAlert,
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationEvents onWillFocus={this.fetchServiceData} />
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
              width: '20%',
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
              width: '60%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  height: 30,
                  marginTop: 9,
                }}>
                Service History
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{flexDirection: 'row', padding: 10, flex: 4}}>
            <View
              style={{
                flexDirection: 'column',
                flex: 3,
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View>
                <Image
                  style={{height: 50, width: 50, borderRadius: 5}}
                  source={{uri: params.data.featured_img}}
                />
              </View>
              <View style={{flexDirection: 'column', marginTop: 10}}>
                {params.data.is_featured == 'yes' && (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 10, color: '#767676'}}>
                    Featured
                  </Text>
                )}

                <Text
                  style={{
                    fontSize: 17,
                    marginRight: 10,
                    fontWeight: '700',
                    color: '#323232',
                  }}>
                  {entities.decode(params.data.service_title)}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 10, color: '#767676'}}>
                    Starting from:
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: CONSTANT.primaryColor,
                    }}>
                    {' '}
                    {entities.decode(params.data.price)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{top: 20}}>
            <View
              style={{
                height: 65,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 10,
                backgroundColor: '#fcfcfc',
                borderLeftWidth: 5,
                borderLeftColor: CONSTANT.primaryColor,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Addons Services:
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
              <FlatList
                data={params.data.addons}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      marginBottom: 5,
                    }}
                    activeOpacity={0.9}>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'column', marginLeft: 10}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            color: '#323232',
                          }}>
                          {entities.decode(item.title)}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 13, color: '#767676'}}>
                          {entities.decode(item.detail)}
                        </Text>
                      </View>

                      <View>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 13, color: '#767676'}}>
                          {entities.decode(item.price)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View style={{top: 35}}>
            <View
              style={{
                height: 65,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 10,
                backgroundColor: '#fcfcfc',
                borderLeftWidth: 5,
                borderLeftColor: CONSTANT.primaryColor,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Order By:
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                padding: 10,
                backgroundColor: '#fff',
                alignItems: 'center',
              }}>
              <View>
                {storedType == 'freelancer' ? (
                  <Image
                    style={{height: 50, width: 50, borderRadius: 25}}
                    source={{uri: params.data.employer_avatar}}
                  />
                ) : (
                  <Image
                    style={{height: 50, width: 50, borderRadius: 25}}
                    source={{uri: params.data.freelancer_avatar}}
                  />
                )}
              </View>
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                {storedType == 'freelancer' ? (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 13, color: '#767676'}}>
                    {entities.decode(params.data.employer_title)}
                  </Text>
                ) : (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 13, color: '#767676'}}>
                    {entities.decode(params.data.freelancer_title)}
                  </Text>
                )}

                {storedType == 'freelancer' ? (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 13, fontWeight: '700', color: '#323232'}}>
                    {entities.decode(params.data.employertagline)}
                  </Text>
                ) : (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 13, fontWeight: '700', color: '#323232'}}>
                    {entities.decode(params.data.freelancertagline)}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={{top: 35}}>
            <View
              style={{
                height: 65,
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 10,
                backgroundColor: '#fcfcfc',
                borderLeftWidth: 5,
                borderLeftColor: CONSTANT.primaryColor,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Chat History:
              </Text>
            </View>
            <FlatList
              data={this.state.fetchHistory}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}
                  activeOpacity={0.9}>
                  {index % 2 === 0 ? (
                    <View style={styles.amenetiesarea}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 15,
                          width: '80%',
                        }}>
                        <View style={{flexDirection: 'row', marginRight: 15}}>
                          <Image
                            resizeMode={'contain'}
                            style={{width: 30, height: 30, borderRadius: 15}}
                            source={{uri: item.sender_image}}
                          />
                        </View>
                        <View>
                          <Text>{item.date_sent}</Text>
                          <HTML
                            containerStyle={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            html={item.message}
                            imagesMaxWidth={Dimensions.get('window').width}
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        // onPress={() => this.props.navigation.goBack(null)}
                        style={{
                          flexDirection: 'column',
                          display: 'flex',
                          alignContent: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        <AntIcon name="download" size={25} color={'#000'} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.amenetiesarea2}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 15,
                          width: '80%',
                        }}>
                        <View style={{flexDirection: 'row', marginRight: 15}}>
                          <Image
                            resizeMode={'contain'}
                            style={{width: 30, height: 30, borderRadius: 15}}
                            source={{uri: item.sender_image}}
                          />
                        </View>
                        <View>
                          <Text>{item.date_sent}</Text>
                          <HTML
                            containerStyle={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            html={item.message}
                            imagesMaxWidth={Dimensions.get('window').width}
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                      // onPress={() => this.props.navigation.goBack(null)}
                      >
                        <AntIcon name="download" size={25} color={'#323232'} />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.RBSheet.open()}
          style={{
            alignItems: 'center',
            height: 50,
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: CONSTANT.primaryColor,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: '#fff',
            }}>
            Send Message
          </Text>
        </TouchableOpacity>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: 'transparent',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.getAnswersRBSheetMainArea}>
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                height: 55,
                justifyContent: 'center',
                fontWeight: '700',
              }}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                Type Message
              </Text>
            </View>
            <View style={styles.getAnswersRBSheetSpecialityArea}>
              <TextInput
                underlineColorAndroid="transparent"
                multiline={true}
                style={{
                  borderColor: '#807f7f',
                  width: '90%',
                  borderWidth: 0.3,
                  borderRadius: 3,
                  fontSize: 15,
                  padding: 5,
                  height: 150,
                }}
                name="username"
                onChangeText={Description => this.setState({Description})}
                placeholder="Description"
                placeholderTextColor="#807f7f"
              />
              {this.state.images != null ? (
                <FlatList
                  style={{paddingBottom: 5, paddingTop: 10}}
                  data={this.state.images}
                  keyExtractor={(y, z) => z.toString()}
                  renderItem={({item}) => (
                    <SelectedDocLayout docName={item.name} />
                  )}
                />
              ) : null}
              <View
                style={{
                  width: '90%',
                  marginBottom: 20,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.SubmitMessage()}
                  style={{
                    alignItems: 'center',
                    height: 40,
                    borderRadius: 4,
                    marginRight: 5,
                    width: '45%',
                    alignSelf: 'center',
                    backgroundColor: CONSTANT.primaryColor,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: '#fff',
                      paddingTop: 10,
                    }}>
                    Update
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.pickMultiple()}
                  style={{
                    alignItems: 'center',
                    height: 40,
                    borderRadius: 4,
                    marginLeft: 5,
                    width: '45%',
                    alignSelf: 'center',
                    backgroundColor: '#00cc8d',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: '#fff',
                      paddingTop: 10,
                    }}>
                    Select File
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}
export default OngoingServicesDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  imageOpacity: {
    backgroundColor: '#000',
    opacity: 0.74,
    zIndex: 1,
    height: 200,
  },
  snapcarousalarea: {
    marginVertical: 5,
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
  snapcarousalimg: {
    height: 200,
    borderRadius: 10,
  },
  amenetiesarea: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
    padding: 15,
    justifyContent: 'space-between',
    width: '100%',
  },
  amenetiesarea2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
    padding: 15,
    justifyContent: 'space-between',
    width: '100%',
  },
  getAnswersRBSheetMainArea: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  getAnswersRBSheetSpecialityArea: {
    height: 500,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,

    top: 10,
  },
  getAnswersRBSheetMainArea: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  getAnswersRBSheetSpecialityArea: {
    height: 500,
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    top: 10,
  },
});
