import { ethers } from "hardhat";
import { DssGlow__factory } from "../typechain-types";
import * as dotenv from "dotenv";

dotenv.config();

// Goerli: 
// DAI Join: 0x4115fDa246e2583b91aD602213f2ac4fC6E437Ca
// GUSD: 0x67aeF79654D8F6CF44FdC08949c308a4F6b3c45B
// VOW: 0x23f78612769b9013b3145E43896Fa1578cAa2c2a
// GUSD PSM: 0x3B2dBE6767fD8B4f8334cE3E8EC3E2DF8aB3957b
// DAI: 0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844

// Mainnet:
// DAI Join: 0x9759A6Ac90977b93B58547b4A71c78317f391A28
// GUSD: 0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd
// VOW: 0xA950524441892A31ebddF91d3cEEFa04Bf454466
// GUSD PSM: 0x204659B2Fd2aD5723975c362Ce2230Fba11d3900
// DAI: 0x6B175474E89094C44Da98b954EedeAC495271d0F

const DAI_JOIN = '0x4115fDa246e2583b91aD602213f2ac4fC6E437Ca';
const GUSD = '0x67aeF79654D8F6CF44FdC08949c308a4F6b3c45B';
const VOW = '0x23f78612769b9013b3145E43896Fa1578cAa2c2a';
const GUSD_PSM = '0x3B2dBE6767fD8B4f8334cE3E8EC3E2DF8aB3957b';
const DAI = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844';

describe("DssGlow", async () => {

    beforeEach(async () => {
        const options = {
            alchemy: process.env.ALCHEMY_API_KEY,
            infura: process.env.INFURA_API_KEY,
        };
        let provider = ethers.getDefaultProvider("goerli", options);
        let wallet;
        if (process.env.WALLET_PRIVATE_KEY != undefined) {
            wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY ?? "", provider);
        } else if (process.env.MNEMONIC) {
            wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
        } else {
            throw new Error("WALLET_PRIVATE_KEY or MNEMONIC is needed.");
        }
        console.log(`Using Signer address ${wallet.address}`);
        let signer = wallet.connect(provider);
        const GlowFactory = new DssGlow__factory(signer);
    })

    describe("Deployment", async () => {
        it("Should deploy to a new address", async () => {
            console.log('test');
        })

    })

})
