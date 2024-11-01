import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { doctors, specializations } from '@/lib/data'
import DoctorCard from '@/app/components/doctorCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ClockIcon, HomeIcon, PlusIcon } from '@radix-ui/react-icons'



const DoctorsSection = ({ isHome }) => {

    const fewDoctors = isHome ? doctors.slice(0, 6) : doctors

    return (
        <div className='container mx-auto mt-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>Our Doctors</h1>

                {isHome ? (
                    <Link href={"/doctors"}>
                        <Button>See All</Button>
                    </Link>
                ) : (
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Doctors" />
                            </SelectTrigger>
                            <SelectContent>
                                {specializations.map((category) => (
                                    <SelectItem key={category.id} value={category}>
                                        {category.specialization}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>


            <div className="grid my-3 grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-3">
                {fewDoctors.map((doctor) => (
                    <Card key={doctor.id}>
                        <CardHeader className={"flex flex-row"}>
                            <Avatar className="self-center h-10 w-10">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>DAS</AvatarFallback>
                            </Avatar>
                            <div className="pl-3">
                                <CardTitle>{doctor.name}</CardTitle>
                                <CardDescription>{doctor.specialization}</CardDescription>
                            </div>
                        </CardHeader>

                        {!isHome && (
                            <CardContent>
                                <div className="flex justify-between my-2">
                                    <div className="flex gap-2 items-center">
                                        <HomeIcon />
                                        <h1 className="font-semibold">Gender</h1>
                                    </div>
                                    <h1>{doctor.gender}</h1>
                                </div>
                                <div className="flex justify-between my-2">
                                    <div className="flex gap-2 items-center">
                                        <PlusIcon />
                                        <h1 className="font-semibold">Hospital</h1>
                                    </div>
                                    <h1>{doctor.hospital}</h1>
                                </div>
                                <div className="flex justify-between my-2">
                                    <div className="flex gap-2 items-center">
                                        <ClockIcon />
                                        <h1 className="font-semibold">Appointment Time</h1>
                                    </div>
                                    <h1>{doctor.appointmentTime}</h1>
                                </div>
                            </CardContent>
                        )}

                        <CardFooter>
                            <Link href={`/doctors/${doctor.id}`}>
                                <Button>See Detail</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default DoctorsSection