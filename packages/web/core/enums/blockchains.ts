export enum Blockchains {
  None = '',
  Fantom = 'Fantom',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.Fantom, 'Fantom'],
]);

export const getBlockchainLabel = (
  blockchain: Blockchains,
): string | undefined => BlockchainLabelMap.get(blockchain);

export const getBlockchainBySlug = (slug: string): Blockchains => {
  switch (slug) {
    case 'fantom':
      return Blockchains.Fantom;
    default:
      return Blockchains.None;
  }
};
