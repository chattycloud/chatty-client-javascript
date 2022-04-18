import { Socket } from 'socket.io-client';
import { ChatListFetchOptions, ChatListFetchHandler, ChatListRefreshHandler, ChatListConnectHandler } from './Types';
export declare class ChatList {
    socket: Socket | null;
    connectHandler: ChatListConnectHandler | null;
    fetchChatListHandler: ChatListFetchHandler | null;
    refreshChatListHandler: ChatListRefreshHandler | null;
    constructor();
    onConnectHandler(handler: ChatListConnectHandler): void;
    onFetchChatListHandler(handler: ChatListFetchHandler): void;
    onRefreshChatListHandler(handler: ChatListRefreshHandler): void;
    connect(): void;
    disconnect(): void;
    fetchChatList(options: ChatListFetchOptions): void;
    refreshChatList(ChatId: string): void;
    addListener(): void;
    removeListener(): void;
}
