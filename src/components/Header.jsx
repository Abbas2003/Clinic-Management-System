import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from '@/components/dark-theme-toggler'



const Header = () => {
    return (
        <section className='container mx-auto flex items-center justify-between p-4 border-b'>
            <div className='text-2xl font-serif'>Logo</div>

            <div className='flex items-center gap-3'>
                <div>
                    <Menubar className="rounded-full border border-gray-300 p-1 flex items-center justify-center">
                        <MenubarMenu>
                            <MenubarTrigger className="rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                <ModeToggle />
            </div>
        </section>
    )
}

export default Header