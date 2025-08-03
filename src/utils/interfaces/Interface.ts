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

export interface UpdateRoleProp {
    idUser : number,
    idRole : number,
    description? : string
}

export interface SalesCheckProp {   
    identification : string | null,
    consumption: {
        idProduct : number,
        quantity : number
    }[]
}

export interface IncomingBatchProp {
    birthDate : Date,
    quantity : number,

}

export interface ProviderProps {
    name: string;
    rtn: string;
    contact: string;
    address: string;
};
export interface SupplyPurcharseProp{
    idProvider : number,
    detail : {
        idSupply : number,
        quantity : number
    }[]
}

export interface IncomingSupplyPurcharseProp{
    idSupplyPurcharse: number,
    detail : {
        idSupply: number,
        quantity : number,
        expirationDate : Date
    }[]
}
export interface IncomingProductBatchProp{
    idProduct: number;
    idSwineBatch: number;
    entryQuantity: number;
    expirationDate: Date;
    generationDate: Date;
    
}[]
export interface IncomingProductProp{ 
    productName: string;
    productDescription: string;
    price: number;
    orderPoint: number;
}[]

export interface ClientProps {
		identification: string;
		fullName: string;
		contact: string;
		address: string;
		idClientType: number,
}
export interface IncomingSwineSupplyProp{
    idSwineBatch: number;
    idSupply: number;
    quantity: number;
    generationDate: Date;
    idUser: number;
            
}
