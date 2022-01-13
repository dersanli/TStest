interface Item {
    ID: string,
    Name: string,
    Price: number,
}

export default class Checkout {
    sum = 0;
    basketLevelRule;
    itemLevelRule;

    constructor(basketLevelRule = {}, itemLevelRule = {}) {
        this.basketLevelRule = basketLevelRule;
        this.itemLevelRule = itemLevelRule;
    }


    total = () => {
        return this.sum;
    }

    scan = (items: Item[]) => {
        let total = 0.00;
        const minQuantityReached = this.itemLevelRule && items.filter(item => item.Name === this.itemLevelRule.itemName).length >= 2;

        items.map(item => {
            let price = item.Price;
            if ( item.Name === this.itemLevelRule.itemName && minQuantityReached) {
                price = this.itemLevelRule.discountPrice;
            }
            console.log(total)
            total += price;
        })



        if (this.basketLevelRule) {
            if (total > this.basketLevelRule.minSpend) {
                total = total * (100 - this.basketLevelRule.discountPercent) / 100
            }
        }

        this.sum = total;
    }
}