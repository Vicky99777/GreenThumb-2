import React from 'react';

const CareTips = () => {
  const tips = [
    "Water plants when the top inch of soil is dry",
    "Provide adequate sunlight based on plant type",
    "Use well-draining soil to prevent root rot",
    "Rotate plants regularly for even growth",
    "Clean leaves to improve photosynthesis"
  ];

  return (
    <div className="care-tips">
      <h3>Plant Care Tips</h3>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <span>🌱</span>
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareTips;
