import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EncryptionStagesVisualization = ({ stages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stages.map((stage, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm">{stage.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {stage.type === 'grid' && (
              <div className="game-of-life-grid" style={{ width: '100%', aspectRatio: '1/1' }}>
                {stage.data.map((row, i) => (
                  <div key={i} className="flex">
                    {row.map((cell, j) => (
                      <div
                        key={j}
                        className={`${cell ? 'bg-black' : 'bg-white border border-gray-200'}`}
                        style={{ width: `${100 / stage.data.length}%`, paddingBottom: `${100 / stage.data.length}%` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
            {stage.type === 'text' && (
              <p className="text-xs break-all">{stage.data}</p>
            )}
            {stage.type === 'binary' && (
              <p className="text-xs font-mono break-all">{stage.data}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EncryptionStagesVisualization;