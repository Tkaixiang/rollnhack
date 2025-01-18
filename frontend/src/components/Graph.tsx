import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const Graph = ({ onUpdateLatestValue, startLoading, onGraphEnd }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const intervalIdRef = useRef(null);
  const initialDataRef = useRef([]); // Store the initial data
  const currentIndexRef = useRef(0); // Keep track of the current index in the data
  const subStepIndexRef = useRef(0); // Track sub-steps for each candlestick

  const [finalsScore, setFinalsScore] = useState(50); // Track finals score
  const [hoursStudied, setHoursStudied] = useState(0); // Track hours studied

  useEffect(() => {
    if (!startLoading) return; // Only initialize the chart if startLoading is true

    // Initialize the chart
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#1e1e1e" }, // Dark theme background
        textColor: "#f5f5f5", // Light text for contrast
      },
      grid: {
        vertLines: { color: "#2c2c2c" },
        horzLines: { color: "#2c2c2c" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#2c2c2c", // Match grid colors
      },
      rightPriceScale: {
        borderColor: "#2c2c2c", // Match grid colors
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#4caf50", // Green for upward candles
      downColor: "#f44336", // Red for downward candles
      borderUpColor: "#4caf50",
      borderDownColor: "#f44336",
      wickUpColor: "#4caf50",
      wickDownColor: "#f44336",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Generate initial data and start showing candles
    generateAndStartGraph();

    return () => {
      stopGraphUpdates();
      chart.remove();
    };
  }, [startLoading]); // Re-run whenever startLoading changes

  const generateAndStartGraph = () => {
    const initialData = generateInitialData();
    initialDataRef.current = initialData;
    currentIndexRef.current = 0;
    subStepIndexRef.current = 0;
    startGraphUpdates(seriesRef.current);
  };

  const startGraphUpdates = (series) => {
    intervalIdRef.current = setInterval(() => {
      const nextIndex = currentIndexRef.current;
      const subStepIndex = subStepIndexRef.current;
      const initialData = initialDataRef.current;

      if (nextIndex < initialData.length) {
        const baseCandle = initialData[nextIndex];

        // Generate variation for the current candle
        const variation = generateCandleVariation(baseCandle, subStepIndex);
        series.update(variation);

        // Update finals score and hours studied
        setFinalsScore(variation.close);
        setHoursStudied(Math.min(24, Number((nextIndex / 2 + subStepIndex / 60).toFixed(2)))); // Faster scaling

        // Notify the parent of the latest value
        if (subStepIndexRef.current === 29) { // Adjusted for faster candle transitions
          onUpdateLatestValue(variation.close);
        }

        subStepIndexRef.current += 1;

        // Move to the next candle after 30 variations
        if (subStepIndexRef.current >= 30) { // Reduced number of steps per candle
          currentIndexRef.current += 1;
          subStepIndexRef.current = 0;
        }
      } else {
        stopGraphUpdates(); // Stop updates when all data is shown
        if (onGraphEnd) onGraphEnd(); // Trigger the end round callback
      }
    }, 25); // Reduced interval for faster updates
  };

  const stopGraphUpdates = () => {
    clearInterval(intervalIdRef.current);
  };

  // Generate initial data: simulate a market with cohesive candles for exactly 24 hours
  const generateInitialData = () => {
    const data = [];
    const startTime = Math.floor(Date.now() / 1000); // Start from the current time
    let value = 50; // Start with a base value

    const totalCandles = 48; // 48 candles for 24 hours (30-minute intervals)

    for (let i = 0; i < totalCandles; i++) {
      const time = startTime + i * 30 * 60; // 30-minute intervals

      // High and low are now dependent on open and close values
      const open = value; // The open of the next candle is the close of the previous one
      const close = Math.max(25, Math.min(75, open + (Math.random() - 0.5) * 10));
      const high = Math.min(90, Math.max(open, close) + Math.random() * 0.1 * Math.abs(close - open));
      const low = Math.max(25, Math.min(open, close) - Math.random() * 0.1 * Math.abs(close - open));

      data.push({
        time,
        open,
        high,
        low,
        close,
      });

      value = close; // Carry the closing value to the next interval
    }

    return data;
  };

  // Generate slight variations for a candlestick to simulate liveliness
  const generateCandleVariation = (baseCandle, subStepIndex) => {
    const smoothFactor = Math.sin((subStepIndex / 30) * Math.PI); // Adjusted for faster transitions
    const variationFactor = smoothFactor * 1.5; // Scale the sine wave variation
    return {
      ...baseCandle,
      high: Math.max(25, Math.min(90, baseCandle.high + variationFactor)),
      low: Math.max(25, Math.min(90, baseCandle.low - variationFactor)),
      close: Math.max(25, Math.min(90, baseCandle.close + variationFactor)),
    };
  };

  useEffect(() => {
    if (startLoading && seriesRef.current) {
      stopGraphUpdates();
      generateAndStartGraph(); // Reset the chart with new data
    }
  }, [startLoading]);

  return (
    <div className="w-full h-full relative">
      <div ref={chartContainerRef} className="w-full h-full z-0" />
      <div className="absolute top-4 left-4 bg-neutral-800 p-4 rounded shadow-lg text-white z-10">
        <p className="text-lg font-bold">Finals Score: <span className="main-text"> {finalsScore.toFixed(2)} </span></p>
        <p className="text-lg font-bold">Hours of Study: <span className="main-text"> {hoursStudied} </span></p>
      </div>
    </div>
  );
};

export default Graph;
