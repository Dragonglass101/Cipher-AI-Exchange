// import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const preferredNetwork = "ghostnet";
const options = {
    name: "NFT",
    iconUrl: "https://tezostaquito.io/img/favicon.png",
    preferredNetwork: preferredNetwork,
};
const rpcURL = "https://rpc.ghostnet.teztnets.xyz";
// https://uoi3x99n7c.ghostnet.tezosrpc.midl.dev/
const wallet = new BeaconWallet(options);

const getActiveAccount = async() => {
    return await wallet.client.getActiveAccount();
};

const connectWallet = async() => {
    let account = await wallet.client.getActiveAccount();

    if (!account) {
        await wallet.requestPermissions({
            network: { type: preferredNetwork },
        });
        account = await wallet.client.getActiveAccount();
    }
    return { success: true, wallet: account };
};

const disconnectWallet = async() => {
    await wallet.disconnect();
    return { success: true, wallet: null };
};

const checkIfWalletConnected = async(wallet) => {
    try {
        const activeAccount = await wallet.client.getActiveAccount();
        if (!activeAccount) {
            await wallet.client.requestPermissions({
                type: { network: preferredNetwork },
            });
        }
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

export {
    connectWallet,
    disconnectWallet,
    getActiveAccount,
    checkIfWalletConnected,
    wallet
};