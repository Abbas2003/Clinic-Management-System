// 'use client'
import { doctors, specializations } from '@/lib/data'
import React from 'react'
import DoctorCard from '../components/doctorCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useParams } from 'next/navigation'

const Doctors = ({ params }) => {

    // const params = useParams()
    console.log("params ->", params);
    

    return (
        <section className='container mx-auto'>
            <div className='flex items-center justify-between my-10'>
                <h1 className='text-3xl font-bold'>All Doctors</h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        {specializations.map((cateogry) => <SelectItem key={cateogry.id} value={cateogry.specialization}>{cateogry.specialization}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {doctors.map((doctor, index) => (
                    <DoctorCard
                        key={index}
                        name={doctor.name}
                        image={doctor.image}
                        specialization={doctor.specialization}
                        timing={doctor.timing}
                    />
                ))}
            </div>
        </section>
    )
}

export default Doctors