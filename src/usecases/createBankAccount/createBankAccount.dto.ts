export class CreateBankAccountRequest {
    userId: string;
    name: string;
    color?: string;
    balance: number;
}

export class CreateBankAccountResponse {
    success: boolean;
    message: string;
}