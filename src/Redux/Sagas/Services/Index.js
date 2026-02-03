
export async function CreateRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }

}

//create record with images
export async function CreateMultiPartRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
            method: "POST",
            headers: {
            },
            body: payload
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }

}
export async function UpdateRecord(collection, payload) {
    try{
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
    }
    catch (error) {
        console.log(error)
    }

}
//update record with images
export async function UpdateMultiPartRecord(collection, payload) {
   try{
     var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return await response.json()
   }
    catch (error) {
        console.log(error)
    }

}
export async function GetRecord(collection) {
    try{
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
    }
    catch (error) {
        console.log(error)
    }


}
export async function DeleteRecord(collection, payload) {
    try{
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
    }
    catch(error){
        console.log(error)
    }

}