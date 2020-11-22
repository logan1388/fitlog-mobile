import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { donutGraph } from './DonutGraph';
import { WorkoutTypes } from '../../commonlib/models/WorkoutModel';

interface donutgraphdata {
  type: WorkoutTypes;
  frequency: number;
}

interface donutgraphProps {
  donutgraphdata?: donutgraphdata[];
}

const DonutGraphWebView: React.FC<donutgraphProps> = props => {
  const WebViewRef = useRef<WebView>(null);
  const donutGraphData = props.donutgraphdata;

  React.useEffect(() => {
    DrawGraph();
  }, [donutGraphData]);

  const DrawGraph = () => {
    if (WebViewRef) {
      WebViewRef.current?.injectJavaScript(
        `window.donutGraph=${donutGraph};window.donutGraph(${JSON.stringify(donutGraphData)}); true;`
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

export default DonutGraphWebView;
