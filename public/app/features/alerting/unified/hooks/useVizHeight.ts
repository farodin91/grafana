import { PanelData } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import { STAT, TIMESERIES } from '../utils/constants';

export function useVizHeight(data: PanelData | undefined, pluginId: string, frameIndex: number) {
  const theme = useTheme2();

  if (!data) {
    return '200px';
  }

  if (pluginId === TIMESERIES || pluginId === STAT || dataIsEmpty(data)) {
    return '200px';
  }

  const values = data.series[frameIndex].fields[0].values.length;
  const rowHeight = theme.spacing.gridSize * 5;

  /*
   Calculate how if we can make  the table smaller than 200px
   for when we only have 1-2 values
   The extra rowHeight is to accommodate the header.
  */
  const tableHeight = values * rowHeight + rowHeight;

  return `${tableHeight >= 200 ? 200 : tableHeight}px`;
}

function dataIsEmpty(data: PanelData) {
  return !data || !data.series[0] || !data.series[0].fields[0] || !data.series[0].fields[0].values;
}
