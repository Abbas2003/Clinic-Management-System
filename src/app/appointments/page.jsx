import { AppointmentTable } from "@/components/AppointmentTable/dataTable";
import { columns } from "@/components/AppointmentTable/columns";
import { appointments } from "@/lib/data";
import { auth } from "../../../auth";
import { getAppointment } from "@/actions/appointments/appointments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DoctorAppointmentCard from "@/components/DocorAppointmentCard/DoctorAppointmentCard";
import PatientAppointmentCard from "@/components/PatitentAppointmentCard/PateintAppointmentCard";
dayjs.extend(relativeTime);


export default async function Appointments() {

    const session = await auth();
    const { appointments, status } = await getAppointment(
        session.user.role == "doctor" ? "doctor" : "user",
        session.user._id,
        // status
      );
    console.log("response->", response.appointments);
    const isDoctor = session.user.role == "doctor";

    const formatAppointments = (appointments) => {
        return appointments.map(appointment => ({
            _id: appointment._id,
            doctor: { name: appointment.user.firstName + ' ' + appointment.user.lastName },
            user: { name: appointment.request.user.firstName + ' ' + appointment.request.user.lastName || "N/A" },
            appointmentDate: new Date(appointment.request.appointmentTime).toLocaleDateString(),
            appointmentTime: new Date(appointment.request.appointmentTime).toLocaleTimeString(),
            status: appointment.status,
        }))
    }

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mt-10">
                {isDoctor ? "Patients Appointments" : "Your Doctors Appointments"}
            </h1>
            <div className="my-10 grid grid-cols-3 gap-4">
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
            {/* <div className="my-10">
                {
                    <AppointmentTable columns={columns} data={formatAppointments(response.appointments)} />
                }
            </div> */}
        </div>
    )
}