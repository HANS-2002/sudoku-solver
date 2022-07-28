// var board = [[-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
var board = [
    [
        -1,
        9,
        6,
        -1,
        -1,
        2,
        -1,
        -1,
        7
    ],
    [
        1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        9,
        -1
    ],
    [
        3,
        -1,
        -1,
        -1,
        6,
        -1,
        -1,
        -1,
        -1
    ],
    [
        -1,
        -1,
        -1,
        8,
        -1,
        -1,
        -1,
        -1,
        3
    ],
    [
        -1,
        2,
        9,
        -1,
        4,
        -1,
        -1,
        8,
        -1
    ],
    [
        -1,
        1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    [
        6,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        7,
        5,
        -1,
        -1
    ],
    [
        -1,
        8,
        4,
        -1,
        2,
        -1,
        -1,
        3,
        -1
    ]
];
var cells = document.getElementsByClassName("cell");

function isvalid(ch, row, col) {
    for (var i = 0; i < 9; i++) {
        if (board[row][i] == ch) return false;
        if (board[i][col] == ch) return false;
        if (board[3 * parseInt(row / 3) + parseInt(i / 3)]
        [3 * parseInt(col / 3) + i % 3] == ch) return false; // dry run on a 3*3 grid to understand better
    }
    return true;
}

function solve_sudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == -1) {
                for (var ch = 1; ch <= 9; ch++) {
                    if (isvalid(board, ch, i, j)) {
                        board[i][j] = ch;
                        if (solve_sudoku(board)) return true;
                        else board[i][j] = -1; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true; // if there is no empty cell return true
}

function solveSudoku() {
    solve_sudoku();
    console.log(board);
}

function resetBoard() {
    for (var i = 0; i < n; i++)
        for (var j = 0; j < m; j++)
            board[i][j] = -1;
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('keyup', function (e) {
        if (e.key >= '1' && e.key <= '9') {
            this.value = e.key;
            var x = parseInt(this.id);
            board[parseInt(x / 9)][x % 9] = parseInt(e.key);
        }
        else if (e.key == 'Backspace') {
            this.value = '';
            board[0][0] = -1;
        }
        console.log(board);
    });
}
