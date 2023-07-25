import { useIDL } from '@/context/IDL';
// import CodeMirror from '@uiw/react-codemirror';
import Monaco from '@monaco-editor/react';
import { FC, useState } from 'react';
import { githubDark } from '@uiw/codemirror-theme-github';


const JSONEditor: FC<any> = ({ noeditable }) => {
    const { IDL, setIDL } = useIDL()
    const [errorIDL, setErrorIDL] = useState("")
    const handlerIDL = (value: any) => {
        try {
            setErrorIDL("")
            const parse = JSON.parse(value)
            setIDL(parse)
        } catch (error: any) {
            setErrorIDL(error.toString())
        }

    }
    return (
        <div className='h-full border-t-1 border-border'>
            <p className='text-red'>{errorIDL}</p>
            <Monaco
                options={{readOnly: noeditable}}
                language='json'
                value={JSON.stringify(IDL, null, "\t")}
                onChange={handlerIDL}
                theme="vs-dark"
            />
        </div>
    )
}

export default JSONEditor