import { ethers } from "hardhat";
import { DaiJoinLike, DaiJoinLike__factory, DaiLike, DaiLike__factory, DssGlow, DssGlow__factory, GusdLike, GusdLike__factory, PsmLike, PsmLike__factory } from "../typechain-types";
import { expect } from "chai";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Signer } from "ethers";

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

describe("DSS Glow", async () => {
    let daiJoin: DaiJoinLike;
    let daiToke: DaiLike;
    let gusdToke: GusdLike;
    let gusdPsm: PsmLike;
    let glowContract: DssGlow;
    let deployer: SignerWithAddress;
    let gusdDeployer: SignerWithAddress;
    let otherDeployer: SignerWithAddress;

    beforeEach(async () => {
        [deployer, gusdDeployer, otherDeployer] = await ethers.getSigners();

        const GlowFactory = new DssGlow__factory(deployer);

        // const DaiJoinFactory = new DaiJoinLike__factory();
        // const DaiTokeFactory = new DaiLike__factory();
        // const GusdTokeFactory = new GusdLike__factory();
        // const GusdPsmFactory = new PsmLike__factory();

        glowContract = await GlowFactory.deploy(DAI_JOIN, GUSD, VOW, GUSD_PSM);
        await glowContract.deployed();

        describe("When Glow is deployed", async () => {
            it("the right addresses are saved as parameters", async () => {
                const _daiJoin = await glowContract.daiJoin();
                expect(_daiJoin).to.eq(DAI_JOIN);
            })
        })




    })

})

