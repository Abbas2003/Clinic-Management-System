"use server";


export async function addAppointment(data){
    // console.log("data->", data);
    
    let add = await fetch(`${process.env.BASE_URL}api/appointment`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    add = add.json();
    
    return add;
}


export async function getAppointment(role, id){
    let url;
    console.log("role->", role, id);
    
    if(role === "user"){
        url = `${process.env.BASE_URL}api/appointment?user=${id}`;
    } else {
        url = `${process.env.BASE_URL}api/appointment?doctor=${id}`;
    }
    let appointments = await fetch(url, {
        cache: "no-cache",
    });
    appointments = appointments.json();
    
    return appointments;
}
