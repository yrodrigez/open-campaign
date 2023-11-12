import {render} from "@react-email/render";
import {DuckrEmail} from "../emails/nurture";
import React from "react";
export const renderEmail = (props: any) => {
    return render(<DuckrEmail {...props} />, {pretty: true})
}
