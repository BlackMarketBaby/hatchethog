(() => {
  let sdk = null;
  let statsReady = Promise.resolve(false);
  let leaderboardReady = Promise.resolve(null);
  let saveQueue = Promise.resolve();

  function progress(value) {
    const platform = window.Wavedash;
    if (typeof platform?.updateLoadProgressZeroToOne === 'function') {
      platform.updateLoadProgressZeroToOne(value);
    }
  }

  progress(0);

  async function findLeaderboard() {
    try {
      const response = await sdk.getOrCreateLeaderboard(
        'high-scores',
        sdk.LeaderboardSortOrder.DESC,
        sdk.LeaderboardDisplayType.NUMERIC
      );
      if (response.success && response.data?.id) return response.data.id;
      console.warn('Could not load Wavedash leaderboard:', response.message || response);
    } catch (error) {
      console.warn('Could not load Wavedash leaderboard:', error);
    }
    return null;
  }

  function init() {
    sdk = window.Wavedash;
    if (!sdk || typeof sdk.init !== 'function') return;

    progress(1);
    sdk.init();
    statsReady = sdk.requestStats()
      .then(response => response.success)
      .catch(error => { console.warn('Could not load Wavedash stats:', error); return false; });
    leaderboardReady = findLeaderboard();
  }

  async function saveRun(score, stage, kills) {
    if (!sdk) return;
    const stat = identifier => Number(sdk.getStat(identifier)) || 0;

    let ready = await statsReady;
    if (!ready) {
      try { ready = (await sdk.requestStats()).success; }
      catch (error) { console.warn('Could not retry Wavedash stats:', error); }
    }
    if (ready) {
      sdk.setStat('RUNS_FINISHED', stat('RUNS_FINISHED') + 1);
      sdk.setStat('TOTAL_KILLS', stat('TOTAL_KILLS') + kills);
      sdk.setStat('BEST_SCORE', Math.max(stat('BEST_SCORE'), score));
      sdk.setStat('HIGHEST_STAGE', Math.max(stat('HIGHEST_STAGE'), stage));
      sdk.storeStats();
    }

    const leaderboardId = await leaderboardReady || await findLeaderboard();
    if (leaderboardId && score > 0) {
      const response = await sdk.uploadLeaderboardScore(
        leaderboardId, score, true, undefined, { stage, kills }
      );
      if (!response.success) console.warn('Could not upload Wavedash score:', response.message);
    }
  }

  function finishRun(score, stage, kills) {
    saveQueue = saveQueue.then(() => saveRun(score, stage, kills))
      .catch(error => console.warn('Could not save Wavedash run:', error));
    return saveQueue;
  }

  window.HatchetHogPlatform = { init, finishRun, progress };
})();
