export interface RegisterFormProps {
    firstName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    identityNumber: string;
    idUser: number;
    username: string;
    email: string;
    job: string;
    password: string;
    idPerson: number;
    idRole: number;
};

export interface SalesCheckProp {   
    identityNumber : string | null,
    consumption: {
        idProduct : number,
        quantity : number
    }[]
}

export interface IncomingBatchProp {
    birthDate : Date,
    quantity : number,

}