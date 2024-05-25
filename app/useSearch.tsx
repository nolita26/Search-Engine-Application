import { useState, useEffect } from 'react';
import { MessageSearch } from './MessageSearch';

export function useSearch(query: string) {
  const [messageIds, setMessageIds] = useState<string[]>([]);

  useEffect(() => {
    const messageSearchService = MessageSearch.getInstance();
    const result = messageSearchService.query(query);
    setMessageIds(result);
  }, [query]);

  return messageIds
}
