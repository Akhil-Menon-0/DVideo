pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Primary {
    uint256 public videoCount = 0;
    uint256 public usersCount = 0;
    string public name = "Primary";
    mapping(uint256 => Video) public Id_Video;
    uint256[] public Tag1_Videos;
    uint256[] public Tag2_Videos;
    uint256[] public Tag3_Videos;
    mapping(string => uint256) public Title_Video;
    mapping(string => uint256[]) public User_Videos;
    mapping(string => User) public PublicKey_User;
    mapping(string => string) public UserName_User;

    struct Video {
        uint256 id;
        string hash;
        string title;
        string time;
        string description;
        string[] comments;
        uint256 views;
        uint256 hearts;
        uint256 tags;
        string creatorId;
    }

    struct User {
        string publicKey;
        string userName;
        string[] subscriptions;
        uint256 subscribersCount;
        mapping(string => uint256[]) Playlist_Videos;
    }

    constructor() public {}

    function getUserSubscriptions(string memory _publicKey)
        public
        view
        returns (string[] memory)
    {
        return PublicKey_User[_publicKey].subscriptions;
    }

    function getUserPlaylist(string memory _publicKey, string memory _playlist)
        public
        view
        returns (uint256[] memory)
    {
        return PublicKey_User[_publicKey].Playlist_Videos[_playlist];
    }

    function getVideoComments(uint256 _videoId)
        public
        view
        returns (string[] memory)
    {
        return Id_Video[_videoId].comments;
    }

    function signup(string memory _userName, string memory _publicKey) public {
        usersCount++;
        string[] memory subscriptions;
        PublicKey_User[_publicKey] = User(
            _publicKey,
            _userName,
            subscriptions,
            0
        );
        UserName_User[_userName] = _publicKey;
    }

    function transactions(
        string[] memory _type,
        string[] memory _userId,
        string[] memory _timestamp,
        string[][] memory _params
    ) public {
        for (
            uint256 transaction = 0;
            transaction < _type.length;
            transaction++
        ) {
            if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("view"))
            ) {
                watch(
                    _userId[transaction],
                    stringToUint(_params[transaction][0])
                );
            } else if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("like"))
            ) {
                like(
                    _userId[transaction],
                    stringToUint(_params[transaction][0])
                );
            } else if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("comment"))
            ) {
                comment(
                    stringToUint(_params[transaction][0]),
                    _params[transaction][1]
                );
            } else if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("subscribe"))
            ) {
                subscribe(_userId[transaction], _params[transaction][0]);
            } else if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("save"))
            ) {
                save(
                    _userId[transaction],
                    stringToUint(_params[transaction][0])
                );
            } else if (
                keccak256(abi.encodePacked(_type[transaction])) ==
                keccak256(abi.encodePacked("upload"))
            ) {
                uploadVideo(
                    _params[transaction][3],
                    _params[transaction][0],
                    _timestamp[transaction],
                    _params[transaction][1],
                    stringToUint(_params[transaction][2]),
                    _userId[transaction]
                );
            }
        }
    }

    function watch(string memory _userId, uint256 _videoId) public {
        Id_Video[_videoId].views++;
    }

    function like(string memory _userId, uint256 _videoId) public {
        Id_Video[_videoId].hearts++;
        PublicKey_User[_userId].Playlist_Videos["liked"].push(_videoId);
    }

    function save(string memory _userId, uint256 _videoId) public {
        PublicKey_User[_userId].Playlist_Videos["later"].push(_videoId);
    }

    function comment(uint256 _videoId, string memory _comment) public {
        Id_Video[_videoId].comments.push(_comment);
    }

    function subscribe(string memory _userId, string memory _subscribedUserId)
        public
    {
        PublicKey_User[_userId].subscriptions.push(_subscribedUserId);
        PublicKey_User[_subscribedUserId].subscribersCount++;
    }

    function uploadVideo(
        string memory _hash,
        string memory _title,
        string memory _time,
        string memory _description,
        uint256 _tags,
        string memory _creatorId
    ) public {
        videoCount++;
        string[] memory comments;
        Id_Video[videoCount] = Video(
            videoCount,
            _hash,
            _title,
            _time,
            _description,
            comments,
            0,
            0,
            _tags,
            _creatorId
        );
        Title_Video[_title] = videoCount;
        User_Videos[_creatorId].push(videoCount);
        if ((_tags & 1) != 0) {
            Tag1_Videos.push(videoCount);
        }
        if ((_tags >> 1) & 1 != 0) {
            Tag2_Videos.push(videoCount);
        }
        if ((_tags >> 2) & 1 != 0) {
            Tag3_Videos.push(videoCount);
        }
    }

    function stringToUint(string memory s)
        public
        pure
        returns (uint256 result)
    {
        bytes memory b = bytes(s);
        uint256 i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
}
