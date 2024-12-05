import { DigitalCollectible } from './DigitalCollectible';

export class User {
    userId: number;
    username: string;
    passwordHash: string;
    email: string;
    phone?: string;
    blockchainId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    collectibles: DigitalCollectible[];

    constructor(
        userId: number = 0,
        username: string = '',
        passwordHash: string = '',
        email: string = '',
        phone: string | undefined = undefined,
        blockchainId: string | undefined = undefined,
        createdAt: Date | undefined = undefined,
        updatedAt: Date | undefined = undefined,
        collectibles: DigitalCollectible[] = []
    ) {
        this.userId = userId;
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.phone = phone;
        this.blockchainId = blockchainId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.collectibles = collectibles;
    }

}