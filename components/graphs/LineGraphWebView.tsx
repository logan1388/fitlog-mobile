import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { lineGraph } from './LineGraph'

interface linegraphdata {
  weights: string;
  date: string;
}

interface linegraphProps {
  linegraphdata: linegraphdata[]
}

const LineGraphWebView: React.FC<linegraphProps> = props => {
  const lineGraphData = props.linegraphdata;
  const WebViewRef = useRef<WebView>(null);

  const DrawGraph = () => {
    if (WebViewRef) {
      WebViewRef.current?.injectJavaScript(`window.donutGraph=${lineGraph};window.donutGraph(${JSON.stringify(lineGraphData)}); true;`)
    }
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {lineGraphData && lineGraphData.length > 1 ?
        <WebView
          ref={WebViewRef}
          onLoad={DrawGraph}
          originWhitelist={['*']}
          style={{ marginTop: 0, marginBottom: 0 }}
          source={{ html: GraphHtml }}
          automaticallyAdjustContentInsets={false}
        /> :
        <View style={{ alignItems: 'center', padding: 30 }}>
          <Text>Not enough data!</Text>
        </View>}
    </View>
  );
};

export default LineGraphWebView;
