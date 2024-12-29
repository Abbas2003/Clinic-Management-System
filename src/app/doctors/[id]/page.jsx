import {
    HomeIcon,
    ClockIcon,
    PlusIcon,
    UserIcon as GenderMaleIcon,
    GraduationCapIcon,
    StethoscopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "lucide-react";
import React from 'react';
import { auth } from '../../../../auth';
import DatePicker from '@/components/DatePicker';
import { getSingleRequest } from '@/actions/requests/requests';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
            </div>
        </div>
    );
}

const DoctorDetails = async ({ params }) => {
    const session = await auth();
    const { requests } = await getSingleRequest(params.id);
    // console.log("Requested Doc->", requests);

    const doctorInfo = requests?.user || {};
    const {
        firstName,
        lastName,
        imgUrl,
        specialization,
        bio,
        hospital,
        fees,
        gender,
        appointmentTime,
        address,
        degree,
        experience,
        number
    } = {
        ...doctorInfo,
        ...requests,
    };

    return (
        <section>
            <div className="container py-10 mx-auto px-1">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader className="flex flex-col sm:flex-row gap-4">
                        <Avatar className="md:w-24 md:h-24 w-[4rem] h-[4rem] mx-auto md:mx-0">
                            <AvatarImage
                                src={imgUrl}
                                alt={`${firstName} ${lastName}`}
                            />
                            <AvatarFallback>
                                {firstName[0]}
                                {lastName?.[0] || ""}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left">
                            <CardTitle className="text-3xl font-bold">{`Dr. ${firstName
                                } ${lastName || ""}`}</CardTitle>
                            <p className="text-muted-foreground">
                                {specialization} Specialist
                            </p>

                            <span className="flex items-center md:justify-start justify-center">
                                {/* Render stars */}
                                {Array(4)
                                    .fill(null)
                                    .map((_, index) => (
                                        <svg
                                            key={index}
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-indigo-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="grid ">
                        <div className='grid sm:grid-cols-2 gap-4'>
                            {/* Doctor Details */}
                            <InfoItem
                                icon={<GraduationCapIcon />}
                                label="Degree"
                                value={degree}
                            />
                            <InfoItem
                                icon={<StethoscopeIcon />}
                                label="Experience"
                                value={experience}
                            />
                            <InfoItem
                                icon={<GenderMaleIcon />}
                                label="Gender"
                                value={gender}
                            />
                            <InfoItem
                                icon={<PlusIcon />}
                                label="Hospital"
                                value={hospital}
                            />
                            <InfoItem
                                icon={<ClockIcon />}
                                label="Appointment Time"
                                value={appointmentTime}
                            />
                            <InfoItem
                                icon={<HomeIcon />}
                                label="Fees"
                                value={`$${fees}`}
                            />
                            <InfoItem
                                icon={<PhoneIcon />}
                                label="Contact"
                                value={number}
                            />
                            <InfoItem
                                icon={<MapPinIcon />}
                                label="Address"
                                value={address}
                            />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Bio</h3>
                            <p className="text-muted-foreground">{bio}</p>
                        </div>
                        <div className="space-y-4">
                            <DatePicker session={session} request={params.id} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default DoctorDetails;


