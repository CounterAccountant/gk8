export default interface ITransaction {
    id: string;
    timeStamp: number;
    from: string;
    to: string;
    value: number;
    confirmations: number;
    hash: string;
    formatted_timestamp?: string;
}