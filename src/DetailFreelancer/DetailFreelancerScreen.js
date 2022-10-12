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
  SafeAreaView,
  StatusBar,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-native-elements';
import SkillCard from '../DetailFreelancer/SkillCard';
import AwardCard from '../DetailFreelancer/AwardCard';
import FeedbackCard from '../DetailFreelancer/FeedbackCard';
import ProjectsCard from '../DetailFreelancer/ProjectsCard';
import ExperienceCard from '../DetailFreelancer/ExperienceCard';
import EducationCard from '../DetailFreelancer/EducationCard';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AwesomeAlert from 'react-native-awesome-alerts';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import ratingFull from '../../src/Images/ratingFull.png';
import ratingNone from '../../src/Images/ratingNone.png';
import ratingHalf from '../../src/Images/ratingHalf.png';
const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
import * as CONSTANT from '../Constants/Constant';
import RenderHtml from 'react-native-render-html';
class DetailFreelancerScreen extends Component {
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
    starCount: 2.5,
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
  componentDidMount() {
    this.fetchFreelancerData();
  }
  fetchFreelancerData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_freelancers?listing_type=single&profile_id=' +
        params.profile_id,
    );
    const json = await response.json();
    this.setState({fetchFreelancer: json});
    this.setState({starCount: this.state.fetchFreelancer[0].wt_average_rating});
    this.setState({fetchSkills: json[0].skills});
    this.setState({fetchAwards: json[0]._awards});
    this.setState({fetchReviews: json[0].reviews});
    this.setState({fetchProjects: json[0]._projects});
    this.setState({fetchExperience: json[0]._experience});
    this.setState({fetchEducation: json[0]._educations, isLoading: false});
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
  render() {
    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    const {fetchFreelancer, isLoading, showAlert} = this.state;
    const {id, storedValue, storedType, profileImg, type} = this.state;
    return (
      <SafeAreaView style={styles.container}>
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
            backgroundColor: 'black',
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
              {this.state.fetchFreelancer && (
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#fff',
                    height: 30,
                    marginTop: 9,
                  }}>
                  {this.state.fetchFreelancer[0].name}
                </Text>
              )}
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
          {this.state.fetchFreelancer && (
            <Image
              style={{height: 200}}
              source={{uri: `${this.state.fetchFreelancer[0].banner_img}`}}
            />
          )}
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 15, paddingLeft: 15, width: '100%'}}>
              <View
                elevation={3}
                style={{
                  flexDirection: 'column',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowColor: '#000',
                  shadowRadius: 2,
                  backgroundColor: '#fafafa',
                  width: '100%',
                  marginTop: -80,
                  marginBottom: 20,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                  {this.state.fetchFreelancer && (
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
                        uri: `${this.state.fetchFreelancer[0].profile_img}`,
                      }}
                    />
                  )}
                  <View style={styles.viewStyle}>
                    {this.state.fetchFreelancer && (
                      <Text style={styles.nameStyle}>
                        {this.state.fetchFreelancer[0].name}
                      </Text>
                    )}
                    {this.state.fetchFreelancer && (
                      <Text style={styles.titleStyle}>
                        {`${entities.decode(
                          this.state.fetchFreelancer[0]._tag_line,
                        )}`}
                        {/* {this.state.fetchFreelancer[0]._tag_line} */}
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 20,

                      color: '#323232',
                    }}>
                    {CONSTANT.DetailFreelancerHourly}
                  </Text>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        paddingRight: 20,
                      }}>{`${entities.decode(
                      this.state.fetchFreelancer[0]._perhour_rate,
                    )}`}</Text>
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
                  <Text
                    style={{
                      marginLeft: 20,

                      color: '#323232',
                    }}>
                    {CONSTANT.DetailFreelancerLocation}
                  </Text>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        paddingRight: 20,
                      }}>{`${entities.decode(
                      this.state.fetchFreelancer[0].location._country,
                    )}`}</Text>
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
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#323232',
                    }}>
                    {CONSTANT.DetailFreelancerFeedback}
                  </Text>
                  <View style={{flexDirection: 'row', marginRight: 20}}>
                    <StarRating
                      containerStyle={(marginRight = 5)}
                      disabled={false}
                      emptyStar={ratingNone}
                      fullStar={ratingFull}
                      halfStar={ratingHalf}
                      maxStars={5}
                      starSize={20}
                      rating={this.state.starCount}
                    />
                    {/* <Image
                      source={require('../../src/Images/ratingFull.png')}
                      style={{
                        marginRight: 10,
                        width: 20,
                        height: 20,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        paddingRight: 15,
                      }}>
                      {this.state.fetchFreelancer[0].wt_average_rating}
                      /5
                    </Text> */}
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 20,

                      color: '#323232',
                    }}>
                    {CONSTANT.DetailFreelancerMember}
                  </Text>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        paddingRight: 20,
                      }}>{`${entities.decode(
                      this.state.fetchFreelancer[0].member_since,
                    )}`}</Text>
                  )}
                </View>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  marginBottom: 10,
                  color: '#323232',
                  fontSize: 20,
                }}>
                {CONSTANT.DetailFreelancerAbout}
              </Text>
              {this.state.fetchFreelancer && (
                // <Text
                //   style={{
                //     marginBottom: 10,
                //     color: "#323232",
                //     fontSize: 15,
                //   }}
                // >{`${entities.decode(
                //   this.state.fetchFreelancer[0].content
                // )}`}</Text>
                <HTML
                  style={{
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 15,
                  }}
                  html={this.state.fetchFreelancer[0].content}
                  imagesMaxWidth={Dimensions.get('window').width}
                />
              )}
              <Text
                style={{
                  fontWeight: '600',
                  marginBottom: 10,
                  color: '#323232',
                  fontSize: 20,
                }}>
                {CONSTANT.DetailFreelancerStatus}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#fafafa',
                    width: '50%',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        color: '#2ecc71',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 17,
                      }}>
                      {this.state.fetchFreelancer[0].ongoning_jobs}
                    </Text>
                  )}
                  <Text
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {CONSTANT.DetailFreelancerOngoing}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        color: '#3498db',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 17,
                      }}>
                      {this.state.fetchFreelancer[0].completed_jobs}
                    </Text>
                  )}
                  <Text
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {CONSTANT.DetailFreelancerCompleted}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  {this.state.fetchFreelancer && (
                    <Text
                      style={{
                        color: '#e67e22',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 17,
                      }}>
                      {this.state.fetchFreelancer[0].cancelled_jobs}
                    </Text>
                  )}
                  <Text
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {CONSTANT.DetailFreelancerCancelled}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#fafafa',
                    width: '50%',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: '#9b59b6',
                      textAlign: 'center',
                      fontWeight: '500',
                      fontSize: 17,
                    }}>
                    0
                  </Text>
                  <Text
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {CONSTANT.DetailFreelancerServed}
                  </Text>
                </View>
              </View>
              {type == 'success' && storedType == 'employer' ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SendOffer', {
                      user_id: params.user_id,
                    })
                  }
                  style={{
                    alignItems: 'center',
                    height: 40,
                    margin: 20,
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
                    {CONSTANT.DetailFreelancerSave}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.showAlert();
                  }}
                  style={{
                    alignItems: 'center',
                    height: 40,
                    margin: 20,
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
                    {CONSTANT.DetailFreelancerSave}
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.fetchSkills != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerSkills}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchSkills}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <SkillCard
                      skillname={`${entities.decode(item.skill_name)}`}
                      skillValue={item.skill_val}
                    />
                  )}
                />
              )}
              {this.state.fetchAwards != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerAward}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchAwards}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <AwardCard
                      AwardDate={`${entities.decode(item.date)}`}
                      AwardTitle={`${entities.decode(item.title)}`}
                      //AwardImage={{ uri: `${item.image.url}` }}
                      AwardImage={{
                        uri: `${
                          item.image.url != ''
                            ? item.image.url
                            : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'
                        }`,
                      }}
                    />
                  )}
                />
              )}
              {this.state.fetchReviews != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerClient}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchReviews}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <FeedbackCard
                      Reviewname={`${entities.decode(item.employer_name)}`}
                      Reviewtitle={`${entities.decode(item.project_title)}`}
                      Reviewlevel={`${entities.decode(item.level_title)}`}
                      ReviewLocation={`${entities.decode(
                        item.project_location,
                      )}`}
                      ReviewDate={`${entities.decode(item.post_date)}`}
                      ReviewRating={`${entities.decode(item.project_rating)}`}
                      ReviewContent={`${entities.decode(item.review_content)}`}
                      ReviewImage={{uri: `${item.employer_image}`}}
                    />
                  )}
                />
              )}
              {this.state.fetchProjects != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerCrafted}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchProjects}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <ProjectsCard
                      projectTitle={`${entities.decode(item.title)}`}
                      projectlink={`${entities.decode(item.link)}`}
                      projectImage={{uri: `${item.image.url}`}}
                    />
                  )}
                />
              )}
              {this.state.fetchExperience != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerExperience}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchExperience}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <ExperienceCard
                      title={`${entities.decode(item.title)}`}
                      company={`${entities.decode(item.company)}`}
                      date={`${entities.decode(item.startdate)}`}
                      content={`${entities.decode(item.description)}`}
                    />
                  )}
                />
              )}
              {this.state.fetchEducation != '' && (
                <Text
                  style={{
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#323232',
                    fontSize: 20,
                  }}>
                  {CONSTANT.DetailFreelancerEducation}
                </Text>
              )}
              {this.state.fetchFreelancer && (
                <FlatList
                  data={this.state.fetchEducation}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({item}) => (
                    <EducationCard
                      title={`${entities.decode(item.title)}`}
                      company={`${entities.decode(item.institute)}`}
                      date={`${entities.decode(item.startdate)}`}
                      content={`${entities.decode(item.description)}`}
                    />
                  )}
                />
              )}
            </View>
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
      </SafeAreaView>
    );
  }
}
export default DetailFreelancerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewStyle: {
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
    color: '#323232',
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 16,
    color: '#323232',
    paddingRight: 30,
    overflow: 'hidden',
    height: 40,
    marginRight: 30,
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
  },
});
