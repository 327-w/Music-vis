import React, { useEffect, useState } from 'react';
import './App.css';
import CockpitView from './components/CockpitView';

function App() {
  const [data, setData] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [brushedData, setBrushedData] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(res => res.json())
      .then(jsonData => {
        if (jsonData.sunburst) {
          const colors = ['#A8D8B9', '#B4A6CD', '#A2CBE6', '#F1A5B4', '#DDE29F', '#F3D291', '#E7AB87'];
          
          const tintColor = (hex, factor) => {
            hex = hex.replace('#', '');
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);
          
            r = Math.round(r + (255 - r) * factor);
            g = Math.round(g + (255 - g) * factor);
            b = Math.round(b + (255 - b) * factor);
          
            return `#${(r).toString(16).padStart(2, '0')}${(g).toString(16).padStart(2, '0')}${(b).toString(16).padStart(2, '0')}`;
          };

          jsonData.sunburst.forEach((parent, i) => {
            const baseColor = colors[i % colors.length];
            if (parent.children && parent.children.length > 0) {
              const pops = parent.children.map(c => c.popularity || 0);
              const minPop = Math.min(...pops);
              const maxPop = Math.max(...pops);
              
              parent.children.forEach(child => {
                const normPop = maxPop > minPop ? (child.popularity - minPop) / (maxPop - minPop) : 1;
                // Lighten by up to 55% for low popularity
                const factor = (1 - normPop) * 0.55; 
                child.itemStyle = { color: tintColor(baseColor, factor) };
              });
            }
          });

          // Calculate maximums for each feature to auto-scale the radar charts
          let maxes = {};
          jsonData.sunburst.forEach(parent => {
            if (parent.children) {
              parent.children.forEach(child => {
                if (child.features) {
                  Object.keys(child.features).forEach(k => {
                    maxes[k] = Math.max(maxes[k] || 0, child.features[k]);
                  });
                }
              });
            }
          });
          // For danceability and energy which are usually well-distributed, force them closer to 1
          maxes['danceability'] = Math.max(maxes['danceability'] || 0, 0.9);
          maxes['energy'] = Math.max(maxes['energy'] || 0, 0.9);
          jsonData.featureMaxes = maxes;
        }
        setData(jsonData);
      })
      .catch(err => console.error("Failed to load data:", err));
  }, []);

  if (!data) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#A8D8B9'}}>正在加载音乐数据集...</div>;
  }

  return (
    <div className="dashboard-container" style={{ paddingBottom: '10px' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            音乐流派声学特征可视化分析
          </h1>
        </div>
      </div>

      <CockpitView 
        data={data}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        brushedData={brushedData}
        setBrushedData={setBrushedData}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        genreDetails={data.genre_details}
      />
    </div>
  );
}

export default App;
