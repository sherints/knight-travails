class Node {
    constructor(row, col, distance, prev = null) {
      this.row = row;
      this.col = col;
      this.distance = distance;
      this.visited = false;
      this.prev = prev;
    }
  }
  
  function createBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        cell = [i, j];
        board.push(cell);
      }
    }
    return board;
  }
  let board = createBoard();
  
  function findAllMoves(start) {
    let moves = [];
    moves.push([start[0] + 1, start[1] - 2]);
    moves.push([start[0] + 1, start[1] + 2]);
    moves.push([start[0] - 1, start[1] - 2]);
    moves.push([start[0] - 1, start[1] + 2]);
    moves.push([start[0] + 2, start[1] - 1]);
    moves.push([start[0] + 2, start[1] + 1]);
    moves.push([start[0] - 2, start[1] - 1]);
    moves.push([start[0] - 2, start[1] + 1]);
    return moves;
  }
  
  function verifyMoves(moves) {
    let possibleMoves = [];
    moves.filter((move) => {
      if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
        possibleMoves.push(move);
      }
    });
    return possibleMoves;
  }
  
  function knightsMove(x, y) {
    let queue = [];
    let startNode = new Node(x[0], x[1], 0);
    queue.push(startNode);
  
    while (queue.length > 0) {
      let node = queue.shift();
      let { row, col, distance } = node;
      if (row === y[0] && col === y[1]) {
        let path = findPath(node);
        let message = `You made it in ${distance} moves! Here's your path:`;
        console.log(message);
        return distance, path;
      }
      node.visited = true;
  
      for (let move of verifyMoves(findAllMoves([row, col]))) {
        let moveRow = move[0];
        let moveCol = move[1];
        let neighborNode = new Node(moveRow, moveCol, distance + 1);
        neighborNode.prev = node;
  
        if (neighborNode.visited === true) return;
  
        queue.push(neighborNode);
      }
    }
  }
  
  function findPath(move) {
    let path = [];
    while (move !== null) {
      path.unshift([move.row, move.col]);
      move = move.prev;
    }
    return path;
  }
  
  console.log(knightsMove([3, 3], [4, 3]));
  console.log(knightsMove([0, 0], [1, 2]));
  console.log(knightsMove([0, 0], [3, 3]));
  console.log(knightsMove([3, 3], [0, 0]));