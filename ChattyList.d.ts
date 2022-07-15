import { Socket } from 'socket.io-client';
import { IFetchChatListPayload, onChatListConnect, onChatListFetch, onChatListUpdate, IUpdateChatListPayload } from './Types';
export declare type ChattyListParams = {
    onChatListConnect?: onChatListConnect;
    onChatListFetch?: onChatListFetch;
    onChatListUpdate?: onChatListUpdate;
};
export declare class ChattyList {
    socket: Socket | undefined;
    onChatListConnect: onChatListConnect | undefined;
    onChatListFetch: onChatListFetch | undefined;
    onChatListUpdate: onChatListUpdate | undefined;
    constructor(payload: ChattyListParams);
    connect(): void;
    disconnect(): void;
    fetchChatList(payload: IFetchChatListPayload): void;
    updateChatList(payload: IUpdateChatListPayload): void;
    addListener(): void;
    removeListener(): void;
}
