import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Image,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import { Header } from "react-native-elements";
import CustomHeader from "../Header/CustomHeader";
import { NavigationEvents } from 'react-navigation';
import AntIcon from "react-native-vector-icons/AntDesign";

import * as CONSTANT from '../Constants/Constant';
const Entities = require("html-entities").Html5Entities;
const entities = new Entities();
class OngoingJobs extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
    data: [],
    isLoading: true,
    Toataldata: "",
    page: 1,
    fetching_from_server: false,
    fetchOngoingJobs:[],
     storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    permissionChat:"",
    showAlert: false
  };
  this.offset = 1;
}
  componentWillMount() {
    this.getUser();
    this.fetchOngoingJob();
  }
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem("chatPermission");
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      if (permissionChat !== null) {
        this.setState({ permissionChat });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  fetchOngoingJob = async () => {
    const Pid = await AsyncStorage.getItem("projectUid");
    const storedType = await AsyncStorage.getItem("user_type");
    if(storedType == "freelancer"){
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/get_ongoing_jobs?type=hired&user_id=" + Pid
      );
      const json = await response.json();
      if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
        this.setState({ fetchOngoingJobs: [] }); // empty data set 
      } else {
        this.setState({ fetchOngoingJobs: json  , isLoading:false},
          );
      }
    }else{
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/manage_employer_jobs?type=hired&user_id=" + Pid
      );
      const json = await response.json();
      if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
        this.setState({ fetchOngoingJobs: [] }); // empty data set 
      } else {
        this.setState({ fetchOngoingJobs: json  , isLoading:false},
          );
      }
    }
    
  };
 
  renderFooter() {
   
    return (
      //Footer View with Load More button
      <View>
        {this.state.Toataldata.toString() != this.state.data.length ? (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  render() {
    const { storedValue, storedType, profileImg, permissionChat ,showAlert } = this.state;
    const { isLoading } = this.state;
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
                Ongoing Jobs
              </Text>
            </View>
          </View>
        </View>
        {isLoading && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 60,
                alignContent: "center",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                elevation: 5
              }}
            />
          </View>
        )}
        {
          this.state.data != "" &&
          <View>
            <Text style={{fontSize:18 , margin:10 , fontWeight:'700'}}>{this.state.data[0].count_totals} Employers found:</Text>
          </View>
        }
        {this.state.fetchOngoingJobs.length >= 1 ? 
            <View>
              <View style={{flexDirection:'row' , justifyContent:'space-between' , marginHorizontal:10 , marginTop:20 , marginBottom:10 }}>
                <Text style={{fontSize:18 , fontWeight:'700'}}>Ongoing Projects:</Text>
                <Text >Show All</Text>
            </View>
           
<FlatList
                        data={this.state.fetchOngoingJobs}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item ,index }) => (
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("DetailOngoing" , 
                            {
                            ID : item.ID , 
                            Proposal_id : item.proposal_id , 
                            title : item.title,
                            level: item.project_level,
                            location_name: item.location_name,
                            location_flag : item.location_flag , 
                            employer_name: item.employer_name,
                            employer_verified: item.employer_verified})} 
                            activeOpacity={.7} style={{marginHorizontal:10 , marginBottom:30 , top:10}}>
                              <View style={{backgroundColor:'#fff' , borderRadius:5  ,     shadowOffset: { width: 0, height: 2 },
                              shadowColor: "#000",
                              shadowOpacity: 0.2,elevation:6}}>
                                  <View style={{margin:10 , borderRadius:6 , backgroundColor:"#d7f3ff" , height:130 , overflow: 'hidden', alignItems:'center'}}>
                                      <Image 
                                      resizeMode={"contain"}
                                      style={{width:140 , marginTop:-15}}
                                      source={require('../Images/demo.png')} />
                                  </View>

                        <Text numberOfLines={1} style={{fontWeight:'700' , fontSize:16 , marginHorizontal:10 , marginTop:10 , color:'#323232'}}>{item.title}</Text>
                                  <View style={{flexDirection:'row' , alignItems:'center' , marginHorizontal:10, marginTop:5}}>
                                    {
                                      item.employer_verified == "yes" &&
                                      <AntIcon name="checkcircle" size={12} color={"#00cc67"} /> 
                                    }
                         
                        <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767' , fontWeight:'700'}}>{item.employer_name}</Text>
                                  </View>
                                  <View style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 , top:5  , marginBottom:20}}>
                                    <View style={{flexDirection:'row'}}>
                                      <AntIcon name="folder1" size={12} color={"#47C3EE"} /> 
                                    <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767'}}>{item.project_level}</Text>
                                    </View>

                                    <View style={{flexDirection:'row'}}>
                                    <AntIcon name="flag" size={12} color={CONSTANT.primaryColor} /> 
                                    <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767'}}>{item.location_name}</Text>
                                    </View>

                                    {/* <View style={{flexDirection:'row'}}>
                                    <AntIcon name="checkcircle" size={12} color={"#00cc67"} /> 
                                    <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767'}}>{item.employer_name}</Text>
                                    </View> */}

                                  </View>
                              </View>
                          </TouchableOpacity> 
                        )}
                   
                      />
            </View>
            :
            <View style={styles.MainScrollArea}>
          <Image
            resizeMode={'contain'}
            style={styles.MainScrollImageStyle}
            source={require('../Images/nodata.png')}
          />
        </View>
            }
        
      </View>
    );
  }
}
export default OngoingJobs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily:CONSTANT.PoppinsMedium,
  },
  MainScrollArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainScrollImageStyle: {
    width: 250,
    height: 250,
  },
  MainScrollOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  MainScrollNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
