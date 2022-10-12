import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import * as CONSTANT from '../Constants/Constant';
class SkillCard extends Component {
  render() {
    const barWidth = Dimensions.get('screen').width - 45;
    const progressCustomStyles = {
      backgroundColor: CONSTANT.primaryColor,
      borderRadius: 4,
      borderColor: '#fff',
    };
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{}}>{this.props.skillname}</Text>
            <Text>{this.props.skillValue}%</Text>
          </View>
          <View style={{marginTop: 5}}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              height={7}
              value={this.props.skillValue}
              backgroundColorOnComplete="#6CC644"
            />
          </View>
        </View>
      </View>
    );
  }
}
export default SkillCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    elevation: 3,
  },
});
