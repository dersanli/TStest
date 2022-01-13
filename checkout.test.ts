import Checkout from "./Checkout";

let basketLevelRule;
let itemLevelRule;

describe('checkout', () => {

    beforeAll(() => {
        basketLevelRule = {
            minSpend: 75,
            discountPercent: 10
        }

        itemLevelRule = {
            itemName: 'Water Bottle',
            minQuantity: 2,
            discountPrice: 22.99
        }
    });

    test('adds a single item to the basket', () => {
            const checkout = new Checkout();
            const items = [{
                ID: '0001',
                Name: 'Water Bottle',
                Price: 24.95,
            }]

            checkout.scan(items)
            expect(checkout.total()).toBe(24.95);
        }
    )
    test('basket level discounts', () => {
        const checkout = new Checkout(basketLevelRule, itemLevelRule);
        const items = [{
            ID: '0001',
            Name: 'Water Bottle',
            Price: 100.00,
        }]

        checkout.scan(items)
        expect(checkout.total()).toBe(90.00);
    })

    test('applies item level discounts', () => {
        const checkout = new Checkout({}, itemLevelRule);
        const items = [
            {
                ID: '0001',
                Name: 'Water Bottle',
                Price: 24.95,
            },
            {
                ID: '0001',
                Name: 'Water Bottle',
                Price: 24.95,
            },
            {
                ID: '0002',
                Name: 'Hoodie',
                Price: 65.00,
            },
            {
                ID: '0003',
                Name: 'Sticker Set',
                Price: 3.99,
            }
        ]

        // const items = [
        //     {
        //         ID: '0001',
        //         Name: 'Water Bottle',
        //         Price: 24.95,
        //     },
        //     {
        //         ID: '0001',
        //         Name: 'Water Bottle',
        //         Price: 24.95,
        //     },
        //     {
        //         ID: '0001',
        //         Name: 'Water Bottle',
        //         Price: 24.95,
        //     },
        // ]

        checkout.scan(items)
        expect(checkout.total()).toBe(114.97);
    })
})