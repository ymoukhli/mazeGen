const width = 50;
const height = 50;
let interval = null;
const remainingExits = {
    "right": width - 1, 
    "bottom": height - 1, 
    "left": 0, 
    "top": 0
};
let instructionArray = [];
const pathHistory = [];
const validExits = ["right", "bottom", "left", "top"];

function creatMaze(width, height) {
    const table = document.createElement('div');
    table.setAttribute('id', 'table');
    const tbody = document.createElement('div');
    tbody.setAttribute('id', 'tbody');

    for (let j = 0; j < height; j++)
    {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let i = 0; i < width; i++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
        if (i == 0 && j == 0)
            {
                cell.style.backgroundColor = "rgb(244,0,0)";
                cell.setAttribute("type", "start"); 
            }
            else if (i == width - 1 && j == height - 1)
            {
                cell.style.backgroundColor = "rgb(0,244,0)";
                cell.setAttribute("type", "finish");
            }
            else
            {
                cell.style.backgroundColor = "rgb(255,255,255)";
            }
            cell.setAttribute('id', 'cell_'+j+'_'+i);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    document.getElementById('root').appendChild(table);
}

creatMaze(width,height);

const getRandom = () => Math.floor(Math.random() * instructionArray.length);
function* runInstructions() {
    
    let rowIndex = 0;
    let colIndex = 0;
    
    let lol = 0;
    for (let i = 0; lol < width; i++)
    {
        instructionArray = [];
        for (let k = 0; k < validExits.length; k++)
        {
            let nextPossibleCell = null;
            switch(validExits[k]) {
                case "right":
                nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex + 1));
                break;
                case "left":
                nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex - 1));
                break;
                case "bottom":
                nextPossibleCell = document.getElementById("cell_" + (rowIndex + 1) + "_" + colIndex);
                break;
                case "top":
                nextPossibleCell = document.getElementById("cell_" + (rowIndex - 1) + "_" + colIndex);
                break;
            } // switch
            if (nextPossibleCell != null && nextPossibleCell.style.backgroundColor != "rgb(255, 0, 0)")
            {
                // for (let t = 0; t < remainingExits[validExits[k]]; t++) {
                    instructionArray.push(validExits[k]);
                // }
            }
        }
        if (instructionArray.length === 0)
        {
            pathHistory.pop();
            if (pathHistory.length === 0)
            {
                document.getElementById('cell_0_0').style.backgroundColor ='#f0f';
                document.getElementById('cell_'+(height-1) + '_'+(width-1)).style.backgroundColor ='#ff0'
                console.log('DONE!');
                setTimeout(() => {
                    document.getElementById('table').remove();
                    creatMaze(width, height);
                    startMaze(); 
                }, 2000);
                break;
            }
            rowIndex = pathHistory[pathHistory.length - 1][0];
            colIndex = pathHistory[pathHistory.length - 1][1];
            continue;
        }
        const indexValue = instructionArray.splice(getRandom(), 1)[0];
        let currentCell = document.getElementById('cell_'+rowIndex+'_'+colIndex)
        currentCell.style.backgroundColor ='#ff0';
        pathHistory.push([rowIndex, colIndex]);
        
        switch(indexValue) {
            case 'right':
                currentCell.style['border-right'] = 'none' 
                colIndex++;
                break;
            case 'bottom':
                currentCell.style['border-bottom'] = 'none' 
                rowIndex += 1;
                break;
            case 'top':
                currentCell.style['border-top'] = 'none' 
                rowIndex -= 1;
                break;
            case 'left':
                currentCell.style['border-left'] = 'none' 
                colIndex -= 1;
                break;
        }
        yield;
        currentCell.style.backgroundColor ='#f00';
        currentCell = document.getElementById('cell_'+rowIndex+'_'+colIndex)
        currentCell.style.backgroundColor ='#f00';
        switch(indexValue) {
            case 'right':
                currentCell.style['border-left'] = 'none'
                break;
            case 'bottom':
                currentCell.style['border-top'] = 'none'
                break;
            case 'left':
                currentCell.style['border-right'] = 'none'
                break;
            case 'top':
                currentCell.style['border-bottom'] = 'none'
                break;
        }
        yield;
    }
}



document.body.addEventListener("keyup", function(e){
    if(e.key == ' '){
        startMaze();
    }
});

const startMaze = () => {
    const instructions = runInstructions()
    if (interval) clearInterval(interval);
    interval = setInterval(() => instructions.next(), 2);

}