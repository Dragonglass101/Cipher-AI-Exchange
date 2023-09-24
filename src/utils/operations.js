import { tezos } from "./tezos";

const contractAddress = "KT1BMvBVVAKtPMUUVBHe5iwPvgd7rNA26inA"

export const createUser = async(privateKey, publicKey, userAddress) => {
    try {
        const contract = await tezos.wallet.at(contractAddress);

        const op = await contract.methods
            .set_user_key(
                privateKey, publicKey, userAddress
            )
            .send({
                amount: 1,
                mutez: false,
            });
        await op.confirmation(1);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}