import React from 'react';
import ReactECharts from 'echarts-for-react';

const englishToChineseMap = {
  // 核心音乐、情感与高频常用实词对照
  "Love": "爱", "Life": "生活", "Heart": "心", "Night": "夜晚", "Day": "白昼", "Time": "时间",
  "Girl": "女孩", "Boy": "男孩", "Way": "路途", "World": "世界", "Man": "男人", "Woman": "女人",
  "Dance": "起舞", "Song": "歌谣", "Music": "音乐", "Blue": "忧郁蓝色", "Red": "炽热红色", "Star": "星辰",
  "Moon": "月亮", "Sun": "太阳", "Fire": "烈火", "Water": "流水", "Dream": "梦想", "Home": "故乡",
  "Road": "道路", "Street": "街区", "Summer": "盛夏", "Winter": "寒冬", "Spring": "阳春", "Fall": "金秋",
  "Rain": "落雨", "Baby": "宝贝", "Heaven": "天堂", "Hell": "地狱", "Happy": "快乐", "Sad": "悲伤",
  "Good": "美好", "Bad": "糟糕", "Never": "永不", "Always": "总是", "Forever": "永远", "Together": "在一起",
  "Alone": "孤独", "Tonight": "今晚", "Yesterday": "昨日", "Tomorrow": "明日", "Crazy": "疯狂", "Sweet": "甜蜜",
  "Little": "小小", "Big": "大大", "High": "高昂", "Low": "低沉", "Black": "黑色", "White": "白色",
  "Light": "光芒", "Dark": "黑暗", "Gold": "黄金", "Rock": "摇滚", "Shake": "摇摆", "Beat": "节拍",
  "Rhythm": "旋律", "Mind": "心智", "Soul": "灵魂", "Body": "躯体", "Friend": "朋友", "People": "人们",
  "Eyes": "双眸", "Smile": "微笑", "Tears": "泪水", "Cry": "哭泣", "Fly": "飞翔", "Run": "奔跑",
  "Stay": "留下", "Go": "离去", "Come": "归来", "Back": "回归", "Here": "此处", "Away": "远方",
  "Stop": "止步", "Start": "启程", "Keep": "保持", "Hold": "紧握", "Lost": "迷失", "Found": "寻回",
  "Free": "自由", "Beautiful": "美丽", "Young": "年轻", "Old": "老旧", "True": "真实", "Lie": "谎言",
  "Yeah": "耶", "Gonna": "将要", "Wanna": "想要", "Right": "对的", "Bones": "风骨", "Ghost": "幽灵",
  "Vegas": "拉斯维加斯", "Dandelions": "蒲公英", "Atlantis": "亚特兰蒂斯", "Stan": "斯坦", "Dynamite": "炸药",
  "Natural": "自然", "Bored": "无聊", "Attention": "关注", "Enemy": "宿敌", "Riptide": "激流",
  "Unstoppable": "无可阻挡", "Believer": "信徒", "Demons": "心魔", "Humble": "谦逊", "Iris": "鸢尾花",
  "Memories": "回忆", "Creep": "懦夫", "Easy": "轻松", "Boyfriend": "男友", "Girlfriend": "女友",
  "Ex": "前任", "Hello": "你好", "Goodbye": "再见", "Angel": "天使", "Devil": "恶魔", "Whisper": "耳语",
  "Shout": "呐喊", "Scream": "尖叫", "Silence": "静谧", "Voice": "歌喉", "Melody": "旋律", "Harmony": "和弦",
  "Bass": "低音", "Guitar": "吉他", "Piano": "钢琴", "Drum": "架子鼓", "Stage": "舞台", "Show": "表演",
  "Concert": "音乐会", "Solo": "独奏", "Chorus": "合唱", "Melancholy": "忧郁", "Joy": "喜悦", "Anger": "愤怒",
  "Fear": "恐惧", "Surprise": "惊喜", "Sadness": "悲伤", "Disgust": "厌恶", "Shame": "羞耻", "Guilt": "内疚",
  "Pride": "骄傲", "Envy": "嫉妒", "Jealousy": "醋意", "Hope": "希望", "Despair": "绝望", "Trust": "信任",
  "Betrayal": "背叛", "Faith": "信仰", "Doubt": "怀疑", "Patience": "耐心", "Kindness": "善良",
  "Cruelty": "残忍", "Mercy": "仁慈", "Justice": "正义", "Truth": "真理", "Wisdom": "智慧", "Folly": "愚蠢",
  "Genius": "天才", "Idiot": "白痴", "Fool": "傻瓜", "Shadow": "影子", "Sunlight": "阳光", "Moonlight": "月光",
  "Starlight": "星光", "Skyline": "天际", "Ocean": "海洋", "Sea": "大海", "River": "江河", "Lake": "湖泊",
  "Stream": "溪流", "Pond": "池塘", "Wave": "波浪", "Tide": "潮汐", "Windy": "多风", "Rainy": "多雨",
  "Sunny": "晴朗", "Cloudy": "多云", "Snowy": "下雪", "Stormy": "暴风雨", "Foggy": "有雾", "Warm": "温暖",
  "Cold": "寒冷", "Hot": "炎热", "Cool": "凉爽", "Bright": "明亮", "Darkness": "黑暗", "Midnight": "午夜",
  "Sunset": "日落", "Sunrise": "日出", "Dawn": "黎明", "Dusk": "黄昏", "Morning": "早晨", "Afternoon": "下午",
  "Evening": "傍晚", "Week": "星期", "Month": "月份", "Year": "年份", "Century": "世纪", "Era": "时代",
  "Decade": "十年", "Season": "季节", "Weather": "天气", "Climate": "气候", "Nature": "自然",
  "Universe": "宇宙", "Cosmos": "宇宙空间", "Galaxy": "星系", "Planet": "行星", "Asteroid": "小行星",
  "Comet": "彗星", "Meteor": "流星", "Earthquake": "地震", "Volcano": "火山", "Flood": "洪水",
  "Drought": "干旱", "Fire": "火灾", "Smoke": "烟雾", "Fog": "浓雾", "Mist": "薄雾", "Dew": "露水",
  "Frost": "严霜", "Ice": "冰霜", "Snow": "白雪", "Rain": "雨水", "Cloud": "浮云", "Sky": "天空",
  "Air": "空气", "Wind": "微风", "Dust": "尘埃", "Dirt": "泥土", "Mud": "烂泥", "Clay": "粘土",
  "Sand": "细沙", "Stone": "石头", "Pebble": "鹅卵石", "Gravel": "砾石", "Soil": "土壤",
  "Land": "陆地", "Mountain": "山脉", "Hill": "小山", "Valley": "山谷", "Canyon": "峡谷", "Cliff": "悬崖",
  "Cave": "洞穴", "Forest": "森林", "Wood": "树林", "Jungle": "丛林", "Desert": "沙漠", "Plains": "平原",
  "Meadow": "草地", "Swamp": "沼泽", "Marsh": "湿地", "Island": "岛屿", "Peninsula": "半岛", "Cape": "海角",
  "Bay": "海湾", "Gulf": "海湾", "Harbor": "港口", "Port": "港口", "Shore": "海岸", "Coast": "海岸",
  "Beach": "沙滩", "Spring": "泉水", "Well": "井水", "Waterfall": "瀑布", "Geyser": "喷泉", "Glacier": "冰川",
  "Iceberg": "冰山", "One": "一", "Two": "二", "Three": "三", "Four": "四", "Five": "五", "Sex": "性",
  "Drug": "药", "Girls": "女孩们", "Boys": "男孩们", "Nights": "黑夜", "Days": "白昼", "World": "世界",
  "Worlds": "世界", "Christmas": "圣诞", "Green": "绿色", "Yellow": "黄色", "Purple": "紫色",
  "Pink": "粉色", "Orange": "橙色", "Brown": "棕色", "Gray": "灰色", "Silver": "银色", "Gold": "金色",
  "Bronze": "青铜", "Copper": "红铜", "Iron": "黑铁", "Steel": "精钢", "Metal": "金属", "Bones": "风骨"
};

const TimelineChart = ({ data }) => {

  if (!data || data.length === 0) return null;

  const isNoiseWord = (word) => {
    if (!word) return true;
    const lower = word.toLowerCase().trim();
    const noiseList = [
      "soundtrack", "remastered", "remaster", "live", "ost", "original", 
      "acoustic", "mono", "stereo", "single", "theme", "album", "instrumental", 
      "bonus", "track", "recorded", "re-recorded", "part", "deluxe", "edition", 
      "anniversary", "remasters", "remastering", "session", "sessions", 
      "broadcast", "concert", "unplugged", "vol", "volume", "hits", "greatest", 
      "collection", "ep", "lp", "one", "two", "three", "four", "five",
      "原声带", "重录版", "重录", "原声", "现场", 
      "现场版", "独奏", "单曲", "专辑", "特别版", "豪华版", "周年纪念", "纪念版", 
      "精选", "混音", "独唱"
    ];
    return noiseList.some(noise => lower.includes(noise));
  };

  const translateKeyword = (word) => {
    if (!word) return null;
    const matchedKey = Object.keys(englishToChineseMap).find(key => key.toLowerCase() === word.toLowerCase());
    return matchedKey ? englishToChineseMap[matchedKey] : null;
  };

  // 13个年代从左到右的高亮霓虹色谱
  const decadeColors = [
    '#2E86DE', // 1960-1964: 经典克莱因蓝
    '#00B894', // 1965-1969: 复古薄荷绿
    '#10AC84', // 1970-1974: 翡翠松石绿
    '#00CEC9', // 1975-1979: 电光湖水蓝
    '#5F27CD', // 1980-1984: 绚丽迪斯科紫
    '#8395A7', // 1985-1989: 典雅太空灰
    '#EE5A24', // 1990-1994: 狂放珊瑚橙
    '#EA2027', // 1995-1999: 激情烈焰红
    '#FFC312', // 2000-2004: 数字暖阳黄
    '#C4E538', // 2005-2009: 灵动萤草绿
    '#0652DD', // 2010-2014: 浩瀚深海蓝
    '#12CBC4', // 2015-2019: 梦幻极光青
    '#FDA7DF'  // 2020-2024: 青春蔷薇粉
  ];

  // 整合并计算所有年代的数据节点
  const allNodes = [];
  const decadeLabels = data.map(d => d.label);

  data.forEach((decadeData, decadeIndex) => {
    // 筛选前 4 名歌手
    const filteredArtists = decadeData.artists
      .filter(item => !isNoiseWord(item.name))
      .slice(0, 4);

    // 筛选前 4 名热词（具备翻译对照）
    const translatedWords = [];
    decadeData.words.forEach(item => {
      if (!isNoiseWord(item.name)) {
        const trans = translateKeyword(item.name);
        if (trans) {
          translatedWords.push({
            ...item,
            translatedName: trans
          });
        }
      }
    });
    const filteredWords = translatedWords.slice(0, 4);

    // 合并为 8 个节点，交错分布
    const mergedList = [
      ...filteredArtists.map(a => ({ name: `🎙️ ${a.name}`, value: a.value, isArtist: true })),
      ...filteredWords.map(w => ({ name: `🎵 ${w.translatedName}`, value: w.value, isArtist: false }))
    ];

    // 精准纵坐标位置分配 (Y 轴在 0 - 100 之间分出 8 个高度，完美避免重叠)
    const yOffsets = [12, 24, 36, 48, 60, 72, 84, 96];

    // 气泡大小自适应映射 (50px - 82px)
    const values = mergedList.map(item => item.value);
    const maxVal = values.length > 0 ? Math.max(...values) : 1;
    const minVal = values.length > 0 ? Math.min(...values) : 1;
    const valRange = maxVal - minVal || 1;

    mergedList.forEach((item, itemIndex) => {
      const ratio = (item.value - minVal) / valRange;
      const size = Math.round(50 + ratio * 32);

      allNodes.push({
        // 二维直角坐标数据：[X轴分类索引, Y轴高低坐标, 热度频次]
        value: [decadeIndex, yOffsets[itemIndex], item.value],
        name: item.name,
        symbolSize: size,
        isArtist: item.isArtist,
        decadeLabel: decadeData.label
      });
    });
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: { show: false }, // 彻底关停 Tooltip 以实现 100% 静态展示
    grid: {
      left: '3%',
      right: '3%',
      bottom: '12%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: decadeLabels,
      boundaryGap: true,
      axisLine: { lineStyle: { color: '#E5E8EB', width: 1.5 } },
      axisTick: { show: false },
      axisLabel: {
        color: '#637381',
        fontSize: 12,
        fontWeight: 'bold',
        margin: 16,
        fontFamily: 'monospace',
        interval: 0, // 确保 13 个年代全部显式渲染
        rotate: 15   // 轻微斜置防拥挤
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.035)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 106,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        type: 'scatter',
        data: allNodes,
        symbol: 'circle',
        itemStyle: {
          color: function (params) {
            const xIndex = params.data.value[0];
            return decadeColors[xIndex % decadeColors.length];
          },
          borderColor: '#FFFFFF',
          borderWidth: 2,
          shadowBlur: 14,
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowOffsetY: 5
        },
        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            return params.data.name;
          },
          fontSize: 10,
          fontWeight: '900',
          color: '#FFFFFF',
          textBorderColor: 'rgba(0,0,0,0.22)',
          textBorderWidth: 2,
          fontFamily: 'Outfit, Inter, system-ui, sans-serif'
        },
        silent: true // 屏蔽鼠标捕获与 Hover 特效，确保完全静态且极度流畅
      }
    ]
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px', width: '100%', gap: '15px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#212B36', fontWeight: '800', letterSpacing: '-0.02em' }}>
            🪐 年代文化时空长廊 (1960 - 2024 流行歌手与汉化歌名热词流)
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#637381' }}>
            🎨 60年音乐浪潮一次性尽收眼底：🎙️ 代表年代活跃歌手，🎵 代表歌曲名字里的流行热词。从左到右气泡颜色自适应形成唯美霓虹历史光谱流！
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'rgba(0, 168, 150, 0.08)', color: '#008274', border: '1px solid rgba(0, 168, 150, 0.25)', borderRadius: '50px', padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800' }}>
            <span>🎨 纯粹视觉全景展卷</span>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1, width: '100%', position: 'relative', minHeight: '380px', backgroundColor: 'rgba(255, 255, 255, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.6)', overflow: 'hidden' }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} notMerge={true} lazyUpdate={true} />
      </div>
    </div>
  );
};

export default TimelineChart;
