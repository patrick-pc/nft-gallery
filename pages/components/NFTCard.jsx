export const NFTCard = ({ nft }) => {
  const ETHERSCAN_URL = 'https://etherscan.io/address/'
  return (
    <div>
      <div>
        <img src={nft.media[0].gateway} alt="" />
      </div>
      <div>
        <h2>{nft.title}</h2>
        <p>{nft.id.tokenId.slice(-4)}</p>
        <p>{`${nft.contract.address.slice(0, 5)}...${nft.contract.address.slice(
          -4
        )}`}</p>
      </div>

      <div>
        <p>{nft.description?.slice(0, 150)}</p>
      </div>
      <div>
        <a href={`${ETHERSCAN_URL}${nft.contract.address}`} target="_blank">View on Block Explorer</a>
      </div>
    </div>
  )
}
