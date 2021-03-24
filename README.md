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

## QUICK USAGE

1. Place the pieces on the board:
   1. by load fen notation
   2. manually places pieces
2. Select squares and click in panel options to visualize:
   1. pieces allowed squares
   2. most attacked squares
   3. supported pieces, to better plan an attack
   4. ...


## FEATURES


### BOARD AND PIECES
By default, all pieces are shown in their initial position.
It is possible to empty the board and position the pieces.

![pieces animation](./docs/readme-assets/features-gifs/chess-analysis-board_pieces-ani-01.gif)

- Load Initial position
- Flip board
- Add/remove pieces
- Clear board
  
#### FEN PARSER

It is possible to initialise the position of the parts by a fen notation.

![fen animation](./docs/readme-assets/features-gifs/chess-analysis-board_fen-flip-ani-01.gif)

--- 

### MARKERS

#### List of markers:
- White: dotted circle white
- Black: orange dotted  circle 
- Neutral: blue dotted   circle
- Right move: green rect 
- Wrong move: red rect 
- Last move: black filled circle

![markers animation](./docs/readme-assets/features-gifs/chess-analysis-board_markers-ani-01.gif)

####  Usage

- **add**:  to add a marker select first s square and dann the marker.
- **remove**:  to remove a marker, select first the square

--- 

### VISUALIZATION OF DOMAINS

#### SQUARE DOMAIN
By selecting a cell, it allows you to visualise the allowed cells for the figure.  

![domains square animation](./docs/readme-assets/features-gifs/chess-analysis-board_domain-squares-ani-01.gif)



#### COLOR DOMAIN
Allows you to visualise all the squares that are attacked by all the pieces of a chosen colour.

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_domain-colors-ani-01.gif)

#### SUPPORT

It allows to visualise which pieces are supported by other pieces, in the own square or in the allowed squares.

##### DOMAIN SUPPORT 
![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-domain-01.png)

##### OWN SQUARE SUPPORT
![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-01.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-no-01.png)


--- 

## GAME EXAMPLES


![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-01.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-02.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-1.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-2.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-3.png)


### GAME EXAMPLE

Wilfried Hoellrigl vs Alexander Baburin  
Oberwart Open (1991), Oberwart AUT, Jul-??   
**fen:** `2r1r1k1/4qppp/1Rp5/2Ppb3/8/3Q4/4NPPP/1R4K1 w - - 2 27`

**Black Queen - attacked squares**
![game-ex-02](./docs/readme-assets/features-gifs/db1bf81b-30f4-46fa-84e3-9dedd59e7c27.jpg)

**White Rook - attacked squares**
![game-ex-02](./docs/readme-assets/features-gifs/58c6a137-3870-4d55-a37d-ffccfcfdbcff.jpg)

**White Queen - supported squares, colors domains**
![game-ex-02](./docs/readme-assets/features-gifs/243f3510-470c-4d03-bf95-d32538a62e77.jpg)

**White Pieces - supported**
![game-ex-02](./docs/readme-assets/features-gifs/849454b3-1bae-45d6-a0d7-30f9245886ae.jpg)

**White Rook - attacked squares**
![game-ex-02](./docs/readme-assets/features-gifs/5160043b-faea-4798-9fc2-a0084de723c2.jpg)

**White Pieces - attacked**
![game-ex-02](./docs/readme-assets/features-gifs/72188865-7ad4-4106-9e49-e1a9e04f7a57.jpg)


## NEXT FEATURES

1. Pieces in svg
2. Draw 
   1. Arrows
   2. Flanks
3. Moves:
   1. save moves
   2. clear moves
   3. remove from play
   4. import / export

