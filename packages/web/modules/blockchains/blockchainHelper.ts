import { Blockchains } from '@core/enums/blockchains';
import { EDUNetworks } from './edu/providers/walletProvider';

const blockchainNetworks = {
  testnet: {
    [Blockchains.EDU]: EDUNetworks.Testnet,
  },
  mainnet: {
    [Blockchains.EDU]: EDUNetworks.Mainnet,
  },
};

export const getBlockchainNetwork = (
  blockchain: Blockchains,
  environment: string,
): EDUNetworks | null => {
  return blockchainNetworks[environment]?.[blockchain] || null;
};

const blockchainNetworkLabels = {
  testnet: {
    [Blockchains.EDU]: 'EDU Testnet',
  },
  mainnet: {
    [Blockchains.EDU]: 'EDU Mainnet',
  },
};

export const getBlockchainNetworkLabel = (
  blockchain: Blockchains,
  environment: string,
): string => {
  return blockchainNetworkLabels[environment]?.[blockchain] || '';
};
