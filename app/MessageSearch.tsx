import { Messages, MessageId } from "./types";

class SuffixArray {
  constructor(public suffixes: string[], public indexes: number[]) {}
}

export class MessageSearch {
  static service: MessageSearch | null = null;
  private data: Messages | null = {};
  private messageArrays: { [key: string]: SuffixArray } = {};

  constructor() {
    this.data = null;
  }

  load(data: Messages) {
    this.data = data;
  }

  query(query: string): MessageId[] {
    if (query.includes(" ")) {
      return [];
    }
    if (query === "") {
      return Object.keys(this.data || {});
    }
    const result: MessageId[] = [];
    if (this.data) {
      for (const [id, messageObj] of Object.entries(this.data)) {
        if (messageObj.message.includes(query)) {
          result.push(id);
        }
      }
    }
    return result;
  }

  prepare() {
    if (this.data) {
      for (const [id, messageObject] of Object.entries(this.data)) {
        const message = messageObject.message;
        const suffixes = [];
        const indexes = [];
        for (let i = 0; i < message.length; i++) {
          suffixes.push(message.slice(i));
          indexes.push(i);
        }
        suffixes.sort();
        this.messageArrays[id] = new SuffixArray(suffixes, indexes);
      }
    }
  }

  static getInstance() {
    if (!MessageSearch.service) {
      MessageSearch.service = new MessageSearch();
    }

    return MessageSearch.service;
  }
}
