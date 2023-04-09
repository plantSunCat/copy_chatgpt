import { useEffect, useRef, useState, useCallback } from 'react'
import { useEffectok, flush, get } from './Effectok/hooks';
import chatgpt from './Effectok/chatgpt'
import store from './store';

function prompt() {
    const inputRef = useRef(null);
    let that = useEffectok('prompt', class{
        promptButtonClick = async () => {
            let shower = get("shower");
            let question = inputRef.current?.value;
            if(question.length == 0) return;
            store.addUserMessage(question);
            chatgpt.contextChat(shower.list().slice(-20)).then(answer =>{
                store.addAassistant(answer);
            })
        }
        handleInputChange = (event) => {
            let oldRows = this.rows;
            let question = inputRef.current?.value;
            this.rows = (question.match(/\n/g) || []).length + 1;
            this.height = Math.min(that.rows, 5) * that.fontSize * this.lineFontRate + 20;
            if(Math.abs(this.rows - oldRows) == 1){
                const scrollDistance = event.target.scrollHeight - event.target.clientHeight;
                event.target.scrollTop = scrollDistance;
            }
            
            if(oldRows != this.rows){
                that.flush();
            }              
        }
        lineFontRate = 1.5
        rows = 1
        fontSize = 16
        height = this.fontSize * this.lineFontRate + 20;
    })


    return (
    <div className='prompt' style={{
        position: `fixed`,
        bottom: `15px`,
        display: `flex`,
        justifyContent: `spaceBetween`,
        color: `aqua`,
        width: `50%`
    }}>
        <textarea aria-label="输入prompt" className="输入prompt"  ref={inputRef} onChange={that.handleInputChange}
            style={{ 
                width:`100%`,
                height: that.height + `px`,
                fontSize: that.fontSize + `px`,
                paddingTop: `10px`,
                paddingBottom: `10px`,
                paddingLeft: `15px`,
                lineHeight: that.lineFontRate,
                overflow: `${that.rows <= 5 ? 'hidden' : 'visible'}`,
                outline: `none`, //设置选中时无边框
                resize: `none`, //隐藏底部改变高度的按钮
                border: `none`,
                boxShadow:`0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)`,
                opacity: `1`,
                borderRadius: `12px`,
            }}
        />

        {/* <button >Button</button> */}
        <button type='button' aria-label="发送prompt" className='发送prompt' onClick={that.promptButtonClick} 
        style={{ 
            position: 'absolute',
            top: `-24px`, left: '5px', width: `50px`, height: `20px`,
            border: `none` ,
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            background: `linear-gradient(to bottom, #5cb85c, #449d44)`,
            borderRadius: `8px`,
        }}
        onMouseEnter={e => {
            e.target.style.background = "linear-gradient(to bottom, #5cb85c, #449d44)";
        }}
        onMouseLeave={e => {
            e.target.style.background = "linear-gradient(to bottom, #449d44, #5cb85c)";
        }}
        >发送</button>
    </div>
    );
}
export default prompt;

