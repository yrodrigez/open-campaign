import {EmailRenderer} from "../../../domain/services/cms/EmailRenderer";
import {EmailContent} from "../../../domain/entities/email/cms";

export class RenderReactEmail {
    constructor(private emailRenderer: EmailRenderer) {
    }

    async execute(emailJson: any): Promise<EmailContent> {
        return await this.emailRenderer.render(emailJson);
    }
}
