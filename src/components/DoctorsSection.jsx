import Link from "next/link"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { doctors, specializations } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ClockIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons"
import { getRequest } from "@/actions/requests/requests"
import DoctorCard from "./DoctorCard"



const DoctorsSection = async ({ isHome }) => {

    const {requests} = await getRequest();

    return (
        <div className='container mx-auto mt-5 px-2 md:px-0'>
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


            <div className="grid my-3 grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-3 mx-auto">
                {requests.map((doctor) => (
                    <DoctorCard key={doctor._id} request={doctor} isAdmin={false} />
                ))}
            </div>

        </div>
    )
}

export default DoctorsSection