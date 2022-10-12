import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Share,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  CameraRoll,
  Dimensions,
  Alert,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import JobAttachments from '../DetailJobs/JobAttachments';
// import RNFetchBlob from 'react-native-fetch-blob';
import RNBackgroundDownloader from 'react-native-background-downloader';
import JobSkill from '../DetailJobs/JobSkill';
import {Header} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as CONSTANT from '../Constants/Constant';
import {NavigationEvents} from 'react-navigation';
import HTML from 'react-native-render-html';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
class DetailJobScreen extends Component {
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
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    showAlert: false,
  };
  componentDidMount() {
    this.fetchJObData();
  }
  fetchJObData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_jobs?listing_type=single&job_id=' +
        params.job_id,
    );
    const json = await response.json();
    this.setState({fetchJob: json});
    this.setState({fetchJob: json});
    this.setState({fetchAttachment: json[0].attanchents});
    this.setState({fetchSkills: json[0].skills, isLoading: false});
    this.getUser();
  };
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
      console.log(error);
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
  onClick = () => {
    Share.share(
      {
        message: this.state.fetchJob[0].job_link,
        url: this.state.fetchJob[0].job_link,
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
  downloadFile = () => {
    RNBackgroundDownloader.download({
      id: 'file123',
      url: this.state.fetchAttachment[0].url,
      destination: `${RNBackgroundDownloader.directories.documents}/file.zip`,
    })
      .begin(expectedBytes => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        console.log('Download is done!');
      })
      .error(error => {
        console.log('Download canceled due to error: ', error);
      });
  };
  render() {
    const {isLoading, showAlert} = this.state;
    const {id, storedValue, storedType, profileImg, type} = this.state;
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.fetchJObData} />
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
                {CONSTANT.DetailjobHadder}
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
          {this.state.fetchJob && (
            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                fontSize: 16,
                fontWeight: '500',
              }}>
              {this.state.fetchJob[0].employer_name}
            </Text>
          )}
          {this.state.fetchJob && (
            <Text
              style={{
                marginLeft: 20,
                fontSize: 14,
                fontWeight: 'bold',
                marginRight: 10,
                marginBottom: 20,
              }}>
              {this.state.fetchJob[0].project_title}
            </Text>
          )}
          <View style={{flexDirection: 'column', backgroundColor: '#fafafa'}}>
            <View
              style={{
                borderBottomColor: '#dddddd',
                borderBottomWidth: 0.6,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 20}}>{CONSTANT.DetailjobCarrer}</Text>
              {this.state.fetchJob && (
                <Text style={{paddingRight: 20}}>
                  {this.state.fetchJob[0].project_level.level_title}
                </Text>
              )}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 20}}>{CONSTANT.Detailjoblocation}</Text>
              {this.state.fetchJob && (
                <Text style={{paddingRight: 20}}>
                  {this.state.fetchJob[0].location._country}
                </Text>
              )}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 20}}>{CONSTANT.DetailjobJobType}</Text>
              {this.state.fetchJob && (
                <Text style={{paddingRight: 20}}>
                  {this.state.fetchJob[0].project_type}
                </Text>
              )}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 20}}>{CONSTANT.DetailjobDuration}</Text>
              {this.state.fetchJob && (
                <Text style={{paddingRight: 20}}>
                  {this.state.fetchJob[0].project_duration}
                </Text>
              )}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{marginLeft: 20}}>{CONSTANT.DetailjobAmount}</Text>
              {this.state.fetchJob && (
                <Text style={{paddingRight: 20}}>{`${entities.decode(
                  this.state.fetchJob[0].project_cost === ''
                    ? this.state.fetchJob[0].hourly_rate +
                        ' per hour rate for ' +
                        this.state.fetchJob[0].estimated_hours +
                        ' hours'
                    : this.state.fetchJob[0].project_cost,
                )}`}</Text>
              )}
            </View>
            <View
              style={{borderBottomColor: '#dddddd', borderBottomWidth: 0.6}}
            />
          </View>
          <Text
            style={{
              fontWeight: '600',
              marginBottom: 10,
              color: '#323232',
              fontSize: 20,
              marginLeft: 20,
              marginTop: 20,
            }}>
            {CONSTANT.DetailjobProjectDetail}
          </Text>
          {this.state.fetchJob && (
            <View style={{marginLeft: 20, marginRight: 20}}>
              <HTML
                html={this.state.fetchJob[0].project_content}
                imagesMaxWidth={Dimensions.get('window').width}
              />
            </View>
          )}
          <Text
            style={{
              fontWeight: '600',
              marginBottom: 10,
              color: '#323232',
              fontSize: 20,
              marginLeft: 20,
              marginTop: 20,
            }}>
            {CONSTANT.DetailjobSkill}
          </Text>
          <FlatList
            data={this.state.fetchSkills}
            keyExtractor={(a, b) => b.toString()}
            renderItem={({item}) => (
              //  <TouchableOpacity
              //  onPress={() => this.props.navigation.navigate('DetailJobScreen', {profile_id: item.profile_id})}>
              <JobSkill skillName={`${entities.decode(item.skill_name)}`} />
              // </TouchableOpacity>
            )}
            horizontal={false}
          />
          <Text
            style={{
              fontWeight: '600',
              marginBottom: 10,
              color: '#323232',
              fontSize: 20,
              marginLeft: 20,
              marginTop: 20,
            }}>
            {CONSTANT.DetailjobAttachment}
          </Text>
          <ScrollView
            style={{paddingLeft: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              data={this.state.fetchAttachment}
              keyExtractor={(a, b) => b.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={this.downloadFile}>
                  <JobAttachments
                    attachmentName={`${entities.decode(item.document_name)}`}
                    attachmentSize={`${entities.decode(item.file_size)}`}
                  />
                </TouchableOpacity>
              )}
              horizontal={true}
            />
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
              marginLeft: 20,
              marginBottom: 20,
            }}>
            {type == 'success' &&
            this.state.fetchJob &&
            storedType == 'freelancer' ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SendProposal', {
                    job_id: params.job_id,
                    job_main_title: this.state.fetchJob[0].project_title,
                    job_type: this.state.fetchJob[0].project_type,
                    job_level: this.state.fetchJob[0].project_level.level_title,
                    job_time: this.state.fetchJob[0].estimated_hours,
                    job_Duration: this.state.fetchJob[0].project_duration,
                    job_Price: this.state.fetchJob[0].project_cost,
                    hourly_rate: this.state.fetchJob[0].hourly_rate,
                  })
                }
                style={{
                  width: '60%',
                  backgroundColor: CONSTANT.primaryColor,
                  height: 40,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#ffffff',
                    paddingTop: 10,
                  }}>
                  Send Offer
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.showAlert();
                }}
                style={{
                  width: '60%',
                  backgroundColor: CONSTANT.primaryColor,
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
                  Send Proposal
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={this.onClick}
              style={{
                width: '20%',
                backgroundColor: CONSTANT.primaryColor,
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
            {type == 'success' && storedType == 'freelancer' ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SendReport', {
                    job_id: params.job_id,
                  })
                }
                style={{
                  width: '15%',
                  backgroundColor: 'red',
                  height: 40,
                  borderRadius: 4,
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                <AntIcon
                  name="warning"
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
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.showAlert();
                }}
                style={{
                  width: '20%',
                  backgroundColor: CONSTANT.primaryColor,
                  height: 40,
                  borderRadius: 4,
                  marginLeft: 5,
                }}>
                <AntIcon
                  name="warning"
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
            )}
          </View>
        </ScrollView>
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
export default DetailJobScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});
