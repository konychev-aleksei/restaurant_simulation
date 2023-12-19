export function getNeutralRate(Positive, FeedbackCount, SpawnRate) {
  return (Positive * FeedbackCount) / SpawnRate;
}

export function getCriticalRate(Positive, FeedbackCount, SpawnRate) {
  return (Positive * FeedbackCount) / SpawnRate;
}

export function getChangeRate(Positive, FeedbackCount, SpawnRate) {
  return (Positive * FeedbackCount) / SpawnRate;
}

export function getLeavingRate1(Positive, FeedbackCount, SpawnRate) {
  return (Positive * FeedbackCount) / SpawnRate;
}

export function getLeavingRate2(Positive, FeedbackCount, SpawnRate) {
  return (Positive * FeedbackCount) / SpawnRate;
}

export function getOverallHappiness(
  WaiterSpeed,
  ClientScarcity,
  HallCleanliness,
  WaiterPoliteness,
  Positive,
  Critical,
  Neutral
) {
  return (
    (WaiterSpeed *
      ClientScarcity *
      (HallCleanliness + WaiterSpeed + WaiterPoliteness) *
      (Positive + Critical + Neutral)) /
    (3 * SpawnRate)
  );
}
