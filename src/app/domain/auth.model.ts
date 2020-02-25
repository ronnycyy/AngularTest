import { User } from "./user.model";
import { Err } from './err.mode';

export interface Auth {
    user?: User;
    userId?: string;
    token?: string;
    err?: Err;
}