// 假设前端项目结构中有一个类似的路径
// src/pojo/dto/transactionDto.ts
// src/pojo/dto/transactionDto.ts

export class TransactionDto {
    transactionId: number | null;
    collectibleId: number | null;
    buyerId: number | null;
    sellerId: number | null;
    transactionDate: string | null; // 假设前端使用字符串表示日期
    ifReadByBuyer: number | null;
    ifReadBySeller: number | null;

    constructor(
        transactionId: number | null = null,
        collectibleId: number | null = null,
        buyerId: number | null = null,
        sellerId: number | null = null,
        transactionDate: string | null = null,
        ifReadByBuyer: number | null = null,
        ifReadBySeller: number | null = null
    ) {
        this.transactionId = transactionId;
        this.collectibleId = collectibleId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.transactionDate = transactionDate;
        this.ifReadByBuyer = ifReadByBuyer;
        this.ifReadBySeller = ifReadBySeller;
    }
}