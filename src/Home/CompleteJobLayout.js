import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import ViewOverflow from 'react-native-view-overflow';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as CONSTANT from '../Constants/Constant';
class CompleteJobLayout extends Component {
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
  UpdateFav = async () => {
    var user_id = this.props.fav_job_user_id;
    const fav_id = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'user/favorite', {
        id: fav_id,
        favorite_id: user_id,
        type: '_saved_projects',
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
        {this.props.featuredCompleteJobColor != '' ? (
          <ViewOverflow style={styles.mainStyle}>
            {this.props.featuredCompleteJobColor != '' ? (
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
                  borderTopColor: this.props.featuredCompleteJobColor,
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
              source={this.props.imageUriCompleteJobfeatured}
            />
            <View style={styles.shadow}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignSelf: 'auto',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textAlign: 'left',
                    color: '#323232',
                    textTransform: 'capitalize',
                  }}>
                  {' '}
                  {this.props.Completejobname}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignSelf: 'auto',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '300',
                    overflow: 'hidden',
                    textAlign: 'left',
                    color: '#323232',
                    marginBottom: 10,
                  }}>
                  {' '}
                  {this.props.Completejobtitle}{' '}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Text style={{color: CONSTANT.primaryColor}}>$</Text> */}
                    <AntIcon
                      name="Trophy"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        overflow: 'hidden',
                        color: '#323232',
                        marginLeft: 5,
                        textAlign: 'left',
                        marginTop: 10,
                      }}>
                      {' '}
                      {this.props.Completejoblevel}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Image
                  style={{
                    resizeMode: 'cover',
                    paddingLeft: 10,
                    height: 8,
                    width: 15,
                    marginTop: 15,
                    alignItems: 'center',
                    alignItems: 'center',
                  }}
                  source={this.props.jobflagimageUri}
                /> */}
                    <AntIcon
                      name="flag"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        marginTop: 10,
                        overflow: 'hidden',
                        marginLeft: 5,
                        color: '#323232',
                        textAlign: 'left',
                      }}>
                      {' '}
                      {this.props.Completejobcountry}{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <AntIcon
                      name="creditcard"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    {this.props.project_type == 'Fixed' ? (
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '300',
                          overflow: 'hidden',
                          marginTop: 10,
                          marginLeft: 5,
                          color: '#323232',
                          textAlign: 'left',
                        }}>
                        {' '}
                        {this.props.Completejobrate}{' '}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '300',
                          overflow: 'hidden',
                          marginTop: 10,
                          marginLeft: 5,
                          color: '#323232',
                          textAlign: 'left',
                        }}>
                        {this.props.hourly_rate}
                        {/* per hour rate for{' '}
                        {this.props.estimated_hours} */}
                      </Text>
                    )}
                  </View>
                  {/* </View> */}
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <AntIcon
                      name="clockcircleo"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        overflow: 'hidden',
                        marginTop: 10,
                        marginLeft: 5,
                        color: '#323232',
                        textAlign: 'left',
                      }}>
                      {' '}
                      {this.props.Completejobduration}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                zIndex: 9,
                position: 'absolute',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                overflow: 'visible',
                right: -14,
                top: '40%',
                borderRadius: 50,
                borderWidth: 1,
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
          </ViewOverflow>
        ) : (
          <ViewOverflow style={styles.mainStyle2}>
            {this.props.featuredCompleteJobColor != '' ? (
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
                  borderTopColor: this.props.featuredCompleteJobColor,
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
              source={this.props.imageUriCompleteJobfeatured}
            />

            <View style={styles.shadow}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignSelf: 'auto',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textAlign: 'left',
                    color: '#323232',
                    textTransform: 'capitalize',
                  }}>
                  {' '}
                  {this.props.Completejobname}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignSelf: 'auto',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '300',
                    overflow: 'hidden',
                    textAlign: 'left',
                    color: '#323232',
                    marginBottom: 10,
                  }}>
                  {' '}
                  {this.props.Completejobtitle}{' '}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Text style={{color: CONSTANT.primaryColor}}>$</Text> */}
                    <AntIcon
                      name="Trophy"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        overflow: 'hidden',
                        color: '#323232',
                        marginLeft: 5,
                        textAlign: 'left',
                        marginTop: 10,
                      }}>
                      {' '}
                      {this.props.Completejoblevel}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Image
                  style={{
                    resizeMode: 'cover',
                    paddingLeft: 10,
                    height: 8,
                    width: 15,
                    marginTop: 15,
                    alignItems: 'center',
                    alignItems: 'center',
                  }}
                  source={this.props.jobflagimageUri}
                /> */}
                    <AntIcon
                      name="flag"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        marginTop: 10,
                        overflow: 'hidden',
                        marginLeft: 5,
                        color: '#323232',
                        textAlign: 'left',
                      }}>
                      {' '}
                      {this.props.Completejobcountry}{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <AntIcon
                      name="creditcard"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        overflow: 'hidden',
                        marginTop: 10,
                        marginLeft: 5,
                        color: '#323232',
                        textAlign: 'left',
                      }}>
                      {' '}
                      {this.props.Completejobrate}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <AntIcon
                      name="clockcircleo"
                      color={CONSTANT.primaryColor}
                      size={13}
                      style={{marginTop: 10, alignItems: 'center'}}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '300',
                        overflow: 'hidden',
                        marginTop: 10,
                        marginLeft: 5,
                        color: '#323232',
                        textAlign: 'left',
                      }}>
                      {' '}
                      {this.props.Completejobduration}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                zIndex: 9,
                position: 'absolute',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                overflow: 'visible',
                right: -14,
                top: '40%',
                borderRadius: 50,
                borderWidth: 1,
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
          </ViewOverflow>
        )}
      </View>
    );
  }
}
export default CompleteJobLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  shadow: {
    display: 'flex',
    // paddingBottom: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  mainStyle: {
    marginLeft: 5,
    marginRight: 15,
    marginTop: 2.5,
    marginBottom: 2.5,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 3,
    backgroundColor: '#fffdf3',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  mainStyle2: {
    marginLeft: 5,
    marginRight: 15,
    marginTop: 2.5,
    marginBottom: 2.5,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
});
