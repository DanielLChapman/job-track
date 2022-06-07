import { config, list } from "@keystone-6/core";
import { text, relationship, timestamp, select } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { User } from "./User";

export const Post = list({
    fields: {
        title: text(),
        publishedAt: timestamp(),
        status: select({
            options: [
                {
                    label: 'Published', value: 'published'
                },
                {
                    label: 'Draft', value: 'draft'
                },
            ],
            defaultValue: 'draft',
            ui: {
                displayMode: 'segmented-control'
            }
        }),
        author: relationship({
            ref: "User.posts",
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
        content: document({
            formatting: true,
            links: true,
            dividers: true,
            layouts: [
                [1,1],
                [1,1,1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ]
        })
    },
});
