function Robot(grid) {
    const Direction = Object.freeze({
        NORTH: 0,
        EAST: 1,
        SOUTH: 2,
        WEST: 3
    });

    this.position = { x: 0, y: 0 };
    this.previousPosition = { x: 0, y: 0 };
    this.direction = Direction.EAST;
    this.grid = grid;

    this.moveForward = () => {
        this.previousPosition = { ...this.position };

        switch (this.direction) {
            case Direction.NORTH:
                if (this.position.y > 0) this.position.y--;
                break;
            case Direction.EAST:
                if (this.position.x < this.grid.gridSize - 1) this.position.x++;
                break;
            case Direction.SOUTH:
                if (this.position.y < this.grid.gridSize - 1) this.position.y++;
                break;
            case Direction.WEST:
                if (this.position.x > 0) this.position.x--;
                break;
        }
    };

    this.turnLeft = () => {
        this.direction = (this.direction + 3) % 4;
    };

    this.turnRight = () => {
        this.direction = (this.direction + 1) % 4;
    };

    this.updateGrid = () => {
        this.grid.clearCell(this.previousPosition);
        this.grid.updateCell(this.position, this.direction);
    };
}

function Grid(gridElementId, gridSize) {
    this.gridElement = document.getElementById(gridElementId);
    this.gridSize = gridSize;
    const DIRECTION_SYMBOLS = ['↑', '→', '↓', '←'];

    this.initialize = () => {
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            this.gridElement.appendChild(cell);
        }
    };

    this.getCellIndex = (position) => position.y * this.gridSize + position.x;

    this.clearCell = (position) => {
        const index = this.getCellIndex(position);
        const cells = this.gridElement.children;
        cells[index].classList.remove('robot');
        cells[index].textContent = '';
    };

    this.updateCell = (position, direction) => {
        const index = this.getCellIndex(position);
        const cells = this.gridElement.children;
        cells[index].classList.add('robot');
        cells[index].textContent = DIRECTION_SYMBOLS[direction];
    };

}

function RobotSimulator(gridElementId, gridSize) {
    const grid = new Grid(gridElementId, gridSize);
    const robot = new Robot(grid);
    this.initialize = () => {
        initializeControls();
        grid.initialize();
        robot.updateGrid();
    };

    const move = () => {
        robot.moveForward();
        robot.updateGrid();
    };

    const left = () => {
        robot.turnLeft();
        robot.updateGrid();
    };

    const right = () => {
        robot.turnRight();
        robot.updateGrid();
    };

    const initializeControls = () => {
        document.getElementById('move').addEventListener('click', move);
        document.getElementById('left').addEventListener('click', left);
        document.getElementById('right').addEventListener('click', right);
    };

    this.initialize();
}

RobotSimulator('grid', 5);