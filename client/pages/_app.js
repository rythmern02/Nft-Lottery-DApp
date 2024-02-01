import { ThirdwebProvider, ThirdwebSDK } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { useEffect, useState } from 'react';
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const ethers = require('ethers');

function MyApp({ Component, pageProps }) {
	const sdk = new ThirdwebSDK(LightlinkPegasusTestnet, {
		clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
	});
	const [contract, setContract] = useState()
	const [api3_contract, setApi3_Contract] = useState()
	async function main() {
		// Check if MetaMask is installed
		if (typeof window.ethereum !== 'undefined') {
			// Ask the user to allow this app to access their Ethereum account
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];

			// Create a new provider using MetaMask's provider
			const provider = new ethers.providers.Web3Provider(window.ethereum);

			// The address of the contract you want to connect to
			const CONTRACT_ADDRESS_FOR_NFTS_CONTRACT = '0x007a70C3d7A3Faa0aCEEfD46d1ec0F9428168F99';
			const CONTRACT_ADDRESS_FOR_API3_CONTRACT = '0x878bd402B3Ad9F7808D0b461706af22c4ad182E5';
			// The ABI of the contract
			const CONTRACT_ABI_FOR_NFTS_CONTRACT =
				[
					{
						"inputs": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "uri",
								"type": "string"
							}
						],
						"name": "addNFTToCollection",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "approve",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "deleteNFTData",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [],
						"stateMutability": "nonpayable",
						"type": "constructor"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "sender",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							}
						],
						"name": "ERC721IncorrectOwner",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "operator",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "ERC721InsufficientApproval",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "approver",
								"type": "address"
							}
						],
						"name": "ERC721InvalidApprover",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "operator",
								"type": "address"
							}
						],
						"name": "ERC721InvalidOperator",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							}
						],
						"name": "ERC721InvalidOwner",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "receiver",
								"type": "address"
							}
						],
						"name": "ERC721InvalidReceiver",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "sender",
								"type": "address"
							}
						],
						"name": "ERC721InvalidSender",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "ERC721NonexistentToken",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							}
						],
						"name": "OwnableInvalidOwner",
						"type": "error"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "account",
								"type": "address"
							}
						],
						"name": "OwnableUnauthorizedAccount",
						"type": "error"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": true,
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "address",
								"name": "approved",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "Approval",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": true,
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "address",
								"name": "operator",
								"type": "address"
							},
							{
								"indexed": false,
								"internalType": "bool",
								"name": "approved",
								"type": "bool"
							}
						],
						"name": "ApprovalForAll",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"internalType": "uint256",
								"name": "_fromTokenId",
								"type": "uint256"
							},
							{
								"indexed": false,
								"internalType": "uint256",
								"name": "_toTokenId",
								"type": "uint256"
							}
						],
						"name": "BatchMetadataUpdate",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"internalType": "uint256",
								"name": "_tokenId",
								"type": "uint256"
							}
						],
						"name": "MetadataUpdate",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": true,
								"internalType": "address",
								"name": "previousOwner",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "address",
								"name": "newOwner",
								"type": "address"
							}
						],
						"name": "OwnershipTransferred",
						"type": "event"
					},
					{
						"inputs": [],
						"name": "renounceOwnership",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "safeMintForUser",
						"outputs": [],
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "safeTransferFrom",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							},
							{
								"internalType": "bytes",
								"name": "data",
								"type": "bytes"
							}
						],
						"name": "safeTransferFrom",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "operator",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "approved",
								"type": "bool"
							}
						],
						"name": "setApprovalForAll",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"anonymous": false,
						"inputs": [
							{
								"indexed": true,
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"indexed": true,
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "Transfer",
						"type": "event"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "transferFrom",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "newOwner",
								"type": "address"
							}
						],
						"name": "transferOwnership",
						"outputs": [],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "withdrawFunds",
						"outputs": [],
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							}
						],
						"name": "_nftData",
						"outputs": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "tokenURI",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							}
						],
						"name": "balanceOf",
						"outputs": [
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "getApproved",
						"outputs": [
							{
								"internalType": "address",
								"name": "",
								"type": "address"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "getNFTData",
						"outputs": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "tokenURI",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "operator",
								"type": "address"
							}
						],
						"name": "isApprovedForAll",
						"outputs": [
							{
								"internalType": "bool",
								"name": "",
								"type": "bool"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "name",
						"outputs": [
							{
								"internalType": "string",
								"name": "",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "owner",
						"outputs": [
							{
								"internalType": "address",
								"name": "",
								"type": "address"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "ownerOf",
						"outputs": [
							{
								"internalType": "address",
								"name": "",
								"type": "address"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "bytes4",
								"name": "interfaceId",
								"type": "bytes4"
							}
						],
						"name": "supportsInterface",
						"outputs": [
							{
								"internalType": "bool",
								"name": "",
								"type": "bool"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "symbol",
						"outputs": [
							{
								"internalType": "string",
								"name": "",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							}
						],
						"name": "tokenURI",
						"outputs": [
							{
								"internalType": "string",
								"name": "",
								"type": "string"
							}
						],
						"stateMutability": "view",
						"type": "function"
					}
				];
			
			const CONTRACT_ABI_FOR_API3_CONTRACT = [
				{
					"inputs": [
						{
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						},
						{
							"internalType": "bytes",
							"name": "data",
							"type": "bytes"
						}
					],
					"name": "fulfillUint256",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						},
						{
							"internalType": "bytes",
							"name": "data",
							"type": "bytes"
						}
					],
					"name": "fulfillUint256Array",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "makeRequestUint256",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "size",
							"type": "uint256"
						}
					],
					"name": "makeRequestUint256Array",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_airnodeRrp",
							"type": "address"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "previousOwner",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}
					],
					"name": "OwnershipTransferred",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "response",
							"type": "uint256"
						}
					],
					"name": "ReceivedUint256",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						},
						{
							"indexed": false,
							"internalType": "uint256[]",
							"name": "response",
							"type": "uint256[]"
						}
					],
					"name": "ReceivedUint256Array",
					"type": "event"
				},
				{
					"inputs": [],
					"name": "renounceOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						}
					],
					"name": "RequestedUint256",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "bytes32",
							"name": "requestId",
							"type": "bytes32"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "size",
							"type": "uint256"
						}
					],
					"name": "RequestedUint256Array",
					"type": "event"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_airnode",
							"type": "address"
						},
						{
							"internalType": "bytes32",
							"name": "_endpointIdUint256",
							"type": "bytes32"
						},
						{
							"internalType": "bytes32",
							"name": "_endpointIdUint256Array",
							"type": "bytes32"
						},
						{
							"internalType": "address",
							"name": "_sponsorWallet",
							"type": "address"
						}
					],
					"name": "setRequestParameters",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}
					],
					"name": "transferOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "withdraw",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "airnode",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "sponsorWallet",
							"type": "address"
						}
					],
					"name": "WithdrawalRequested",
					"type": "event"
				},
				{
					"stateMutability": "payable",
					"type": "receive"
				},
				{
					"inputs": [],
					"name": "_qrngUint256",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"name": "_qrngUint256Array",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "airnode",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "airnodeRrp",
					"outputs": [
						{
							"internalType": "contract IAirnodeRrpV0",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "endpointIdUint256",
					"outputs": [
						{
							"internalType": "bytes32",
							"name": "",
							"type": "bytes32"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "endpointIdUint256Array",
					"outputs": [
						{
							"internalType": "bytes32",
							"name": "",
							"type": "bytes32"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "bytes32",
							"name": "",
							"type": "bytes32"
						}
					],
					"name": "expectingRequestWithIdToBeFulfilled",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "getRandomNumber",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "getRandomNumberArray",
					"outputs": [
						{
							"internalType": "uint256[]",
							"name": "",
							"type": "uint256[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "owner",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "sponsorWallet",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];

			// Create a new contract instance
			const contract = new ethers.Contract(CONTRACT_ADDRESS_FOR_NFTS_CONTRACT, CONTRACT_ABI_FOR_NFTS_CONTRACT, provider.getSigner());
			const name = await contract.name();
			const api3_contract = new ethers.Contract(CONTRACT_ADDRESS_FOR_API3_CONTRACT, CONTRACT_ABI_FOR_API3_CONTRACT, provider.getSigner());
			setContract(contract);
			setApi3_Contract(api3_contract);


		} else {
			console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
		}
	}
	//   contractsetter()
	useEffect(() => {
		main()
	}, [])


	return (
		<ThirdwebProvider
			activeChain={LightlinkPegasusTestnet}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Component {...pageProps} contract={contract} api3_contract={api3_contract} classname="container" />
		</ThirdwebProvider>
	);
}

export default MyApp;
