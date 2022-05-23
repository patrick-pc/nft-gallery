export const NFTCard = ({ nft }) => {
  const ETHERSCAN_URL = 'https://etherscan.io/address/'
  return (
    <div className="flex w-1/4 flex-col">
      <div className="rounded-md">
        <img
          src={nft.media[0].gateway}
          className="h-128 w-full rounded-t-md object-cover"
        />
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-md bg-slate-100 px-2 py-3">
        <h2 className="text-xl text-gray-800">{nft.title}</h2>
        <p className="text-gray-600">{nft.id.tokenId.slice(-4)}</p>
        <p className="text-gray-600">{`${nft.contract.address.slice(
          0,
          5
        )}...${nft.contract.address.slice(-4)}`}</p>
      </div>

      <div className="mt-2 flex-grow">
        <p className="text-gray-600">{nft.description?.slice(0, 150)}</p>
      </div>

      <div className="mb-1 flex justify-center">
        <a href={`${ETHERSCAN_URL}${nft.contract.address}`} target="_blank">
          View on Block Explorer
        </a>
      </div>
    </div>
  )
}
