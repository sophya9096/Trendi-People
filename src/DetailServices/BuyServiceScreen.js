import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  AsyncStorage,
  Alert,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as CONSTANT from '../Constants/Constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {array} from 'prop-types';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
var HashMap = require('hashmap');
class BuyServiceScreen extends Component {
  state = {
    Name: '',
    address: '',
    location: '',
    Notes: '',
    Customerid: '',
    S_address1: '',
    S_city: '',
    S_company: '',
    S_country: '',
    S_first_name: '',
    S_last_name: '',
    S_state: '',
    B_address1: '',
    B_city: '',
    B_conpany: '',
    B_country: '',
    B_email: '',
    B_first_name: '',
    B_last_name: '',
    B_phone: '',
    B_state: '',
  };
  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.getUser();
  }
  getUser = async () => {
    console.log('i am in');
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      const Address = await AsyncStorage.getItem('Address');
      const Location = await AsyncStorage.getItem('Location');
      const s_address1 = await AsyncStorage.getItem('shipping_address1');
      const s_city = await AsyncStorage.getItem('shipping_city');
      const s_company = await AsyncStorage.getItem('shipping_company');
      const s_country = await AsyncStorage.getItem('shipping_country');
      const s_first_name = await AsyncStorage.getItem('shipping_first_name');
      const s_last_name = await AsyncStorage.getItem('shipping_last_name');
      const s_state = await AsyncStorage.getItem('shipping_state');
      const b_address1 = await AsyncStorage.getItem('billing_address_1');
      const b_city = await AsyncStorage.getItem('billing_city');
      const b_conpany = await AsyncStorage.getItem('billing_company');
      const b_country = await AsyncStorage.getItem('billing_country');
      const b_email = await AsyncStorage.getItem('billing_email');
      const b_first_name = await AsyncStorage.getItem('billing_first_name');
      const b_last_name = await AsyncStorage.getItem('billing_last_name');
      const b_phone = await AsyncStorage.getItem('billing_phone');
      const b_state = await AsyncStorage.getItem('billing_state');
      if (storedValue !== null) {
        this.setState({Name: storedValue});
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
        this.setState({Customerid: id});
      } else {
        //  alert('something wrong')
      }
      if (Address !== null) {
        this.setState({address: Address});
      } else {
        //  alert('something wrong')
      }
      if (Location !== null) {
        this.setState({location: Location});
      } else {
        //  alert('something wrong')
      }
      if (s_address1 !== null) {
        this.setState({S_address1: s_address1});
      } else {
        //  alert('something wrong')
      }
      if (s_city !== null) {
        this.setState({S_city: s_city});
      } else {
        //  alert('something wrong')
      }
      if (s_company !== null) {
        this.setState({S_company: s_company});
      } else {
        //  alert('something wrong')
      }
      if (s_country !== null) {
        this.setState({S_country: s_country});
      } else {
        //  alert('something wrong')
      }
      if (s_first_name !== null) {
        this.setState({S_first_name: s_first_name});
      } else {
        //  alert('something wrong')
      }
      if (s_last_name !== null) {
        this.setState({S_last_name: s_last_name});
      } else {
        //  alert('something wrong')
      }
      if (s_state !== null) {
        this.setState({S_state: s_state});
      } else {
        //  alert('something wrong')
      }
      if (b_address1 !== null) {
        this.setState({B_address1: b_address1});
      } else {
        //  alert('something wrong')
      }
      if (b_city !== null) {
        this.setState({B_city: b_city});
      } else {
        //  alert('something wrong')
      }
      if (b_conpany !== null) {
        this.setState({B_conpany: b_conpany});
      } else {
        //  alert('something wrong')
      }
      if (b_country !== null) {
        this.setState({B_country: b_country});
      } else {
        //  alert('something wrong')
      }
      if (b_email !== null) {
        this.setState({B_email: b_email});
      } else {
        //  alert('something wrong')
      }
      if (b_first_name !== null) {
        this.setState({B_first_name: b_first_name});
      } else {
        //  alert('something wrong')
      }
      if (b_last_name !== null) {
        this.setState({B_last_name: b_last_name});
      } else {
        //  alert('something wrong')
      }
      if (b_phone !== null) {
        this.setState({B_phone: b_phone});
      } else {
        //  alert('something wrong')
      }
      if (b_state !== null) {
        this.setState({B_state: b_state});
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
      console.log(error);
    }
  };
  UpdateProfile = () => {
    const {params} = this.props.navigation.state;
    const {
      Uid,
      Notes,
      Customerid,
      S_address1,
      S_city,
      S_company,
      S_country,
      S_first_name,
      S_last_name,
      S_state,
      B_address1,
      B_city,
      B_conpany,
      B_country,
      B_email,
      B_first_name,
      B_last_name,
      B_phone,
      B_state,
    } = this.state;
    var billing_info_map = {};
    billing_info_map['address_1'] = B_address1;
    billing_info_map['city'] = B_city;
    billing_info_map['company'] = B_conpany;
    billing_info_map['country'] = B_country;
    billing_info_map['email'] = B_email;
    billing_info_map['first_name'] = B_first_name;
    billing_info_map['last_name'] = B_last_name;
    billing_info_map['phone'] = B_phone;
    billing_info_map['state'] = B_state;
    var shipping_info_map = {};
    shipping_info_map['address_1'] = S_address1;
    shipping_info_map['city'] = S_city;
    shipping_info_map['company'] = S_company;
    shipping_info_map['country'] = S_country;
    shipping_info_map['first_name'] = S_first_name;
    shipping_info_map['last_name'] = S_last_name;
    shipping_info_map['state'] = S_state;
    var payment_data_map_array = {};
    payment_data_map_array['order_type'] = 'service';
    payment_data_map_array['service_id'] = params.id;
    payment_data_map_array['customer_id'] = Customerid;
    payment_data_map_array['customer_note'] = Notes;
    payment_data_map_array['shipping_methods'] = 'stripe';
    payment_data_map_array['sameAddress'] = '1';
    payment_data_map_array['billing_info'] = billing_info_map;
    payment_data_map_array['shipping_info'] = shipping_info_map;
    var payment_data = JSON.stringify(payment_data_map_array);
    axios
      .post(CONSTANT.BaseUrl + 'user/create_checkout_page', {
        payment_data: payment_data,
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(response.data.message);
          this.props.navigation.navigate('BuyServiceWebview', {
            url: response.data.url,
          });
        } else if (response.status === 203) {
          Alert.alert('Error', response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const {params} = this.props.navigation.state;
    const {Name, address, location} = this.state;
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
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  height: 30,
                  marginTop: 9,
                }}>
                Buy Now
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              margin: 10,
              flexDirection: 'column',
              elevation: 3,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowColor: '#000',
              backgroundColor: CONSTANT.primaryColor,
              borderRadius: 4,
            }}>
            <View style={{height: 45, top: 15, flexDirection: 'row'}}>
              <Text style={{color: '#fff', marginLeft: 10, width: '80%'}}>
                Total
              </Text>
              <Text style={{color: '#fff', width: '20%'}}>{`${entities.decode(
                params.price,
              )}`}</Text>
            </View>
            <View style={{height: 45, top: 15, flexDirection: 'row'}}>
              <Text style={{color: '#fff', marginLeft: 10, width: '80%'}}>
                Currency
              </Text>
              <Text style={{color: '#fff', width: '20%'}}>£</Text>
            </View>
            <View style={{height: 45, top: 15, flexDirection: 'row'}}>
              <Text style={{color: '#fff', marginLeft: 10, width: '80%'}}>
                Tax
              </Text>
              <Text style={{color: '#fff', width: '20%'}}>0.00</Text>
            </View>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
            <View style={{height: 45, top: 15, flexDirection: 'row'}}>
              <Text style={{color: '#fff', marginLeft: 10, width: '80%'}}>
                Total Payable
              </Text>
              <Text style={{color: '#fff', width: '20%'}}>{`${entities.decode(
                params.price,
              )}`}</Text>
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: '700',
              color: CONSTANT.primaryColor,
            }}>
            YOUR DETAIL
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: 'column',
              elevation: 3,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowColor: '#000',
              backgroundColor: '#fff',
              borderRadius: 4,
            }}>
            <TextInput
              style={{height: 45, paddingLeft: 10, color: '#323232'}}
              placeholder="Name"
              placeholderTextColor="#999999">
              {this.state.Name != null ? this.state.Name : null}
            </TextInput>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
            <TextInput
              style={{height: 45, paddingLeft: 10, color: '#323232'}}
              placeholder="City"
              placeholderTextColor="#999999">
              {this.state.location != null ? this.state.location : null}
            </TextInput>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
            <TextInput
              style={{height: 45, paddingLeft: 10, color: '#323232'}}
              placeholder="Address"
              placeholderTextColor="#999999">
              {this.state.address != null ? this.state.address : null}
            </TextInput>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: '700',
              color: CONSTANT.primaryColor,
            }}>
            ORDER NOTES
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: 'column',
              elevation: 3,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowColor: '#000',
              backgroundColor: '#fff',
              borderRadius: 4,
            }}>
            <TextInput
              style={{height: 45, paddingLeft: 10, color: '#323232'}}
              placeholder="Notes"
              placeholderTextColor="#999999"
              onChangeText={Notes => this.setState({Notes})}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: '700',
              color: CONSTANT.primaryColor,
            }}>
            PAYMENT METHOD
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: 'column',
              elevation: 3,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowColor: '#000',
              backgroundColor: '#fff',
              borderRadius: 4,
            }}>
            <View style={{flexDirection: 'row', height: 45, marginLeft: 10}}>
              <AntIcon
                name="creditcard"
                size={15}
                color={CONSTANT.primaryColor}
                style={{top: 15}}
              />
              <Text
                style={{
                  color: '#999999',
                  top: 13,
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                Payment Method
              </Text>
            </View>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
            <View style={{flexDirection: 'row', height: 45, marginLeft: 10}}>
              <Text
                style={{
                  color: '#999999',
                  top: 13,
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                Available Payment Methods
              </Text>
            </View>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
            <View style={{height: 45, flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#999999',
                  top: 15,
                  marginLeft: 10,
                  width: '80%',
                }}>
                Credit Card(Stripe)
              </Text>
              <Switch
                style={{
                  width: '20%',
                  textAlign: 'center',
                  alignSelf: 'center',
                  transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={this.UpdateProfile}
            style={{
              alignItems: 'center',
              height: 40,
              margin: 10,
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
              PROCEED TO PAYMENT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default BuyServiceScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    backgroundColor: '#f7f7f7',
  },
});
