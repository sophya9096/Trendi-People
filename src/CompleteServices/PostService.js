import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  NativeModules,
  Switch,
  FlatList,
  PanResponder,
  Image,
  Group,
} from 'react-native';
import CustomHeader from '../Header/CustomHeader';
import ModalSelector from 'react-native-modal-selector';
import ActionSheet from 'react-native-actionsheet';
import {Header} from 'react-native-elements';
import axios from 'axios';
import {RadioGroup} from 'react-native-btr';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import CheckBox from 'react-native-check-box';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import MultiSelect from 'react-native-multiple-select';
import SelectedDocLayout from '../../src/CompleteEmployers/SelectedDocLayout';
const Entities = require('html-entities').Html5Entities;
import * as CONSTANT from '../Constants/Constant';
const entities = new Entities();
var ImagePicker = NativeModules.ImageCropPicker;
const options = [
  'Cancel',
  'Apple',
  <Text style={{color: 'yellow'}}>Banana</Text>,
  'Watermelon',
  <Text style={{color: 'red'}}>Durian</Text>,
];
class PostService extends Component {
  constructor(props) {
    super(props);
    (this.array = []),
      (this.arrayAddon = []),
      (this.state = {
        arrayHolder: [],
        arrayHolder_Addon: [],
        textInput_Holder: '',
        textTitle_Holder: '',
        textPrice_Holder: '',
        textDecription_Holder: '',
        radioButtons: [
          {
            label: 'Yes',
            value: 'yes',
            checked: true,
            color: '#323232',
            disabled: false,
            onPress: this.hide(),
            width: '50%',
            size: 8,
          },
          {
            label: 'No',
            value: 'no',
            checked: false,
            color: '#323232',
            disabled: false,
            width: '50%',
            size: 8,
          },
        ],
        image: null,
        images: null,
        imagesAddFile: null,
        switchValue: false,
        imagesLength: '',
        switchfeaturedValue: false,
        sendSwitchFeaturedValue: '',
        sendSwitchValue: '',
        isUpdatingLoader: false,
        Uid: '',
        Title: '',
        Cost: '',
        Content: '',
        Address: '',
        Latitude: '',
        Longitude: '',
        pickerOpacity: 0,
        opacityOfOtherItems: 1,
        label: 'Firstvalue',
        isLoading: true,
        freelancerKnown: '',
        jobKnown: '',
        freelancerLevelKnown: '',
        englishKnown: '',
        responseKnown: '',
        deliveryKnown: '',
        durationKnown: '',
        projectCategoryKnown: '',
        projectTypeKnown: '',
        projectLevelKnown: '',
        projectLocationKnown: '',
        CatPickerValueHolder: [],
        CatKnown: [],
        LangPickerValueHolder: [],
        LangKnown: [],
        AddonServiceKnown: [],
        SkillsPickerValueHolder: [],
        SkillsKnown: [],
        showAlert: false,
        showSuccessAlert: false,
      });
    this.showFilters = true;
  }
  componentDidMount() {
    this.setState({arrayHolder: [...this.array]});
    this.setState({arrayHolder_Addon: [...this.arrayAddon]});
    this.FreelancerLevelSpinner();
    this.JObDurationSpinner();
    this.englishLevelSpinner();
    this.ProjectCatSpinner();
    this.ProjectTypeSpinner();
    this.ProjectCategoriesSpinner();
    this.ProjectLanguageSpinner();
    this.ProjectSkillsSpinner();
    this.ProjectLocationSpinner();
    this.responseTimeSpinner();
    this.deliveryTimeSpinner();
    this.getAddonServicesSpinner();
  }
  joinData = () => {
    this.array.push({videotitle: this.state.textInput_Holder});
    this.setState({arrayHolder: [...this.array]});
  };
  joinDataForAddons = () => {
    this.arrayAddon.push({
      title: this.state.textTitle_Holder,
      price: this.state.textPrice_Holder,
      description: this.state.textDecription_Holder,
    });
    this.setState({arrayHolder_Addon: [...this.arrayAddon]});
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };
  GetItem(item) {
    Alert.alert(item.title);
  }
  FreelancerLevelSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_list?list=freelancer_level',
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
        let freelancer = responseJson;
        this.setState({
          freelancer,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  JObDurationSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=duration_list', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let JobDuration = responseJson;
        this.setState({
          JobDuration,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  englishLevelSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=english_levels', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let EnglishLevel = responseJson;
        this.setState({
          EnglishLevel,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  responseTimeSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=response_time',
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
        let ResponseTime = responseJson;
        this.setState({
          ResponseTime,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  deliveryTimeSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=delivery',
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
        let DeliveryTime = responseJson;
        this.setState({
          DeliveryTime,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectCatSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=project_level', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let ProjectLevel = responseJson;
        this.setState({
          ProjectLevel,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectTypeSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=project_type', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectType = responseJson;
        this.setState({
          projectType,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectLocationSpinner = async () => {
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
        let projectLocation = responseJson;
        this.setState({
          projectLocation,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectCategoriesSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=project_cat',
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
        let ProjectCategory = responseJson;
        this.setState({
          isLoading: false,
          ProjectCategory,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectLanguageSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=languages',
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
        let Language_data = responseJson;
        this.setState({
          isLoading: false,
          Language_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectSkillsSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=skills', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let skills_data = responseJson;
        this.setState({
          isLoading: false,
          skills_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  getAddonServicesSpinner = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    return fetch(
      CONSTANT.BaseUrl + 'services/get_addons_services?user_id=' + Uid,
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
        let AddonService_data = responseJson;
        this.setState({
          isLoading: false,
          AddonService_data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  PostService = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const {
      sendSwitchValue,
      sendSwitchFeaturedValue,
      Address,
      image,
      // Latitude,
      // Longitude,
      Title,
      Cost,
      Content,
      deliveryKnown,
      responseKnown,
      englishKnown,
      projectLocationKnown,
      CatKnown,
      LangKnown,
      AddonServiceKnown,
      arrayHolder_Addon,
      arrayHolder,
      imagesAddFile,
      images,
    } = this.state;
    if (
      Title != '' &&
      Cost != '' &&
      Content != '' &&
      deliveryKnown[0] != '' &&
      responseKnown[0] != '' &&
      englishKnown[0] != '' &&
      projectLocationKnown != '' &&
      CatKnown != '' &&
      LangKnown != '' &&
      AddonServiceKnown != '' &&
      images.length != ''
    ) {
      const formData = new FormData();
      formData.append('user_id', Uid);
      formData.append('title', Title);
      formData.append('delivery_time', deliveryKnown[0]);
      formData.append('response_time', responseKnown[0]);
      formData.append('english_level', englishKnown[0]);
      formData.append('price', Cost);
      formData.append('description', Content);
      formData.append('country', projectLocationKnown[0]);
      formData.append('address', Address);
      // formData.append('longitude', Longitude);
      // formData.append('latitude', Latitude);
      formData.append('is_featured', sendSwitchFeaturedValue);
      formData.append('categories', CatKnown);
      formData.append('languages', LangKnown);
      formData.append('addons', AddonServiceKnown);
      formData.append('addons_service', arrayHolder_Addon);
      formData.append('videos', arrayHolder);
      formData.append('downloadable', 'no');
      if (imagesAddFile >= 1) {
        formData.append('donwload_size', imagesAddFile.length);
      } else {
        formData.append('donwload_size', 0);
      }
      if (images >= 1) {
        formData.append('size', images.length);
      } else {
        formData.append('size', 0);
      }
      if (images >= 1) {
        images.forEach((item, i) => {
          // propertyData.description = this.props.description
          var path = item.uri;
          // var filename = path.substring(path.lastIndexOf('/')+1);
          var filename = item.name;
          formData.append('service_documents' + i, {
            uri: path,
            type: item.type,
            name: filename || `filename${i}.jpg`,
          });
        });
      }
      if (imagesAddFile >= 1) {
        imagesAddFile.forEach((item, i) => {
          // propertyData.description = this.props.description
          var path = item.uri;
          // var filename = path.substring(path.lastIndexOf('/')+1);
          var filename = item.name;
          formData.append('downloads_documents' + i, {
            uri: path,
            type: item.type,
            name: filename || `filename${i}.jpg`,
          });
        });
      }
      fetch(CONSTANT.BaseUrl + 'services/add_service', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === '200') {
            //  Alert.alert(response.data.message  );
            this.showSuccessAlert();
          } else if (response.status === '203') {
            this.showAlert();
            // Alert.alert(response.data.message  );
          } else {
          }
        })
        .catch(error => {
          Alert.alert('Success', 'Data submitted successfully');
        });
    } else {
      Alert.alert('Sorry', 'Please add complete Data');
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
      } else {
        throw err;
      }
    }
  }
  pickMultipleForAddFile() {
    try {
      DocumentPicker.pickMultiple({})
        .then(imagesAddFile => {
          this.setState({
            image: null,
            imagesAddFile: imagesAddFile,
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
  toggleSwitch = value => {
    this.setState({switchValue: value});
    if (value == true) {
      this.state.sendSwitchValue = 'on';
    } else {
      this.state.sendSwitchValue = 'off';
    }
  };
  togglefeaturedSwitch = value => {
    this.setState({switchfeaturedValue: value});
    if (value == true) {
      this.state.sendSwitchFeaturedValue = 'on';
    } else {
      this.state.sendSwitchFeaturedValue = 'off';
    }
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  showSuccessAlert = () => {
    this.setState({
      showSuccessAlert: true,
    });
  };
  hideSuccessAlert = () => {
    this.setState({
      showSuccessAlert: false,
    });
  };
  hide() {
    this.setState({showFilters: false});
  }
  handleChange = index => {
    let checked = [...this.state.checked];
    checked[index] = !checked[index];
    this.setState({checked});
  };
  deleteItemById = id => {
    const filteredData = this.state.data.filter(item => item.id !== id);
    this.setState({data: filteredData});
  };
  deleteAddress(id) {
    Alert.alert(
      'Delete Address',
      'Are you sure want to delete this File ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteAddressDetail(id)},
      ],
      {cancelable: false},
    );
  }
  deleteAddressVideo(id) {
    Alert.alert(
      'Delete Address',
      'Are you sure want to delete this File ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteAddressDetailVideoUrl(id)},
      ],
      {cancelable: false},
    );
  }
  deleteAddressSelectFile(id) {
    Alert.alert(
      'Delete Address',
      'Are you sure want to delete this File ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteAddressDetailSelectFileUrl(id)},
      ],
      {cancelable: false},
    );
  }
  deleteAddressDetail(id) {
    let newimagesAddFile = this.state.imagesAddFile;
    newimagesAddFile.splice(id, 1);
    this.setState({imagesAddFile: newimagesAddFile});
  }
  deleteAddressDetailVideoUrl(id) {
    let newimagesAddFile = this.state.arrayHolder;
    newimagesAddFile.splice(id, 1);
    this.setState({arrayHolder: newimagesAddFile});
  }
  deleteAddressDetailSelectFileUrl(id) {
    let newimagesAddFile = this.state.images;
    newimagesAddFile.splice(id, 1);
    this.setState({images: newimagesAddFile});
  }
  render() {
    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    const {
      showAlert,
      showSuccessAlert,
      isLoading,
      isUpdatingLoader,
      imagesAddFile,
      images,
    } = this.state;
    let {data, checked} = this.state;
    return (
      <View style={styles.container}>
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
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  height: 30,
                  marginTop: 9,
                }}>
                Post Service
              </Text>
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
        <ScrollView>
          <Text style={styles.postjobtext}>Post A Service</Text>
          <View
            style={{
              borderBottomColor: '#c0c0c0',
              borderBottomWidth: 0.6,
              marginBottom: 15,
            }}
          />
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Service Description
            </Text>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Service Title"
            placeholderTextColor="#807f7f"
            onChangeText={Title => this.setState({Title})}
          />
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              style={{
                borderColor: '#323232',
                borderRadius: 4,
                borderWidth: 0.6,
              }}
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({deliveryKnown: value})
              }
              uniqueKey="slug"
              items={this.state.DeliveryTime}
              selectedItems={this.state.deliveryKnown}
              single={true}
              searchInputPlaceholderText="Search Delivery Time..."
              selectText="Pick Delivery Time"
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
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Service Cost"
            placeholderTextColor="#807f7f"
            onChangeText={Cost => this.setState({Cost})}
          />
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Downloadable Services
            </Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
            }}>
            <RadioGroup
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}
              color={CONSTANT.primaryColor}
              labelStyle={{fontSize: 15}}
              radioButtons={this.state.radioButtons}
              onPress={radioButtons => this.setState({radioButtons})}
              style={{
                paddingTop: 0,
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
              }}
            />
          </View>
          {selectedItem == 'yes' && (
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: '500',
                  marginTop: 20,
                  color: CONSTANT.primaryColor,
                }}>
                Add Your File:
              </Text>
              <TouchableOpacity
                onPress={() => this.pickMultipleForAddFile()}
                style={{
                  alignItems: 'center',
                  height: 40,
                  margin: 15,
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
                  Add File
                </Text>
              </TouchableOpacity>
              {this.state.imagesAddFile != null ? (
                <View style={{marginLeft: 10, marginRight: 10}}>
                  <SwipeableFlatList
                    data={this.state.imagesAddFile}
                    renderItem={({item}) => (
                      <View
                        style={{
                          borderWidth: 0,
                          margin: 5,
                          height: 45,
                          flexDirection: 'column',
                          paddingTop: 12,
                          backgroundColor: '#f7f7f7',
                        }}>
                        <Text
                          style={{
                            color: '#3d4461',
                            fontSize: 15,
                            paddingLeft: 5,
                          }}
                          onPress={this.GetItem.bind(this, item.title)}>
                          {' '}
                          {item.name}{' '}
                        </Text>
                      </View>
                    )}
                    renderRight={({item}) => (
                      <TouchableOpacity
                        style={{
                          height: 45,
                          margin: 5,
                          width: 45,
                          backgroundColor: '#fe736e',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => this.deleteAddress(item)}>
                        <AntIcon
                          name="delete"
                          color={'#fff'}
                          size={16}
                          style={{top: 13, right: -3}}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ) : null}
            </View>
          )}
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
              overflow: 'hidden',
              backgroundColor: '#fcfcfc',
              borderLeftWidth: 5,
              borderLeftColor: CONSTANT.primaryColor,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginLeft: 20,
                  textAlign: 'left',
                  fontSize: 15,
                  width: '65%',
                  fontWeight: '500',
                }}>
                Addon Services
              </Text>
            </View>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="*Addon Title"
            placeholderTextColor="#807f7f"
            onChangeText={data => this.setState({textTitle_Holder: data})}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="*Addon Price"
            placeholderTextColor="#807f7f"
            onChangeText={data => this.setState({textPrice_Holder: data})}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Addon Description"
            placeholderTextColor="#807f7f"
            onChangeText={data => this.setState({textDecription_Holder: data})}
          />
          <TouchableOpacity
            onPress={() => this.joinDataForAddons()}
            style={{
              alignItems: 'center',
              height: 40,
              margin: 15,
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
              Add Addons
            </Text>
          </TouchableOpacity>
          {this.state.arrayHolder_Addon != null ? (
            <View style={{marginLeft: 10, marginRight: 10}}>
              <SwipeableFlatList
                data={this.state.arrayHolder_Addon}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderWidth: 0,
                      margin: 5,
                      height: 45,
                      flexDirection: 'column',
                      paddingTop: 12,
                      backgroundColor: '#f7f7f7',
                    }}>
                    <Text
                      style={{color: '#3d4461', fontSize: 15, paddingLeft: 5}}>
                      {' '}
                      {item.title}{' '}
                    </Text>
                  </View>
                )}
                renderRight={({item}) => (
                  <TouchableOpacity
                    style={{
                      height: 45,
                      margin: 5,
                      width: 45,
                      backgroundColor: '#fe736e',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                    // onPress={() => this.deleteAddressVideo(item)}
                  >
                    <AntIcon
                      name="delete"
                      color={'#fff'}
                      size={16}
                      style={{top: 13, right: -3}}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null}
          <View style={{marginLeft: 20, marginRight: 20, padding: 3}}>
            {/* <Text style={{width:'20%' , alignSelf:'center' , marginLeft:10 , fontSize:15}}>Categories:</Text> */}
            <MultiSelect
              style={{marginTop: 4}}
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({AddonServiceKnown: value})
              }
              uniqueKey="ID"
              items={this.state.AddonService_data}
              selectedItems={this.state.AddonServiceKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText="Search Addon Service..."
              selectText="Pick Addon Service"
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
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Service Categories
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, padding: 3}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value => this.setState({CatKnown: value})}
              uniqueKey="id"
              items={this.state.ProjectCategory}
              selectedItems={this.state.CatKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText="Search Categories..."
              selectText="Pick Categories"
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
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Languages
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, padding: 3}}>
            {/* <Text style={{width:'20%' , alignSelf:'center' , marginLeft:10 , fontSize:15}}>Categories:</Text> */}
            <MultiSelect
              style={{marginTop: 4}}
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value => this.setState({LangKnown: value})}
              uniqueKey="id"
              items={this.state.Language_data}
              selectedItems={this.state.LangKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText="Search Languages..."
              selectText="Pick Languages"
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
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              English Level
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({englishKnown: value})
              }
              uniqueKey="value"
              items={this.state.EnglishLevel}
              selectedItems={this.state.englishKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search English Level..."
              selectText="Pick English Lavel"
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
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Service Response Time
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({responseKnown: value})
              }
              uniqueKey="slug"
              items={this.state.ResponseTime}
              selectedItems={this.state.responseKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Response Time..."
              selectText="Pick Response Time"
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
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Service Details
            </Text>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 150,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Service Content"
            placeholderTextColor="#807f7f"
            onChangeText={Content => this.setState({Content})}
          />
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Add Video Url
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}>
            <TextInput
              onChangeText={data => this.setState({textInput_Holder: data})}
              underlineColorAndroid="transparent"
              placeholder="Enter Url Here"
              style={{
                paddingLeft: 10,
                height: 45,
                placeholderTextColor: '#f7f7f7',
                color: '#323232',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderWidth: 0.6,
                borderColor: '#dddddd',
                marginBottom: 10,
                width: '80%',
              }}
            />
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                height: 45,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                width: '20%',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <AntIcon
                onPress={this.joinData}
                name="plus"
                color={'#fff'}
                size={20}
                style={{top: 15, height: 45}}
              />
            </View>
          </View>
          {this.state.arrayHolder != null ? (
            <View style={{marginLeft: 10, marginRight: 10}}>
              <SwipeableFlatList
                data={this.state.arrayHolder}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderWidth: 0,
                      margin: 5,
                      height: 45,
                      flexDirection: 'column',
                      paddingTop: 12,
                      backgroundColor: '#f7f7f7',
                    }}>
                    <Text
                      style={{color: '#3d4461', fontSize: 15, paddingLeft: 5}}>
                      {' '}
                      {item.videotitle}{' '}
                    </Text>
                  </View>
                )}
                renderRight={({item}) => (
                  <TouchableOpacity
                    style={{
                      height: 45,
                      margin: 5,
                      width: 45,
                      backgroundColor: '#fe736e',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() => this.deleteAddressVideo(item)}>
                    <AntIcon
                      name="delete"
                      color={'#fff'}
                      size={16}
                      style={{top: 13, right: -3}}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null}
          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Your Location
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({projectLocationKnown: value})
              }
              uniqueKey="slug"
              items={this.state.projectLocation}
              selectedItems={this.state.projectLocationKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Project Location..."
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
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Address"
            placeholderTextColor="#807f7f"
            onChangeText={Address => this.setState({Address})}
          />
          {/* <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "#807f7f",
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20
            }}
          >
            Latitudes and Longitudes are compulsory to show that user on map and
            also for search on the basis of location
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50, borderWidth: 0.6, borderRadius: 4, borderColor: '#dddddd'
            }}
            name="username"
            placeholder="Latitude"
            placeholderTextColor="#807f7f"
            onChangeText={Latitude => this.setState({ Latitude })}
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: '#323232',
              fontSize: 15,
              padding: 5,
              height: 50, borderWidth: 0.6, borderRadius: 4, borderColor: '#dddddd'
            }}
            name="username"
            placeholder="Longitude"
            placeholderTextColor="#807f7f"
            onChangeText={Longitude => this.setState({ Longitude })}
          /> */}

          <View
            style={{
              height: 65,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
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
              Is Featured
            </Text>
            <Switch
              style={{alignSelf: 'flex-end', marginTop: -20}}
              onValueChange={this.togglefeaturedSwitch}
              value={this.state.switchfeaturedValue}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              color: '#807f7f',
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
            }}>
            * Must select atleast one attachemnt otherwise data would not be
            submitted
          </Text>
          {this.state.images != null ? (
            <View style={{marginLeft: 10, marginRight: 10}}>
              <SwipeableFlatList
                data={this.state.images}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderWidth: 0,
                      margin: 5,
                      height: 45,
                      flexDirection: 'column',
                      paddingTop: 12,
                      backgroundColor: '#f7f7f7',
                    }}>
                    <Text
                      style={{color: '#3d4461', fontSize: 15, paddingLeft: 5}}
                      onPress={this.GetItem.bind(this, item.title)}>
                      {' '}
                      {item.name}{' '}
                    </Text>
                  </View>
                )}
                renderRight={({item}) => (
                  <TouchableOpacity
                    style={{
                      height: 45,
                      margin: 5,
                      width: 45,
                      backgroundColor: '#fe736e',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() => this.deleteAddressSelectFile(item)}>
                    <AntIcon
                      name="delete"
                      color={'#fff'}
                      size={16}
                      style={{top: 13, right: -3}}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null}
          <View
            style={{
              width: '90%',
              marginBottom: 10,
              flexDirection: 'row',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={this.PostService}
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
              <Text style={styles.selectFIleTextStyle}>Select File</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert"
          message="Please Add Complete Detail or Check Network!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={CONSTANT.primaryColor}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <AwesomeAlert
          show={showSuccessAlert}
          showProgress={false}
          title="Alert"
          message="Job Posted Successfully!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={CONSTANT.primaryColor}
          onConfirmPressed={() => {
            this.hideSuccessAlert();
          }}
        />
      </View>
    );
  }
}
export default PostService;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  postjobtext: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    margin: 15,
  },
  selectFIleTextStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    paddingTop: 10,
  },
});
