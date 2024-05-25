'use client';

import { useEffect, useMemo, useState } from "react";
import { useSearch } from "./useSearch";
import { MessageSearch } from "./MessageSearch";
import data from "./reviews.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const messageIds = useSearch(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim());
  };

  useEffect(() => {
    const messageSearchService = MessageSearch.getInstance();
    messageSearchService.load(data);
    messageSearchService.prepare();
  }, [])

  const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'g'));
    return parts.map((part, index) =>
      part === query ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const messageElements = useMemo(() => {
    if (!query) {
      return [];
    }

    return messageIds.map((messageId) => {
      const messageText = data[messageId].message;
      return (
        <div key={`${query}-${messageId}`} className="p-2 bg-slate-800 text-white text-sm rounded">
          {highlightText(messageText, query)}
        </div>
      )
    })
  }, [messageIds, query])

  return (
    <main className="flex w-full max-w-xl flex-col p-4 shadow border mx-auto mt-4 rounded-lg min-h-[80vh] bg-neutral-100">
      <h1 className="font-medium text-center"> Message Search </h1>
      <input onChange={handleChange} type="text" placeholder="Query" className="border rounded text-sm p-2 w-full" />
      <div className="flex flex-col gap-2 py-2 items-start">
        {messageElements}
      </div>
    </main>
  );
}
