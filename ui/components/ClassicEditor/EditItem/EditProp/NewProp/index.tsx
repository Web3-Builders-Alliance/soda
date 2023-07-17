import { useIDL } from "@/context/IDL";
import { FC, useEffect, useState } from "react";

export const NewProp: FC<any> = ({ nameConfig, addProperty, objConfig }) => {
  const { IDL, setIDL } = useIDL()
  const [newProperty, setNewProperty] = useState<any>({})

  useEffect(() => {
    const defaultProperty = objConfig.reduce((acc: any, prop: any) => {
      return {
        ...acc,
        [prop.name]: prop?.options === "boolean" ? false : prop?.options?.[0] || ""
      }
    }, {})
    setNewProperty(defaultProperty)
  }, [])

  const handlerNewProperty = (e: any) => {
    setNewProperty({
      ...newProperty,
      [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    })
  }

  return (

    <div
      className="flex flex-col justify-between p-4 h-full rounded-md bg-inputs items-center text-white font-bold hover:ring-2 ring-border cursor-pointer"
    >
      {
        objConfig.map(({ disabled, name, options }: any) => {
          if (options === "boolean") {
            return (
              <div key={name} className=' flex items-center gap-4 px-5'>
                <label htmlFor={name}>{name}</label>
                <input
                  className='bg-inputs rounded-md'
                  id={name}
                  type="checkbox"
                  onChange={handlerNewProperty}
                />
              </div>
            )
          } else if (options?.length) {
            return (
              <select
                key={name}
                className=' bg-inputs rounded-md'
                id={name}
                disabled={disabled}
                defaultValue={options[0]}
                onChange={handlerNewProperty}
              >
                {
                  options.map((op: any) => {
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
                key={name}
                type='text'
                id={name}
                placeholder={name}
                disabled={disabled}
                className='text-center w-min bg-inputs rounded-md pl-5'
                onChange={handlerNewProperty}
              />
            )
          }
        })
      }
      <button
        className="p-2 text-green"
        onClick={() => {
          addProperty(newProperty)
        }}
      >
        Save
      </button>
    </div>
  )
}

