import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Graph = ({ isPaused, onPause }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const intervalIdRef = useRef(null); // Keep track of interval ID
  const latestValueRef = useRef(null); // Store the latest value
  const stateRef = useRef("growth"); // "growth", "spike", "crash"

  useEffect(() => {
    // Initialize the chart
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        // background: '#3131314f',
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#e1e1e1" },
        horzLines: { color: "#e1e1e1" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add a candlestick series
    const series = chart.addCandlestickSeries({
      upColor: "green",
      downColor: "red",
      borderUpColor: "green",
      borderDownColor: "red",
      wickUpColor: "green",
      wickDownColor: "red",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Generate initial data
    const initialData = generateInitialData();
    series.setData(initialData);

    // Start graph updates
    startGraphUpdates(series, initialData);

    return () => {
      stopGraphUpdates();
      chart.remove();
    };
  }, []);

;

  const startGraphUpdates = (series, initialData) => {
    intervalIdRef.current = setInterval(() => {
      const lastTime = initialData[initialData.length - 1]?.time || 0;
      const newCandle = generateDynamicCandle(lastTime + 1);
      latestValueRef.current = newCandle; // Track the latest value
      initialData.push(newCandle);
      series.update(newCandle);

      // Trim data to keep only the most recent candles
      if (initialData.length > 24) initialData.shift();
    }, 300);
  };

  const stopGraphUpdates = () => {
    clearInterval(intervalIdRef.current);
  };

  useEffect(() => {
    if (isPaused) {
      // If paused, stop updates and send the latest value to parent
      stopGraphUpdates();
      if (latestValueRef.current) onPause(latestValueRef.current.close);
    } else {
      // Resume updates if not paused
      startGraphUpdates(seriesRef.current, seriesRef.current.data);
    }
  }, [isPaused])

  // Helper function to generate initial data
  const generateInitialData = () => {
    let time = 0;
    let value = 50; // Start from a midpoint
    const data = [];

    for (let i = 0; i < 24; i++) {
      const candle = generateDynamicCandle(time++);
      value = candle.close; // Carry over last value
      data.push(candle);
    }
    return data;
  };

  const generateDynamicCandle = (time) => {
    const volatility = 10;
    let open = latestValueRef.current?.close || 50;
    let close = open;
  
    switch (stateRef.current) {
      case "growth": // Linear-ish Growth
        close += Math.random() * 5 + 2; // Progressively increase
        if (Math.random() < 0.1) close += Math.random() * 20; // Occasional small spikes
        if (close >= 90) stateRef.current = "crash"; // Trigger crash after a threshold
        break;
  
      case "spike": // Sudden Spike
        close += Math.random() * 30 + 10; // Big upward spike
        stateRef.current = "growth"; // Return to growth after a spike
        break;
  
      case "crash": // Sudden Crash
        close -= Math.random() * 40 + 20; // Large drop
        close = Math.max(close, 10); // Prevent values below 10
        stateRef.current = "growth"; // Return to growth after crashing
        break;
  
      default:
        stateRef.current = "growth"; // Ensure there's always a state
        break;
    }
  
    // Add volatility for more natural movement
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
  
    return { time, open, high, low, close };
  };

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default Graph;
