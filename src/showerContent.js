import { useEffectok, getId } from "./Effectok/hooks";
import Markdown from './markdown'

export default function ShowerContent({role, content}){
    return (
        <div style={{
            width: `100%`, height: `auto`, overflow: `hidden`,
            padding: `16px 18vw 16px 18vw`,
            background: role == 'user' ? '#ffffcc' : '#ffccff'
        }}>
        <Markdown content={content}/>
        </div>
    );
}