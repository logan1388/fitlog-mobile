import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { donutGraph } from './DonutGraph';

const GraphWebView: React.FC = () => {
  const pieGraphData = [
    {
      type: 'chest',
      frequency: 8,
    },
    {
      type: 'leg',
      frequency: 3,
    },
    {
      type: 'shoulder',
      frequency: 4,
    },
    {
      type: 'biceps',
      frequency: 1,
    },
    {
      type: 'triceps',
      frequency: 2,
    },
  ];

  const WebViewRef = useRef<WebView>(null);
  const DrawGraph = () => {
    if (WebViewRef) {
      // WebViewRef.current?.injectJavaScript(`window.donutGraph(${JSON.stringify(pieGraphData)}); true;`)
      WebViewRef.current?.injectJavaScript(
        `window.donutGraph=${donutGraph};window.donutGraph(${JSON.stringify(pieGraphData)}); true;`
      );
    }
  };
  return (
    <View style={{ flex: 1, height: 250, width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <WebView
        ref={WebViewRef}
        onLoad={DrawGraph}
        originWhitelist={['*']}
        style={{ marginTop: 0, marginBottom: 0, backgroundColor: 'transparent' }}
        source={{ html: GraphHtml }}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
};

export default GraphWebView;
