import { useState } from 'react'

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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={walletAddress}
          type="text"
          placeholder="Wallet Address"
        />
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collectionAddress}
          type="text"
          placeholder="Collection Address"
        />
        <label>
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            type="checkbox"
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
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Home
