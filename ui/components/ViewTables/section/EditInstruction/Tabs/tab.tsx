import { useIDL } from '@/context/IDL'
import { FC, useEffect, useState } from 'react'
import { TrashIcon, CheckIcon } from '@heroicons/react/24/solid'
import PopUp from '@/components/PopUp'


const Tab: FC<any> = ({ addProperty, objConfig, elements, editProperty, deleteItem }) => {
  const { IDL } = useIDL()
  const [newProperty, setNewProperty] = useState<any>({})
  const [stateElements, setStateElements] = useState<any>()
  const [confirmation, setConfirmation] = useState({
    status: false,
    index: 0
  })

  useEffect(() => {
    setStateElements(elements)
  }, [elements])

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
    <>
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
                              checked={newProperty[name]}
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
                              value={newProperty[name]}
                              disabled={disabled}
                              className={`bg-inputs rounded-md pl-5 ${disabled ? "bg-transparent border-none" : ""}`}
                              onChange={handlerNewProperty}
                            />
                          </td>
                        )
                      }
                    })
                  }
                  <td className="whitespace-nowrap w-24 text-center text-sm font-medium">
                    <CheckIcon
                      onClick={() => addProperty(newProperty)}
                      className="text-chok w-6 hover:text-green-custom"
                    />
                  </td>
                </tr>
                {
                  stateElements?.map((property: any, index: number) => {
                    return <tr key={property?.name} className='py-2'>
                      {
                        objConfig.map(({ disabled, name, options }: any) => {
                          if (options === "boolean") {
                            return (
                              <td key={name} className='w-min px-5'>
                                <input
                                  id={name}
                                  className='bg-inputs rounded-md'
                                  defaultChecked={property[name]}
                                  type='checkbox'
                                  onChange={(e) => editProperty(e, index)}
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
                                  onChange={(e) => editProperty(e, index)}
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
                          } else {
                            return (
                              <td
                                key={property?.[name]}
                                className='w-min'
                              >
                                <input
                                  type='text'
                                  id={name}
                                  disabled={disabled}
                                  className='bg-inputs border-none pl-5'
                                  defaultValue={property?.[name]}
                                  // value={property?.[name]}
                                  onChange={(e) => {
                                    editProperty(e, index)
                                  }}
                                />
                              </td>
                            )
                          }
                        })
                      }
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-3">
                        <TrashIcon
                          onClick={(e) => {
                            e.stopPropagation()
                            setConfirmation({
                              index,
                              status: true
                            })
                          }}
                          className="z-20 text-chokw-4 h-4 hover:text-red cursor-pointer"
                        />

                      </td>
                    </tr>

                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        confirmation.status &&
        <PopUp
          closePopUp={() => setConfirmation({
            ...confirmation,
            status: false
          })}
          alert={{
            cancel:() => setConfirmation({
              ...confirmation,
              status: false
            }),
            confirm: (e: any) => {
              deleteItem(confirmation.index)
              setConfirmation({
                ...confirmation,
                status: false
              })
            },
            text: "Are you sure you want to delete?"
          }}
        />
      }
    </>
  )
}

export default Tab