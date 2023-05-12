import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const {width} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
function CompetitionCard({competition, onPress}) {
    return (
        <LinearGradient
        // Button Linear Gradient
        colors={[COLORS.primary, COLORS.dark]}
        style={style.rmCard}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 45,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
                {competition.name}
          </Text>
      </TouchableOpacity>
      </LinearGradient>
    );
};

const style = StyleSheet.create({
    rmCard: {
      width: width - 40,
      height: 200,
      borderRadius: 10,
      padding: 10,
      //backgroundColor: COLORS.dark,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
});

export default CompetitionCard;