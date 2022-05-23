import { useState } from 'react'
import { NFTCard } from './components/NFTCard'

const Home = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')
  const [nfts, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const fetchNFTs = async () => {
    const requestOptions = {
      method: 'GET',
    }
    const ALCHEMY_API_KEY = 'WJmgY6f5Ui7vG6KAztih5pay0L_ILX36'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTs/`
    let nfts

    console.log('fetching nfts')
    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${walletAddress}`

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log('fetching nfts from collection')
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log(nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      const requestOptions = {
        method: 'GET',
      }
      const ALCHEMY_API_KEY = 'WJmgY6f5Ui7vG6KAztih5pay0L_ILX36'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${true}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )

      if (nfts) {
        console.log(nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          disabled={fetchForCollection}
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={walletAddress}
          type="text"
          placeholder="Wallet Address"
          className="w-2/5 rounded-lg bg-slate-100 p-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        />
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collectionAddress}
          type="text"
          placeholder="Collection Address"
          className="w-2/5 rounded-lg bg-slate-100 p-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        />
        <label className="cursor-pointer text-gray-500">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            type="checkbox"
            className="mr-2"
          />
          Fetch for collection
        </label>
        <button
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }}
          className="mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 disabled:bg-slate-500"
        >
          Search
        </button>
      </div>
      <div className="flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {nfts.length &&
          nfts.map((nft) => {
            return <NFTCard nft={nft} id={nft.id.tokennId} />
          })}
      </div>
    </div>
  )
}

export default Home
