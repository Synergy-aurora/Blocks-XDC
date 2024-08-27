import { Blockchains } from '@core/enums/blockchains';
import { XDCNetworks } from './edu/providers/walletProvider';

const blockchainNetworks = {
  testnet: {
    [Blockchains.XDC]: XDCNetworks.Testnet,
  },
  mainnet: {
    [Blockchains.XDC]: XDCNetworks.Mainnet,
  },
};

export const getBlockchainNetwork = (
  blockchain: Blockchains,
  environment: string,
): XDCNetworks | null => {
  return blockchainNetworks[environment]?.[blockchain] || null;
};

const blockchainNetworkLabels = {
  testnet: {
    [Blockchains.XDC]: 'Apothem Network',
  },
  mainnet: {
    [Blockchains.XDC]: 'XinFin Network',
  },
};

export const getBlockchainNetworkLabel = (
  blockchain: Blockchains,
  environment: string,
): string => {
  return blockchainNetworkLabels[environment]?.[blockchain] || '';
};
