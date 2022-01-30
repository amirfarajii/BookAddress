// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.9.0;

contract AddressBook {
    mapping(address => address[]) private _addresses;

    mapping(address => mapping(address => string)) private _aliases;

    function getAddressArray (address _addr) public  view returns (address[] memory) {
        return _addresses[_addr];
    }

    function AddAddress(address addr, string memory alia) public {
        _addresses[msg.sender].push(addr);
        _aliases[msg.sender][addr] = alia;
    }

    function removeAddress(address addr) public {
        uint length = _addresses[msg.sender].length;
        for(uint i=0; i<length; i++){
            if(addr == _addresses[msg.sender][i]){
                for(uint index=i ;index<length-1;index++ ){
                    _addresses[msg.sender][index] = _addresses[msg.sender][index+1];
                }
                _addresses[msg.sender].pop();
                delete _aliases[msg.sender][addr];
                break;

            }
        }

    }

    function getAlias(address addrOwner, address addr) public view returns (string memory){
        return _aliases[addrOwner][addr];
    }

}