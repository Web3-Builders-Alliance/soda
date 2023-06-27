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

  // const checkbox = useRef<any>()
  // const [checked, setChecked] = useState(false)
  // const [indeterminate, setIndeterminate] = useState<any>(false)

  // useLayoutEffect(() => {
  //   const isIndeterminate = selectedProperty.length > 0 && selectedProperty.length < elements.length
  //   setChecked(selectedProperty.length === elements?.length)
  //   setIndeterminate(isIndeterminate)
  //   checkbox.current.indeterminate = isIndeterminate
  // }, [selectedProperty])

  // function toggleAll() {
  //   setSelectedProperties(checked || indeterminate ? [] : elements)
  //   setChecked(!checked && !indeterminate)
  //   setIndeterminate(false)
  // }

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-auto h-full  overflow-y-auto">
      <div className="inline-block w-full align-middle">
        <div className="relative">
          {/* {
            selectedProperty.length > 0 && (
              <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                <button
                  type="button"
                  className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  Delete all
                </button>
              </div>
            )
          } */}
          <table className="w-full max-w-full">
            <thead>
              <tr className='py-2'>
                {/* <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </th> */}
                {
                  objConfig.map(({ name }: { name: string }) => {
                    return (
                      <th
                        key={name}
                        scope="col"
                        className="w-min text-white text-left text-sm font-semibold"
                      >
                        {name}
                      </th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-gray-200 bg-[#102042] ">
              <tr className='py-2'>
                {/* <td className="relative px-5">
                </td> */}
                {
                  objConfig.map(({ disabled, name, options }: any) => {
                    if (options === "boolean") {
                      return (
                        <td key={name} className='w-min px-5'>
                          <input
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
                            className='bg-transparent'
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
                            className='bg-transparent border-none pl-5'
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
                    className="text-indigo-600 hover:text-indigo-900 p-2"
                  >
                    Add Property
                  </button>
                </td>
              </tr>
              {
                elements?.map((property: any, index: number) => {
                  return propertySelectedEdit === index ?
                    <tr key={property.name} className='py-2'>
                      {/* <td className="relative px-5">
                      </td> */}
                      {
                        objConfig.map(({ disabled, name, options }: any) => {
                          if (options?.length) {
                            return (
                              <td key={name} className='w-min'>
                                <select
                                  className='bg-transparent'
                                  id={name}
                                  defaultValue={property[name]}
                                  disabled={disabled}
                                  onChange={handlerEditProperty}
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
                          } else if (options === "boolean") {
                            return (
                              <td key={name} className='w-min px-5'>
                                <input
                                  id={name}
                                  type='checkbox'
                                  onChange={handlerEditProperty}
                                />
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
                                  defaultValue={property[name]}
                                  className='bg-transparent border-none pl-5'
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
                          className="text-indigo-600 hover:text-indigo-900 p-2"
                        >
                          Confirm Edit
                        </button>
                      </td>
                    </tr>
                    :
                    <tr key={property.name} className={`${selectedProperty.includes(property) ? 'bg-gray-50' : undefined} `}>
                      {/* <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedProperty.includes(property) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedProperty.includes(property)}
                          onChange={(e) =>
                            setSelectedProperties(
                              e.target.checked
                                ? [...selectedProperty, property]
                                : selectedProperty.filter((p: any) => p !== property)
                            )
                          }
                        />
                      </td> */}
                      {
                        objConfig.map(({ name }: any) => {
                          const value = () => {
                            if(typeof property[name] === "object"){
                              return JSON.stringify(property[name])
                            } else if (typeof property[name] === "boolean"){

                              return  property[name].toString()
                            }
                              
                            return property[name]
                          }
                          return (
                            <td
                              key={name}
                              className={classNames(
                                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                selectedProperty.includes(property) ? 'text-indigo-600' : ''
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
                          className="text-indigo-600 hover:text-indigo-900"
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