// 'use client'
import { doctors, specializations } from '@/lib/data'
import React from 'react'
import DoctorCard from '../components/doctorCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DoctorsSection from '../components/DoctorsSection'
// import { useParams } from 'next/navigation'

const Doctors = ({ params }) => {

    // const params = useParams()
    // console.log("params ->", params);
    

    return (
        <section>
            <DoctorsSection />
        </section>
    )
}

export default Doctors