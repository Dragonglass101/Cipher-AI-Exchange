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
// add_creator(string link_encoding, string model_name, mutez price, address user_address)
export const addCreator = async(link_encoding, model_name, price, user_address) => {
    try {
        const contract = await tezos.wallet.at(contractAddress);

        const op = await contract.methods
            .add_creator(
                link_encoding, model_name, price, user_address
            )
            .send({
                amount: 5,
                mutez: false,
            });
        await op.confirmation(1);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}