interface IMeta {
    status: number;
    message: string;
}

export class queryResponse {
    data: any[];
    meta: IMeta[];

    constructor(data: any[], meta: IMeta[], hasError: boolean) {
        this.data = data;
        this.meta = meta;
    }

    static success(data: any[], message: string): queryResponse {
        const status: number = 200;
        return new queryResponse(data, [{ status, message }], false);
    }

    static error(status: number, message: string): queryResponse {
        return new queryResponse([], [{ status, message}], true);
    }

    static multipleErrors(meta: IMeta[]): queryResponse {
        return new queryResponse([], meta, true);
    }

    static getHttpStatus(result: queryResponse): number {
        return parseInt(result.meta[0].status.toString().slice(0, 3));
    }

    static badLoginMessage: string = 'Datos de inicio de sesión incorrectos.';
}