import React from 'react';
import { View } from 'react-native';
import MaxCard from '../components/MaxCard';

const BestLog = (props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {props.bestSet && <MaxCard title="Set" {...props.bestSet} />}
      {props.maxWt && <MaxCard title="Weight" {...props.maxWt} />}
      {props.maxRps && <MaxCard title="Reps" {...props.maxRps} />}
      {props.maxTime && <MaxCard title="Time" {...props.maxTime} />}
    </View>
  );
};

export default BestLog;
