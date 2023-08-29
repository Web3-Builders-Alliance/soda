import ArrowBack from "@/public/ArrowBack.png"

import Image, { StaticImageData } from "next/image";
import { FC, PropsWithChildren, useEffect, useRef } from "react";

type props = {
    title: string,
    closePopUp: () => void,
    icon?: StaticImageData,
    iconClassName?: string,
    alert?: {
        text: string,
        confirm: () => void,
        cancel: () => void
    }
}

const PopUp: FC<any> = ({ children, title, closePopUp, icon, iconClassName, alert }: PropsWithChildren<props>) => {
    const popUpRef = useRef<any>()

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                console.log("close")
                closePopUp()
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popUpRef]);

    return (
        <div className="fixed z-50 top-0 left-0  h-screen w-full backdrop-blur-[.5px] bg-white/30 ">
            <div ref={popUpRef} className=" flex flex-col absolute top-10 -translate-x-1/2 left-1/2 overflow-auto rounded-3xl bg-backg [&::-webkit-scrollbar]:hidden">
                <div className="flex h-5 bg-backg p-3 justify-between gap-2 w-full items-center">
                    <Image src={ArrowBack} alt="back all project" className="w-4 h-4 cursor-pointer" onClick={closePopUp} />

                    <div className="flex text-white gap-4 font-semibold w-full items-center overflow-hidden">
                        {title}
                    </div>
                    {
                        icon &&
                        <Image className={iconClassName} width={1} height={1} src={icon} alt="SolanaFoundation" />
                    }
                </div>
                {
                    !alert ?
                        children
                        :
                        <Alert text={alert?.text} confirm={alert?.confirm} cancel={alert?.cancel} />
                }
            </div>
        </div>
    )
}

export default PopUp

type propsAlert = {
    text: string,
    confirm: () => void,
    cancel: () => void
}

const Alert = ({ text, confirm, cancel }: propsAlert) => {

    return (
        <div className="flex flex-col p-5 items-center gap-5">
            <p className="text-white">{text}</p>
            <div className="flex gap-4">
                <button
                    onClick={cancel}
                    className="text-white bg-red-600 px-5 rounded-xl h-10"
                >
                    Cancel
                </button>
                <button
                    onClick={confirm}
                    className="text-white bg-[#387847] px-5 rounded-xl h-10"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}