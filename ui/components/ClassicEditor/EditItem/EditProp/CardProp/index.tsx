import { FC, useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";

export const CardsProp: FC<any> = ({ prop, property, nameInstruction, indexItem, indexProperty, objConfig, nameConfig }) => {
  const { IDL, setIDL } = useIDL()
  const timeOutediting = useRef<NodeJS.Timeout>()


  const deleteItem = () => {
    if (nameInstruction === "errors") {
      const del = {
        ...IDL,
        [nameInstruction]: IDL[nameInstruction].filter((e: any, i: any) => i !== indexProperty).map((error: any, i: any) => {
          return {
            ...error,
            code: 6000 + i
          }
        })
      }

      return setIDL(del)
    }
    const del = {
      ...IDL,
      [nameInstruction]: IDL[nameInstruction].map((inst: any, index: number) => {
        if (index === indexItem) {
          if (nameInstruction === "instructions") {
            return {
              ...inst,
              [nameConfig]: inst[nameConfig].filter((e: any, i: any) => i !== indexProperty)
            }
          }
          if (nameInstruction === "events") {
            return {
              ...inst,
              fields: inst?.fields.filter((e: any, i: any) => i !== indexProperty)
            }
          }
          return {
            ...inst,
            type: {
              ...inst.type,
              [inst?.type?.kind === "struct" ? "fields" : "variants"]: inst?.type?.[inst?.type?.kind === "struct" ? "fields" : "variants"].filter((e: any, i: any) => i !== indexProperty)
            }
          }
        }
        return inst
      })
    }
    setIDL(del)
  }

  const editProperty = (e: any) => {
    if (timeOutediting.current) clearTimeout(timeOutediting.current)

    timeOutediting.current = setTimeout(() => {
      if (nameInstruction === "errors") {
        const editing = {
          ...IDL,
          [nameInstruction]: IDL[nameInstruction].map((prop: any, i: number) => {
            
            if (indexProperty === i) {
              return {
                ...prop,
                [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
              }
            } else {
              return prop
            }
          })
        }
       
        return setIDL(editing)
      }

      const editing = {
        ...IDL,
        [nameInstruction]: IDL[nameInstruction].map((inst: any, index: number) => {
          if (index === indexItem) {
            if (!inst?.[nameConfig]?.find((prop: any) => prop[e.target.value])) {
              if (nameInstruction === "instructions") {
                return {
                  ...inst,
                  [nameConfig]: inst?.[nameConfig].map((prop: any, i: number) => {
                    if (indexProperty === i) {
                      return {
                        ...prop,
                        [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                      }
                    } else {
                      return prop
                    }
                  })
                }
              }
              if (nameInstruction === "events") {
                return {
                  ...inst,
                  fields: inst?.fields.map((prop: any, i: number) => {
                    if (indexProperty === i) {
                      return {
                        ...prop,
                        [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                      }
                    } else {
                      return prop
                    }
                  })
                }
              }
              return {
                ...inst,
                type: {
                  ...inst.type,
                  [inst?.type?.kind === "struct" ? "fields" : "variants"]: inst?.type?.[inst?.type?.kind === "struct" ? "fields" : "variants"].map((prop: any, i: number) => {
                    if (indexProperty === i) {
                      return {
                        ...prop,
                        [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                      }
                    } else {
                      return prop
                    }
                  })

                }
              }

            }
          }
          return inst
        })
      }

      setIDL(editing)
    }, 1000)
  }

  return (

    <div
      className="relative flex p-5 pt-7 border w-32 min-w-min h-full rounded-lg border-border bg-inputs justify-center text-yellow font-thin hover:bg-backg hover:text-green hover:border-green cursor-pointer"
      onClick={(e) => { }}
    >
      <TrashIcon
        onClick={(e) => {
          e.stopPropagation()
          deleteItem()
        }}
        className="absolute z-20 text-chok top-2 right-2 w-4 h-4 hover:text-red"
      />
      <div key={prop?.name} className=' flex flex-col py-2 w-max items-center'>
        {
          objConfig.map(({ disabled, name, options }: any) => {
            if (options === "boolean") {
              return (
                <div key={name} className="flex gap-2 text-white items-center">
                  <label htmlFor={name} >{name}</label>
                  <input
                    checked={property[name]}
                    id={name}
                    type='checkbox'
                    className='bg-inputs rounded-md'
                    onChange={(e) => editProperty(e)}
                  />
                </div>
              )
            } else if (options?.length) {
              return (
                <select
                  key={name}
                  className='bg-inputs rounded-md'
                  id={name}
                  defaultValue={property[name]}
                  disabled={disabled}
                  onChange={(e) => editProperty(e)}
                >
                  {
                    options?.map((op: any) => {
                      return (
                        <option key={op}>
                          {
                            op
                          }
                        </option>
                      )
                    })
                  }
                </select>
              )
            } else {
              return (

                <input
                  key={property?.[name]}
                  type='text'
                  id={name}
                  disabled={disabled}
                  className='bg-inputs w-min text-center border-none pl-5'
                  placeholder={name}
                  defaultValue={property?.[name]}
                  // ref={inputRef}
                  onChange={(e) => {
                    // setItem(property)
                    editProperty(e)
                  }}
                />
              )
            }
          })
        }
      </div>
    </div>
  )
}