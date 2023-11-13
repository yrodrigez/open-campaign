export interface EmailRenderer {
    render: (data: any) => Promise<EmailContent>;
}

export type EmailContent = {
    html: string,
    text?: string,
}

export type Email = {
    content: EmailContent,
    from: string,
    subject: string,
    tags?: [{ name: string, value: string }],
    attachments?: [{ name: string, content: string, type: string }],
}
