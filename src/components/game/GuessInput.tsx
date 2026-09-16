import { Send } from 'lucide-react'; import { useState } from 'react';
export const GuessInput = ({ onSend }: { onSend: (text: string) => void }) => { const [value,setValue]=useState(''); const submit=(e:React.FormEvent)=>{e.preventDefault();if(!value.trim())return;onSend(value.trim());setValue('');}; return <form onSubmit={submit} className="flex gap-2 border-t border-gray-100 p-3"><input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Type your guess..." className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none transition focus:border-indigo-400" /><button aria-label="Send guess" className="rounded-xl bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700"><Send className="h-4 w-4" /></button></form>; };


