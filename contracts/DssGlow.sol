// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title GUSD Automatic Converter and joiner
// Inspired by (and heavily lifted from) lollike/dss-blow

interface DaiLike {
    function balanceOf(address) external returns (uint256);

    function approve(address usr, uint256 wad) external returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) external returns (bool);
}

interface GusdLike {
    function balanceOf(address) external returns (uint256);

    function approve(address usr, uint256 wad) external returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) external returns (bool);
}

interface DaiJoinLike {
    function dai() external view returns (address);

    function join(address, uint256) external;
}

interface PsmLike {
    function sellGem(address usr, uint256 gemAmt) external;
}

contract DssGlow {
    ///
    uint256 MAX_INT = 2**256 - 1;
    DaiJoinLike public immutable daiJoin;
    DaiLike public immutable dai;
    GusdLike public immutable gusd;
    PsmLike public immutable gusdPsm;
    address public immutable vow;

    // --- Events ---

    event Glow(uint256 amount);
    event GusdConverted(uint256 amount, uint256 converted);
    event Blow(uint256 amount);

    // --- Init ---
    // Deployments on Goerli:
    //
    constructor(
        address daiJoin_,
        address gusd_,
        address vow_,
        address gusdPsm_
    ) {
        daiJoin = DaiJoinLike(daiJoin_);
        dai = DaiLike(DaiJoinLike(daiJoin_).dai());
        gusd = GusdLike(gusd_);
        vow = vow_;
        gusdPsm = PsmLike(gusdPsm_);
        DaiLike(DaiJoinLike(daiJoin_).dai()).approve(daiJoin_, MAX_INT);
        gusd.approve(gusdPsm_, MAX_INT);
    }

    function gusdConvertToDai() public returns (uint256 daiConverted) {
        uint256 balance = gusd.balanceOf(address(this));
        require(balance > 0, "Must have deposited GUSD in Glow");
        gusdPsm.sellGem(address(this), balance);
        daiConverted = dai.balanceOf(address(this));
        emit GusdConverted(balance, daiConverted);
        return daiConverted;
    }

    function blow() public {
        uint256 balance = dai.balanceOf(address(this));
        daiJoin.join(vow, balance);
        emit Blow(balance);
    }

    function glow() public {
        uint256 balance;
        balance = gusdConvertToDai();
        blow();
        emit Glow(balance);
    }
}
