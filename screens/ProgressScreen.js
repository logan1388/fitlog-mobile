import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import moment from 'moment';

const ProgressScreen = props => {
  const logs = useSelector((state) => state.fitlogReducer.logs);
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const logsChart = logs.slice();
  logsChart.sort((a, b) => moment(a.date) - moment(b.date));
  console.log('Progress logs ', logs);
  const data = [];
  const themeContainerStyle =
    mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const chartTheme = {
    axis: {
      style: {
        axis: {
          fill: "transparent",
          stroke: 'bisque',
          strokeWidth: 1,
        },
        tickLabels: {
          // this changed the color of my numbers to white
          fill: 'white',
        },
      },
    },
    line: {
      style: {
        data: {
          fill: "transparent",
          stroke: 'bisque',
          strokeWidth: 2
        },
      }
    }
  };
  data.push({ x: '', y: 0 });

  logsChart.map((log, idx) => {
    let date = moment(log.date).date()
    let month = moment(log.date).month() + 1;
    console.log('Date: ', month + '/' + date);
    data.push({
      x: month + '/' + date,
      y: log.weight
    })
  })

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View>
        {data.length > 0 ? <VictoryChart>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            data={data}
          />
        </VictoryChart> :
          <View style={styles.innerContainer}>
            <Text>Track your progress!</Text>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
});

export default ProgressScreen;
