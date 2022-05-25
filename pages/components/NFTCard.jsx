import toast from 'react-hot-toast'
import { ClipboardCopyIcon } from '@heroicons/react/solid'

export const NFTCard = ({ nft }) => {
  const ETHERSCAN_URL = 'https://etherscan.io/address/'
  const OPENSEA_URL = 'https://opensea.io/assets/ethereum/'

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
    toast.success('Copied address to clipboard!')
  }

  return (
    <div className="flex w-1/4 flex-col">
      <div className="rounded-md">
        <img
          src={nft.media[0].gateway}
          className="h-128 w-full rounded-t-xl object-cover"
        />
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-xl bg-slate-100 px-2 py-3">
        <h2 className="text-xl text-gray-800">{nft.title}</h2>
        {!nft.title ? (
          <h2 className="ttext-xl text-gray-800">
            #{parseInt(nft.id.tokenId)}
          </h2>
        ) : null}
        <p className="text-gray-600">ID: {nft.id.tokenId.slice(-4)}</p>

        <div className="flex flex-row items-center text-gray-600">
          <p className="mr-2">{`${nft.contract.address.slice(
            0,
            5
          )}...${nft.contract.address.slice(-4)}`}</p>

          <button className="rounded-full bg-gray-300 p-1">
            <ClipboardCopyIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => {
                copyAddress(nft.contract.address)
              }}
            />
          </button>
        </div>
      </div>

      <div className="mt-2 flex-grow text-sm">
        <p className="text-gray-600">{nft.description?.slice(0, 150)}</p>
      </div>

      <div className="mb-2 flex flex-row items-center justify-center gap-4">
        <a href={`${ETHERSCAN_URL}${nft.contract.address}`} target="_blank">
          <img src="img/etherscan-logo-circle.png" className="h-auto w-8" />
        </a>
        <a
          href={`${OPENSEA_URL}${nft.contract.address}/${parseInt(
            nft.id.tokenId
          )}`}
          target="_blank"
        >
          <img src="img/os-logo-circle.png" className="h-auto w-8" />
        </a>
      </div>
    </div>
  )
}
