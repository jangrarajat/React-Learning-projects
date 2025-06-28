import React, { useState } from 'react'

export default function List({ value, index, listData, setListData, taskCount, setTaskCount }) {

    let  [listNum , setListNum] = useState(index + 1)


    function deleteList() {
        let fynalData = listData.filter((v, i) => i != index)
        setListData(fynalData)

    }



    return (
        <>
            <li>
                <h5>{listNum}.</h5>
                <p > {value}</p>
                <span onClick={deleteList}>&times;</span>
            </li>
        </>
    )
}
