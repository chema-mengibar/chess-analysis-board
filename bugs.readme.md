# Bugs

### Pieces disapear on flip board
Issue: Load game from Pgn and flip board. 
but not in initial load from url fen. 
File: src\js\mocks\pgn-01.mocks.js
```
const pgnInputStr = MockPgn01;
this.renderPgnToBoard(pgnInputStr);
```

```
/?fen=6k1/pp5p/2p5/3p4/1P1P2b1/P1P4q/6K1/RN3rb1 w KQkq - 0 1
```