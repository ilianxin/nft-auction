pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NftAuctionV2 is Initializable {
    struct Auction {
        address seller;
        uint duration;

        uint256 startPrice;

        bool ended;

        address highestBidder;
        uint256 highestBid;

        uint256 startTime;

        address nftContract;
        uint256 tokenId;
    }

        mapping(uint256 => Auction) public auctions;

        uint256 public nextAuctionId;
        address public admin;
        
      function initialize() initializer public {
        admin = msg.sender;
      }

      function createAuction(uint256 _duration, uint256 _startPrice, address _nftAddress, uint256 _tokenId ) external {
        require(msg.sender == admin, "Only admin can create auctions");
        require(_duration > 1000 * 60, "Duration must be greater than 0");
        require(_startPrice > 0, "Start price must be greater than 0");

        auctions[nextAuctionId] = Auction({
            seller: msg.sender,
            duration: _duration,
            startPrice: _startPrice,
            ended: false,
            highestBidder: address(0),
            highestBid: 0,
            startTime: block.timestamp,
            nftContract: _nftAddress,
            tokenId: _tokenId
        });

        nextAuctionId++;
      }
    
    function placeBid(uint256 _auctionId) external payable {
        Auction storage auction = auctions[_auctionId];
        uint256 endTime = auction.startTime + auction.duration;
        require(!auction.ended && endTime > block.timestamp, 
            string(abi.encodePacked("Auction has ended. endTime: ", _toString(endTime), ", now: ", _toString(block.timestamp)))
        );


        require(msg.value >= auction.startPrice, "Bid must be higher than start price");
        require(msg.value > auction.highestBid, "There already is a higher bid");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function testHello() public pure returns (string memory) {
        return "Hello, World!";
    }
}