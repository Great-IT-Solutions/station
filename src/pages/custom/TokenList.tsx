import { Flex } from "components/layout"
import { Fetching, Empty } from "components/feedback"
import TokenItem, { TokenItemProps } from "./TokenItem"
import styles from "./TokenList.module.scss"
import FlashLogo from "../../styles/images/flash-logo.png"

interface Props<T> extends QueryState {
  results: T[]
  renderTokenItem: (item: T) => TokenItemProps

  /* manage tokens */
  list: T[]
  getIsAdded: (item: T) => boolean
  add: (item: T) => void
  remove: (item: T) => void
}

function TokenList<T extends { symbol: string }>(props: Props<T>) {
  const { list, getIsAdded, add, remove, ...rest } = props
  const { results, renderTokenItem, ...state } = rest
  const empty = !state.isLoading && !results.length
  const item = {
    denom: "ibc/14E4FD1AB72DE9BF1D6725CBA18373C406CB9A7DA17955299F3F4DC5C6131A4E",
    path: "transfer/channel-6",
    base_denom: "wmatic-wei",
    symbol: "flash",
    name: "Flash Token",
    icon: FlashLogo,
    decimals: 18
  } as any

  const tokenItem = {
    path: "transfer/channel-6",
    base_denom: "aave-wei",
    name: "Flash Token",
    icon: FlashLogo,
    decimals: 18,
    token: "ibc/2E9CD07D7A6572A4CDAABBF0FBB89F69A9A362818132221182654819E277220A",
    title: "Flash",
    key: "ibc/2E9CD07D7A6572A4CDAABBF0FBB89F69A9A362818132221182654819E277220A"
  } as any

  return state.error || empty ? (
    <Flex className={styles.results}>
      <Empty />
    </Flex>
  ) : (
    // <Fetching {...state} height={2}>
    //   <ul className={styles.results}>
    //     {results
    //       .sort((a, b) => Number(getIsAdded(b)) - Number(getIsAdded(a)))
    //       .map((item) => {
    //         const tokenItem = renderTokenItem(item)
    //         return (
    //           <li key={tokenItem.key}>
    //             <TokenItem
    //               {...tokenItem}
    //               added={getIsAdded(item)}
    //               onAdd={() => add(item)}
    //               onRemove={() => remove(item)}
    //             />
    //           </li>
    //         )
    //       })}
    //   </ul>
    // </Fetching>
    <ul className={styles.results}>
      <li key={'token-1'}>
        <TokenItem
          {...tokenItem}
          added={getIsAdded(item)}
          onAdd={() => add(item)}
          onRemove={() => remove(item)}
        />
      </li>
    </ul>
  )
}

export default TokenList
