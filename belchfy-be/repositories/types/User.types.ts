export type User = {
    id?:number;
    username: string;
    password: string;
    admin: 1 | 0;
    createdAt: Date;
    lastUpdated: Date;
    deleted: 1 | 0;
    deletedAt: Date;
}

export function isUser(object: any): object is User {
  return (
    typeof object.username === 'string' &&
    typeof object.password === 'string' &&
    (object.admin === 1 || object.admin === 0)
  );
}