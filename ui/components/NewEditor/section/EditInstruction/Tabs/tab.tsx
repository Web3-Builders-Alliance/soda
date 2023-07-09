import { useIDL } from '@/context/IDL'
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { isProperty } from './verifyType'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Tab: FC<any> = ({ addProperty, editProperty, objConfig, elements }) => {
  const [newProperty, setNewProperty] = useState<any>({})
  const [selectedProperty, setSelectedProperties] = useState<any>([])
  const [propertySelectedEdit, setPropertySelectedEdit] = useState<number>()
  const [propertyEditing, setPropertyEditing] = useState<any>({})

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

  const handlerEditProperty = (e: any) => {
    setPropertyEditing({
      ...propertyEditing,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-auto h-full  overflow-y-auto">
      <div className="inline-block w-full align-middle">
        <div className="relative">
          <table className="w-full max-w-full">
            <thead>
              <tr className='py-2'>
                {
                  objConfig.map(({ name }: { name: string }) => {
                    return (
                      <th
                        key={name}
                        scope="col"
                        className="w-min text-chok text-left text-sm font-semibold "
                      >
                        {name}
                      </th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody className="text-chok divide-y divide-border bg-backg">
              <tr className='py-2'>
                {
                  objConfig.map(({ disabled, name, options }: any) => {
                    if (options === "boolean") {
                      return (
                        <td key={name} className='w-min px-5'>
                          <input
                            className='bg-inputs rounded-md'
                            id={name}
                            type="checkbox"
                            onChange={handlerNewProperty}
                          />
                        </td>
                      )
                    } else if (options?.length) {
                      return (
                        <td key={name} className='w-min pl-5'>
                          <select
                            className='bg-inputs rounded-md'
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
                        </td>
                      )

                    } else {
                      return (
                        <td
                          key={name}
                          className='w-min'
                        >
                          <input
                            type='text'
                            id={name}
                            disabled={disabled}
                            className='bg-inputs rounded-md pl-5'
                            onChange={handlerNewProperty}
                          />
                        </td>
                      )
                    }
                  })
                }
                <td className="whitespace-nowrap w-24 text-center text-sm font-medium">
                  <button
                    onClick={() => addProperty(newProperty)}
                    className="text-chok hover:text-green p-2"
                  >
                    Add Property
                  </button>
                </td>
              </tr>
              {
                elements?.map((property: any, index: number) => {
                  return propertySelectedEdit === index ?
                    <tr key={property.name} className='py-2'>
                      {
                        objConfig.map(({ disabled, name, options }: any) => {
                          if (options === "boolean") {
                            return (
                              <td key={name} className='w-min px-5'>
                                <input
                                  id={name}
                                  type='checkbox'
                                  onChange={handlerEditProperty}
                                />
                              </td>
                            )
                          } else if (options?.length) {
                            return (
                              <td key={name} className='w-min'>
                                <select
                                  className='bg-inputs rounded-md'
                                  id={name}
                                  defaultValue={property[name]}
                                  disabled={disabled}
                                  onChange={handlerEditProperty}
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
                              </td>
                            )
                          } else  {
                            return (
                              <td
                                key={name}
                                className='w-min'
                              >
                                <input
                                  type='text'
                                  id={name}
                                  disabled={disabled}
                                  className='bg-inputs border-none pl-5'

                                  defaultValue={property?.[name]}

                                  onChange={handlerEditProperty}
                                />
                              </td>
                            )
                          }
                        })
                      }
                      <td className="whitespace-nowrap w-24 text-center text-sm font-medium">
                        <button
                          onClick={() => {
                            editProperty(propertyEditing, index)
                            setPropertySelectedEdit(undefined)
                          }}
                          className="text-chok hover:text-green p-2"
                        >
                          Confirm Edit
                        </button>
                      </td>
                    </tr>
                    :
                    <tr key={property.name} className={`${selectedProperty.includes(property) ? 'bg-gray-50' : undefined} `}>
                      {
                        objConfig.map(({ name }: any) => {
                          const value = () => {
                            if(typeof property?.[name] === "object"){
                              return JSON.stringify(property?.[name])
                            } else if (typeof property?.[name] === "boolean"){

                              return  property?.[name].toString()
                            }
                              
                            return property?.[name]
                          }
                          return (
                            <td
                              key={name}
                              className={classNames(
                                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                selectedProperty.includes(property) ? 'text-chok' : ''
                              )}
                            >
                              {
                                value()
                              }
                            </td>

                          )
                        })
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-3">
                        <button
                          onClick={() => {
                            setPropertySelectedEdit(index)
                            setPropertyEditing(property)
                          }}
                          className="text-chok hover:text-green"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Tab