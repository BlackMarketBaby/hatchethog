# Hatchet Hog

Hatchet Hog is a browser game configured for the existing Hatchet Hog project on Wavedash.

## Build and playtest

Run `./build.ps1` in PowerShell, then run `wavedash dev` to test in the Wavedash sandbox. To upload a playtest build, run `wavedash build push -m "Description of changes"`. Uploading does not publish the build to players.

## Wavedash progress

When a run ends, the game records `RUNS_FINISHED`, `TOTAL_KILLS`, `BEST_SCORE`, and `HIGHEST_STAGE`. It also submits the run's score to the `high-scores` leaderboard, keeping each player's best score. The leaderboard is created automatically when a team member first loads the game on Wavedash.

The Wavedash project has four stat-triggered achievements: First Blood (1 kill), Hog Wild (50 lifetime kills), Five Stages Deep (reach stage 5), and High Roller (score 5,000 in one run).
