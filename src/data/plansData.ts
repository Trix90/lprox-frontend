
// plansData.ts
export interface Plan {
    plan_id: string;
    product_id: string;
    price: number;
    bandwidth: number;
}

export interface Product {
    product_id: string;
    product_name: string;
}

export const plans: Plan[] = [
    { plan_id: "101", product_id: "resi_starter", price: 3.99, bandwidth: 1 },
    { plan_id: "102", product_id: "resi_starter", price: 17.99, bandwidth: 5 },
    { plan_id: "103", product_id: "resi_starter", price: 32.99, bandwidth: 10 },
    { plan_id: "201", product_id: "resi_pro", price: 50.99, bandwidth: 20 },
    { plan_id: "202", product_id: "resi_pro", price: 99.99, bandwidth: 50 },
    { plan_id: "203", product_id: "resi_pro", price: 199.99, bandwidth: 100 },
    { plan_id: "301", product_id: "resi_enterprise", price: 299.99, bandwidth: 200 },
    { plan_id: "302", product_id: "resi_enterprise", price: 499.99, bandwidth: 500 },
    { plan_id: "303", product_id: "resi_enterprise", price: 999.99, bandwidth: 1000 }
];

export const products: { [key: string]: { product_name: string } } = {
    resi_starter: {
        product_name: "Residential Starter"
    },
    resi_pro: {
        product_name: "Residential Pro"
    },
    resi_enterprise: {
        product_name: "Residential Enterprise"
    }
};
