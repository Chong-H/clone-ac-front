import { User } from './User';

export class DigitalCollectible {
    collectibleId: number;
    ownerId: number;
    name: string;
    description: string;
    price: number;
    metadata: string;
    creationDate: Date;
    status: string;
    verificationStatus: string;

    constructor(
        collectibleId: number = 0,
        ownerId: number = 0,
        name: string = '',
        description: string = '',
        price: number = 0,
        metadata: string = '',
        creationDate: Date = new Date(),
        status: string = 'active',
        verificationStatus: string = 'pending'
    ) {
        this.collectibleId = collectibleId;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.metadata = metadata;
        this.creationDate = creationDate;
        this.status = status;
        this.verificationStatus = verificationStatus;
    }
}
