export interface EmailProvider {
    sendEmail: (data: SendEmailData) => Promise<SendEmailResponse[]>;
    getEmailsLogs: (ids: string[]) => Promise<BroadLog[]>;
}

export type ResponseError = {
    error: boolean,
    message: string,
    name: string,
    to?: string,
    code: number,
    id?: string,
}

export type Email = {
    id?: string,
    html: string,
    text?: string,
    from: string,
    subject: string,
    tags?: [{ name: string, value: string }],
}

export type SendEmailData = {
    to: string | string[];
    email: Email;
}

export type SendEmailResponse = {
    id: string;
    status?: string;
    to: string;
} | ResponseError

export type BroadLog = {
    id: string,
    to: string | string[],
    channel?: string,
    last_event?: string,
    status?: string,
    html?: string,
    text?: string,
    bcc?: string | string[] | null[],
    cc?: string | string[] | null[],
    reply_to?: string | string[] | null[],
    created_at?: string,
} | ResponseError

export default function createEmailService (provider: EmailProvider)  {
    return {
        async sendEmail(data: SendEmailData): Promise<SendEmailResponse[]> {
            return provider.sendEmail(data);
        },
        async getEmailsLogs(ids: string[]): Promise<BroadLog[]> {
            return provider.getEmailsLogs(ids);
        },
    };
};

