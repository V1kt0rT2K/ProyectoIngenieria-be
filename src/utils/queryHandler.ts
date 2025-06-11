import { Request } from "express"

export function formatRequest(request: Request | {[key : string] : any}) : { json : string} {
    let params : {[key:string] : any} = {}

    if('body' in request){
        params = {
            ...request.body,
            ...request.params
        }
    }else{
        params = {
            ...request.params
        }
    }

    return {
        json : JSON.stringify(params)
    }
}

export function badRequestMessage(){
    return {
        data: [],
        meta: [{status: 500, message: "Error Interno"}]
    }
}