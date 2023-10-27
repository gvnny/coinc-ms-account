export class UpdateBankAccountRequest {
    name?: string;
    color?: string;
    balance?: number;
}

export class UpdateBankAccountResponse {
    success: boolean;
    message: string;
}