export interface WorkOrder {
    id: string;
    workOrderNumber: number;
    quantity: number;
    customerName: string;
    partNumber: string;
    chaseType: CHASE_TYPE;
    items?: Item[];
    created: string;
    modified: Date;
    status?: string;
}

export interface Item {
    itemName: string;
    partNumber: string;
    quantity: number;
}

export enum CHASE_TYPE{
    'INWIN',
    'AIO',
    'SLIM'
}