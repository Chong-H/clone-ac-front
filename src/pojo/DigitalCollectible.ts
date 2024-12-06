export class DigitalCollectible {
    collectibleId: number;
    owner: number;
    name: string;
    description: string;
    price: number;
    metadata: string;
    creationDate: Date;
    status: string;
    verificationStatus: string;

    constructor(
        collectibleId: number = 0,
        owner: number = 0,
        name: string = '',
        description: string = '',
        price: number = 0,
        metadata: string = '',
        creationDate: Date = new Date(),
        status: string = 'active',
        verificationStatus: string = 'pending'
    ) {
        this.collectibleId = collectibleId;
        this.owner = owner;
        this.name = name;
        this.description = description;
        this.price = price;
        this.metadata = metadata;
        this.creationDate = creationDate;
        this.status = status;
        this.verificationStatus = verificationStatus;
    }
}
