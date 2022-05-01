export interface WorkOrder {
    id: string;
    workOrderNumber: number;
    quantity: number;
    customerName: string;
    partNumber: string;
    chaseType: CHASE_TYPE;
    items: Item[];
    created: string;
    modified: Date;
    status?: string;
    workOrderStatus: any;
    progress: ProgressStatus;

}

export interface ProgressStatus{
    stockReceived: number;
    assembling: number;
    burnIn: number;
    fqc: number;
    packing: number;   
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