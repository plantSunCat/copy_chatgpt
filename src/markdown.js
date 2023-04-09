import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'

// a11yDark, atomDark, base16AteliersulphurpoolLight,
//  cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, 
//  arcula, dark, dracula, duotoneDark, duotoneEarth, 
//  duotoneForest, duotoneLight, duotoneSea, duotoneSpace, 
//  funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, 
//  hopscotch, lucario, materialDark, materialLight, 
//  materialOceanic, nightOwl, nord, okaidia, oneDark, 
//  oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, 
//  solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch

let Code = ({node, inline, className, children, ...props})=> {
    const match = /language-(\w+)/.exec(className || '')
    if(inline){
      return <sqan style={codeSpan}> <code {...props} className={className} style={codeStyle}>
        {children}
      </code> </sqan>
    }
    return  (
    <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={a11yDark}
        language={match ?  match[1] : 'java'}
        PreTag="div"
        {...props}
    />
    )
}

export default function Markdown({ content }){
    return(<ReactMarkdown
        children={content}
        components={{
            code:Code,
            // p: P
        }}
    />);
}

const codeSpan = {
    color: 'rgb(248, 248, 242)',
    background: 'rgb(43, 43, 43)',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    overflowWrap: 'normal',
    lineHeight: 1.5,
    tabSize: 4,
    hyphens: 'none',
    margin: '0.1em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  };

  const codeStyle = {
    color: 'aqua',
    background: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    overflowWrap: 'normal',
    lineHeight: 1.5,
    tabSize: 4,
    hyphens: 'none'
  };
  