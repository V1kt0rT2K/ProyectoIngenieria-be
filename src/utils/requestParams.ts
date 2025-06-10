import { Request } from 'express';
export class requestParams {
static fromRequest(input: Request | { [key: string]: any }): { json: string} {
    let params: { [key: string]: any } = {};

    if ('body' in input && 'params' in input) {
        params = {
            ...input.body,
            ...input.params
        };
    } else {
        
        params = { ...input };
    }

    return {
        json: JSON.stringify(params)
    };
}
}

// export class requestParams {
// static fromRequest(input: Request | { [key: string]: any }): { json: string, user: string } {
//     let params: { [key: string]: any } = {};

//     if ('body' in input && 'params' in input) {
//         params = {
//             ...input.body,
//             ...input.params
//         };
//     } else {
        
//         params = { ...input };
//     }

//     return {
//         json: JSON.stringify(params),
//         user: ""
//     };
// }
// }

