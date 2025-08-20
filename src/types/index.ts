export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    lastLoginAt: Date;
}