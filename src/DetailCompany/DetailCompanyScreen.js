import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  AsyncStorage,
  Share,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import CompleteJobLayout from '../Home/CompleteJobLayout';
import {Header} from 'react-native-elements';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
import * as CONSTANT from '../Constants/Constant';
class DetailCompanyScreen extends Component {
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
    iconColor: CONSTANT.primaryColor,
    text: 'Save Company',
  };
  componentDidMount() {
    this.fetchCompanyData();
    this.fetchCompleteJobData();
  }
  fetchCompanyData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_employers?listing_type=single&profile_id=' +
        params.profile_id,
    );
    const json = await response.json();
    this.setState({fetchCompany: json, isLoading: false});
  };
  fetchCompleteJobData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_jobs?listing_type=company&company_id=' +
        params.employ_id,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchJobs: [], isLoading: false}); // empty data set
    } else {
      this.setState({fetchJobs: json, isLoading: false});
    }
  };
  onClick = () => {
    Share.share(
      {
        message: this.state.fetchCompany[0].company_link,
        url: this.state.fetchCompany[0].company_link,
        title: 'Wow, did you see that?',
      },
      {
        // Android only:
        dialogTitle: 'Share',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };
  UpdateFav = async () => {
    var user_id = this.state.fetchCompany[0].user_id;
    const fav_id = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'user/favorite', {
        id: fav_id,
        favorite_id: user_id,
        type: '_following_employers',
      })
      .then(async response => {
        if (response.status == '200') {
          this.setState({
            iconColor: '#00cc8d',
            text: 'Saved',
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
  render() {
    const {isLoading, iconColor} = this.state;
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
                Detail Employers
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
        <ScrollView>
          {this.state.fetchCompany && (
            <Image
              style={{height: 200}}
              source={{uri: `${this.state.fetchCompany[0].banner_img}`}}
            />
          )}
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 20, paddingLeft: 20, width: '100%'}}>
              <View
                elevation={3}
                style={{
                  flexDirection: 'column',
                  shadowColor: '#000000',
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: {height: 1, width: 1},
                  backgroundColor: '#fff',
                  width: '100%',
                  marginTop: -80,
                  marginBottom: 20,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                  {this.state.fetchCompany && (
                    <Image
                      style={{
                        borderRadius: 3,
                        width: 60,
                        marginBottom: 15,
                        marginTop: 15,
                        marginRight: 15,
                        marginLeft: 20,
                        height: 60,
                      }}
                      source={{
                        uri: `${this.state.fetchCompany[0].profile_img}`,
                      }}
                    />
                  )}
                  <View style={styles.viewStyle}>
                    {this.state.fetchCompany && (
                      <Text style={styles.nameStyle}>
                        {this.state.fetchCompany[0].name}
                      </Text>
                    )}
                    {this.state.fetchCompany && (
                      <Text style={styles.titleStyle}>
                        {this.state.fetchCompany[0]._tag_line}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#dddddd',
                    borderBottomWidth: 0.6,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '50%',
                    marginLeft: 10,
                    // marginRight: 'auto',
                  }}>
                  <Text style={{}}>Company Id: </Text>
                  {this.state.fetchCompany && (
                    <Text style={{}}>
                      {this.state.fetchCompany[0].employ_id}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                    marginLeft: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  {this.state.fetchCompany != null &&
                  this.state.fetchCompany[0].favorit == 'yes' ? (
                    <TouchableOpacity
                      style={{
                        width: '80%',
                        backgroundColor: '#00cc8d',
                        height: 40,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#fff',
                          paddingTop: 10,
                        }}>
                        Saved
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={this.UpdateFav}
                      style={{
                        width: '80%',
                        backgroundColor: this.state.iconColor,
                        height: 40,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#fff',
                          paddingTop: 10,
                        }}>
                        {this.state.text}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.onClick}
                    style={{
                      width: '20%',
                      backgroundColor: '#00cc8d',
                      height: 40,
                      borderRadius: 4,
                      marginLeft: 5,
                    }}>
                    <AntIcon
                      name="sharealt"
                      color={'#fff'}
                      size={17}
                      style={{
                        alignSelf: 'center',
                        paddingTop: 10,
                        textAlign: 'center',
                        alignItems: 'center',
                        marginTop: 2,
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  marginBottom: 10,
                  color: '#323232',
                  fontSize: 20,
                }}>
                About
              </Text>
              {this.state.fetchCompany && (
                <Text
                  style={{marginBottom: 10, color: '#323232', fontSize: 15}}>
                  {this.state.fetchCompany[0].employer_des}
                </Text>
              )}
              <Text
                style={{
                  fontWeight: '600',
                  marginBottom: 10,
                  color: '#323232',
                  fontSize: 20,
                }}>
                Job Openings
              </Text>
              <FlatList
                data={this.state.fetchJobs}
                keyExtractor={(a, b) => b.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate('DetailJobScreen', {
                        job_id: item.job_id,
                      })
                    }>
                    <CompleteJobLayout
                      Completejobname={`${entities.decode(item.employer_name)}`}
                      featuredCompleteJobColor={`${entities.decode(
                        item.featured_color,
                      )}`}
                      imageUriCompleteJobfeatured={{
                        uri: `${item.featured_url}`,
                      }}
                      Completejobtitle={`${entities.decode(
                        item.project_title,
                      )}`}
                      jobflagimageUri={{uri: `${item.location.flag}`}}
                      Completejoblevel={`${entities.decode(
                        item.project_level.level_title,
                      )}`}
                      Completejobcountry={`${entities.decode(
                        item.location._country,
                      )}`}
                      Completejobrate={`${entities.decode(item.project_cost)}`}
                      fav_job_user_id={item.job_id}
                      Fav_Color={`${entities.decode(item.favorit)}`}
                      Completejobduration={`${entities.decode(
                        item.project_duration,
                      )}`}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default DetailCompanyScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewStyle: {
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: 30,
    marginTop: 15,
    marginBottom: 15,
  },
  nameStyle: {
    fontSize: 16,
    color: '#323232',
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 16,
    color: '#323232',
    paddingRight: 30,
    fontWeight: '500',
    overflow: 'hidden',
    height: 40,
    marginRight: 30,
  },
});
