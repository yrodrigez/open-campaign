export type SendEmailResponse = {
    id: string;
    status?: string;
    to: string;
} | ResponseError
