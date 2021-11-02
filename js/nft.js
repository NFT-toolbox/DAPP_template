            var SmartContractABI = [
               {
                  "inputs":[
                     {
                        "internalType":"address",
                        "name":"to",
                        "type":"address"
                     }
                  ],
                  "name":"mint",
                  "outputs":[
                     
                  ],
                  "stateMutability":"nonpayable",
                  "type":"function"
               },
               {
                  "inputs":[
                     {
                        "internalType":"address",
                        "name":"to",
                        "type":"address"
                     }
                  ],
                  "name":"ownerMint",
                  "outputs":[
                     
                  ],
                  "stateMutability":"nonpayable",
                  "type":"function"
               }
            ]
// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
//const provider = new ethers.providers.Web3Provider(window.ethereum)

// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
//const signer = provider.getSigner()
 //           const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // Prompt user for account connections
  //          await provider.send("eth_requestAccounts", []);
  //         const signer = provider.getSigner();

            // Enable etherum connecting from metamask.
        //    window.ethereum.enable();

            // const provider = detectEthereumProvider()

            // if (provider) {
            //     console.log("Current block number: " + provider);
            // } else {
            //     console.log("Can't get web provider");
            // }

            // Connect Provider ETH/BSC
            // var url = 'https://data-seed-prebsc-1-s1.binance.org:8545'; //BSC TESTNET Network
            // let getProvider = detectEthereumProvider();
            // var provider = new ethers.providers.Web3Provider('https://data-seed-prebsc-1-s1.binance.org:8545');
        //    var provider = new ethers.providers.Web3Provider(web3.currentProvider);
 //           const provider = new ethers.providers.Web3Provider(window.ethereum)
 //           var SmartContractAddress = "0x9D5E8B0Ea0fBb71bca338cE036EC888c749EAFFC";
            //var SmartContractABI needs to be spacified in MaticPirates_mod.json
 //           console.log(SmartContractABI);

            var SmartContract
            var signer

            async function connect() {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                    var SmartContractAddress = "0xc4f22988dC9f33b8EB13546023a96a8026763aBc";
                    //var SmartContractABI needs to be spacified in MaticPirates_mod.json
                    console.log(SmartContractABI);
                    //const signer = provider.getSigner()
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    console.log("Account:", await signer.getAddress());
                    // provider.listAccounts().then(function (accounts) {
                    //     signer = provider.getSigner(accounts[0]);
                    //     //SmartContract = new ethers.Contract(SmartContractAddress, SmartContractABI, signer);
                    // })
                    console.log(signer);
                    var address_minter = await signer.getAddress()
                    document.getElementById("status").innerHTML = 'connected ' + address_minter.slice(0, 8) + "...";
                } catch (error) {
                    console.error(error);
                    document.getElementById("result").innerHTML = 'Please install Metamask';
                }

            }

       /*     try {
                connection = connect()
                if (connection){
                    console.log("Connected");
                }
            } catch (error) {
              //  var myDiv = document.getElementById("result");
                //var myDiv = document.getElementsByTagName('body')[0]
             //   myDiv.setAttribute("style", "backdrop-filter: blur(50px);");
                console.error(error);
                document.getElementById("result").innerHTML = 'something went wrong Metamask';
            }
*/
            async function getNetworkId(){
                var chainId
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    //await connect();
                    const { chainId } = await provider.getNetwork()
                    console.log("chainId is:", chainId) 
                    return chainId
                } catch (error) {
                    var myDiv = document.getElementById("result");
                    //var myDiv = document.getElementsByTagName('body')[0]
                    //myDiv.setAttribute("style", "backdrop-filter: blur(50px);");
                    console.error(error);
                    document.getElementById("result").innerHTML = error.message;
                }
                return chainId
            }


            async function mint() {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    if (await getNetworkId() !== 80001){
                        throw ({'message':"Please connect to Polygon Testnet"});
                    }
                    var SmartContractAddress = "0xc4f22988dC9f33b8EB13546023a96a8026763aBc";
                    //var SmartContractABI needs to be spacified in MaticPirates_mod.json
                    console.log(SmartContractABI);
                    //const signer = provider.getSigner()
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    var msgSender = await signer.getAddress();
                    // console.log("Account:", msgSender);
                    // console.log("chainId is:", SmartContractAddress) 
                    // console.log("chainId is:", SmartContractABI) 
                    // console.log("chainId is:", signer) 
                    let SmartContract = new ethers.Contract(SmartContractAddress, SmartContractABI, signer);
                    // var amount = document.getElementById("amount").value;
                    //const price = ethers.utils.parseUnits("0.0", "ether");
                    //console.log("Start Minting Amount: ", price);
                    mintedNFT = await SmartContract.mint(msgSender, {value:0,  gasLimit: 285000})
                    console.log("Minted NFT: ", mintedNFT);
                    document.getElementById("result").innerHTML = mintedNFT.hash;
                } catch (error) {
                    console.error(error);
                    document.getElementById("result").innerHTML = error.message;
                }
            }
