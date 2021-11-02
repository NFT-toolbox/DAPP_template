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
               }
            ]

            var SmartContract
            var signer
            var SmartContractAddress = "0xc4f22988dC9f33b8EB13546023a96a8026763aBc";

            async function connect() {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
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

                    //console.log(SmartContractABI);
                    //const signer = provider.getSigner()
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    var msgSender = await signer.getAddress();
                    // console.log("Account:", msgSender);
                    // console.log("chainId is:", SmartContractAddress) 
                    // console.log("chainId is:", SmartContractABI) 
                    // console.log("chainId is:", signer) 
                    let SmartContract = new ethers.Contract(SmartContractAddress, SmartContractABI, signer);
                    //YOUR NFT PRICE IS HERE
                    const price = ethers.utils.parseUnits("0.0", "ether");
                    console.log("Start Minting Amount: ", price);
                    mintedNFT = await SmartContract.mint(msgSender, {value:price,  gasLimit: 285000})
                    console.log("Minted NFT: ", mintedNFT);
                    document.getElementById("result").innerHTML = mintedNFT.hash;
                } catch (error) {
                    console.error(error);
                    document.getElementById("result").innerHTML = error.message;
                }
            }
