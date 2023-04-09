
import { useEffect, useRef, useState, useCallback } from 'react'
import { useEffectok, flush, get } from './Effectok/hooks';
import React from 'react'
import ShowerContent from './showerContent';
import store from './store';

export default function Shower() {
    let that = useEffectok('shower', class{
        list() {
            return store.getCurList() ? store.getCurList() : [];
        }
    })
    return (
        <div className='展示对话信息' style={{
            position: `static`, zIndex: `-1`, top: `0px`, paddingBottom: `500px`, //距离底部的最大距离
            width: `100%`, height: `auto`, minHeight: '100vh',
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            backgroundColor: `rgb(202, 232, 200)`,
        }}>{that.list().map((item, index) => (
            <ShowerContent key={index} role={item.role} content={item.content}/>
        ))}        
        </div>
    );
}




