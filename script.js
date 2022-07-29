var board = [[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var cells = document.getElementsByClassName("cell");
var unsolveBtn = document.getElementById("unsolve");
var solveBtn = document.getElementById("solve");;
var currRow = 0;
var currCol = 0;

function isvalid(ch, row, col) {
    for (var i = 0; i < 9; i++) {
        if (board[row][i] == ch) return false;
        if (board[i][col] == ch) return false;
        if (board[(3 * Math.floor(row / 3)) + Math.floor(i / 3)][(3 * Math.floor(col / 3)) + i % 3] == ch) return false; // dry run on a 3*3 grid to understand better
    }
    return true;
}

function solve_sudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == -1) {
                for (var ch = 1; ch <= 9; ch++) {
                    if (isvalid(ch, i, j)) {
                        board[i][j] = ch;
                        if (solve_sudoku())
                            return true;
                        board[i][j] = -1; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true; // if there is no empty cell return true
}

function checkIfAllUnfilled() {
    var count = 0;
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            count += board[i][j] == -1 ? 1 : 0;
    return count == 81;
}

function solveSudoku() {
    if (checkIfAllUnfilled())
        return;
    solve_sudoku();
    printBoard();
    unsolveBtn.style.display = 'inline-block';
    solveBtn.style.display = 'none';
}

function unSolveSudoku() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].style.color == 'red') {
            cells[i].value = '';
            cells[i].style.color = 'black';
            board[Math.floor(i / 9)][i % 9] = -1;
        }
    }
    solveBtn.style.display = 'inline-block';
    unsolveBtn.style.display = 'none';
}

function resetBoard() {
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            board[i][j] = -1;
    unSolveSudoku();
    printBoard();
}

function printBoard() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].value == '') {
            if (board[Math.floor(i / 9)][i % 9] != -1) {
                cells[i].value = board[Math.floor(i / 9)][i % 9];
                cells[i].style.color = 'red';
            }
        }
        else {
            if (board[Math.floor(i / 9)][i % 9] == -1) {
                cells[i].value = '';
                cells[i].style.color = 'black';
            }
        }
    }
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('keyup', function (e) {
        var x = parseInt(this.id.substring(1));
        currRow = Math.floor(x / 9);
        currCol = x % 9;
        if (e.key >= '1' && e.key <= '9' && isvalid(parseInt(e.key), currRow, currCol)) {
            this.value = e.key;
            board[Math.floor(x / 9)][x % 9] = parseInt(e.key);
        }
        else if (e.key == 'Backspace' ||
            (e.key != 'ArrowLeft' &&
                e.key != 'ArrowRight' &&
                e.key != 'ArrowUp' &&
                e.key != 'ArrowDown')) {
            this.value = '';
            board[Math.floor(x / 9)][x % 9] = -1;
        }
    });
};


document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key == 'ArrowLeft') {
        currCol--;
        if (currCol < 0) currCol = 0;
        cells[currCol + currRow * 9].focus();
    }
    else if (e.key == 'ArrowRight') {
        currCol++;
        if (currCol >= 9) currCol = 8;
        cells[currCol + currRow * 9].focus();
    }
    else if (e.key == 'ArrowDown') {
        currRow++;
        if (currRow >= 9) currRow = 8;
        cells[currCol + currRow * 9].focus();
    }
    else if (e.key == 'ArrowUp') {
        currRow--;
        if (currRow < 0) currRow = 0;
        cells[currCol + currRow * 9].focus();
    }
});
