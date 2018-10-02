import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import EtherContract from "../blockchain/build/contracts/Ether.json";
import fire from "./fire";
import _ from "lodash";

let contractInstance = null;
const contract = require("truffle-contract");

class EtherTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      web3: null,
      successful: false,
      messages: []
    };
    this.db = fire;
    let app = this.db.database().ref("scraped");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();
    this.setState({
      messages: messages
    });
    console.log(this.state.messages[0]);
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3,
          metamask: true
        });
        this.instantiateContract();
      })
      .catch(() => {
        this.setState({ metamask: false });
        console.log(
          "Error finding web3. Please make sure metamask is installed"
        );
      });
  }

  instantiateContract() {
    const instance = this;
    this.state.web3.eth.getAccounts((error, result) => {
      if (error != null) {
        console.log("Could not get accounts");
      } else {
        console.log(result);
        [this.state.web3.eth.defaultAccount] = result;
        const auctionContract = contract(EtherContract);
        auctionContract.setProvider(this.state.web3.currentProvider);
        auctionContract.deployed().then(i => {
          contractInstance = i;
        });
        console.log(this.state.web3);
      }
    });
  }

  formSubmit = e => {
    e.preventDefault();
    console.log("entered form submit");
    const thisInstance = this;

    thisInstance.state.web3.eth.sendTransaction({
      from: "0xfe7237016f99b562064811b8612b72ca1b97f93e",
      to: "0x6bBa72f7bDCa056377F984fccbB69Fb3b1883c07",
      value: thisInstance.state.web3.utils.toWei("5", "ether")
    });
  };

  getAmount = e => {
    e.preventDefault();
    const thisInstance = this;
    contractInstance.getAmount
      .call({ from: thisInstance.state.web3.eth.defaultAccount })
      .then(res => {
        console.log(res);
        if (res) {
          console.log("*****************************");
          console.log(res);

          thisInstance.setState({ successful: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Reward for the saviour</h1>
        <div className="ether">
          <center>
            <div className="etherCard">
              <h1 style={{ fontSize: 100 }}>5 Ether</h1>
              <form onSubmit={this.formSubmit}>
                <select style={{ padding: 10, marginLeft: -5 }}>
                  <option value="account1">
                    0xDff48E720C457971B68EC92C4a1E4E14D24C1642
                  </option>
                  <option value="account2">
                    0xAc1746510eE6ce802a5c67Fb52dBB44dAb0B0689
                  </option>
                  <option value="account3">
                    0x6bBa72f7bDCa056377F984fccbB69Fb3b1883c07
                  </option>
                  <option value="account4">
                    0x0B1BB68BD14a82C806C2e2248729d7b1B10f8f38
                  </option>
                </select>
                <br />
                <br />
                <center>
                  <button
                    style={{ padding: 10, fontWeight: "bold" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </center>
              </form>
              <br />
              <br />
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default EtherTransfer;
