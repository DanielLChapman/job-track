import { config, list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import { Post } from "./Post";

export const User = list({
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({
            validation: { isRequired: true },
            isIndexed: "unique",
        }),
        posts: relationship({ref: 'Post.author', many: true}),
    },
});

