import store from "./store";

export default function LeftBarNewBuilt(){
    return <div className='新建' style={{
        position: `static`, marginTop: `10px`,
        padding:`10px 20px 10px 20px`,
        border: `1px solid white`,
        borderRadius: `5px`,
        background: `linear-gradient(to bottom, #5cb85c, #449d44)`,
        userSelect: `none`,
    }}
    onMouseEnter={e => {
        e.target.style.background = "linear-gradient(to bottom, #5cb85c, #449d44)";
    }} onMouseLeave={e => {
        e.target.style.background = "linear-gradient(to bottom, #449d44, #5cb85c)";
    }} onClick={e=>{
        store.addList();
    }}>
        新建
    </div>
}


