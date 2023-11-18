import {SendEmailData} from "../../entities/email/routing/SendEmailData";
import {SendEmailResponse} from "../../../application/email/SendEmailResponse";
import {BroadLog} from "../../../application/email/BroadLog";

export interface EmailRoutingProvider {
    sendEmail(data: SendEmailData): Promise<SendEmailResponse[]>;
    getEmailLogs(ids: string[]): Promise<BroadLog[]>;
}
