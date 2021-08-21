# chess-analysis-board
A chessboard for the browser in vanilla

##  DEVELOPMENT
Installation, Development, Test, Build

- `npm i`
- `npm start`
- `npm run build`
- `npm run test`

## TECH STACK

- Vanilla
- Sass
- Jest
- Webpack
- cypress
- jest

## QUICK USAGE

1. Place the pieces on the board:
   1. by load fen notation
   2. manually places pieces
2. Select squares and click in panel options to visualize:
   1. pieces allowed squares
   2. most attacked squares
   3. supported pieces, to better plan an attack
   4. ...

## LIVE DEMO

[http://motuo.info/chess/](http://motuo.info/chess/)

## FEATURES

### Overview
- Game
  - Record
  - Previous
  - Next
- Visualization analyse
  - Square support
  - Square danger
  - Square attack
  - Piece domain
  - Piece domain attack
  - Piece domain danger
  - Piece domain support
  - Domain toggle
  - Domain white
  - Domain black
  - Report balance white
  - Report balance black
  - Toggle visuals
  - Flank center (to do)
  - Flank king (to do)
  - Flank queen (to do)
-  Markers
   - Circle white
   - Circle black
   - Circle neutral
   - Dot ( last move)
   - Square green
   - Square red
- Pieces
  - add/remove
  - clear selected square
- Board
  - Flip
  - Clear
  - Reset
  - Fen to board
  - Board to fen
  - Copy Link
  - Pgn to board


### Clear board
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_clear-board.spec.js/ui-button_reset-board_button-alone.png" alt="ui-button_reset-board_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_clear-board.spec.js/ui-button_reset-board_0-loaded.png" alt="ui-button_reset-board_0-loaded" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_clear-board.spec.js/ui-button_reset-board_1-cleared.png" alt="ui-button_reset-board_1-cleared" width="200"/>
</p>

### Square attack
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_demo-explain.spec.js/ui-button_paint-attack-square_1-explanation.png" alt="ui-button_paint-attack-square_1-explanation" width="200"/>
</p>

### Domain black
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_domain-black.spec.js/ui-button_domain-black_button-alone.png" alt="ui-button_domain-black_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_domain-black.spec.js/ui-button_domain-black_0-before.png" alt="ui-button_domain-black_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_domain-black.spec.js/ui-button_domain-black_1-after.png" alt="ui-button_domain-black_1-after" width="200"/>
</p>

### Domain toggle
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_domain-toggle.spec.js/ui-button_domain-toggle_button-alone.png" alt="ui-button_domain-toggle_button-alone" width="120"/>
<img src="./docs/readme-assets/features-captures/tool-ui_domain-toggle.spec.js/ui-button_domain-toggle_0-before.png" alt="ui-button_domain-toggle_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_domain-toggle.spec.js/ui-button_domain-toggle_1-after.png" alt="ui-button_domain-toggle_1-after" width="200"/>
</p>

### Domain white
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_domain-white.spec.js/ui-button_domain-white_button-alone.png" alt="ui-button_domain-white_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_domain-white.spec.js/ui-button_domain-white_0-before.png" alt="ui-button_domain-white_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_domain-white.spec.js/ui-button_domain-white_1-after.png" alt="ui-button_domain-white_1-after" width="200"/>
</p>

### Fen to board
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_fen-load.spec.js/ui-button_fen-load-board_button-alone.png" alt="ui-button_fen-load-board_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_fen-load.spec.js/ui-button_fen-load-board_0-init.png" alt="ui-button_fen-load-board_0-init" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_fen-load.spec.js/ui-button_fen-load-board_1-fen-loaded.png" alt="ui-button_fen-load-board_1-fen-loaded" width="200"/>
</p>

### Board flip
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_flip-board.spec.js/ui-button_flip-board_button-alone.png" alt="ui-button_flip-board_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_flip-board.spec.js/ui-button_flip-board_0-load.png" alt="ui-button_flip-board_0-load" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_flip-board.spec.js/ui-button_flip-board_1-flip.png" alt="ui-button_flip-board_1-flip" width="200"/>
</p>

### Piece domain attack
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-attack.spec.js/ui-button_piece-domain-attack_button-alone.png" alt="ui-button_piece-domain-attack_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-attack.spec.js/ui-button_piece-domain-attack_0-before.png" alt="ui-button_piece-domain-attack_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-attack.spec.js/ui-button_piece-domain-attack_1-after.png" alt="ui-button_piece-domain-attack_1-after" width="200"/>
</p>

### Piece domain danger
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-danger.spec.js/ui-button_piece-domain-danger_button-alone.png" alt="ui-button_piece-domain-danger_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-danger.spec.js/ui-button_piece-domain-danger_0-before.png" alt="ui-button_piece-domain-danger_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-danger.spec.js/ui-button_piece-domain-danger_1-after.png" alt="ui-button_piece-domain-danger_1-after" width="200"/>
</p>

### Piece domain support
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-support.spec.js/ui-button_piece-domain-support_button-alone.png" alt="ui-button_piece-domain-support_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-support.spec.js/ui-button_piece-domain-support_0-before.png" alt="ui-button_piece-domain-support_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain-support.spec.js/ui-button_piece-domain-support_1-after.png" alt="ui-button_piece-domain-support_1-after" width="200"/>
</p>

### Piece domain
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain.spec.js/ui-button_piece-domain_button-alone.png" alt="ui-button_piece-domain_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain.spec.js/ui-button_piece-domain_0-before.png" alt="ui-button_piece-domain_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_piece-domain.spec.js/ui-button_piece-domain_1-after.png" alt="ui-button_piece-domain_1-after" width="200"/>
</p>

### Reset board
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_reset-board.spec.js/ui-button_reset-board_button-alone.png" alt="ui-button_reset-board_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_reset-board.spec.js/ui-button_reset-board_0-empty.png" alt="ui-button_reset-board_0-empty" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_reset-board.spec.js/ui-button_reset-board_1-pieces.png" alt="ui-button_reset-board_1-pieces" width="200"/>
</p>

### Square attack
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_square-attack.spec.js/ui-button_paint-attack-square_button-alone.png" alt="ui-button_paint-attack-square_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_square-attack.spec.js/ui-button_paint-attack-square_0-before.png" alt="ui-button_paint-attack-square_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_square-attack.spec.js/ui-button_paint-attack-square_1-after.png" alt="ui-button_paint-attack-square_1-after" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_square-attack.spec.js/ui-button_paint-attack-square_1-explanation.png" alt="ui-button_paint-attack-square_1-explanation" width="200"/>
</p>

### Square danger
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_square-danger.spec.js/ui-button_paint-danger-square_button-alone.png" alt="ui-button_paint-danger-square_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_square-danger.spec.js/ui-button_paint-danger-square_0-before.png" alt="ui-button_paint-danger-square_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_square-danger.spec.js/ui-button_paint-danger-square_1-after.png" alt="ui-button_paint-danger-square_1-after" width="200"/>
</p>

### Square support
<p float="left">
<img src="./docs/readme-assets/features-captures/tool-ui_square-support.spec.js/ui-button_paint-support-square_button-alone.png" alt="ui-button_paint-support-square_button-alone" width="120"/>
</br >
<img src="./docs/readme-assets/features-captures/tool-ui_square-support.spec.js/ui-button_paint-support-square_0-before.png" alt="ui-button_paint-support-square_0-before" width="200"/>
<img src="./docs/readme-assets/features-captures/tool-ui_square-support.spec.js/ui-button_paint-support-square_1-after.png" alt="ui-button_paint-support-square_1-after" width="200"/>
</p>



## NOTICE

The project does not provide a game engine :)

## NEXT FEATURES