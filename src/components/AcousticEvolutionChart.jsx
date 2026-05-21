import React from 'react';
import ReactECharts from 'echarts-for-react';

const AcousticEvolutionChart = ({ data }) => {


  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: '#637381' }}>
        ⏳ 正在加载音乐声学特征历年演变数据...
      </div>
    );
  }

  // 排序并提取年份和各指标数组
  const sortedData = [...data].sort((a, b) => a.year - b.year);
  const years = sortedData.map(item => item.year);

  const danceabilityData = sortedData.map(item => item.danceability);
  const energyData = sortedData.map(item => item.energy);
  const valenceData = sortedData.map(item => item.valence);
  const acousticnessData = sortedData.map(item => item.acousticness);
  const instrumentalnessData = sortedData.map(item => item.instrumentalness);
  const livenessData = sortedData.map(item => item.liveness);
  const speechinessData = sortedData.map(item => item.speechiness);

  // 精心设计的通透、绚丽渐变配色
  const featureColors = {
    danceability: { primary: '#FF5E7E', shadow: 'rgba(255, 94, 126, 0.15)', name: '🕺 舞曲度' },
    energy: { primary: '#FF9F43', shadow: 'rgba(255, 159, 67, 0.15)', name: '⚡ 能量感' },
    valence: { primary: '#10AC84', shadow: 'rgba(16, 172, 132, 0.15)', name: '🎭 愉悦度' },
    acousticness: { primary: '#2E86DE', shadow: 'rgba(46, 134, 222, 0.15)', name: '🎻 原声感' },
    instrumentalness: { primary: '#7F8C8D', shadow: 'rgba(127, 140, 141, 0.15)', name: '🎹 器乐度' },
    liveness: { primary: '#9B59B6', shadow: 'rgba(155, 89, 182, 0.15)', name: '🎤 现场感' },
    speechiness: { primary: '#00D2D3', shadow: 'rgba(0, 210, 211, 0.15)', name: '🗣️ 词频度' }
  };

  const getAreaStyle = (colorObj) => {
    return {
      opacity: 0.18,
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: colorObj.primary },
          { offset: 1, color: colorObj.shadow }
        ]
      }
    };
  };

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#EAEAEB',
      borderWidth: 1,
      textStyle: { color: '#212B36', fontSize: 13 },
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowBlur: 10,
      padding: [10, 15],
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#00A896',
          precision: 0
        },
        lineStyle: {
          color: '#00A896',
          width: 1.5,
          type: 'dashed'
        }
      },
      formatter: function (params) {
        const year = params[0].axisValue;
        let html = `<div style="padding: 4px 8px; font-family: sans-serif;">
          <div style="font-weight: 800; font-size: 15px; color: #212B36; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
            <span>📅 ${year} 年</span>

          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">`;

        params.forEach(item => {
          const val = typeof item.value === 'number' ? item.value.toFixed(3) : item.value;
          html += `<tr style="height: 24px;">
            <td style="padding-right: 20px; display: flex; align-items: center; gap: 6px; color: #637381;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; backgroundColor: ${item.color};"></span>
              ${item.seriesName}
            </td>
            <td style="text-align: right; font-weight: 700; color: #212B36;">${val}</td>
          </tr>`;
        });

        html += `</table></div>`;
        return html;
      }
    },
    legend: {
      data: Object.values(featureColors).map(c => c.name),
      top: '5%',
      left: 'center',
      icon: 'roundRect',
      itemWidth: 15,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        color: '#637381',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Outfit, Inter, sans-serif'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: years,
      axisLine: { lineStyle: { color: '#E5E8EB', width: 1 } },
      axisTick: { show: false },
      axisLabel: {
        color: '#637381',
        fontSize: 12,
        fontWeight: 'bold',
        margin: 12,
        fontFamily: 'monospace'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1.0,
      splitNumber: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F0F2F5', type: 'dashed' } },
      axisLabel: {
        color: '#637381',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'monospace'
      }
    },
    series: [
      {
        name: '🕺 舞曲度',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: danceabilityData,
        itemStyle: { color: featureColors.danceability.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.danceability),
        markArea: {
          silent: true,
          label: {
            show: true,
            position: 'top',
            color: 'rgba(99, 115, 129, 0.8)',
            fontSize: 11,
            fontWeight: '800',
            distance: 8,
            fontFamily: 'Outfit, sans-serif'
          },
          data: [
            [
              { name: '60年代\n爵士与摇滚崛起', xAxis: 1960, itemStyle: { color: 'rgba(168, 216, 185, 0.035)' } },
              { xAxis: 1969 }
            ],
            [
              { name: '70年代\n迪斯科多元绽放', xAxis: 1970, itemStyle: { color: 'rgba(180, 166, 205, 0.035)' } },
              { xAxis: 1979 }
            ],
            [
              { name: '80年代\n电子合成器大潮', xAxis: 1980, itemStyle: { color: 'rgba(162, 203, 230, 0.035)' } },
              { xAxis: 1989 }
            ],
            [
              { name: '90年代\n嘻哈与另类金曲期', xAxis: 1990, itemStyle: { color: 'rgba(241, 165, 180, 0.035)' } },
              { xAxis: 1999 }
            ],
            [
              { name: '00年代\n互联网数字潮汐', xAxis: 2000, itemStyle: { color: 'rgba(221, 226, 159, 0.035)' } },
              { xAxis: 2009 }
            ],
            [
              { name: '10年代\n流媒体全球互联', xAxis: 2010, itemStyle: { color: 'rgba(243, 210, 145, 0.035)' } },
              { xAxis: 2019 }
            ],
            [
              { name: '20年代\n数字新纪元', xAxis: 2020, itemStyle: { color: 'rgba(231, 171, 135, 0.035)' } },
              { xAxis: 2024 }
            ]
          ]
        }
      },
      {
        name: '⚡ 能量感',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: energyData,
        itemStyle: { color: featureColors.energy.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.energy)
      },
      {
        name: '🎭 愉悦度',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: valenceData,
        itemStyle: { color: featureColors.valence.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.valence)
      },
      {
        name: '🎻 原声感',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: acousticnessData,
        itemStyle: { color: featureColors.acousticness.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.acousticness)
      },
      {
        name: '🎹 器乐度',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: instrumentalnessData,
        itemStyle: { color: featureColors.instrumentalness.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.instrumentalness)
      },
      {
        name: '🎤 现场感',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: livenessData,
        itemStyle: { color: featureColors.liveness.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.liveness)
      },
      {
        name: '🗣️ 词频度',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: speechinessData,
        itemStyle: { color: featureColors.speechiness.primary },
        lineStyle: { width: 3 },
        areaStyle: getAreaStyle(featureColors.speechiness)
      }
    ]
  };



  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '580px', width: '100%', gap: '15px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#212B36', fontWeight: '800', letterSpacing: '-0.02em' }}>
            🎹 时代之声：全球流行音乐声学特征历年演变大盘
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#637381' }}>
            📈 折线与阴影反映了 1960 - 2020 历年来数十万首经典单曲在 7 大声学特征（舞曲律动、情绪能量等）的均值趋势演变。
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'rgba(0, 168, 150, 0.08)', color: '#008274', border: '1px solid rgba(0, 168, 150, 0.25)', borderRadius: '50px', padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800' }}>
            <span>📊 历年均值趋势总览</span>
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1, width: '100%', position: 'relative', minHeight: '380px', backgroundColor: 'rgba(255, 255, 255, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.6)', overflow: 'hidden' }}>
        <ReactECharts 
          option={option} 

          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} 
          notMerge={true} 
          lazyUpdate={true} 
        />
      </div>
    </div>
  );
};

export default AcousticEvolutionChart;
