// src/infrastructure/emailRendering/ReactEmailRenderer.ts

import {type EmailRenderer, type EmailContent} from "../../../domain/services/cms/EmailRenderer";
import {render} from '@react-email/render';
import * as ReactEmailComponents from '@react-email/components';
import {uuid} from 'uuidv4';
// @ts-ignore
import React from "react";

export type EmailJson = {
    type: string;
    props?: { [key: string]: any };
    children?: EmailJson[] | string;
};

export class ReactEmailRenderer implements EmailRenderer {
    async render(emailJson: EmailJson): Promise<EmailContent> {
        const jsxElement = this.convertJsonToJsx(emailJson);

        return {
            html: render(jsxElement, ),
            text: render(jsxElement, {plainText: true}),
        };
    }

    private convertJsonToJsx(emailJson: EmailJson): React.ReactElement {
        const {type, props = {}} = emailJson;
        const Component = ReactEmailComponents[type as keyof typeof ReactEmailComponents];
        if (!Component) {
            throw new Error(`The component with type ${type} is not available in ReactEmailComponents`);
        }
        if (!props.key) props.key = uuid()
        const children = props.children || [];
        const childrenElements = typeof children === 'string'
            ? children
            : children?.map((child: EmailJson) => this.convertJsonToJsx(child)) || [];

        // @ts-ignore
        return <Component {...props}> {childrenElements} </Component>;
    }
}
