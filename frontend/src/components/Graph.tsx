import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Graph = ({ isPaused, onPause }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const intervalIdRef = useRef(null); // Keep track of interval ID
    const latestValueRef = useRef(null); // Store the latest value

  useEffect(() => {
    // Initialize the chart
    const chart = createChart(chartContainerRef.current, {
      width: 700,
      height: 680,
      layout: {
        // background: '#3131314f',
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#e1e1e1' },
        horzLines: { color: '#e1e1e1' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add a candlestick series
    const series = chart.addCandlestickSeries({
      upColor: 'green',
      downColor: 'red',
      borderUpColor: 'green',
      borderDownColor: 'red',
      wickUpColor: 'green',
      wickDownColor: 'red',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Initial random data
    const initialData = generateRandomData(24); // Simulate data for 24 time points
    series.setData(initialData);

    // Start dynamic updates
    const intervalId = setInterval(() => {
      const lastTime = initialData[initialData.length - 1]?.time || 0;
      const newCandle = generateRandomCandle(lastTime + 1);
      initialData.push(newCandle);
      series.update(newCandle);

      // Remove old data to simulate 24-hour view
      if (initialData.length > 24) initialData.shift();
    }, 500); // Update every half a second

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
      chart.remove(); // Remove chart
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      // If paused, stop updates and send the latest value to parent
      stopGraphUpdates();
      if (latestValueRef.current) onPause(latestValueRef.current.close);
    } else {
      // Resume updates if not paused
      startGraphUpdates(seriesRef.current, seriesRef.current.data);
    }
  }, [isPaused]);

  const startGraphUpdates = (series, initialData) => {
    intervalIdRef.current = setInterval(() => {
      const lastTime = initialData[initialData.length - 1]?.time || 0;
      const newCandle = generateRandomCandle(lastTime + 1);
      latestValueRef.current = newCandle; // Save the latest value
      initialData.push(newCandle);
      series.update(newCandle);

      if (initialData.length > 24) initialData.shift(); // Keep max 24 candles
    }, 500);
  };

  const stopGraphUpdates = () => {
    clearInterval(intervalIdRef.current);
  };



// Generate initial random data for 24 time points
const generateRandomData = (numPoints) => {
    const data = [];
    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    for (let i = 0; i < numPoints; i++) {
      data.push({
        time: currentTime - (numPoints - i - 1) * 60, // Decrement time by 60 seconds for each point
        open: Math.random() * 100,
        high: Math.random() * 100,
        low: Math.random() * 100,
        close: Math.random() * 100,
      });
    }
    return data;
  };

// Generate a single random candlestick
const generateRandomCandle = (time) => {
    const volatility = 20; // Increased volatility for wilder movements
    const extremeEventProbability = 0.1; // 10% chance for extreme crash or spike
  
    const lastClose = Math.random() * 50 + 25; // Center values around 50 for smoother start
    let open = Math.max(0, Math.min(100, lastClose + Math.random() * volatility - volatility / 2));
    let close = Math.max(0, Math.min(100, open + Math.random() * volatility - volatility / 2));
    let high = Math.max(open, close) + Math.round(Math.random() * 10);
    let low = Math.min(open, close) - Math.round(Math.random() * 10);
  
    // Introduce an extreme spike or crash
    if (Math.random() < extremeEventProbability) {
      if (Math.random() > 0.5) {
        // Spike
        close = Math.min(100, close + Math.random() * 50 + 25);
      } else {
        // Crash
        close = Math.max(0, close - Math.random() * 50 - 25);
      }
      high = Math.max(open, close) + Math.round(Math.random() * 10);
      low = Math.min(open, close) - Math.round(Math.random() * 10);
    }
  
    return { time, open, high, low, close };
  };

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Graph;
