# chess-analysis-board
A chessboard for the browser in vanilla




## Features


### Board and pieces
By default, all pieces are shown in their initial position.
It is possible to empty the board and position the pieces.

![pieces animation](./docs/readme-assets/features-gifs/chess-analysis-board_pieces-ani-01.gif)

- Load Initial position
- Flip board
- Add/remove pieces
- Clear board
  
#### Fen parser

It is possible to initialise the position of the parts by a fen notation.

![fen animation](./docs/readme-assets/features-gifs/chess-analysis-board_fen-flip-ani-01.gif)

--- 

### Markers

#### List of markers:
- White: dotted circle white
- Black: orange dotted  circle 
- Neutral: blue dotted   circle
- Right move: green rect 
- Wrong move: red rect 
- Last move: black filled circle

![markers animation](./docs/readme-assets/features-gifs/chess-analysis-board_markers-ani-01.gif)

####  Usage

##### Add
 to add a marker select first s square and dann the marker.

##### Remove
 to remove a marker, select first the square

--- 

### Visualization of domains

#### Square domain

![domains square animation](./docs/readme-assets/features-gifs/chess-analysis-board_domain-squares-ani-01.gif)



#### Color domain

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_domain-colors-ani-01.gif)

#### Support

##### Domain support 
![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-domain-01.png)

##### Direct square support
![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-01.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_support-square-no-01.png)


--- 

## Game examples


![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-01.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-02.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-1.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-2.png)

![domains color animation](./docs/readme-assets/features-gifs/chess-analysis-board_game-example-03-3.png)

## To-do

1. Pieces in svg
2. Draw arrows
3. Flanks visualization
4. Moves features:
   1. save moves
   2. clear moves
   3. remove from play
   4. import / export