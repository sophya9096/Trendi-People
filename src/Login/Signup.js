import React, {Component, createRef} from 'react';
import {
  View,
  StyleSheet,
  WebView,
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
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      projectLocationKnown: '',
      DepartmentKnown: '',
      EmployeeKnown: '',
      FirstName: '',
      LastName: '',
      UserName: '',
      Email: '',
      Password: '',
      RetypePassword: '',
      radioButtons: [
        {
          label: CONSTANT.SignupMale,
          value: 'male',
          checked: true,
          color: 'white',
          disabled: false,
          width: '40%',
          size: 8,
        },
        {
          label: CONSTANT.SignupFemale,
          value: 'female',
          checked: false,
          color: 'white',
          disabled: false,
          width: '40%',
          size: 8,
        },
      ],
      radioButtonsforStartAs: [
        {
          label: CONSTANT.SignupCompany,
          value: 'company',
          checked: true,
          color: 'white',
          disabled: false,
          width: '40%',
          size: 8,
        },
        {
          label: CONSTANT.SignupFreelancer,
          value: 'freelancer',
          checked: false,
          color: 'white',
          disabled: false,
          width: '40%',
          size: 8,
        },
      ],
    };
    this.showFilters = true;
  }
  componentDidMount() {
    this.ProjectLocationSpinner();
    this.NoEmployeeSpinner();
    this.Departments();
  }
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
  Departments = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=department',
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
        let TotaolDepartments = responseJson;
        this.setState({
          TotaolDepartments,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  CreateAccount = () => {
    let selectedItemgender = this.state.radioButtons.find(
      e => e.checked == true,
    );
    let selectedItemtype = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    const {
      projectLocationKnown,
      DepartmentKnown,
      EmployeeKnown,
      FirstName,
      LastName,
      UserName,
      Email,
      Password,
      RetypePassword,
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      FirstName == '' &&
      LastName == '' &&
      Email == '' &&
      Password == '' &&
      RetypePassword == '' &&
      UserName == ''
    ) {
      alert('Please enter Complete Detail');
      this.setState({email: 'Please enter Complete Detail'});
    } else if (reg.test(Email) === false) {
      alert('Email is Not Correct');
      this.setState({email: 'Email is Not Correct'});
      return false;
    } else if (Password !== RetypePassword) {
      alert("Passwords don't match");
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'user/signup', {
          gender: selectedItemgender,
          username: UserName,
          email: Email,
          first_name: FirstName,
          last_name: LastName,
          location: projectLocationKnown[0],
          password: Password,
          verify_password: RetypePassword,
          department: DepartmentKnown[0],
          employees: EmployeeKnown[0],
          user_type: selectedItemtype,
          termsconditions: 'yes',
        })
        .then(async response => {
          if (response.status === 200) {
            if (response.data.verify_user === 'verified') {
              Alert.alert(
                'Congratulations',
                "Account Created, You can now Login. Don't Forget to Verify your account from Website",
              );
.then(async response => {
          if (response.status === 200) {
            if (response.data.verify_user === 'verified') {
              // Alert.alert(
              //   'Congratulations',
              //   "Account Created, You can now Login. Don't Forget to Verify your account from Website",
              // );
              Alert.alert(response.data.message);
              this.props.navigation.navigate('LoginScreen')
              // , {user_id: response.data.user_id,});
            } else {
              Alert.alert(
                'Congratulations',
                "Account Created, You can now Login. Don't Forget to Verify your account from Website",
              );
            }
          } else if (response.status === 203) {
            Alert.alert('Error', response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  render() {
    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const {
      FirstName,
      LastName,
      UserName,
      Email,
      Password,
      RetypePassword,
    } = this.state;
    const lastnameInputRef = createRef();
    const usernameInputRef = createRef();
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const retypepasswordInputRef = createRef();
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
          <View>
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
              fontSize: 36,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: 0,
              fontWeight: '100',
            }}>
            {CONSTANT.SignupHeader}
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
              marginBottom: 5,
            }}>
            create your account
          </Text>
          <ScrollView>
            <View>
              <View
                style={{
                  justifyContent: 'space-around',
                }}>
                <RadioGroup
                  color={CONSTANT.primaryColor}
                  labelStyle={{fontSize: 16}}
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons => this.setState({radioButtons})}
                  style={{
                    paddingTop: 0,
                    flexDirection: 'row',
                    marginBottom: 2,
                    marginTop: 10,
                    marginLeft: 10,
                    display: 'flex',
                    width: '100%',
                    alignSelf: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  marginTop: 20,
                  display: 'flex',
                }}>
                <TextInput
                  // autoCapitalize="none"
                  placeholder="First Name"
                  placeholderTextColor="white"
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    lastnameInputRef.current && lastnameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  onChangeText={FirstName => this.setState({FirstName})}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  marginTop: 20,
                  display: 'flex',
                }}>
                <TextInput
                  // autoCapitalize="none"
                  placeholder="Last Name"
                  placeholderTextColor="white"
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  onSubmitEditing={() =>
                    usernameInputRef.current && usernameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  ref={lastnameInputRef}
                  underlineColorAndroid="transparent"
                  onChangeText={LastName => this.setState({LastName})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  marginTop: 20,
                  display: 'flex',
                }}>
                <TextInput
                  // autoCapitalize="none"
                  placeholder="User Name"
                  placeholderTextColor="white"
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  ref={usernameInputRef}
                  underlineColorAndroid="transparent"
                  onChangeText={UserName => this.setState({UserName})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
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
                  blurOnSubmit={false}
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  ref={emailInputRef}
                  underlineColorAndroid="transparent"
                  onChangeText={Email => this.setState({Email})}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  marginTop: 20,
                  display: 'flex',
                }}>
                <TextInput
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  editable={true}
                  onSubmitEditing={() =>
                    retypepasswordInputRef.current &&
                    retypepasswordInputRef.current.focus()
                  }
                  ref={passwordInputRef}
                  placeholderTextColor="white"
                  autoCompleteType="password"
                  onChangeText={Password => this.setState({Password})}
                  placeholder={CONSTANT.SignupPassword}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 300,
                  borderColor: '#ffffff',
                  borderRadius: 5,
                  height: 50,
                  borderWidth: 2,
                  paddingHorizontal: 20,
                  marginTop: 20,
                  display: 'flex',
                }}>
                <TextInput
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  editable={true}
                  ref={retypepasswordInputRef}
                  placeholderTextColor="white"
                  autoCompleteType="password"
                  onChangeText={RetypePassword =>
                    this.setState({RetypePassword})
                  }
                  placeholder={CONSTANT.SignupRetypePassword}
                />
              </View>
              <View>
                <MultiSelect
                  style={{
                    color: 'white',
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
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
                  selectedItemTextColor="white"
                  selectText="Pick Location"
                  selectedItemIconColor="white"
                  textColor="white"
                  styleMainWrapper={{
                    marginTop: 20,
                  }}
                  styleDropdownMenuSubsection={{
                    backgroundColor: 'transparent',
                    height: 50,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 5,
                    paddingLeft: 20,
                  }}
                  onChangeInput={text => console.log(text)}
                  displayKey="name"
                  submitButtonText="Submit"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{marginLeft: 10}}>
                <RadioGroup
                  color={CONSTANT.primaryColor}
                  labelStyle={{fontSize: 16}}
                  radioButtons={this.state.radioButtonsforStartAs}
                  onPress={radioButtons => this.setState({radioButtons})}
                  style={{
                    paddingTop: 0,
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10,
                    display: 'flex',
                    width: '100%',
                    alignSelf: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                  }}
                />
              </View>
              {selectedItem == 'freelancer' ? null : (
                <View>
                  <View>
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
                      selectedItemTextColor="white"
                      selectedItemIconColor="white"
                      textColor="white"
                      styleMainWrapper={{
                        marginTop: 20,
                      }}
                      styleDropdownMenuSubsection={{
                        backgroundColor: 'transparent',
                        height: 50,
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 5,
                        paddingLeft: 20,
                      }}
                      onChangeInput={text => console.log(text)}
                      displayKey="title"
                      submitButtonText="Submit"
                    />
                  </View>
                </View>
              )}
              {selectedItem == 'freelancer' ? null : (
                <View>
                  <View>
                    <MultiSelect
                      ref={component => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={value =>
                        this.setState({DepartmentKnown: value})
                      }
                      uniqueKey="slug"
                      items={this.state.TotaolDepartments}
                      selectedItems={this.state.DepartmentKnown}
                      borderBottomWidth={0}
                      single={true}
                      searchInputPlaceholderText="Search department..."
                      selectText="Pick Department"
                      selectedItemTextColor="white"
                      selectedItemIconColor="white"
                      textColor="white"
                      styleMainWrapper={{
                        marginTop: 20,
                      }}
                      styleDropdownMenuSubsection={{
                        backgroundColor: 'transparent',
                        height: 50,
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 5,
                        paddingLeft: 20,
                      }}
                      onChangeInput={text => console.log(text)}
                      displayKey="name"
                      submitButtonText="Submit"
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity activeOpacity={0.6} onPress={this.CreateAccount}>
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
                height: 50,
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
                Register
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
              marginBottom: 10,
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
                Already have an account?
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('Login')}>
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
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
