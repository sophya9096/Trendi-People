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
} from 'react-native';
import CustomHeader from '../Header/CustomHeader';
import ModalSelector from 'react-native-modal-selector';
import ActionSheet from 'react-native-actionsheet';
import {Header} from 'react-native-elements';
import axios from 'axios';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import MultiSelect from 'react-native-multiple-select';
import SelectedDocLayout from './SelectedDocLayout';
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

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null,
      switchValue: false,
      imagesLength: '',
      switchfeaturedValue: false,
      sendSwitchFeaturedValue: '',
      sendSwitchValue: '',
      isUpdatingLoader: false,
      Uid: '',
      Title: '',
      Cost: '',
      HourlyRate: '',
      EstimatedHour: '',
      ExpiryDate: '',
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
      durationKnown: '',
      projectCategoryKnown: '',
      projectTypeKnown: '',
      projectLevelKnown: '',
      projectLocationKnown: '',
      CatPickerValueHolder: [],
      CatKnown: [],
      LangPickerValueHolder: [],
      LangKnown: [],
      SkillsPickerValueHolder: [],
      SkillsKnown: [],
      showAlert: false,
      showSuccessAlert: false,
    };
  }
  componentDidMount() {
    this.FreelancerLevelSpinner();
    this.JObDurationSpinner();
    this.englishLevelSpinner();
    this.ProjectCatSpinner();
    this.ProjectTypeSpinner();
    this.ProjectCategoriesSpinner();
    this.ProjectLanguageSpinner();
    this.ProjectSkillsSpinner();
    this.ProjectLocationSpinner();
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
        // let projectTypeValue = responseJson
        let projectTypeValue = responseJson[0].value;
        let projectTypeValueHourlyRate = responseJson[1].value;
        this.setState({
          projectType,
          projectTypeValue,
          projectTypeValueHourlyRate,
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
  PostJob = async () => {
    // this.setState({isUpdatingLoader: true})
    const Uid = await AsyncStorage.getItem('projectUid');
    const {
      sendSwitchValue,
      sendSwitchFeaturedValue,
      Address,
      image,
      Latitude,
      Longitude,
      Title,
      Cost,
      HourlyRate,
      EstimatedHour,
      ExpiryDate,
      Content,
      freelancerLevelKnown,
      projectLevelKnown,
      durationKnown,
      englishKnown,
      projectTypeKnown,
      projectLocationKnown,
      CatKnown,
      LangKnown,
      SkillsKnown,
      images,
    } = this.state;
    if (
      Title != '' &&
      projectLevelKnown[0] != '' &&
      durationKnown[0] != '' &&
      freelancerLevelKnown[0] != '' &&
      englishKnown[0] != '' &&
      projectTypeKnown[0] != '' &&
      projectLocationKnown[0] != '' &&
      images.length != ''
    ) {
      const formData = new FormData();
      formData.append('user_id', Uid);
      formData.append('title', Title);
      formData.append('project_level', projectLevelKnown[0]);
      formData.append('project_duration', durationKnown[0]);
      formData.append('freelancer_level', freelancerLevelKnown[0]);
      formData.append('english_level', englishKnown[0]);
      formData.append('project_type', projectTypeKnown[0]);
      formData.append('hourly_rate', HourlyRate);
      formData.append('estimated_hours', EstimatedHour);
      formData.append('expiry_date', ExpiryDate);
      formData.append('project_cost', Cost);
      formData.append('description', Content);
      formData.append('country', projectLocationKnown[0]);
      formData.append('address', Address);
      // formData.append('longitude', Longitude);
      // formData.append('latitude', Latitude);
      formData.append('is_featured', sendSwitchFeaturedValue);
      formData.append('show_attachments', sendSwitchValue);
      formData.append('categories', CatKnown);
      formData.append('skills', SkillsKnown);
      formData.append('languages', LangKnown);
      formData.append('size', images.length);
      images.forEach((item, i) => {
        var path = item.uri;
        var filename = item.name;
        formData.append('proposal_files' + i, {
          uri: path,
          type: item.type,
          name: filename || `filename${i}.jpg`,
        });
      });
      fetch(CONSTANT.BaseUrl + 'listing/add_jobs', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(resp => {
          if (resp.status == '200') {
            this.showSuccessAlert();
          } else if (resp.status == '203') {
            this.showAlert();
          }
        })
        .catch(err => {
          Alert.alert('Success', 'Data Posted Successfully');
          console.log(err.response);
        });
    } else {
      Alert.alert('Sorry', 'Please add complete Data');
    }

    // .then((response) => response.json())
    // .then(response => {
    //   if (response.status == "200") {
    //     this.showSuccessAlert();
    //   } else if (response.status == "203") {
    //     this.showAlert();
    //   }
    // }).catch((error) => {
    //   Alert.alert("Error:", error.message);
    //   console.log(error.response)
    // });
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
  render() {
    const {
      showAlert,
      showSuccessAlert,
      isLoading,
      isUpdatingLoader,
      images,
    } = this.state;
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
                Post Job
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
          <Text style={styles.postjobtext}>Post a Job</Text>
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
              Job Description
            </Text>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,

              color: '#323232',
              borderWidth: 0.2,

              fontSize: 15,
              padding: 5,
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Job Title"
            placeholderTextColor="#807f7f"
            onChangeText={Title => this.setState({Title})}
          />
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({freelancerLevelKnown: value})
              }
              uniqueKey="value"
              items={this.state.freelancer}
              selectedItems={this.state.freelancerLevelKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Freelancer Level..."
              selectText="Pick Freelancer Level"
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
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({durationKnown: value})
              }
              uniqueKey="value"
              items={this.state.JobDuration}
              selectedItems={this.state.durationKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Job Duration.."
              selectText="Pick Job Duration"
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
              selectText="Pick English Level"
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
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({projectLevelKnown: value})
              }
              uniqueKey="value"
              items={this.state.ProjectLevel}
              selectedItems={this.state.projectLevelKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Project Level..."
              selectText="Pick Project Level"
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

          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({projectTypeKnown: value})
              }
              uniqueKey="value"
              items={this.state.projectType}
              selectedItems={this.state.projectTypeKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText="Search Project Type..."
              selectText="Pick Project Type"
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
          {this.state.projectTypeKnown[0] === 'fixed' ? (
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
              placeholder="Project Cost"
              placeholderTextColor="#807f7f"
              onChangeText={Cost => this.setState({Cost})}
            />
          ) : this.state.projectTypeKnown[0] === 'hourly' ? (
            <View>
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
                placeholder="Hourly Rate"
                placeholderTextColor="#807f7f"
                onChangeText={HourlyRate => this.setState({HourlyRate})}
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
                placeholder="Estimated Hour"
                placeholderTextColor="#807f7f"
                onChangeText={EstimatedHour => this.setState({EstimatedHour})}
              />
            </View>
          ) : null}
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
            placeholder="Expiry Date (optional)"
            placeholderTextColor="#807f7f"
            onChangeText={ExpiryDate => this.setState({ExpiryDate})}
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
              Job Categories
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
              selectText="Pick Project Category"
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
              searchInputPlaceholderText="Search Language..."
              selectText="Pick Project Language"
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
              Job Details
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
            placeholder="Job Content"
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
              Skills Required
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, padding: 3}}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({SkillsKnown: value})
              }
              uniqueKey="id"
              items={this.state.skills_data}
              selectedItems={this.state.SkillsKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText="Search Skills..."
              selectText="Pick Job Skills"
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
              selectText="Pick Project Location"
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
              textAlign: 'center',
              alignSelf: 'center',
              color: '#807f7f',
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
            }}>
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
              height: 50,
              borderWidth: 0.6,
              borderRadius: 4,
              borderColor: '#dddddd',
            }}
            name="username"
            placeholder="Latitude"
            placeholderTextColor="#807f7f"
            onChangeText={Latitude => this.setState({Latitude})}
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
            placeholder="Longitude"
            placeholderTextColor="#807f7f"
            onChangeText={Longitude => this.setState({Longitude})}
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
              Your Attachments
            </Text>
            <Switch
              style={{alignSelf: 'flex-end', marginTop: -20}}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
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
            <FlatList
              style={{paddingBottom: 5, paddingTop: 10}}
              data={this.state.images}
              keyExtractor={(y, z) => z.toString()}
              renderItem={({item}) => <SelectedDocLayout docName={item.name} />}
            />
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
              onPress={this.PostJob}
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
export default PostJob;
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
