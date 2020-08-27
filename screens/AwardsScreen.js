import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import BackImg from '../assets/FITLOG.jpg';
import Card from '../components/Card';
import { awardsHistory } from '../store/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const AwardsScreen = (props) => {
  const awardsHist = useSelector((state) => state.fitlogReducer.awards);
  const dispatch = useDispatch();
  const userId = '5dfecbdd39d8760019968d04';

  useEffect(() => {
    dispatch(awardsHistory(userId));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ImageBackground source={BackImg} style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={{ width: '100%' }}>
            <ScrollView>
              {awardsHist.map((item) => (
                <React.Fragment key={item.date}>
                  <Card style={styles.highlightCard}>
                    <View>
                      <Text style={{ fontSize: 16, textAlign: 'center' }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>
                          {moment(item.date).format('MM/DD/YY')}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>
                          {item.weight} {item.unit}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>
                          {item.count} reps
                        </Text>
                      </View>
                    </View>
                  </Card>
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  highlightCard: {
    justifyContent: 'space-between',
    backgroundColor: 'darkgrey',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
  },
});

export default AwardsScreen;
