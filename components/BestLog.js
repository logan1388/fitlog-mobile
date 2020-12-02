import React from 'react';
import { View, Text } from 'react-native';
import MaxCard from '../components/MaxCard';

const BestLog = props => {
  return (
    // <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    //   {props.bestSet && <MaxCard title="Set" {...props.bestSet} />}
    //   {props.maxWt && <MaxCard title="Weight" {...props.maxWt} />}
    //   {props.maxRps && <MaxCard title="Reps" {...props.maxRps} />}
    //   {props.maxTime && <MaxCard title="Time" {...props.maxTime} />}
    // </View>
    <View style={{ backgroundColor: 'lightskyblue', padding: 30 }}>
      <Text style={{ margin: 10 }}>Best Set</Text>
      <Text style={{ margin: 10 }}>Max Weight</Text>
      <Text style={{ margin: 10 }}>Max Rep</Text>
    </View>
  );
};

export default BestLog;
