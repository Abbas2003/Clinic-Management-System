"use server";

import { revalidatePath } from "next/cache";


export async function addAppointment(data){
    
    let add = await fetch(`${process.env.BASE_URL}api/appointment`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    add = add.json();
    
    return add;
}


export async function getAppointment(role, id, status = "pending"){
    let url;
    console.log("role->", role, id, status);
    
    if(role === "user"){
        url = `${process.env.BASE_URL}api/appointment?user=${id}&status=${status}`;
    } else {
        url = `${process.env.BASE_URL}api/appointment?doctor=${id}&status=${status}`;
    }
    let appointments = await fetch(url, {
        cache: "no-cache",
    });
    appointments = appointments.json();
    
    return appointments;
}

export async function updateAppointment(id, status){
    
    let update = await fetch(`${process.env.BASE_URL}api/appointment`, {
        method: "PUT",
        body: JSON.stringify({id, status}),
    });

    revalidatePath("/appointments");
}
