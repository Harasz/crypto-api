export interface BlockEncryption {
  blocks: string[];
  blocksNumber: number;
  blocksSize: number;
}

export interface HybridEncryption {
  data: string;
  key: string;
  iv: string;
  algorithm: string;
}
