export interface ISignatureData {
    data: any;
    width: number;
    height: number;
    username?: string;
    initials?: boolean;
    src?: string;
}

export interface ISignatures {
    signature?: ISignatureData;
    initials?: ISignatureData;
}
