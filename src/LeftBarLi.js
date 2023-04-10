import { useEffect,  useRef, useState, useCallback } from 'react'
import Icon from './Icon'
import { get, useEffectok, getId, has, flush } from './Effectok/hooks';
import store from './store';

export default function LeftBarLi(props) {
    let ref = useRef(null);
    let that = useEffectok('LeftBarLi' + getId(), class{
        id = props.name
        height = 50
        picSize = 20
        top = (this.height - this.picSize)/2
        isCurLi(){
          if(!has("leftBar")){
            return false;
          }else{
            return get("leftBar").curLi === that;
          }
        }
        curEnter = 'linear-gradient(to top, #ffffff, #449d44)'
        curLeave = 'linear-gradient(to bottom, #ffffff, #449d44)'
        enter = 'linear-gradient(to top, #449d44, #5cb85c)'
        leave = 'linear-gradient(to bottom, #449d44, #5cb85c)'

        reName(){
          let newName = ref.current.value;
          if(newName === that.id) return;
          while(store.map.has(newName)){
            newName += getId();
          }
          store.reName(this.id, newName);
          that.id = newName;
        }
    });
    if(ref.current != null){
      ref.current.style.background = that.isCurLi() ? that.curLeave : that.leave;
    } 
    return (
      <div style={{
        position: `relative`, width: `100%`, height: that.height + 'px', marginTop: `10px`,
        userSelect: `none` 
      }}>
      <input aria-label="修改名称" className='修改名称' ref={ref} type="text" readOnly= {!that.isCurLi()} defaultValue={props.name} style={{
        position: `static`, zIndex: `-1`, width: `100%`, height: `100%`,
        padding:`10px 20px 10px 20px`,
        border: "none", borderRadius: `8px`, borderBottom: "1px solid black",
        outline: "none",
        userSelect: `none`,
        background: `${that.leave}`,
        cursor: `${that.isCurLi() ? 'text':'default'}`
      }}
      onClick={e=>{
        store.setCurList(that.id);
        flush('shower');
      }}
      onMouseEnter={e => {ref.current.style.background = that.isCurLi() ? that.curEnter : that.enter;}}
      onMouseLeave={e => {ref.current.style.background = that.isCurLi() ? that.curLeave : that.leave;}}
    />
    <Icon className='editIcon' src= {process.env.PUBLIC_URL + '/编辑.png'} size = {that.picSize + 'px'} style={{
      position: 'absolute', top: that.top + 'px', right: `0px`,
    }} onClick ={(e)=>{
      get('leftBar').curLi = that;
      get('app').clickType = 'leftBarLi';
      ref.current.style.background = that.curEnter;
      ref.current.focus();
      that.flush();
    }}/>
    <Icon className='deleteIcon' src= {process.env.PUBLIC_URL + '/删除.png'} size = {that.picSize + 'px'} style={{
      position: 'absolute', top: that.top + 'px', right: `${that.picSize + 'px'}`,
    }} onClick={(e)=>{
      store.deleteList(that.id);
      flush('leftBar');
      if(that.id == store.curListId){
          store.curListId = '';
          flush('shower');
      }
    }}/>
    </div>
    );
  }
  
  