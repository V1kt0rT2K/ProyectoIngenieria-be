export interface UserProps {
    idUser?: number;
    username?: string;
    email: string;
    job: string;
    password: string;
    idPerson: number;
    idRole: number;
};

export interface PersonProps {
    firstName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    identityNumber: string;
};