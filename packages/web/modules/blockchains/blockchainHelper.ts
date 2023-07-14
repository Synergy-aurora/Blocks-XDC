import { Blockchains } from '@core/enums/blockchains';
import { FantomNetworks } from './xdc/providers/walletProvider';

const blockchainNetworks = {
  testnet: {
    [Blockchains.Fantom]: FantomNetworks.Testnet,
  },
  mainnet: {
    [Blockchains.Fantom]: FantomNetworks.Mainnet,
  },
};

export const getBlockchainNetwork = (
  blockchain: Blockchains,
  environment: string,
): FantomNetworks | null => {
  return blockchainNetworks[environment]?.[blockchain] || null;
};

const blockchainNetworkLabels = {
  testnet: {
    [Blockchains.Fantom]: 'Fantom Nile Testnet',
  },
  mainnet: {
    [Blockchains.Fantom]: 'Fantom Mainnet',
  },
};

export const getBlockchainNetworkLabel = (
  blockchain: Blockchains,
  environment: string,
): string => {
  return blockchainNetworkLabels[environment]?.[blockchain] || '';
};
