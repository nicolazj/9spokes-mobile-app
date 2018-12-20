import React from 'react';
import { View } from 'react-native';
import Grid from './Grid';
import Indicator from './Indicator';
import Legend from './Legend';
import LineChart from './LineChart';
import XAxis from './XAxis';
import YAxis from './YAxis';

interface Props {
  data: any;
  onTickClick: (index: number) => void;
  formatXAxis: any;
  curTick: number;
}
class LineChartWrapper extends React.PureComponent<Props> {
  render() {
    const { data, onTickClick, formatXAxis, curTick } = this.props;
    const xAxisHeight = 30;
    return (
      <View>
        <Legend data={data} />
        <View style={{ height: 200, padding: 0, flexDirection: 'row' }}>
          <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            yAccessor={({ item: { value } }) => value}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              data={data}
              style={{ flex: 1 }}
              yAccessor={({ item: { value } }) => value}
              onTickClick={onTickClick}
              curTick={curTick}
            >
              <Indicator />
              <Grid />
            </LineChart>

            <XAxis
              style={{
                marginHorizontal: -20,
                height: xAxisHeight,
                paddingTop: 10,
              }}
              data={data}
              contentInset={{ left: 20, right: 20 }}
              formatLabel={(value, index, count) => {
                return formatXAxis(data, index, count);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default LineChartWrapper;
