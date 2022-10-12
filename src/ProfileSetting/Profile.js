import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import CustomHeader from '../Header/CustomHeader';
import MapView from 'react-native-maps';
import axios from 'axios';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import MultiSelect from 'react-native-multiple-select';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
import PTRView from 'react-native-pull-to-refresh';
import * as CONSTANT from '../Constants/Constant';
const options = {
  title: 'Workreap App',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};
class Profile extends Component {
  state = {
    image: null,
    images: null,
    bannerimage: null,
    isLoading: true,
    isUpdatingLoader: false,
    Uid: '',
    banner: '',
    profileImage: '',
    FirstName: '',
    LastName: '',
    location: '',
    latitude: '',
    longitude: '',
    Tagline: '',
    address: '',
    noEmployees: '',
    rate: '',
    gender: '',
    department: '',
    type: '',
    photo: null,
    content: false,
    CatPickerValueHolder: [],
    LocKnown: '',
    EmployeePickerValueHolder: [],
    EmployeeKnown: '',
    storedType: '',
  };
  componentWillMount() {
    this.getUserData();
    this.fetchProfileData();
    this.ProjectCategoriesSpinner();
    this.NoEmployeeSpinner();
  }
  getUserData = async () => {
    try {
      const storedType = await AsyncStorage.getItem('user_type');
      if (storedType !== null) {
        this.setState({storedType});
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentHideAndShow = () => {
    this.setState(previousState => ({content: !previousState.content}));
  };
  ProjectCategoriesSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=locations',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        let location_data = responseJson;
        this.setState({
          location_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  NoEmployeeSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=no_of_employes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let NoEmployee_data = responseJson;
        this.setState({
          NoEmployee_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  fetchProfileData = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const banner = await AsyncStorage.getItem('profileBanner');
    const type = await AsyncStorage.getItem('user_type');
    const profileImage = await AsyncStorage.getItem('profile_img');
    if (Uid !== null) {
      this.setState({Uid});
    } else {
      //do stuff here
    }
    if (banner !== null) {
      this.setState({banner});
    } else {
      //do stuff here
    }
    if (profileImage !== null) {
      this.setState({profileImage});
    } else {
      //do stuff here
    }
    if (type !== null) {
      this.setState({type});
    } else {
      //do stuff here
    }
    axios
      .get(CONSTANT.BaseUrl + 'profile/setting?id=' + Uid)
      .then(async response => {
        if (response.data.type === 'success') {
          await AsyncStorage.setItem('fname', response.data.first_name);
          await AsyncStorage.setItem('lname', response.data.last_name);
          await AsyncStorage.setItem('tagline', response.data.tag_line);
          await AsyncStorage.setItem('Address', response.data.address);
          await AsyncStorage.setItem('Latitude', response.data.latitude);
          await AsyncStorage.setItem('Longitude', response.data.longitude);
          await AsyncStorage.setItem('Location', response.data.location);
          await AsyncStorage.setItem(
            'Noemployees',
            response.data.no_of_employees,
          );
          await AsyncStorage.setItem('Department', response.data.department);
          await AsyncStorage.setItem('Rate', response.data.per_hour_rate);
          await AsyncStorage.setItem('Gender', response.data.gender);
          this.setState({isLoading: false});
          this.getUser();
        } else if (response.data.type === '') {
          alert('Incorrect Detail');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  getUser = async () => {
    try {
      const FirstName = await AsyncStorage.getItem('fname');
      const LastName = await AsyncStorage.getItem('lname');
      const Tagline = await AsyncStorage.getItem('tagline');
      const address = await AsyncStorage.getItem('Address');
      const latitude = await AsyncStorage.getItem('Latitude');
      const longitude = await AsyncStorage.getItem('Longitude');
      const location = await AsyncStorage.getItem('Location');
      const noEmployees = await AsyncStorage.getItem('Noemployees');
      const department = await AsyncStorage.getItem('Department');
      const rate = await AsyncStorage.getItem('Rate');
      const gender = await AsyncStorage.getItem('Gender');
      if (FirstName !== null) {
        this.setState({FirstName});
      } else {
        //do stuff here
      }
      if (LastName !== null) {
        this.setState({LastName});
      } else {
        //do stuff here
      }
      if (Tagline !== null) {
        this.setState({Tagline});
      } else {
        //do stuff here
      }
      if (address !== null) {
        this.setState({address});
      } else {
        //do stuff here
      }
      if (latitude !== null) {
        this.setState({latitude});
      } else {
        //do stuff here
      }
      if (longitude !== null) {
        this.setState({longitude});
      } else {
        //do stuff here
      }
      if (location !== null) {
        this.setState({location});
      } else {
        //do stuff here
      }
      if (noEmployees !== null) {
        this.setState({noEmployees});
      } else {
        //do stuff here
      }
      if (department !== null) {
        this.setState({department});
      } else {
        //do stuff here
      }
      if (rate !== null) {
        this.setState({rate});
      } else {
        //do stuff here
      }
      if (gender !== null) {
        this.setState({gender});
      } else {
        //do stuff here
      }
    } catch (error) {}
  };
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#2F95D6',
      borderBottomColor: '#ffffff',
      borderBottomWidth: 3,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };
  UpdateProfile = () => {
    this.setState({isUpdatingLoader: true});
    const {
      Uid,
      FirstName,
      LastName,
      type,
      longitude,
      latitude,
      rate,
      LocKnown,
      EmployeeKnown,
      address,
      Tagline,
      gender,
    } = this.state;
    axios
      .post(CONSTANT.BaseUrl + 'profile/update_profile', {
        id: Uid,
        first_name: FirstName,
        last_name: LastName,
        user_type: type,
        longitude: longitude,
        latitude: latitude,
        _perhour_rate: rate,
        country: LocKnown[0],
        no_of_employees: EmployeeKnown[0],
        address: address,
        tag_line: Tagline,
        gender: gender,
      })
      .then(async response => {
        this.setState({isUpdatingLoader: false});
        Alert.alert('Profile Updated Successfully', response.message);
      })
      .catch(error => {
        console.log(error);
      });
  };
  pickSingleProfileBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(image => {
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height,
          },
          images: null,
        });
        const {Uid} = this.state;
        axios
          .post(CONSTANT.BaseUrl + 'media/upload_avatar', {
            id: Uid,
            profile_base64: {
              name: 'IMG-20190704-WA0004.jpg',
              type: image.mime,
              base64_string: image.data,
            },
          })
          .then(async response => {
            console.log(response);
            alert(response.data.message);
          })
          .catch(error => {
            console.log(error);
            alert('Profile Pic Uploading Error');
          });
      })
      .catch(e => console.log(e));
  }
  pickSingleBannerBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(bannerimage => {
        this.setState({
          bannerimage: {
            uri: `data:${bannerimage.mime};base64,` + bannerimage.data,
            width: bannerimage.width,
            height: bannerimage.height,
          },
          images: null,
        });
        const {Uid} = this.state;
        axios
          .post(CONSTANT.BaseUrl + 'media/upload_banner', {
            id: Uid,
            profile_base64: {
              name: 'IMG-20190704-WA0004.jpg',
              type: bannerimage.mime,
              base64_string: bannerimage.data,
            },
          })
          .then(async response => {
            console.log(response);
            alert(response.data.message);
          })
          .catch(error => {
            console.log(error);
            alert('Banner Uploading Error');
          });
      })
      .catch(e => console.log(e));
  }
  render() {
    const {
      banner,
      content,
      type,
      profileImage,
      FirstName,
      LastName,
      Tagline,
      address,
      latitude,
      longitude,
      location,
      noEmployees,
      department,
      rate,
      gender,
      image,
      bannerimage,
      storedType,
      isLoading,
      isUpdatingLoader,
    } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          {/* <CustomHeader /> */}
          <View
            style={{
              height: 60,
              paddingLeft: 15,
              paddingRight: 15,
              width: '100%',
              backgroundColor: 'black',
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
                    fontWeight: 'bold',
                    color: '#fff',
                    height: 30,
                    marginTop: 9,
                  }}>
                  My Profile
                </Text>
              </View>
            </View>
          </View>
          {/* {isLoading && storedType !== '' ? (
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
          ) : null} */}
          {isUpdatingLoader == true ? (
            <View
              style={{
                justifyContent: 'center',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0,0.1)',
                width: '100%',
              }}>
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
          ) : null}
          {storedType !== '' ? (
            <PTRView onRefresh={this._refresh}>
              <ScrollView
                scrollEventThrottle={16}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={{flexDirection: 'column', width: '100%'}}>
                  <View style={styles.wt_main}>
                    <View style={{backgroundColor: '#000'}}>
                      {bannerimage == null ? (
                        <Image
                          style={{height: 250, opacity: 0.64}}
                          source={{uri: `${banner}`}}
                        />
                      ) : (
                        <Image
                          style={{height: 250, opacity: 0.64}}
                          source={bannerimage}
                        />
                      )}
                    </View>
                    <View
                      style={{position: 'absolute', top: '50%', left: '50%'}}>
                      {image == null ? (
                        <Image
                          source={{uri: `${profileImage}`}}
                          style={{
                            width: 110,
                            height: 110,
                            borderRadius: 110 / 2,
                            marginTop: -55,
                            marginLeft: -55,
                            borderColor: '#fff',
                            borderWidth: 3,
                          }}
                        />
                      ) : (
                        <Image
                          source={image}
                          style={{
                            width: 110,
                            height: 110,
                            borderRadius: 110 / 2,
                            marginTop: -55,
                            marginLeft: -55,
                            borderColor: '#fff',
                            borderWidth: 3,
                          }}
                        />
                      )}
                      <View
                        style={{
                          marginTop: -70,
                          marginLeft: -160,
                          backgroundColor: '#2ed1c6',
                          alignSelf: 'center',
                          overflow: 'visible',
                          borderRadius: 50,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: '#fff',
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => this.pickSingleProfileBase64(false)}>
                          <AntIcon
                            name="plus"
                            color={'#fff'}
                            size={14}
                            style={{
                              alignSelf: 'center',
                              textAlign: 'center',
                              marginTop: 0,
                              marginLeft: 1,
                              marginRight: 1,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      elevation={5}
                      style={{
                        shadowColor: '#000000',
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {height: 1, width: 1},
                        flexDirection: 'row',
                        width: 150,
                        alignSelf: 'center',
                        height: 45,
                        borderRadius: 110 / 2,
                        marginTop: -24,
                        borderColor: '#fff',
                        borderWidth: 2,
                        backgroundColor: '#2ed1c6',
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => this.pickSingleBannerBase64(false)}>
                        <AntIcon
                          name="plus"
                          color={'#fff'}
                          size={16}
                          style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 0,
                            marginLeft: 10,
                          }}
                        />
                        <Text
                          style={{
                            color: '#fff',
                            marginHorizontal: 10,
                          }}>
                          {CONSTANT.ProfileSettignBanner}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 15,
                      fontWeight: 'bold',
                      color: '#323232',
                      fontSize: 20,
                    }}>
                    {CONSTANT.ProfileSettignDetail}
                  </Text>

                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />

                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                      }}>
                      {CONSTANT.ProfileSettignFname}
                    </Text>
                    <TextInput
                      style={{fontSize: 16, color: '#323232'}}
                      underlineColorAndroid="transparent"
                      editable={true}
                      placeholder="--"
                      onChangeText={FirstName =>
                        this.setState({FirstName})
                      }>{`${entities.decode(FirstName)}`}</TextInput>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                      }}>
                      {CONSTANT.ProfileSettignLname}
                    </Text>
                    <TextInput
                      style={{fontSize: 16, color: '#323232'}}
                      underlineColorAndroid="transparent"
                      editable={true}
                      placeholder="--"
                      onChangeText={LastName =>
                        this.setState({LastName})
                      }>{`${entities.decode(LastName)}`}</TextInput>
                  </View>
                  {type === 'freelancer' ? (
                    <View>
                      <View
                        style={{
                          borderBottomColor: '#dddddd',
                          borderBottomWidth: 0.6,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: '#fff',
                          padding: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#323232',
                            fontSize: 16,
                          }}>
                          {CONSTANT.ProfileSettignRate}
                        </Text>
                        <TextInput
                          style={{fontSize: 16, color: '#323232'}}
                          underlineColorAndroid="transparent"
                          editable={true}
                          placeholder="--"
                          onChangeText={rate => this.setState({rate})}>
                          {`${entities.decode(rate)}`}
                        </TextInput>
                      </View>
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                      }}>
                      {CONSTANT.ProfileSettignTagline}
                    </Text>
                    <TextInput
                      style={{fontSize: 16, color: '#323232'}}
                      underlineColorAndroid="transparent"
                      editable={true}
                      placeholder="--"
                      onChangeText={Tagline =>
                        this.setState({Tagline})
                      }>{`${entities.decode(Tagline)}`}</TextInput>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      borderTopColor: '#dddddd',
                      borderTopWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 15,
                      marginBottom: 15,
                      fontWeight: 'bold',
                      color: '#323232',
                      fontSize: 20,
                    }}>
                    {CONSTANT.ProfileSettignLocation}
                  </Text>
                  <View
                    style={{
                      borderTopColor: '#dddddd',
                      borderTopWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                      }}>
                      {CONSTANT.ProfileSettignCountry}
                    </Text>
                    <Text
                      onPress={this.componentHideAndShow}
                      style={{
                        fontSize: 16,
                        color: '#000',
                        marginTop: 13,
                        marginBottom: 13,
                      }}
                      underlineColorAndroid="transparent">{`${entities.decode(
                      location,
                    )}`}</Text>
                  </View>
                  {content ? (
                    <View
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 10,
                        marginTop: 10,
                      }}>
                      <MultiSelect
                        ref={component => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={value =>
                          this.setState({LocKnown: value})
                        }
                        uniqueKey="id"
                        items={this.state.location_data}
                        selectedItems={this.state.LocKnown}
                        borderBottomWidth={0}
                        single={true}
                        searchInputPlaceholderText="Search Location..."
                        selectText="Pick Location"
                        styleMainWrapper={{
                          backgroundColor: '#fff',
                          borderRadius: 4,
                          marginTop: 10,
                        }}
                        styleDropdownMenuSubsection={{
                          backgroundColor: '#fff',
                          paddingRight: -7,
                          height: 60,
                          paddingLeft: 10,
                          borderWidth: 0.6,
                          borderColor: '#fff',
                          borderColor: '#dddddd',
                          borderRadius: 4,
                        }}
                        onChangeInput={text => console.log(text)}
                        displayKey="name"
                        submitButtonText="Submit"
                      />
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  {type === 'employer' ? (
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 15,
                        marginBottom: 15,
                        fontWeight: 'bold',
                        color: '#323232',
                        fontSize: 20,
                      }}>
                      {CONSTANT.ProfileSettignCompanyDetails}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: '#dddddd',
                      borderBottomWidth: 0.6,
                    }}
                  />
                  {type === 'employer' ? (
                    <View>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          padding: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#323232',
                            fontSize: 16,
                          }}>
                          {CONSTANT.ProfileSettignNoEmp}
                        </Text>
                        <Text
                          onPress={this.componentHideAndShow}
                          style={{
                            fontSize: 17,
                            color: '#000',
                            marginTop: 13,
                            marginBottom: 13,
                          }}
                          underlineColorAndroid="transparent">{`${entities.decode(
                          noEmployees,
                        )}`}</Text>
                      </View>
                    </View>
                  ) : null}
                  {content && type === 'employer' ? (
                    <View
                      style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>
                      <MultiSelect
                        ref={component => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={value =>
                          this.setState({EmployeeKnown: value})
                        }
                        uniqueKey="value"
                        items={this.state.NoEmployee_data}
                        selectedItems={this.state.EmployeeKnown}
                        borderBottomWidth={0}
                        single={true}
                        searchInputPlaceholderText="Search Employees..."
                        selectText="Pick No. of Employees"
                        styleMainWrapper={{
                          backgroundColor: '#fff',
                          borderRadius: 4,
                          marginTop: 10,
                        }}
                        styleDropdownMenuSubsection={{
                          backgroundColor: '#fff',
                          paddingRight: -7,
                          height: 60,
                          paddingLeft: 10,
                          borderWidth: 0.6,
                          borderColor: '#fff',
                          borderColor: '#dddddd',
                          borderRadius: 4,
                        }}
                        onChangeInput={text => console.log(text)}
                        displayKey="title"
                        submitButtonText="Submit"
                      />
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderTopColor: '#dddddd',
                      borderTopWidth: 0.6,
                    }}
                  />
                  <View
                    style={{
                      borderTopColor: '#dddddd',
                      borderTopWidth: 0.6,
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.UpdateProfile}
                    style={{
                      alignItems: 'center',
                      height: 40,
                      margin: 20,
                      borderRadius: 4,
                      width: '50%',
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
                      {CONSTANT.ProfileSettignSave}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </PTRView>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    position: 'relative',
    bottom: 0,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  wt_main: {
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    paddingBottom: 10,
  },
});
