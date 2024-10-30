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



const Doctors = () => {

    const fewDoctors = doctors.slice(0,6)

    return (
        <div className='container mx-auto'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>Our Doctors</h1>
                <div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {specializations.map((cateogry) => <SelectItem key={cateogry.id} value={cateogry.specialization}>{cateogry.specialization}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {fewDoctors.map((doctor, index) => (
                    <DoctorCard
                        key={index}
                        name={doctor.name}
                        image={doctor.image}
                        specialization={doctor.specialization}
                        timing={doctor.timing}
                    />
                ))}
            </div>
        </div>
    )
}

export default Doctors