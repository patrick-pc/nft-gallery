import { useState, useEffect } from 'react'
import { NFTCard } from './components/NFTCard'

const Home = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const [startToken, setStartToken] = useState(0)
  const [endToken, setEndToken] = useState(startToken + 49)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [prevDisabled, setPrevDisabled] = useState(true)

  const fetchNFTs = async (start, end) => {
    const requestOptions = {
      method: 'GET',
    }
    const ALCHEMY_API_KEY = 'WJmgY6f5Ui7vG6KAztih5pay0L_ILX36'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTs/`
    let nfts

    console.log('fetching nfts')
    if (walletAddress.length && !collectionAddress.length) {
      console.log('1')
      const fetchURL = `${baseURL}?owner=${walletAddress}`

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else if (walletAddress.length && collectionAddress.length) {
      console.log('fetching nfts from collection')
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}&startToken=${start}&endToken=${end}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log(nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async (start, end) => {
    if (collectionAddress.length) {
      const requestOptions = {
        method: 'GET',
      }
      const ALCHEMY_API_KEY = 'WJmgY6f5Ui7vG6KAztih5pay0L_ILX36'
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${true}&startToken=${start}&endToken=${end}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )

      if (nfts) {
        console.log(nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  const handlePreviousClick = () => {
    console.log('prev')
    const start = startToken - 50
    const end = endToken - 50

    start === 0 ? setPrevDisabled(true) : setPrevDisabled(false)

    fetchNFTsForCollection(start, end)
    setStartToken(start)
    setEndToken(end)
  }

  const handleNextClick = () => {
    console.log('next')
    const start = endToken + 1
    const end = endToken + 50

    setPrevDisabled(false)
    NFTs.length < 50 ? setNextDisabled(true) : setNextDisabled(false)

    fetchNFTsForCollection(start, end)
    setStartToken(start)
    setEndToken(end)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 py-8">
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
              fetchNFTsForCollection(startToken, endToken)
            } else {
              fetchNFTs(startToken, endToken)
            }
          }}
          className="mt-3 w-1/5 rounded-lg bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500"
        >
          Search
        </button>
      </div>

      {NFTs.length > 0 && (
        <>
          <div className="flex flex-row gap-4">
            <button
              className="w-24 rounded-xl bg-gray-200 px-5 py-1"
              onClick={handlePreviousClick}
              disabled={prevDisabled}
            >
              Previous
            </button>
            <button
              className="w-24 rounded-xl bg-gray-200 px-5 py-1"
              onClick={handleNextClick}
              disabled={nextDisabled}
            >
              Next
            </button>
          </div>

          <div className="flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-12">
            {NFTs.length &&
              NFTs.map((nft, index) => {
                return <NFTCard nft={nft} key={index} />
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
