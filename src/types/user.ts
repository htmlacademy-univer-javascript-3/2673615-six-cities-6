export type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type AppUser = User & {
    email: string;
    token: string;
}
