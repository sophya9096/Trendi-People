import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import JobCategory from './JobCategory';
import FreelancerCategory from './FreelancerCategory';
import CustomHeader from '../Header/CustomHeader';
import LatestJobs from './LatestJobs';
import ServiceLayout from './ServicesLayout';
import {Header} from 'react-native-elements';
import {StackNavigator, NavigationEvents} from 'react-navigation';
import DetailFreelancerScreen from '../DetailFreelancer/DetailFreelancerScreen';
import * as CONSTANT from '../Constants/Constant';
import GeneralStatusBarColor from '../styles/GeneralStatusBarColor';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PTRView from 'react-native-pull-to-refresh';
import Img01 from '../Images/slideone.jpg';
import RenderHtml from 'react-native-render-html';
import Trouser from '../../src/Images/trouser.svg';

const Entities = require('html-entities').Html5Entities;
const entities = new Entities();
export default class home extends React.Component {
  state = {
    data: [],
    default_color: '#fff',
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    Pid: '',
    isLoading: true,
    fetchServices: [],
  };

  componentWillMount() {
    this.CheckApplicationAccess();
    this.getUser();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationAccessServcie: json.access_type.service_access});
    this.setState({ApplicationAccessJob: json.access_type.job_access});
  };
  fetchData = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'list/get_categories');
    const json = await response.json();
    this.setState({data: json});
  };
  fetchFreelancerData = async () => {
    const Pid = await AsyncStorage.getItem('projectProfileId');
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_freelancers?listing_type=featured&show_users=5&profile_id=' +
        Pid,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchFreelancer: [], isLoading: false}); // empty data set
    } else {
      this.setState({fetchFreelancer: json, isLoading: false});
    }
  };
  fetchLatestPostedJobs = async () => {
    const Pid = await AsyncStorage.getItem('projectProfileId');
    const response = await fetch(
      CONSTANT.BaseUrl + 'listing/get_jobs?listing_type=latest',
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchJobs: []}); // empty data set
    } else {
      this.setState({fetchJobs: json});
    }
  };
  fetchLatestPostedServices = async () => {
    const Pid = await AsyncStorage.getItem('projectProfileId');
    const response = await fetch(
      CONSTANT.BaseUrl + 'services/get_services?listing_type=latest',
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchServices: []}); // empty data set
    } else {
      this.setState({fetchServices: json});
    }
  };
  _onPressButton = () => {};
  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      const Pid = await AsyncStorage.getItem('projectProfileId');
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
      if (Pid !== null) {
        this.setState({Pid});
      } else {
        //  alert('something wrong')
      }
      this.fetchData();
      this.fetchFreelancerData();
      this.fetchLatestPostedJobs();
      this.fetchLatestPostedServices();
    } catch (error) {}
  };
  render() {
    const {navigate} = this.props.navigation;
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' ? (
          <StatusBar
            backgroundColor={CONSTANT.statusBarColor}
            barStyle="light-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        <CustomHeader hasTabs style={styles.header} />
        <NavigationEvents onWillFocus={this.getUser} />
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
        <PTRView onRefresh={this._refresh}>
          <ScrollView scrollEventThrottle={16}>
            {/* <View style={styles.imageSlider}>
              <View style={{backgroundColor: '#000'}}>
                <ImageSlider
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageOpacity}
                  images={[
                    require('../Images/slideone.jpg'),
                    require('../Images/slidetwo.jpg'),
                    require('../Images/slidethree.jpg'),
                  ]}
                />
              </View>
              <View style={styles.jobTextBAckground}>
                <View
                  style={{
                    height: 130,
                    marginTop: 10,
                    paddingLeft: 10,
                  }}>
                  <View
                    style={{position: 'absolute', zIndex: 1, marginLeft: 10}}>
                    <Text style={styles.jobText}>
                      {CONSTANT.HomeCategories}
                    </Text>
                    <Text style={styles.jobbycatText}>
                      {CONSTANT.HomeCategoriesTagLine}
                    </Text>
                    <ScrollView
                      style={{marginTop: 15, marginLeft: -5}}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      <FlatList
                        data={this.state.data}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                              this.props.navigation.navigate(
                                'JobbyCategorylist',
                                {slug: item.slug},
                              )
                            }>
                            <JobCategory
                              imageUri={{uri: `${item.image}`}}
                              name={`${entities.decode(item.name)}`}
                            />
                          </TouchableOpacity>
                        )}
                        horizontal={true}
                      />
                    </ScrollView>
                  </View>
                </View>

                <View style={{marginTop: 10, paddingLeft: 10, paddingRight: 2}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    {CONSTANT.HomeFreelancer}
                  </Text>
                  <Text
                    style={{fontSize: 10, color: '#000000', marginBottom: 5}}>
                    {CONSTANT.HomeFreelancerTagLine}
                  </Text>
                  <FlatList
                    style={{paddingBottom: 5, paddingTop: 10, marginLeft: -5}}
                    data={this.state.fetchFreelancer}
                    keyExtractor={(y, z) => z.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'DetailFreelancerScreen',
                            {
                              profile_id: item.profile_id,
                              user_id: item.user_id,
                            },
                          )
                        }>
                        <FreelancerCategory
                          imageUrifreelancer={{uri: `${item.profile_img}`}}
                          imageUrifeatured={{uri: `${item.badge.badget_url}`}}
                          featuredColor={`${entities.decode(
                            item.badge.badget_color,
                          )}`}
                          flagimageUri={{uri: `${item.location.flag}`}}
                          freelancername={`${entities.decode(item.name)}`}
                          title={`${entities.decode(item._tag_line)}`}
                          rate={`${entities.decode(item._perhour_rate)}`}
                          country={`${entities.decode(item.location._country)}`}
                          Fav_Color={`${entities.decode(item.favorit)}`}
                          fav_user_id={item.user_id}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
                {this.state.ApplicationAccessJob === 'yes' &&
                this.state.storedType === 'freelancer' ? (
                  <View style={{marginTop: 30, paddingHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#000000',
                      }}>
                      {CONSTANT.HomeJobs}
                    </Text>
                    <Text style={{fontSize: 10, color: '#000000'}}>
                      {CONSTANT.HomeJobsTagLine}
                    </Text>
                    <View
                      style={{height: 220, marginTop: 10, marginBottom: 10}}>
                      <ScrollView
                        style={{marginLeft: -5}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <FlatList
                          data={this.state.fetchJobs}
                          keyExtractor={(a, b) => b.toString()}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              activeOpacity={0.9}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'DetailJobScreen',
                                  {job_id: item.job_id},
                                )
                              }>
                              <LatestJobs
                                jobname={`${entities.decode(
                                  item.employer_name,
                                )}`}
                                featuredJObColor={`${entities.decode(
                                  item.featured_color,
                                )}`}
                                jobtitle={`${entities.decode(
                                  item.project_title,
                                )}`}
                                homejobflagimageUri={{
                                  uri: `${item.location.flag}`,
                                }}
                                joblevel={`${entities.decode(
                                  item.project_level.level_title,
                                )}`}
                                jobcountry={`${entities.decode(
                                  item.location._country,
                                )}`}
                                jobrate={`${entities.decode(
                                  item.project_cost === ''
                                    ? item.hourly_rate +
                                        ' per hour rate for ' +
                                        item.estimated_hours +
                                        ' hours'
                                    : item.project_cost,
                                )}`}
                                jobduration={`${entities.decode(
                                  item.project_duration,
                                )}`}
                                imageUrijobfeatured={{
                                  uri: `${item.featured_url}`,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          horizontal={true}
                        />
                      </ScrollView>
                    </View>
                  </View>
                ) : null}
                {this.state.ApplicationAccessServcie === 'yes' ? (
                  <View style={{marginTop: 30, paddingHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#000000',
                      }}>
                      {CONSTANT.HomeServices}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        marginBottom: 10,
                        color: '#000000',
                      }}>
                      {CONSTANT.HomeServiceTagLine}
                    </Text>
                    <FlatList
                      data={this.state.fetchServices}
                      keyExtractor={(a, b) => b.toString()}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#fff',
                            flexDirection: 'column',
                            borderRadius: 4,
                            overflow: 'hidden',
                            flex: 1,
                            flexDirection: 'column',
                            margin: 2,
                            elevation: 5,
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.2,
                            shadowColor: '#000',
                          }}
                          activeOpacity={0.9}
                          onPress={() =>
                            this.props.navigation.navigate(
                              'DetailServiceScreen',
                              {service_id: item.service_id},
                            )
                          }>
                          <ServiceLayout
                            imageUri_banner={{
                              uri: `${
                                item.images.length >= 1
                                  ? item.images[0].url
                                  : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'
                              }`,
                            }}
                            imageUri_profile={{
                              uri: `${
                                item.auther_image != ''
                                  ? item.auther_image
                                  : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'
                              }`,
                            }}
                            service_name={`${entities.decode(
                              item.auther_title,
                            )}`}
                            service_title={`${entities.decode(item.title)}`}
                            service_price={`${entities.decode(item.price)}`}
                            service_rating={`${entities.decode(
                              item.total_rating,
                            )}`}
                          />
                        </TouchableOpacity>
                      )}
                      numColumns={2}
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                ) : null}
              </View></View> */}
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View style={{paddingTop: 20}}>
                <Text
                  style={{
                    color: CONSTANT.primaryColor,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  What you want to create?
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  padding: 20,
                  width: '100%',
                }}>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/trousers.png')}
                        style={styles.cardImageSize}
                      />
                      {/* <Trouser width={20} height={40} /> */}
                    </View>
                    <View>
                      <Text style={styles.cardText}>Trousers</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/jacket.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Jacket</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/jeans.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Jeans</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/blazer.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Blazer</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/coat.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Coat</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/shorts.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Shorts</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/swimwear.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Swimwear</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/cultural.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Traditional</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/sweater.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Sweater</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/blouse.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Blouse</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/tracksuit.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Tracksuits</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.homeCard}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      this.props.navigation.navigate('HomeCategories')
                    }>
                    <View style={styles.cardImageStyle}>
                      <Image
                        source={require('./../../src/Images/jumpers.png')}
                        style={styles.cardImageSize}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardText}>Jumpers</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View />
              <View />
            </View>
          </ScrollView>
        </PTRView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  imageSlider: {
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },
  imageOpacity: {
    backgroundColor: '#000',
    opacity: 0.74,
    zIndex: 1,
    height: 200,
  },
  jobText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  jobbycatText: {
    fontSize: 10,
    color: '#ffffff',
  },
  jobTextBAckground: {
    marginTop: -90,
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
  },
  homeCard: {
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    width: '28%',
    height: 120,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
    paddingTop: '5%',
    backgroundColor: CONSTANT.color,
  },
  cardImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageSize: {
    resizeMode: 'contain',
    // width: '40%',
    height: '65%',
  },
  cardText: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 0,
  },
});
