import React from 'react';
import { View, Text } from 'react-native';
import Card from '../components/Card';

const BestLog = props => {
  return (
    // <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    //   {props.bestSet && <MaxCard title="Set" {...props.bestSet} />}
    //   {props.maxWt && <MaxCard title="Weight" {...props.maxWt} />}
    //   {props.maxRps && <MaxCard title="Reps" {...props.maxRps} />}
    //   {props.maxTime && <MaxCard title="Time" {...props.maxTime} />}
    // </View>
    <Card style={{ margin: 10, backgroundColor: 'steelblue' }}>
      <View>
        <Text style={{ margin: 10 }}>Best Set</Text>
        <Text style={{ margin: 10 }}>Max Weight</Text>
        <Text style={{ margin: 10 }}>Max Rep</Text>
      </View>
    </Card>
  );
};

export default BestLog;
