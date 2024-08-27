export enum Blockchains {
  None = '',
  EDU = 'EDU',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.EDU, 'EDU'],
]);

export const getBlockchainLabel = (
  blockchain: Blockchains,
): string | undefined => BlockchainLabelMap.get(blockchain);

export const getBlockchainBySlug = (slug: string): Blockchains => {
  switch (slug) {
    case 'edu':
      return Blockchains.EDU;
    default:
      return Blockchains.None;
  }
};
