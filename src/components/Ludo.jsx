import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'

const classId = [
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "010", "011", "012", "013", "014"],
    ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "110", "111", "112", "113", "114"],
    ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "210", "211", "212", "213", "214"],
    ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "310", "311", "312", "313", "314"],
    ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "410", "411", "412", "413", "414"],
    ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "510", "511", "512", "513", "514"],
    ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "610", "611", "612", "613", "614"],
    ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "710", "711", "712", "713", "714"],
    ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "810", "811", "812", "813", "814"],
    ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "910", "911", "912", "913", "914"],
    ["100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "1010", "1011", "1012", "1013", "1014"],
    ["110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "1110", "1111", "1112", "1113", "1114"],
    ["120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "1210", "1211", "1212", "1213", "1214"],        
    ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "1310", "1311", "1312", "1313", "1314"],
    ["140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "1410", "1411", "1412", "1413", "1414"]        
]


const onSpriteClick = (x, y, color, setState) => {
    const data = {
        x: x,
        y: y,
        color: color
    }
    axios.post('/click', data)
        .then(res => {
            setState(res.data.type.newboard.board)
        })
        .catch(e => console.log(e))
}

const RenderBlock = ({block, i, j, setState}) => (
    <div key={i} className={`cell${classId[i][j]}`}>
        {block.length > 0 &&
            block.map(b => (
                <div className={`${b}`} onClick={() => onSpriteClick(i, j, b, setState)}>
                    
                </div>
            ))
        }
    </div>
)

const RenderRows = ({rows, i, j, setState}) => (
    <div>
        {rows.map((block) => (
        <RenderBlock block={block} i={i} j={j++} setState={setState}/>
    ))}
    </div>
)

const RenderBoard = ({board, i, setState}) => (
    
    board.map((rows) => (
        <RenderRows rows={rows} i={i++} j={0} setState={setState}/>
    ))
    
)


function Board() {

    const [initialBoard, setInitialState] = useState(null)
    const [dice, setDice] = useState(0)
    // console.table(initialBoard)
    useEffect(() => {
        axios.get("/board")
            .then(res =>{
                setDice(res.data.dice)
                setInitialState(res.data.type.newboard.board)
            })
    },[])
    let i = 0
    if (initialBoard){
    return(
        <React.Fragment>
            <RenderBoard board={initialBoard} i={i}  setState={setInitialState}/>
            <div className={"dice"}>
                {dice}
            </div>
        </React.Fragment>
    )}else{
        return (
            "a"
        )
    }
}

export default Board;