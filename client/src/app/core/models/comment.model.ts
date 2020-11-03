import { Post } from './post.model';
import { User } from './user.model';

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  post?: Post;
  commenter: User;
}
