import { useEffect, useState } from 'react';

export default function TrafficSlider({ snapshotData, historyData }) {
  const [currentData, setCurrentData] = useState(null);
  const [sevenDayTrend, setSevenDayTrend] = useState([]);

  useEffect(() => {
    if (snapshotData) {
      setCurrentData(snapshotData.current_data);
    }
    if (historyData) {
      const last7Days = Object.values(historyData).slice(-7);
      setSevenDayTrend(last7Days.map(day => ({
        date: new Date(day.timestamp).toLocaleDateString(),
        total: day.leaving.HV + day.leaving.LV + day.leaving.MC
      })));
    }
  }, [snapshotData, historyData]);

  if (!currentData) return null;

  const { HV, LV, MC } = currentData.leaving;
  const totalVehicles = HV + LV + MC;

  const levelMap = {
    "A": "Free flow",
    "B": "Reasonably free flow",
    "C": "Stable flow",
    "D": "Approaching unstable flow",
    "E": "Unstable flow",
    "F": "Forced or breakdown flow"
  };

  return (
    <div className="w-80 fixed top-4 right-4 bg-white rounded-xl shadow-xl p-4 z-50">
      <div className="space-y-4 text-sm">
        <div>
          <h2 className="text-xl font-semibold">Traffic Data</h2>
          <p>{new Date(currentData.timestamp).toLocaleString()}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Traffic Insights</h3>
          <p><strong>Peak Traffic:</strong> 06:00 - 07:00</p>
          <p><strong>Vehicle Ratio:</strong> {HV}:{LV}:{MC}</p>
          <p><strong>Current Status:</strong> {levelMap[currentData.LOS.out]}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Direction</h3>
          <p><strong>Entering:</strong> {currentData.LOS.in}</p>
          <p><strong>Leaving:</strong> {currentData.LOS.out}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Vehicle Count</h3>
          <p>Heavy Vehicles: {HV}</p>
          <p>Light Vehicles: {LV}</p>
          <p>Motorcycles: {MC}</p>
          <p>Total Vehicles: {totalVehicles}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Traffic Flow</h3>
          <p>{levelMap[currentData.LOS.out]}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">7-Day Traffic Trend</h3>
          <ul className="text-sm list-disc ml-4">
            {sevenDayTrend.map((entry, i) => (
              <li key={i}>{entry.date}: {entry.total} kendaraan</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
