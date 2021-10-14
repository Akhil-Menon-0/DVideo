pragma solidity ^0.5.16;

contract Primary {
    uint256 public videoCount = 0;
    uint256 public usersCount = 0;
    string public name = "Primary";
    mapping(uint256 => Video) public Id_Video;
    uint256[10][] public Tags_Videos; //10 is number of tags 
    mapping(string => uint256) public Title_Video;
    mapping(string => uint256[]) public User_Videos;
    mapping(string => User) public PublicKey_User;

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
        mapping(string => Video[]) Playlist_Videos;
    }

    event VideoUploaded(uint256 id, string hash, string title, address author);

    constructor() public {}

    function signup(string memory _userName, string memory _publicKey) public {
        usersCount++;
        string[] subscriptions = [];
        mapping(string => Video[]) Playlist_Videos;
        PublicKey_User[_publicKey] = User(
            _publicKey,
            _userName,
            subscriptions,
            0,
            Playlist_Videos
        );
    }

    function transactions(
        string[] memory _type,
        string[] memory _userId,
        string[] memory _timestamp,
        string[][] memory _params
    ) {
        for (
            uint256 transaction = 0;
            transaction < _type.length;
            transaction++
        ) {
            if(keccak256(abi.encodePacked(_type[transaction]))==abi.encodePacked("view")){
                view(_userId[transaction],_params[transaction][0]);
            }
            else if(keccak256(abi.encodePacked(_type[transaction]))==abi.encodePacked("like")){
                like(_userId[transaction],_params[transaction][0]);
            }
            else if(keccak256(abi.encodePacked(_type[transaction]))==abi.encodePacked("comment")){
                comment(_userId[transaction],_params[transaction][0],_params[transaction][1]);
            }
            else if(keccak256(abi.encodePacked(_type[transaction]))==abi.encodePacked("subscribe")){
                subscribe(_userId[transaction],_params[transaction][0])
            }
            else if(keccak256(abi.encodePacked(_type[transaction]))==abi.encodePacked("upload")){
                uint256 tags = _params[transaction][2];
                uploadVideo(_params[transaction]][3], _params[transaction]][0], _timestamp[transaction], _params[transaction]][1], tags, _userId[transaction]);
            }
        }
    }

    function view(string memory _userId, string memory _videoId) public {
        Id_Video[_videoId].views++;
        PublicKey_User[_userId].Playlist_Videos["viewed"].push(_videoId);
    }

    function like(string memory _userId, string memory _videoId) public {
        Id_Video[_videoId].hearts++;
        PublicKey_User[_userId].Playlist_Videos["liked"].push(_videoId);
    }

    function comment(string memory _userId, string memory _videoId, string memory _comment) public {
        Id_Video[_videoId].comments.push(_comment);
    }

    function subscribe(string memory _userId, string memory _subscribedUserId){
        PublicKey_User[_userId].subscriptions.push(_subscribedUserId);
        PublicKey_User[_subscribedUserId].subscribersCount++;
    }

    function uploadVideo(string memory _hash, string memory _title, string memory _time, string memory _description, uint256 _tags, string _creatorId) public {
        videoCount++;
        string[] comments;
        Id_Video[videoCount]=Video(
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
        )
        Title_Video[_title]=videoCount;
        User_Videos[_creatorId].push(videoCount)
        for(uint256 i=0;i<10;i++){  //10 is number of tags
            if((_tags>>i)&1 != 0){
                Tags_Videos[i].push(videoCount);
            }
        }   
    }

    function stringToUint(string s) constant returns (uint) {
    bytes memory b = bytes(s);
    uint result = 0;
    for (uint i = 0; i < b.length; i++) { 
        if (b[i] >= 48 && b[i] <= 57) {
            result = result * 10 + (uint(b[i]) - 48); 
        }
    }
    return result; 
}
    
}
