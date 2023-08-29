import { useIDL } from "@/context/IDL";
import { CheckIcon } from '@heroicons/react/24/solid'
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
  }, [IDL])

  const handlerNewProperty = (e: any) => {
    setNewProperty({
      ...newProperty,
      [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    })
  }

  return (
    <div
      className="flex flex-col justify-evenly p-2 h-full rounded-md items-start text-white font-medium ring-1 hover:ring-2 ring-border"
    >
      {
        objConfig.map(({ disabled, name, options }: any) => {
          if (options === "boolean") {
            return (
              <div key={name} className=' flex items-center gap-2 pl-4 pt-1'>
                <label htmlFor={name}>{name}</label>
                <input
                  checked={newProperty[name]}
                  className='bg-inputs rounded-md cursor-pointer '
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
                className='mt-2 bg-inputs rounded-md'
                id={name}
                disabled={disabled}
                value={newProperty[name]}
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
                value={newProperty[name]}
                key={name}
                type='text'
                id={name}
                placeholder={name}
                disabled={disabled}
                className={`text-center w-min bg-inputs rounded-md mt-2 ${disabled ? "bg-transparent border-none" : ""}`}
                onChange={handlerNewProperty}
              />
            )
          }
        })
      }
      <CheckIcon
        className="w-6 text-green-custom hover:bg-green-custom hover:text-inputs rounded-md self-end"
        onClick={() => {
          addProperty(newProperty)
        }}
      />
    </div>
  )
}

