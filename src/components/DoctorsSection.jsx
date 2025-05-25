"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { specializations } from "@/lib/data";
import DoctorCard from "./DoctorCard";

const DoctorsSection = ({ isHome, requests }) => {

    const [selectedSpecialization, setSelectedSpecialization] = useState("all");

    const filteredDoctors = selectedSpecialization === "all"
        ? requests
        : requests.filter(
            (doctor) =>
                doctor.specialization?.toLowerCase().trim() === selectedSpecialization.toLowerCase().trim()
        );


    return (
        <div className='container mx-auto mt-5 px-2 md:px-0'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl md:text-5xl font-bold'>Our Doctors</h1>

                {isHome ? (
                    <Link href={"/doctors"}>
                        <Button>See All</Button>
                    </Link>
                ) : (
                    <div>
                        <Select
                            value={selectedSpecialization}
                            onValueChange={setSelectedSpecialization}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Doctors" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {specializations.map((category) => (
                                    <SelectItem key={category.id} value={category.specialization}>
                                        {category.specialization}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            <div className="grid my-3 grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-3 mx-auto">
                {isHome ? requests?.map((doctor) => (
                    <DoctorCard key={doctor?._id} request={doctor} isAdmin={false} />
                )) : filteredDoctors?.map((filteredDoctor) => (
                    <DoctorCard key={filteredDoctor?._id} request={filteredDoctor} isAdmin={false} />
                ))}
            </div>

            <Link
                href="/"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800 transition-colors font-medium py-10"
            >
                Go back to home
            </Link>
        </div>
    );
};

export default DoctorsSection;