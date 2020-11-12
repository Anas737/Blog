import { Post } from './post.model';
import { User } from './user.model';

export interface Profile {
  user: User;
  posts: Post[];
}
