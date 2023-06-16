import { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    PencilSquareIcon,
    CodeBracketIcon,
    DocumentIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { readTextFile } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { emit, listen } from '@tauri-apps/api/event'

import Image from 'next/image'
import { useIDL } from '@/context/IDL'



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const Layout: FC<any> = ({ children, openIDL, newProject, generateIDL, handleTemplateFolder, exportData }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        {
            name: 'Open IDL file',
            href: '#',
            event: openIDL
        },
        {
            name: 'New IDL',
            href: '#',
            event: newProject
        },
        {
            name: 'Save IDL',
            href: '#',
            event: generateIDL
        },
        {
            name: 'Select a template',
            href: '#',
            event: handleTemplateFolder
        },
        {
            name: 'Create Project',
            href: '#',
            event: exportData
        },
    ]

    return (
        <>
            <div className='h-screen'>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex ">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#081635] px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            {/* <Image
                                                height={25}
                                                width={25}
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company"
                                            /> */}
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li
                                                                key={item.name}
                                                                onClick={item?.event}
                                                            >
                                                                <a
                                                                    href={item.href}
                                                                    className={'text-white hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}
                                                                >
                                                                    {/* <item.icon
                                                                        className={'text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0'}
                                                                        aria-hidden="true"
                                                                    /> */}
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                {/* <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"> */}
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    {/* <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[#13306e] bg-[#081635]  px-6">
                        <div className="flex h-16 shrink-0 items-center"> */}
                            {/* <Image
                                height={25}
                                width={25}
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            /> */}
                        {/* </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li
                                                key={item.name}
                                                onClick={item?.event}
                                            >
                                                <a
                                                    href={item.href}
                                                    className={'text-white hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}
                                                > */}
                                                    {/* <item.icon
                                                        className={'text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0'}
                                                        aria-hidden="true"
                                                    /> */}
                                                    {/* {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="#"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    > */}
                                        {/* <Image
                                            height={25}
                                            width={25}
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        /> */}
                                        {/* <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">Tom Cook</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div> */}

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#081635] px-4 py-4 shadow-sm sm:px-6">
                    <button type="button" className="-m-2.5 p-2.5 text-white" onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="py-10 h-full bg-[#081635]">
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout