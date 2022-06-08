import { config, list } from "@keystone-6/core";
import { text, relationship, timestamp } from "@keystone-6/core/fields";

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
