
import { useEffect, useRef, useState, useCallback } from 'react'
import { useEffectok, Flush } from './Effectok/hooks';
import LeftBarLi from './LeftBarLi';
import LeftBarNewBuilt from './LeftBarNewBuilt';
import store from './store';


function LeftBar() {
    let that = useEffectok('leftBar', class{
        map = store.map;
        curLi = null
    })
    return (
        <div className='leftBar' style={{
            position: `fixed`, width: `16vw`, height: `100vh`, left: `0px`,
            padding: `0px 5px 0px 5px`,
            backgroundColor: `aqua`,
        }}>
        <LeftBarNewBuilt/>
        {Array.from(that.map).map(([key, value]) => {return <LeftBarLi key={key} name = {key}/>})}
        </div>
    );
}


export default LeftBar;
