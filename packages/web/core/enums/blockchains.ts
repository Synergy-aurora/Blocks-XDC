export enum Blockchains {
  None = '',
  Fantom = 'XDC',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.XDC, 'XDC'],
]);

export const getBlockchainLabel = (
  blockchain: Blockchains,
): string | undefined => BlockchainLabelMap.get(blockchain);

export const getBlockchainBySlug = (slug: string): Blockchains => {
  switch (slug) {
    case 'xdc':
      return Blockchains.XDC;
    default:
      return Blockchains.None;
  }
};
