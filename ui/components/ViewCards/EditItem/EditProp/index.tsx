import { FC } from "react"
import { CardsProp } from "./CardProp"
import { NewProp } from "./NewProp"


export const EditProp: FC<any> = ({ nameConfig, editProperty, addProperty, elements, objConfig, indexItem, instruction }) => {

    return (
        <div className={` flex w-full h-full mini-scrollbar p-2 gap-2 transition-all duration-500 ease-in-out overflow-x-auto overflow-y-hidden`}>
            <NewProp
                nameConfig={nameConfig}
                addProperty={addProperty}
                objConfig={objConfig}
            />
            {
                elements?.map((property: any, index: number) => {
                    return (
                        <CardsProp
                            objConfig={objConfig}
                            nameConfig={nameConfig}
                            editProperty={editProperty}
                            key={property?.name}
                            property={property}
                            nameInstruction={instruction}
                            indexProperty={index}
                            indexItem={indexItem}
                        />
                    )
                })
            }

        </div>

    )
}

