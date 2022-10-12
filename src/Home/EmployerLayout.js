import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
class EmployerLayout extends Component {
  state = {
    default_color_badge: '',
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    iconColor: '#dddddd',
    showAlert: false,
    isLoading: false,
  };
  componentWillMount() {
    this.getUser();
    var user_id = this.props.fav_user_id;
  }
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
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
    } catch (error) {
      // Error saving data
      // alert(error)
    }
  };
  render() {
    const {showAlert, storedType, iconColor, isLoading} = this.state;
    var fav_color = this.props.Fav_Color;
    return (
      <View elevation={5} style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
            height: 170,
          }}>
          <Image
            style={{
              height: 80,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
            source={this.props.companBannerImage}
          />
          <View style={{flexDirection: 'row', position: 'absolute', zIndex: 2}}>
            <View
              elevation={5}
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {height: 1, width: 1},
              }}>
              <Image
                style={{
                  width: 70,
                  marginLeft: 15,
                  marginTop: 45,
                  marginBottom: 15,
                  height: 70,
                  borderRadius: 4,
                }}
                source={this.props.companyProfileImage}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 15,
                marginTop: 95,
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#323232',
                  overflow: 'hidden',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {this.props.companyName}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: -3,
                  color: '#323232',
                  overflow: 'hidden',
                }}>
                {this.props.companyTitle}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#77bdf1',
                    borderRightWidth: 1.5,
                    borderRightColor: '#767676',
                    paddingRight: 10,
                  }}>
                  Open Jobs
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#77bdf1',
                    paddingLeft: 10,
                  }}>
                  Full Profile
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              alignSelf: 'flex-start',
              borderRadius: 50,
              borderWidth: 1,
              marginTop: 50,
              marginLeft: 37,
              padding: 4,
              borderColor: '#dddddd',
            }}>
            {storedType != '' ? (
              <View>
                {fav_color == 'yes' ? (
                  <AntIcon
                    name="heart"
                    color={CONSTANT.primaryColor}
                    size={17}
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: 2,
                      marginLeft: 1,
                      marginRight: 1,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.UpdateFav}>
                    <AntIcon
                      name="heart"
                      color={this.state.iconColor}
                      size={17}
                      style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginTop: 2,
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  Alert.alert('You are not Authorized!');
                }}>
                <AntIcon
                  name="heart"
                  color={'#dddddd'}
                  size={17}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 1,
                    marginRight: 1,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
export default EmployerLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    flexDirection: 'column',
    display: 'flex',
    marginBottom: 5,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1, width: 1},
  },
});
