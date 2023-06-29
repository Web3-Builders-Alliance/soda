import { useIDL } from '@/context/IDL';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import {  githubDark } from '@uiw/codemirror-theme-github';


const JSONEditor = () => {
    const { IDL, setIDL } = useIDL()
    const [errorIDL, setErrorIDL] = useState("")
    const handlerIDL = (value: any)=> {
        try {
            setErrorIDL("")
            const parse = JSON.parse(value)
            setIDL(parse)
        } catch (error: any) {
            setErrorIDL(error.toString())
        }

    }

    console.log(errorIDL)

    return (
        <div>
            <p className='text-red'>{errorIDL}</p>
            <CodeMirror
                value={JSON.stringify(IDL, null, "\t")}
                onChange={handlerIDL}
                theme={githubDark}
            />
        </div>
    )
}

export default JSONEditor