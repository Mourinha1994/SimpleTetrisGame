// accessing the canvas and the canvas context

const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

// increasing the canvas scale in order to make pieces bigger
context.scale(20, 20)

// making sure everything is working properly
context.fillStyle = '#000'
context.fillRect(0, 0, canvas.width, canvas.height)

// creating a data structure for the pieces
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];

// general draw function
function draw() {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
     
    drawMatrix(player.matrix, player.position)
}

// drawing the matrix / pieces
function drawMatrix(matrix, offset) {
    // drawing the piece
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            value !== 0 ? context.fillStyle = 'red' : context.fillStyle = '#000'
            context.fillRect(x + offset.x, y + offset.y, 1, 1)
        })
    })
}

let dropCounter = 0
let dropInterval = 1000
let lastTime = 0

// implementing the logic of game looping using request animation frame
function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
        player.position.y++;
        dropCounter = 0
    }

    draw()
    requestAnimationFrame(update)
}

// player
const player = {
    position: {x: 5, y: 5},
    matrix: matrix
}

// some keyboard bindings
document.addEventListener('keydown', e => {

    console.log(e)
    
    // move down
     if (e.keyCode === 83) player.position.y++

     // move left
     if (e.keyCode === 65) player.position.x--

    // move right
     if (e.keyCode === 68) player.position.x++


})

// calling game loop
update()