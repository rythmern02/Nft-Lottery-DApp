// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RNTOKEN is ERC721, ERC721URIStorage, Ownable(msg.sender) {

    uint256 private _nextTokenId;

    struct NFTData {
        string name;
        string tokenURI;
    }

    mapping(uint256 => NFTData) public _nftData;

    constructor()
        ERC721("RYTHME", "RN")
    {}

    function addNFTToCollection(string memory name, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _mint(address(this), tokenId);
        _setTokenURI(tokenId, uri);

        // Store NFT data
        _nftData[tokenId] = NFTData({
            name: name,
            tokenURI: uri
        });
    }

    function safeMintForUser(uint256 tokenId ) public payable {
        require( msg.value > 0.0001 ether, "The sent value is less than the required minimum" );
        require(ownerOf(tokenId) == address(this), "Token not owned by the contract");

        _safeTransfer(address(this), msg.sender, tokenId, ""); // Transfer the NFT to the user
    }

    function deleteNFTData(uint256 tokenId) public onlyOwner {
        delete _nftData[tokenId];
    }

    function getNFTData(uint256 tokenId) public view returns (string memory name, string memory tokenURI) {
        NFTData storage data = _nftData[tokenId];
        return (data.name, data.tokenURI);
    }

    // The following functions are overrides required by Solidity.
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdrawFunds()  public payable onlyOwner {
         payable (msg.sender).transfer(address(this).balance);
    }

}
