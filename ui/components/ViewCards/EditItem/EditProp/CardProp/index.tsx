import { FC, useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";
import PopUp from "@/components/PopUp";

export const CardsProp: FC<any> = ({ prop, property, nameInstruction, indexItem, indexProperty, objConfig, nameConfig }) => {
  const { IDL, setIDL } = useIDL()
  const timeOutediting = useRef<NodeJS.Timeout>()
  const [confirmation, setConfirmation] = useState(false)

  const cancelDelete = () => {
    setConfirmation(false)
  }

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
    return setIDL(del)
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
    <>
      <div
        className="relative flex p-5 border w-32 min-w-min h-full rounded-lg border-border justify-evenly text-yellow-custom font-thin hover:bg-backg hover:text-green-custom hover:border-green-custom"
        onClick={(e) => { }}
      >
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation()
            setConfirmation(true)
          }}
          className="absolute z-20 text-border bottom-2 right-2 w-4 h-4 hover:text-red cursor-pointer"
        />
        <div key={prop?.name} className='flex flex-col w-max items-start left-2'>
          {
            objConfig.map(({ disabled, name, options }: any) => {
              if (options === "boolean") {
                return (
                  <div key={name} className="flex gap-2 text-green-custom items-center pl-4 pt-2">
                    <label htmlFor={name} >{name}</label>
                    <input
                      defaultChecked={property[name]}
                      id={name}
                      type='checkbox'
                      className='bg-inputs rounded-md cursor-pointer'
                      onChange={(e) => editProperty(e)}
                    />
                  </div>
                )
              } else if (options?.length) {
                return (
                  <select
                    key={name}
                    className='bg-backg rounded-md mt-2 border-none cursor-pointer hover:bg-inputs ring-1'
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
                    className={`bg-backg w-min text-left text-red rounded-md border-none font-bold ring-1 hover:bg-inputs`}
                    placeholder={name}
                    defaultValue={property?.[name]}
                    onChange={(e) => {
                      editProperty(e)
                    }}
                  />
                )
              }
            })
          }
        </div>
      </div>
      {
        confirmation &&
        <PopUp
          closePopUp={cancelDelete}
          alert={{
            text:"delete?",
            cancel: cancelDelete,
            confirm: deleteItem
          }}
        />
      }
    </>
  )
}