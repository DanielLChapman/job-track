import { config, list } from "@keystone-6/core";
import { text, relationship, timestamp, select, integer } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { User } from "./User";

export const Job = list({
    fields: {
        name: text(),
        publishedAt: timestamp(),
        applicationDate: timestamp(),
        status: select({
            options: [
                {
                    label: 'Accepted', value: 'accepted'
                },
                {
                    label: 'Rejected', value: 'rejected'
                },
                {
                    label: 'Waiting', value: 'waiting'
                },
            ],
            defaultValue: 'waiting',
            ui: {
                displayMode: 'segmented-control'
            }
        }),
        author: relationship({
            ref: "User.jobs",
            ui: {
                displayMode: "cards",
                cardFields: ["name", "email"],
                inlineEdit: { fields: ["name", "email"] },
                linkToItem: true,
                inlineCreate: {
                    fields: ["name", "email"],
                },
            },
        }),
        salaryExpectation: integer(),
        interviews: relationship({ref: 'Interview.jobAttach', many: true}),
    },
});
