import { config, list } from "@keystone-6/core";
import { text, relationship, password } from "@keystone-6/core/fields";
import { Job } from "./Job";

export const User = list({
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({
            validation: { isRequired: true },
            isIndexed: "unique",
        }),
        jobs: relationship({ref: 'Job.author', many: true}),
        password: password({validation: { isRequired: true}}),
    },
});

