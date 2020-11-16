import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { lineGraph } from './LineGraph'
import { graphStyles } from './Graphs.style';

interface linegraphdata {
  weights: string;
  date: string;
}

interface linegraphProps {
  linegraphdata: linegraphdata[]
}

const LineGraphWebView: React.FC<linegraphProps> = props => {
  const [styles, setStyles] = useState(graphStyles());
  const lineGraphData = props.linegraphdata;
  const WebViewRef = useRef<WebView>(null);

  React.useEffect(() => {
    setStyles(graphStyles());
  }, [setStyles]);


  const DrawGraph = () => {
    if (WebViewRef) {
      WebViewRef.current?.injectJavaScript(`window.donutGraph=${lineGraph};window.donutGraph(${JSON.stringify(lineGraphData)}); true;`)
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {lineGraphData && lineGraphData.length > 1 ?
          <WebView
            ref={WebViewRef}
            onLoad={DrawGraph}
            originWhitelist={['*']}
            style={styles.lineGraphWV}
            source={{ html: GraphHtml }}
            automaticallyAdjustContentInsets={false}
          /> :
          <View style={{ alignItems: 'center', padding: 30 }}>
            <Text>Not enough data!</Text>
          </View>}
      </View>
    </View>
  );
};

export default LineGraphWebView;
