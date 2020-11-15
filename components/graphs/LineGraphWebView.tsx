import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { lineGraph } from './LineGraph'

const LineGraphWebView: React.FC = () => {
  const lineGraphData = [
    {
      weights: 300,
      date: '2020-10-13T00:43:33.000+00:00'
    },
    {
      weights: 350,
      date: '2020-10-14T00:43:33.000+00:00'
    },
    {
      weights: 275,
      date: '2020-10-15T00:43:33.000+00:00'
    },
    {
      weights: 450,
      date: '2020-10-16T00:43:33.000+00:00'
    },
    {
      weights: 400,
      date: '2020-10-17T00:43:33.000+00:00'
    }
  ];

  const WebViewRef = useRef<WebView>(null);
  const DrawGraph = () => {
    if (WebViewRef) {
      // WebViewRef.current?.injectJavaScript(`window.donutGraph(${JSON.stringify(pieGraphData)}); true;`)
      WebViewRef.current?.injectJavaScript(`window.donutGraph=${lineGraph};window.donutGraph(${JSON.stringify(lineGraphData)}); true;`)
    }
  }
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <WebView
        ref={WebViewRef}
        onLoad={DrawGraph}
        originWhitelist={['*']}
        style={{ marginTop: 0, marginBottom: 0 }}
        source={{ html: GraphHtml }}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
};

export default LineGraphWebView;
