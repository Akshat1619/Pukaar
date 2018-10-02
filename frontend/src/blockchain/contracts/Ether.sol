pragma solidity ^0.4.24;

contract Ether {
  
  uint public amount;
  
  // function test(address _rec) public payable {
  //   Reciever reciever = Reciever(_rec);
  //   reciever.fund(_rec);
  // }

  function addEther() public payable returns(bool) {
    amount += msg.value;
    return true;
  }

  function sendEther(uint Samount) public payable {
    tx.origin.transfer(Samount);
    amount -= Samount;
  }


  function getAmount() public view returns(uint) {
    return amount;
  }

}

// contract Reciever {

//     uint public amount;

//     function fund(address sender) public payable returns(bool){
//        amount += msg.value;
//        return true;
//     }
// }


