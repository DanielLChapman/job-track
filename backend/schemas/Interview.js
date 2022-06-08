import { config, list } from "@keystone-6/core";
import { text, relationship, timestamp, select, integer } from "@keystone-6/core/fields";
import { Job } from "./Job";

export const Interview = list({
    fields: {
        date: timestamp(),
        type: text(),
        jobAttach: relationship({
            ref: "Job.interviews",
            ui: {
                displayMode: "cards",
                cardFields: ["name"],
                inlineEdit: { fields: ["name"] },
                linkToItem: true,
                inlineCreate: {
                    fields: ["name"],
                },
            },
        }),
    },
});
