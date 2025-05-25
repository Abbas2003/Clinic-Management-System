import { auth } from "../../../auth";
import { getAppointment } from "@/actions/appointments/appointments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DoctorAppointmentCard from "@/components/DocorAppointmentCard/DoctorAppointmentCard";
import PatientAppointmentCard from "@/components/PatitentAppointmentCard/PateintAppointmentCard";
import AppointmentFilterTabs from "@/components/Tabs/Tabs";
dayjs.extend(relativeTime);


export default async function Appointments({ searchParams }) {

    const session = await auth();
    console.log("session ->", session?.user);

    const { status } = searchParams;

    const { appointments, stats } = await getAppointment(
        session.user.role == "doctor" ? "doctor" : "user",
        session.user._id,
        status
    );
    const isDoctor = session.user.role == "doctor";
    console.log("appointments ->", appointments);
    console.log("stats ->", stats);


    return (
        <div className="container mx-auto p-2 md:p-0">
            <h1 className="font-bold text-2xl md:text-5xl mt-10">
                {isDoctor ? "Patients Appointments" : "Your Doctors Appointments"}
            </h1>

            <AppointmentFilterTabs status={status} />

            <div>
                <h2 className="text-xl font-bold mb-4">Appointment Stats</h2>
                <div className="flex md:gap-4 gap-1">
                    <div className="shadow flex-grow p-1 md:p-3 rounded border text-center">
                        <h1 className="font font-bold text-sm md:text-2xl">Pending : {stats.pending}</h1>
                    </div>
                    <div className="shadow flex-grow p-1 md:p-3 rounded border text-center">
                        <h1 className="font font-bold text-sm md:text-2xl">
                            Accepted : {stats.accepted}
                        </h1>
                    </div>
                    <div className="shadow flex-grow p-1 md:p-3 rounded border text-center">
                        <h1 className="font font-bold text-sm md:text-2xl">
                            Cancelled : {stats.cancelled}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                {appointments?.map((appointment) =>
                    isDoctor ? (
                        <DoctorAppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                        />
                    ) : (
                        <PatientAppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                        />
                    )
                )}
            </div>
        </div>
    )
}