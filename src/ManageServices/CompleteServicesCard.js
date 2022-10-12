import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ImageBackground,
  ViewBase,
  Alert,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ratingFull from '../../src/Images/ratingFull.png';
import ratingNone from '../../src/Images/ratingNone.png';
import ratingHalf from '../../src/Images/ratingHalf.png';
import * as CONSTANT from '../Constants/Constant';
class CompletedServicesCard extends Component {
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

  render() {
    // Alert.alert("data" , JSON.stringify(this.props.service_title))
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10, flex: 4}}>
          <View style={{flexDirection: 'column', flex: 3}}>
            <View>
              <Image
                style={{height: 50, width: 50, borderRadius: 5}}
                source={this.props.featured_img}
              />
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
              {this.props.is_featured == 'yes' && (
                <Text
                  numberOfLines={1}
                  style={{fontSize: 10, color: '#767676'}}>
                  Featured
                </Text>
              )}

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  marginRight: 10,
                  fontWeight: '700',
                  color: '#323232',
                }}>
                {this.props.service_title}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 10, color: '#767676'}}>
                  Starting from:
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: CONSTANT.primaryColor,
                  }}>
                  {' '}
                  {this.props.price}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEE',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 11, textAlign: 'center', bottom: 5}}>
                Rating
              </Text>
              {/* <StarRating
                disabled={true}
                maxStars={5}
                starSize={10}
                fullStarColor={"#fecb02"}
                emptyStarColor={"#fecb02"}
                rating={this.props.service_ratings}
                selectedStar={rating => this.onStarRatingPress(rating)}
              /> */}
              <StarRating
                // containerStyle={(marginRight = 5)}
                disabled={false}
                emptyStar={ratingNone}
                halfStar={ratingHalf}
                fullStar={ratingFull}
                maxStars={5}
                starSize={10}
                rating={this.props.service_ratings}
              />
              <AntIcon
                name="infocirlceo"
                color={'#323232'}
                size={14}
                style={{alignSelf: 'center', top: 5}}
              />
            </View>
          </View>
        </View>

        <Text style={{marginLeft: 10, fontWeight: '700'}}>Order By:</Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            padding: 10,
            backgroundColor: '#f7f7f7',
            alignItems: 'center',
          }}>
          <View>
            <Image
              style={{height: 30, width: 30, borderRadius: 15}}
              source={this.props.employer_avatar}
            />
          </View>
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text numberOfLines={1} style={{fontSize: 13, color: '#767676'}}>
              {this.props.employer_title}
            </Text>
            <Text
              numberOfLines={1}
              style={{fontSize: 13, fontWeight: '700', color: '#323232'}}>
              {this.props.employertagline}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default CompletedServicesCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
});
