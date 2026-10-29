# iKNOW Calculator

**Less math, more trivia.**

iKNOW is the board game where it's not just about what you know, it's about what you think your friends know. Great fun! Counting everyone's points after every round? Not so much.

This calculator does the bookkeeping for you: who reads the card, who picks the category, who bet on whom and who's in the lead. When someone reaches 20 points, it crowns the winner. Confetti included.

New to iKNOW? Have a look at the [official rules](http://www.tactic.net/iknow/eng/miten_pelaan.php) first.

> iKNOW Calculator is an unofficial fan-made tool. It is not affiliated with, endorsed by or sponsored by Tactic Games. iKNOW is a trademark of its respective owner.

## How to play with it

1. **Gather the gang.** While someone sets up the board, add everyone's name and figure color. Played before? Pick a saved player from the name field, or bring back the whole crew from one of your last three games with one tap.
2. **Place your bets.** The app tells you who reads the card and who picks the category. Then copy the iKNOW and iBET figures from the real board onto the app's board. Placing starts with the player after the card reader.
3. **Count the points.** Once the answer is out, tap **Check answers**, then tap the iKNOW figures of everyone who got it right and hit **Count points**. The app works out who gains and who loses.

Made a mistake? The trophy button on the board opens the scoreboard, where you can fix anyone's points.

[Start a game](https://iknow-calc.netlify.app/)

## Development

Built with Vue 3, Vite, Pinia and Vue Router. The UI uses [HeroUI](https://heroui.com) styles (`@heroui/styles`, on Tailwind CSS 4) with [Reka UI](https://reka-ui.com) for dialogs, selects and the name combobox.

You need Node 22 or newer and Yarn 1.

```bash
yarn install
```

```bash
yarn dev
```

The app runs at http://localhost:3000.

| Command | What it does |
| --- | --- |
| `yarn dev` | Starts the dev server with hot reload |
| `yarn build` | Type-checks and builds the app into `dist/` |
| `yarn preview` | Serves the built app locally |
| `yarn test:unit` | Runs the unit tests (scoring rules and player history) |
| `yarn lint` | Lints the code |

### Where things live

- `src/views/`: the pages (home, players setup, board, game end, 404)
- `src/components/`: shared pieces, with HeroUI-styled primitives in `components/ui/`
- `src/stores/`: game state in Pinia. Scoring rules are in `stores/player.ts`.
- `src/stores/persist.ts`: keeps a game in progress in localStorage for 30 minutes, so a reload doesn't lose it
- `src/utils/player-history.ts`: remembers players and the last three line-ups
- `src/styles/main.css`: the HeroUI theme (accent `#603AFB`, Varela Round) for light and dark mode

### Docker

`docker compose up` starts a dev container with Node 22. Run `yarn install && yarn dev` inside it.

`Dockerfile.prod` builds the app and serves it with the small Express server in `server/index.cjs`.
