import { useIDL } from '@/context/IDL'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import { isProperty } from './verifyType'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Tab: FC<any> = ({ objConfig, elements, property, instruction, editingInstruction }) => {
  const checkbox = useRef<any>()
  const [checked, setChecked] = useState(false)
  const [newProperty, setNewProperty] = useState<any>({})
  const [indeterminate, setIndeterminate] = useState<any>(false)
  const [selectedProperty, setSelectedProperties] = useState<any>([])
  const [propertySelectedEdit, setPropertySelectedEdit] = useState<number>()
  const [propertyEdit, setPropertyEdit] = useState<any>({})
  const { IDL, setIDL } = useIDL()

  console.log(IDL)

  useLayoutEffect(() => {
    const isIndeterminate = selectedProperty.length > 0 && selectedProperty.length < IDL[instruction][editingInstruction][property]?.length
    setChecked(selectedProperty.length === IDL[instruction][editingInstruction][property]?.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedProperty])

  function toggleAll() {
    setSelectedProperties(checked || indeterminate ? [] : IDL[instruction][editingInstruction][property])
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }


  const addProperty = () => {
    const verifyProperty = isProperty(newProperty, property)
    if (verifyProperty) {
      setIDL({
        ...IDL,
        [instruction]: IDL[instruction].map((inst: any, index: any) => {
          if (index === editingInstruction && !inst?.[property]?.includes(newProperty)) {

            return {
              ...inst,
              [property]: [
                ...inst?.[property] || [],
                newProperty
              ]
            }

          }
          return inst
        })
      })
    }
  }

  const editProperty = () => {
    const verifyProperty = isProperty(propertyEdit, property)
    if (verifyProperty) {
      const newProperty ={
      ...IDL,
      [instruction]: IDL[instruction].map((inst: any, index: any) => {
        if (index === editingInstruction) {
          return {
            ...inst,
            [property]: inst[property].map((prop: any, index: number) => {
              if (index === propertySelectedEdit) {
                return propertyEdit
              } else {
                return prop
              }
            })
          }
        }
        return inst
      })
    }
      setIDL(newProperty)
    }
    setPropertySelectedEdit(undefined)
  }


  return (
    <div className="flex flex-col gap-4 w-full overflow-x-auto h-full  overflow-y-auto">
      <div className="inline-block w-full align-middle">
        <div className="relative">
          {
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
          }
          <table className="w-full max-w-full">
            <thead>
              <tr className='py-2'>
                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </th>
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
                <td className="relative px-5">
                </td>
                {
                  objConfig.map(({ name, options }: any) => {
                    if (options) {
                      return (
                        <td key={name} className='w-min'>
                          <select
                            className='bg-transparent'
                            id={name}
                            defaultValue={0}
                            onChange={(e) => {
                              setNewProperty({
                                ...newProperty,
                                [e.target.id]: e.target.value
                              })
                            }}
                          >
                            <option
                              value={0}
                              disabled
                            >
                              Select {name}
                            </option>
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
                            className='bg-transparent border-none'
                            onChange={(e) => {
                              setNewProperty({
                                ...newProperty,
                                [e.target.id]: e.target.value
                              })
                            }}
                          />
                        </td>
                      )
                    }
                  })
                }
                <td className="whitespace-nowrap w-24 text-center text-sm font-medium">
                  <button
                    onClick={addProperty}
                    className="text-indigo-600 hover:text-indigo-900 p-2"
                  >
                    Add Property
                  </button>
                </td>
              </tr>
              {
                IDL?.[instruction]?.[editingInstruction]?.[property]?.map((property: any, index: number) => {
                  return propertySelectedEdit === index ?
                    <tr key={property.name} className='py-2'>
                      <td className="relative px-5">
                      </td>
                      {
                        objConfig.map(({ name, options }: any) => {
                          if (options) {
                            return (
                              <td key={name} className='w-min'>
                                <select
                                  className='bg-transparent'
                                  id={name}
                                  defaultValue={property[name]}
                                  onChange={(e) => {
                                    setPropertyEdit({
                                      ...propertyEdit,
                                      [e.target.id]: e.target.value
                                    })
                                  }}
                                >
                                  <option
                                    value={0}
                                    disabled
                                  >
                                    Select {name}
                                  </option>
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
                                  defaultValue={property[name]}
                                  className='bg-transparent border-none'
                                  onChange={(e) => {
                                    setPropertyEdit({
                                      ...propertyEdit,
                                      [e.target.id]: e.target.value
                                    })
                                  }}
                                />
                              </td>
                            )
                          }
                        })
                      }
                      <td className="whitespace-nowrap w-24 text-center text-sm font-medium">
                        <button
                          onClick={editProperty}
                          className="text-indigo-600 hover:text-indigo-900 p-2"
                        >
                          Confirm Edit
                        </button>
                      </td>
                    </tr>
                    :
                    <tr key={property.name} className={`${selectedProperty.includes(property) ? 'bg-gray-50' : undefined} `}>
                      <td className="relative px-7 sm:w-12 sm:px-6">
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
                      </td>
                      {
                        objConfig.map(({name}: any) => {
                          return (
                            <td
                              key={name}
                              className={classNames(
                                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                selectedProperty.includes(property) ? 'text-indigo-600' : ''
                              )}
                            >
                              {
                                typeof property[name] === "object" ?
                                JSON.stringify(property[name])
                                :
                                property[name]
                              }
                            </td>

                          )
                        })
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-3">
                        <button
                          onClick={() => {
                            setPropertySelectedEdit(index)
                            setPropertyEdit(property)
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