let grid;
let score = 0;

export function initGame() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(null));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

export function handleKeyPress(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }
    if (moved) {
        addRandomTile();
        updateGrid();
        checkGameOver();
    }
}

export function restartGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    initGame();
}

function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (!grid[row][col]) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            if (grid[row][col]) {
                cell.innerText = grid[row][col];
                cell.setAttribute('data-value', grid[row][col]);
            } else {
                cell.innerText = '';
                cell.removeAttribute('data-value');
            }
            gridContainer.appendChild(cell);
        }
    }
    document.getElementById('score').innerText = score;
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col]) {
                newCol.push(grid[row][col]);
            }
        }
        for (let row = 0; row < newCol.length - 1; row++) {
            if (newCol[row] === newCol[row + 1]) {
                newCol[row] *= 2;
                score += newCol[row];
                newCol.splice(row + 1, 1);
            }
        }
        while (newCol.length < 4) {
            newCol.push(null);
        }
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== newCol[row]) {
                moved = true;
            }
            grid[row][col] = newCol[row];
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col]) {
                newCol.push(grid[row][col]);
            }
        }
        for (let row = newCol.length - 1; row > 0; row--) {
            if (newCol[row] === newCol[row - 1]) {
                newCol[row] *= 2;
                score += newCol[row];
                newCol.splice(row - 1, 1);
            }
        }
        while (newCol.length < 4) {
            newCol.unshift(null);
        }
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== newCol[row]) {
                moved = true;
            }
            grid[row][col] = newCol[row];
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(val => val);
        for (let col = 0; col < newRow.length - 1; col++) {
            if (newRow[col] === newRow[col + 1]) {
                newRow[col] *= 2;
                score += newRow[col];
                newRow.splice(col + 1, 1);
            }
        }
        while (newRow.length < 4) {
            newRow.push(null);
        }
        if (grid[row].toString() !== newRow.toString()) {
            moved = true;
        }
        grid[row] = newRow;
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(val => val);
        for (let col = newRow.length - 1; col > 0; col--) {
            if (newRow[col] === newRow[col - 1]) {
                newRow[col] *= 2;
                score += newRow[col];
                newRow.splice(col - 1, 1);
            }
        }
        while (newRow.length < 4) {
            newRow.unshift(null);
        }
        if (grid[row].toString() !== newRow.toString()) {
            moved = true;
        }
        grid[row] = newRow;
    }
    return moved;
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (!grid[row][col]) {
                return false;
            }
            if (col < 3 && grid[row][col] === grid[row][col + 1]) {
                return false;
            }
            if (row < 3 && grid[row][col] === grid[row + 1][col]) {
                return false;
            }
        }
    }
    alert('Game Over!');
    return true;
}