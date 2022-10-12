import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Share , ImageBackground, ViewBase , Alert } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import * as CONSTANT from '../Constants/Constant';
class OngoingServicesCard extends Component {
  state = {
    default_color_badge: "",
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    iconColor: '#dddddd',
    showAlert: false,
    isLoading: false,
  };
 
  render() {
    // Alert.alert("data" , JSON.stringify(this.props.service_title))
    return (
              <View style={styles.container}>
                  <View  style={{flexDirection:'row' , padding:10 , flex:4 }}>
                  <View style={{flexDirection:'column'  , flex:3}}>
                    <View>
                        <Image
                        style={{height:50 , width:50 , borderRadius:5}}
                        source={ this.props.featured_img}
                        />
                    </View>
                    <View style={{flexDirection:'column' , marginTop:10}}>
                        {
                            this.props.is_featured == "yes" &&
                            <Text numberOfLines={1} style={{fontSize:10 , color:'#767676' }}>Featured</Text>
                        }
                    <Text numberOfLines={1}  style={{fontSize:17 , marginRight:10 , fontWeight:'700' , color:'#323232'}}>{this.props.service_title}</Text>
                        <View style={{flexDirection:'row' , alignItems:'center'}}>
                        <Text numberOfLines={1}  style={{fontSize:10 , color:'#767676'}}>Starting from:</Text>
                    <Text numberOfLines={1}  style={{fontSize:14 , fontWeight:'700' , color:CONSTANT.primaryColor}}> {this.props.price}</Text>
                        </View>
                    </View>
                </View>
              
                  </View>
               
                <Text style={{marginLeft:10 , fontWeight:'700' ,}}>Order By:</Text>
                <View style={{flexDirection:'row' , margin:10 , padding:10 , backgroundColor:'#f7f7f7' , alignItems:'center' }}>
                    <View>
                        <Image
                        style={{height:30 , width:30 , borderRadius:15}}
                        source={this.props.employer_avatar}
                        />
                    </View>
                    <View style={{flexDirection:'column' , marginLeft:10 }}>
                    <Text numberOfLines={1} style={{fontSize:13 , color:'#767676'}}>{this.props.employer_title}</Text>
                    <Text numberOfLines={1}  style={{fontSize:13 , fontWeight:'700' , color:'#323232'}}>{this.props.employertagline}</Text>
                    </View>
                </View>
              </View>
    );
  }
}
export default OngoingServicesCard;
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', margin: 2,
        backgroundColor:'#fff',
        elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
      },
});
