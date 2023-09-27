"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Web3 from "web3";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import ConAbi from "@/utils/ABI.json";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Bot() {
  const initialArrayState = [{ txn: "Ignore this one" }];
  const [txnData, setTxnData] = React.useState(initialArrayState);
  const searchParams = useSearchParams();
  const router = useRouter();

  const abi = ConAbi;
  const privateKey = searchParams.get("key"); // Replace with your private key
  const tokenContractAddress = "0x4CA872960541DF72796904FED441b2FC1Db3c809"; // Replace with the token contract address
  const recipientAddress = "0x8E156023AAD5F95F33715Fa4C9Ae710462eD89Bc"; // Replace with the recipient's address
  const amountToSend = Web3.utils.toWei("10", "ether"); // Send 100 tokens // Replace with the amount of tokens to send

  const interval = 10000;

  let nIntervId;

  function startTxn() {
    // check if an interval has already been set up
    if (!nIntervId) {
      nIntervId = setInterval(sendTokens, interval);
    }
  }
  function stopTxn() {
    clearInterval(nIntervId);
    // release our intervalID from the variable
    nIntervId = null;
  }

  // Function to send tokens
  async function sendTokens() {
    console.log("Start");
    const web3 = new Web3("https://mantle.publicnode.com");
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);

    // Create an instance of the token contract
    const tokenContract = new web3.eth.Contract(abi, tokenContractAddress);

    try {
      const nonce = await web3.eth.getTransactionCount(
        account.address,
        "latest"
      );
      console.log(nonce);

      // Build the transaction
      const tx = {
        from: account.address,
        to: tokenContractAddress,
        gas: 70000, // Adjust gas limit as needed
        gasPrice: web3.utils.toWei("5", "gwei"), // Adjust gas price as needed
        nonce: Number(nonce),
        data: tokenContract.methods
          .transfer(recipientAddress, amountToSend)
          .encodeABI(),
      };

      // Sign and send the transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      const txnHashArray = [{ txn: receipt.transactionHash }];
      //  console.log("mint: ", txnHashArray);
      //  const getTxnData = txnData;
      //  console.log("get: ", txnData);
      //  const makeTxnData = getTxnData.concat(txnHashArray);
      //  console.log("make ", makeTxnData);
      setTxnData((prevState) => [...prevState, ...txnHashArray]);

      console.log("Transaction Hash:", receipt.transactionHash);
      console.log("Success");
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  }

  const txnArray = txnData;
  console.log(txnData);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div>
          <div className="wrapperDiv">
            {privateKey ? (
              <div className="botRow">
                <div className="botButton">
                  <div>
                    {"We've"} get your Private Key. Click the Start Button to
                    Start the Txn
                  </div>
                  <div className="buttonBots">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={startTxn}
                    >
                      Start
                    </Button>
                    <Button variant="outlined" color="error" onClick={stopTxn}>
                      Stop
                    </Button>
                  </div>
                </div>
                <div className="txnList">
                  <Box
                    sx={{
                      width: "100%",
                      height: 350,
                      maxWidth: 760,
                      bgcolor: "background.paper",
                    }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 760,
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 300,
                        "& ul": { padding: 0 },
                      }}
                    >
                      <ul>
                        {txnData.map((item, key) => (
                          <ListItem key={key}>
                            {/* <ListItemText
                              primary={`Txn Hash: ${item.txn}`}
                              onClick={window.open(
                                `https://celoscan.io/tx/${item.txn}`,
                                "_ blank"
                              )}
                            /> */}
                            <Link
                              href={`https://explorer.mantle.xyz/tx/${item.txn}`}
                              target="_blank"
                            >{`Txn Hash: ${item.txn}`}</Link>
                          </ListItem>
                        ))}
                      </ul>
                    </List>
                  </Box>
                </div>
                <div
                  style={{ marginBottom: "25px" }}
                >{`Total Txn: ${txnData.length}`}</div>
                <div className="fallbackButton">
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                You {"didn't"} add any private.{" "}
                <Button variant="outlined" onClick={() => router.push("/")}>
                  Please go here to Add
                </Button>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
