
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEffectok, Flush } from './Effectok/hooks';
import LeftBarLi from './LeftBarLi';
import LeftBarNewBuilt from './LeftBarNewBuilt';
import store from './store';


function Input({title, func}){
    let ref = useRef(null);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '10px',
        }}>
        <label htmlFor="it" style={{
            marginBottom: '5px',
            color: '#ff8000',
            fontWeight: 'bold',
        }}>{title}</label>
        <input ref = {ref} type="text" name="it" defaultValue={store.get(title)} style={{
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#b2dfdb',
            color: '#333',
            width: '100%',
        }} onChange={(e)=>{
            func(e, ref)
        }
        }/>
        </div>
    );
}


function LeftBar() {
    let that = useEffectok('leftBar', class{
        map = store.map;
        curLi = null
        host = store.get("host");
        apikey = store.get("apiKey")
    })
    return (
        <div className='leftBar' style={{
            position: `fixed`, width: `16vw`, height: `100vh`, left: `0px`,
            padding: `0px 5px 0px 5px`,
            backgroundColor: `aqua`,
        }}>
        <Input title='host' func={(e,ref)=>{
            let host = ref.current?.value;
            store.save("host", host);
            that.host = host;
        }}/>
        <Input title='apiKey' func={(e,ref)=>{
            let apiKey = ref.current?.value;
            store.save("apiKey", apiKey);
            that.apiKey = apiKey;
        }}/>
        <LeftBarNewBuilt/>
        {Array.from(that.map).map(([key, value]) => {return <LeftBarLi key={key} name = {key}/>})}
        </div>
    );
}

export default LeftBar;
