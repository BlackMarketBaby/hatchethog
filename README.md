# Hatchet Hog

Hatchet Hog is a browser game configured for the existing Hatchet Hog project on Wavedash.

## Build and playtest

Run `./build.ps1` in PowerShell, then run `wavedash dev` to test in the Wavedash sandbox. To upload a playtest build, run `wavedash build push -m "Description of changes"`. Uploading does not publish the build to players.

## Wavedash progress

When a run ends, the game records `RUNS_FINISHED`, `TOTAL_KILLS`, `BEST_SCORE`, and `HIGHEST_STAGE`. It also submits the run's score to the visible `high-scores` leaderboard, keeping each player's best score. A score appears after a run ends with more than zero points.

The Wavedash project has four stat-triggered achievements: First Blood (1 kill), Hog Wild (50 lifetime kills), Five Stages Deep (reach stage 5), and High Roller (score 5,000 in one run).

## Launch checks

The game reports loading progress before SDK initialization, scales its 16:9 canvas to the available window, and resumes browser audio after keyboard or pointer interaction. It uses Canvas 2D rather than WebGL or WebAssembly, and uses P rather than Escape for pause.

Before publishing, set the store page title, description, 3–5 gameplay screenshots, and accurate tags in the Wavedash Developer Portal. Check the uploaded playtest on Wavedash in Chrome, Firefox, and Safari, including audio, a completed run, leaderboard submission, and achievement unlocks. The CLI does not edit store page metadata.
