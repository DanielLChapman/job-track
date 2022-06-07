import { config, list} from '@keystone-6/core';
import { Post } from './schemas/Post';

import {User} from './schemas/User';

export default config({
    db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
    },
    lists: {
        User: User,
        Post: Post,
    }
});