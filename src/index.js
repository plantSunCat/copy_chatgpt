import React from 'react';
import ReactDOM from 'react-dom/client';
import Shower from './shower'
import LeftBar from './leftBar'
import Prompt from './prompt'
import './styles/globals.css'
import { useEffect } from 'react';
import { get } from './Effectok/hooks';
import { useEffectok } from './Effectok/hooks';
import store from './store';


function App() {

  let that = useEffectok('app', class{
    clickType = ''
    constructor(){
      document.addEventListener('click', this.handleClick);
    }
    handleClick(event) {
      if(that.clickType !== "leftBarLi"){
        let old = get('leftBar').curLi;
        get('leftBar').curLi = null;
        if(old){
          old.reName();
          old.flush();
        }
      }
      that.clickType = '';
    }
  });

  return (
    <div className="App" style={{
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      alignItems: `center`,
      minHeight: `100vh`,
      paddingLeft: `16vw`,
    }}>
        <LeftBar/>
        <Shower/>
        <Prompt/> 
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

