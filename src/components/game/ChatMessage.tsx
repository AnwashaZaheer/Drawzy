export interface ChatEntry { id: string; name: string; text: string; system?: boolean; }
export const ChatMessage = ({ message }: { message: ChatEntry }) => message.system ? <div className="rounded-xl bg-yellow-50 px-3 py-2 text-sm font-bold text-yellow-700">{message.text}</div> : <div className="text-sm"><span className="font-extrabold text-indigo-700">{message.name}: </span><span className="font-medium text-gray-700">{message.text}</span></div>;


