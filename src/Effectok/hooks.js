import { useEffect, useRef, useState } from "react";
//数据存放点 核心的机制
let store = new Map();
export function get(id){
    if(!store.has(id)) {console.log('effectok notFound ' + id + '不存在'); return}
    return store.get(id)
}

export function has(id){
    return store.has(id);
}

export function useEffectok(id, Class){
    let [flush, setFlush] = useState(0)
    let ref = useRef(null)
    useEffect(()=>{
        if(store.has(id)) console.log('error 重复的id: ' + id);
        store.set(id, ref.current)
        return ()=>{ store.delete(id)}
    },[])
    if(flush === 0 && !store.has(id)){
        let obj = new Class()
        obj.flush = () =>{
            setFlush(++flush)
        }
        ref.current = obj
    }
    return ref.current
}

export function flush(){//可以传递一个或多个id进行刷新
    for(let id of arguments){
        if(!store.has(id)) console.log('Flush notFound ' + id + '不存在');
        store.get(id).flush()
    }
}



let i = 1;  //0会与  ‘’  相等
export function getId(){
    return i++;
}
















