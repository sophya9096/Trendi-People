import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Share,
  FlatList,
  NativeModules,
  ViewBase,
  Alert,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Header} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import SelectedDocLayout from '../CompleteEmployers/SelectedDocLayout';
import Spinner from 'react-native-loading-spinner-overlay';
import * as CONSTANT from '../Constants/Constant';
var ImagePicker = NativeModules.ImageCropPicker;
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class SendProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null,
      Uid: '',
      DurationListKnown: '',
      Description: '',
      showAlert: false,
      showSuccessAlert: false,
      amount: '0',
      chagrgedamount: '0',
      TotalAmount: '0',
      perHourRate: '0',
      EstimatedHour: '0',
      spinner: false,
      ApplicationCurrency: '',
      ApplicationAccessJob: '',
    };
  }
  componentDidMount() {
    this.checkAccess();
    this.fetchDurationList();
  }
  fetchDurationList = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get_list?list=duration_list', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let DurationList = responseJson;
        this.setState({
          isLoading: false,
          DurationList,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  checkAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationCurrency: json.currency_symbol});
    this.setState({ApplicationAccessJob: json.theme_name});
  };
  calculateChargedAmmount = () => {
    const {amount} = this.state;
    looseamount = (amount / 100) * 20;
    getAmount = amount - looseamount;
    this.setState({
      chagrgedamount: looseamount,
    });
    this.setState({
      TotalAmount: getAmount,
    });
  };
  calculateHourlyChargedAmmount = () => {
    const {amount, perHourRate, EstimatedHour} = this.state;
    CalculatedPerHourRate = perHourRate * EstimatedHour;
    this.setState(
      {
        amount: CalculatedPerHourRate,
      },
      this.calculateChargedAmmount,
    );
  };
  SubmitProposal = async () => {
    this.setState({
      spinner: true,
    });
    const Uid = await AsyncStorage.getItem('projectUid');
    const {params} = this.props.navigation.state;
    const {amount, Description, DurationListKnown, images} = this.state;
    const formData = new FormData();
    formData.append('user_id', Uid);
    formData.append('project_id', params.job_id);
    formData.append('proposed_amount', amount);
    formData.append('proposed_time', DurationListKnown[0]);
    formData.append('proposed_content', Description);
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
    fetch(CONSTANT.BaseUrl + 'proposal/add_proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        if (response.status === '200') {
          console.log(response);
          this.setState({spinner: false});
          this.showSuccessAlert();
        } else if (response.status === '203') {
          console.log(response);
          this.setState({spinner: false});
          this.showAlert();
        } else {
          this.setState({spinner: false});
          this.showAlert();
        }
      })
      .catch(error => {
        this.setState({spinner: false});
        console.log(error);
      });
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
    const {showAlert, showSuccessAlert, images} = this.state;
    const {params} = this.props.navigation.state;
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
                Send Proposal
              </Text>
            </View>
          </View>
        </View>
        {this.state.spinner == true && (
          <Spinner
            visible={this.state.spinner}
            textContent={CONSTANT.DoctorAddBookingPleaseWait}
            color={CONSTANT.primaryColor}
            textStyle={styles.SpinnerTextStyle}
          />
        )}
        <ScrollView style={{flexDirection: 'column'}}>
          <View style={{marginHorizontal: 15, marginTop: 15, marginBottom: 5}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              {params.job_main_title}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntIcon
                  name="laptop"
                  size={14}
                  color={CONSTANT.primaryColor}
                />
                <Text style={{marginLeft: 15}}>
                  Job Type: {params.job_type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <AntIcon
                  name="Trophy"
                  size={14}
                  color={CONSTANT.primaryColor}
                />
                <Text style={{marginLeft: 15}}>
                  Job Level: {params.job_level}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginTop: 10,
                // marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntIcon
                  name="clockcircleo"
                  size={14}
                  color={CONSTANT.primaryColor}
                />
                <Text style={{marginLeft: 15}}>{params.job_time} Hours</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <AntIcon
                  name="hourglass"
                  size={14}
                  color={CONSTANT.primaryColor}
                />
                <Text style={{marginLeft: 15}}>{params.job_Duration}</Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              colorL: '#000',
              marginLeft: 15,
              marginTop: 15,
            }}>
            Proposal Amount
          </Text>
          {params.job_type == 'Fixed' ? (
            <TextInput
              underlineColorAndroid="transparent"
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontWeight: '600',
                borderColor: '#807f7f',
                borderWidth: 0.2,
                borderRadius: 4,
                width: '90%',
                fontSize: 15,
                padding: 5,
                height: 50,
                fontSize: 20,
                textAlign: 'center',
                marginHorizontal: 20,
              }}
              keyboardType="numeric"
              placeholder="Enter Your Proposal Amount"
              placeholderTextColor="#999999"
              onChangeText={amount =>
                this.setState({amount}, this.calculateChargedAmmount.bind(this))
              }
            />
          ) : (
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: '600',
                  borderColor: '#807f7f',
                  borderWidth: 0.2,
                  borderRadius: 4,
                  width: '90%',
                  fontSize: 15,
                  padding: 5,
                  height: 50,
                  fontSize: 20,
                  textAlign: 'center',
                  marginHorizontal: 20,
                }}
                keyboardType="numeric"
                placeholder="Enter Your Per Hour Rate"
                placeholderTextColor="#999999"
                onChangeText={perHourRate =>
                  this.setState(
                    {perHourRate},
                    this.calculateChargedAmmount.bind(this),
                  )
                }
              />

              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  marginBottom: 20,
                  fontWeight: '600',
                  borderColor: '#807f7f',
                  borderWidth: 0.2,
                  borderRadius: 4,
                  width: '90%',
                  fontSize: 15,
                  padding: 5,
                  height: 50,
                  fontSize: 20,
                  textAlign: 'center',
                  marginHorizontal: 20,
                }}
                keyboardType="numeric"
                placeholder="Estimated Hour"
                placeholderTextColor="#999999"
                onChangeText={EstimatedHour =>
                  this.setState(
                    {EstimatedHour},
                    this.calculateHourlyChargedAmmount.bind(this),
                  )
                }
              />
            </View>
          )}
          <Text style={{marginLeft: 20, marginBottom: 20}}>
            Total Amount the client will see on your proposal
          </Text>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              marginHorizontal: 20,
              marginBottom: 20,
              borderRadius: 5,
              borderWidth: 1,
              flexDirection: 'column',
              borderColor: '#f7f7f7',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              {params.job_type == 'Fixed' ? (
                <Text style={{fontWeight: '700', flex: 1, fontSize: 15}}>
                  {entities.decode(params.job_Price)}
                </Text>
              ) : (
                <Text style={{fontWeight: '700', flex: 1, fontSize: 15}}>
                  {entities.decode(params.hourly_rate) +
                    ' per hour rate for ' +
                    params.job_time +
                    ' hours'}
                </Text>
              )}

              <Text
                style={{
                  color: '#676767',
                  flex: 1,
                  textAlign: 'right',
                  fontSize: 12,
                }}>
                Employers personal Project Cost
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{fontWeight: '700', flex: 1, fontSize: 15}}>
                ({entities.decode(this.state.ApplicationCurrency)})
                {this.state.amount}
              </Text>
              <Text
                style={{
                  color: '#676767',
                  flex: 1,
                  textAlign: 'right',
                  fontSize: 12,
                }}>
                Your Proposed Project Cost
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{fontWeight: '700', flex: 1, fontSize: 15}}>
                ({entities.decode(this.state.ApplicationCurrency)})-
                {this.state.chagrgedamount}
              </Text>
              <Text
                style={{
                  color: '#676767',
                  flex: 1,
                  textAlign: 'right',
                  fontSize: 12,
                }}>
                {this.state.ApplicationAccessJob} Service Fee
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'space-between',
                padding: 7,
              }}>
              <Text style={{fontWeight: '700', flex: 1, fontSize: 15}}>
                {' '}
                ({entities.decode(this.state.ApplicationCurrency)})
                {this.state.TotalAmount}
              </Text>
              <Text
                style={{
                  color: '#676767',
                  flex: 1,
                  textAlign: 'right',
                  fontSize: 12,
                }}>
                Amount You will receive
              </Text>
            </View>
          </View>
          {params.job_type == 'Fixed' && (
            <View style={{marginLeft: 20, marginRight: 20}}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({DurationListKnown: value})
                }
                uniqueKey="value"
                items={this.state.DurationList}
                selectedItems={this.state.DurationListKnown}
                borderBottomWidth={0}
                single={true}
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                searchInputPlaceholderText="Search Job Offers..."
                selectText="Pick Job Offers"
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
                  borderWidth: 0.2,
                  borderColor: '#807f7f',
                  borderRadius: 4,
                }}
                onChangeInput={text => console.log(text)}
                displayKey="title"
                submitButtonText="Submit"
              />
            </View>
          )}

          <TextInput
            underlineColorAndroid="transparent"
            style={{
              marginBottom: 20,
              marginTop: 20,
              borderColor: '#807f7f',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              textAlign: 'left',
              borderWidth: 0.2,
              borderRadius: 4,
              fontSize: 15,
              padding: 5,
              height: 150,
            }}
            name="username"
            multiline={true}
            onChangeText={Description => this.setState({Description})}
            placeholder="Description"
            placeholderTextColor="#807f7f"
          />
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
              onPress={() => this.SubmitProposal()}
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
export default SendProposal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
