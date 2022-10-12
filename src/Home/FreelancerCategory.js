import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DetailFreelancerScreen from '../DetailFreelancer/DetailFreelancerScreen';
import axios from 'axios';
import ViewOverflow from 'react-native-view-overflow';
import {ThemeConsumer} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import ratingFull from '../../src/Images/ratingFull.png';
import ratingNone from '../../src/Images/ratingNone.png';
import ratingHalf from '../../src/Images/ratingHalf.png';
import * as CONSTANT from '../Constants/Constant';
class FreelancerCategory extends Component {
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
    starCount: 2.5,
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
  UpdateFav = async () => {
    var user_id = this.props.fav_user_id;
    const fav_id = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'user/favorite', {
        id: fav_id,
        favorite_id: user_id,
        type: '_saved_freelancers',
      })
      .then(async response => {
        if (response.status == '200') {
          this.setState({
            iconColor: CONSTANT.primaryColor,
            isLoading: false,
          });
          alert('Favorite Updated Successfully');
        } else if (response.status == '203') {
          alert('Cannot update favorite/ Network Error');
        }
      })
      .catch(error => {
        console.log(error);
      });
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
  render() {
    const {showAlert, storedType, iconColor, isLoading} = this.state;
    var fav_color = this.props.Fav_Color;
    return (
      <View>
        {isLoading && (
          <View style={{justifyContent: 'center', height: '100%'}}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                overflow: 'visible',
                right: -14,
                top: 33,
                borderRadius: 50,
                borderWidth: 1,
                padding: 4,
                borderColor: '#dddddd',
              }}
            />
          </View>
        )}
        {this.props.featuredColor != '' ? (
          <ViewOverflow horizontal={true} style={styles.shadow}>
            {this.props.featuredColor != '' ? (
              <View
                style={{
                  overflow: 'visible',
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderRightWidth: 25,
                  borderTopWidth: 25,
                  borderTopLeftRadius: 4,
                  overflow: 'visible',
                  borderRightColor: 'transparent',
                  borderTopColor: this.props.featuredColor,
                }}
              />
            ) : (
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderRightWidth: 25,
                  borderTopWidth: 25,
                  borderTopLeftRadius: 4,
                  borderRightColor: 'transparent',
                  borderTopColor: '#fff',
                }}
              />
            )}
            <Image
              style={{
                width: 10,
                marginLeft: -22,
                marginTop: 2,
                marginBottom: 2,
                position: 'relative',
                height: 10,
              }}
              source={this.props.imageUrifeatured}
            />
            <Image
              style={{
                width: 60,
                marginBottom: 15,
                marginTop: 15,
                marginRight: 15,
                marginLeft: 5,
                borderRadius: 4,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                borderColor: 'transparent',
                height: 60,
              }}
              source={this.props.imageUrifreelancer}
            />
            <View style={styles.viewStyle}>
              <Text style={styles.nameStyle}>{this.props.freelancername}</Text>
              {this.props.title != '' && (
                <Text numberOfLines={1} style={styles.titleStyle}>
                  {this.props.title}
                </Text>
              )}

              <View
                horizontal={true}
                style={{flexDirection: 'row', marginTop: 2}}>
                {this.props.rate != '' ? (
                  <Text style={styles.rateStyle}>{this.props.rate}</Text>
                ) : (
                  <Text style={styles.rateStyle}>No price yet</Text>
                )}
                <AntIcon
                  name="flag"
                  color={CONSTANT.primaryColor}
                  size={13}
                  style={{marginTop: 1, alignItems: 'center'}}
                />
                <Text style={styles.countryStyle}>{this.props.country}</Text>
                <AntIcon
                  name="folder1"
                  color={CONSTANT.primaryColor}
                  size={12}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 1,
                    marginRight: 1,
                  }}
                />
                <Text style={styles.jobStyle}>{this.props.jobCompleted}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginLeft: -15,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <StarRating
                  containerStyle={(marginRight = 5)}
                  disabled={false}
                  emptyStar={ratingNone}
                  fullStar={ratingFull}
                  halfStar={ratingHalf}
                  maxStars={1}
                  starSize={20}
                  rating={1}
                />
                <Text style={styles.jobStyles}>{this.props.userRating}</Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                overflow: 'visible',
                right: 0,
                marginRight: -14,
                top: 33,
                borderRadius: 50,
                borderWidth: 1,
                padding: 4,
                borderColor: '#dddddd',
                zIndex: 2,
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
          </ViewOverflow>
        ) : (
          <ViewOverflow horizontal={true} style={styles.shadow2}>
            {this.props.featuredColor != '' ? (
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderRightWidth: 25,
                  borderTopWidth: 25,
                  borderTopLeftRadius: 4,
                  borderRightColor: 'transparent',
                  borderTopColor: this.props.featuredColor,
                }}
              />
            ) : (
              <View
                style={{
                  overflow: 'visible',
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderRightWidth: 13,
                  borderTopWidth: 13,
                  borderTopLeftRadius: 4,
                  borderRightColor: 'transparent',
                  borderTopColor: '#fff',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              />
            )}
            <View style={{}}>
              <Image
                style={{
                  width: 10,
                  marginLeft: -22,
                  marginTop: 2,
                  marginBottom: 2,
                  position: 'relative',
                  height: 10,
                }}
                source={this.props.imageUrifeatured}
              />
              <Image
                style={{
                  width: 60,
                  marginBottom: 15,
                  marginTop: 15,
                  marginRight: 10,
                  marginLeft: 5,
                  borderRadius: 4,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  borderColor: 'transparent',
                  height: 60,
                }}
                source={this.props.imageUrifreelancer}
              />
            </View>
            <View style={styles.viewStyle}>
              <Text style={styles.nameStyle}>{this.props.freelancername}</Text>
              {this.props.title != '' && (
                <Text numberOfLines={1} style={styles.titleStyle}>
                  {this.props.title}
                </Text>
              )}

              <View
                horizontal={true}
                style={{flexDirection: 'row', marginTop: 2}}>
                {this.props.rate != '' ? (
                  <Text style={styles.rateStyle}>{this.props.rate}</Text>
                ) : (
                  <Text style={styles.rateStyle}>No price yet</Text>
                )}
                <AntIcon
                  name="flag"
                  color={CONSTANT.primaryColor}
                  size={13}
                  style={{marginTop: 1, alignItems: 'center'}}
                />
                <Text style={styles.countryStyle}>{this.props.country}</Text>
                <AntIcon
                  name="folder1"
                  color={CONSTANT.primaryColor}
                  size={12}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 1,
                    marginRight: 1,
                  }}
                />
                <Text style={styles.jobStyle}>{this.props.jobCompleted}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginLeft: -15,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <StarRating
                  containerStyle={(marginRight = 5)}
                  disabled={false}
                  emptyStar={ratingNone}
                  fullStar={ratingFull}
                  halfStar={ratingHalf}
                  maxStars={1}
                  starSize={20}
                  rating={1}
                />
                <Text style={styles.jobStyles}>{this.props.userRating}</Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                overflow: 'visible',
                right: 0,
                marginRight: -14,
                top: 30,
                borderRadius: 50,
                borderWidth: 1,
                padding: 4,
                borderColor: '#dddddd',
                zIndex: 2,
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
          </ViewOverflow>
        )}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert"
          message="You are not authorized to perform this Action!"
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
      </View>
    );
  }
}
export default FreelancerCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  shadow: {
    position: 'relative',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: '#fffdf3',
    overflow: 'visible',
    marginTop: 2,
    marginBottom: 3,
    marginRight: 14,
    marginLeft: 5,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 2,
    zIndex: -1,
  },
  shadow2: {
    position: 'relative',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: '#fff',
    overflow: 'visible',
    marginTop: 2,
    marginBottom: 3,
    marginRight: 14,
    marginLeft: 5,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: -1,
  },
  countryStyle: {
    fontSize: 11,
    color: '#a1a1a1',
    paddingLeft: 5,
  },
  rateStyle: {
    fontSize: 12,
    color: '#a1a1a1',
    marginRight: 10,
    borderRightWidth: 1.5,
    borderRightColor: '#c0c0c0',
    paddingRight: 10,
    textAlign: 'left',
  },
  jobStyle: {
    marginLeft: 2,
    fontSize: 12,
    color: '#a1a1a1',
    textAlign: 'left',
  },
  jobStyles: {
    marginLeft: 2,
    fontSize: 14,
    color: '#a1a1a1',
    textAlign: 'left',
  },
  titleStyle: {
    marginTop: -2,
    fontSize: 14,
    color: '#323232',
    overflow: 'hidden',
    alignSelf: 'auto',
  },
  viewStyle: {
    width: '48%',
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 30,
    display: 'flex',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#323232',
  },
});
