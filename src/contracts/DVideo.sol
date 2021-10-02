pragma solidity ^0.5.16;

contract DVideo {
    uint256 public videoCount = 0;
    string public name = "DVideo";
    mapping(uint256 => Video) public videos;

    struct Video {
        uint256 id;
        string hash;
        string title;
        address author;
    }

    event VideoUploaded(uint256 id, string hash, string title, address author);

    constructor() public {}

    function uploadVideo(string memory _videoHash, string memory _title)
        public
    {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0);
        // Make sure video title exists
        require(bytes(_title).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment video id
        videoCount++;

        // Add video to the contract
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
        // Trigger an event
        emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
    }
}
