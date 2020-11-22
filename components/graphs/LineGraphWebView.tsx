import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import GraphHtml from './GraphHtml';
import { lineGraph } from './LineGraph';
import { graphStyles } from './Graphs.style';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/actionHelpers';

interface linegraphdata {
  weights: number;
  date: Date;
}

interface linegraphProps {
  linegraphdata?: linegraphdata[];
}

const LineGraphWebView: React.FC<linegraphProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(graphStyles());
  const lineGraphData = props.linegraphdata;
  const WebViewRef = useRef<WebView>(null);
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  React.useEffect(() => {
    setStyles(graphStyles());
    DrawGraph();
  }, [setStyles, mode, lineGraphData]);

  const DrawGraph = () => {
    console.log('DrawGraph');
    if (WebViewRef) {
      WebViewRef.current?.injectJavaScript(
        `window.lineGraph=${lineGraph};window.lineGraph(${JSON.stringify(lineGraphData)}, ${JSON.stringify(
          mode
        )}); true;`
      );
    }
  };

  return (
    <View style={[styles.outerContainer, themeContainerStyle]}>
      <View style={styles.innerContainer}>
        {lineGraphData && lineGraphData.length > 1 ? (
          <WebView
            ref={WebViewRef}
            onLoad={DrawGraph}
            originWhitelist={['*']}
            style={styles.lineGraphWV}
            source={{ html: GraphHtml }}
            automaticallyAdjustContentInsets={false}
          />
        ) : (
          <View style={{ alignItems: 'center', padding: 30 }}>
            <Text style={themeTextStyle}>Not enough data!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LineGraphWebView;
