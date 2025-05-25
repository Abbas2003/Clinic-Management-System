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
import { ModeToggle } from '@/components/dark-theme-toggler'
import { auth, signOut } from '../../auth'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'



const Header = async () => {
    const session = await auth()
    console.log(session?.user);
    

    return (
        <section className='container mx-auto flex items-center justify-between p-4 border-b'>
            <Link href="/">
                <Image src='/medical-logo.png' alt='Logo' height={60} width={60} />
            </Link>
            <div className='flex items-center gap-3'>
                <div>
                    {session ? (
                        <Menubar className="rounded-full border border-gray-300 p-1 flex items-center justify-center">
                            <MenubarMenu>
                                <MenubarTrigger className="border-none bg-transparent p-0 m-0">
                                    <Image
                                        src={session?.user?.image}
                                        alt={session?.user?.name}
                                        height={40}
                                        width={40}
                                        className="rounded-full"
                                    />
                                </MenubarTrigger>
                                <MenubarContent>
                                    <Link href={'/profile'}>
                                        <MenubarItem>
                                            Profile <MenubarShortcut>⌘P</MenubarShortcut>
                                        </MenubarItem>
                                    </Link>

                                    <Link href={'/appointments'}>
                                        <MenubarItem>
                                            My Appointments <MenubarShortcut>⌘A</MenubarShortcut>
                                        </MenubarItem>
                                    </Link>
                                    <MenubarSeparator />
                                    <form
                                        action={async () => {
                                            "use server";
                                            await signOut("google");
                                        }}
                                    >
                                        <Button variant={"outline"}>Logout</Button>
                                    </form>
                                </MenubarContent>

                            </MenubarMenu>
                        </Menubar>
                    ) : (
                        <Link href={"/signin"}>
                            <Button variant={"outline"}>Login</Button>
                        </Link>
                    )}
                </div>
                <ModeToggle />
            </div>
        </section>
    )
}

export default Header