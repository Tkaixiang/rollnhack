const ADDRESS =
  process.env.NODE_ENV !== "development" ? "/api/" : "http://localhost:8989";

export const getLeaderboard = async () => {
  const response = await fetch(`${ADDRESS}/leaderboard`);
  const jsonResult = await response.json();
  return jsonResult.leaderboard;
};

export const getName = async (name: string) => {
  const response = await fetch(`${ADDRESS}/leaderboard/${name}`);
  const jsonResult = await response.json();
  return jsonResult.player;
};

export const postScore = async (name: string, score: string) => {
  const response = await fetch(`${ADDRESS}/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, score }),
  });
  const jsonResult = await response.json();
  return jsonResult.leaderboard;
};
