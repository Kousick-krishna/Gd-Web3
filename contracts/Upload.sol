// SPDX-License-Identifier:GPL-3.0
pragma solidity ^0.8.9;

contract Upload{
    struct Access{
        address user;
        bool access;
    }

    mapping(address=>string[]) value;
    mapping(address=>Access[]) public accesslist;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>mapping(address=>bool)) previous;

    function add(address _user,string calldata url) external{
        value[_user].push(url);
    }

    function allow(address user) external{
        ownership[msg.sender][user]=true;
        if(previous[msg.sender][user] == true){
            for(uint i=0;i<accesslist[msg.sender].length;i++){
                if(accesslist[msg.sender][i].user == user){
                    accesslist[msg.sender][i].access = true;
                }
            }
        }
        else{
            accesslist[msg.sender].push(Access(user,true));
            previous[msg.sender][user]=true;
        }
        
    }
    function disallow(address user) external{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<accesslist[msg.sender].length;i++){
            if(accesslist[msg.sender][i].user==user){
                 accesslist[msg.sender][i].access = false;
            }
        }
    }
    function display(address _user) external view returns(string[] memory){
        require(_user==msg.sender || ownership[_user][msg.sender],"You dont have access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accesslist[msg.sender];
    }
}
