import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import places from '../consts/places';
import { useState } from 'react';
import { useAuth } from '../context/Auth';
import { addReps, getActiveCompetition } from '../api';
import { useEffect } from 'react';
const {width} = Dimensions.get('screen');
import CompetitionCard from '../components/App/CompetitionCard';
import { ERRORS } from '../api/utils/errors.enum';
import { Loading } from '../components/Loading';
import Alert from '../components/Alert';
import { socket } from '../utils/socket';
const HomeScreen = ({navigation}) => {

  const [competition, setCompetition] = useState({});
  const [isLoading, setIsLoading] = useState({});
  socket.connect();
  socket.on('connection', function(socket) {
      console.log('connected')
      console.log(socket.connected)
    }
  )
  console.log(socket);

  socket.on('competition_selected', function(data) {
    console.log(data)
    console.log('dataaaa')
    setCompetition(data)
  })
  const auth = useAuth();
  const profile = auth.authData;

  const signOut = () => {
    console.log('sign out')
    auth.signOut();
  };

  useEffect(() => {
    getCompetition()
  }, [socket])

  async function addRepsApi() {
    await addReps(profile.token, 50);
  }

  async function getCompetition() {
    try {
      setIsLoading(true);
      const {data} = await getActiveCompetition(profile.token);
      console.log(data);
      setCompetition(data)
      setIsLoading(false);
    } catch(e) {
      console.log(e.message)
      if(e.message == ERRORS.JWT_EXPIRED) {
        signOut();
      }
    }
  }

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar translucent={true} backgroundColor={COLORS.grey} />
      <TouchableOpacity onPress={signOut} style={style.header}>
        <Icon name="logout" size={28} color={COLORS.white} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white}}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
            paddingTop: 30
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>Bienvenue</Text>
            <Text style={style.headerTitle}>{profile.firstname} {profile.lastname} !</Text>
          </View>
        </View>
        <Text style={style.sectionTitle}>Compétition en cours</Text>
        <View style={{paddingLeft: 20, paddingRight:20, paddingBottom: 20}}>
          { competition ? <CompetitionCard competition={competition} onPress={addRepsApi} /> : <Alert label={"Pas de compétition en cours"}/> }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeScreen;