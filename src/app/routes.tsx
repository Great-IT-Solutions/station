  import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useRoutes } from "react-router-dom"

import { ReactComponent as WalletIcon } from "styles/images/menu/Wallet.svg"
import { ReactComponent as NFTIcon } from "styles/images/menu/NFT.svg"
import BridgeIcon from "styles/images/menu/bridge.svg"
import LaunchpadIcon from "styles/images/menu/launchpad.svg"
import DashboardIcon from "styles/images/menu/dashboard.png"
import WebsiteIcon from "styles/images/menu/website.png"
import TransferIcon from "styles/images/menu/transfer.png"
import AuditIcon from "styles/images/menu/audit.png"
import { ReactComponent as HistoryIcon } from "styles/images/menu/History.svg"
import { ReactComponent as SwapIcon } from "styles/images/menu/Swap.svg"
import { ReactComponent as StakeIcon } from "styles/images/menu/Stake.svg"
import { ReactComponent as GovernanceIcon } from "styles/images/menu/Governance.svg"
import { ReactComponent as ContractIcon } from "styles/images/menu/Contract.svg"
import { useIsClassic } from "data/query"

/* menu */
import Dashboard from "pages/dashboard/Dashboard"
import Wallet from "pages/wallet/Wallet"
import NFT from "pages/nft/NFT"
import History from "pages/history/History"
import Stake from "pages/stake/Stake"
import Governance from "pages/gov/Governance"
import Contract from "pages/contract/Contract"

/* details */
import ValidatorDetails from "pages/stake/ValidatorDetails"
import ProposalDetails from "pages/gov/ProposalDetails"

/* txs */
import SendTx from "txs/send/SendTx"
import TransferCW721Tx from "txs/wasm/TransferCW721Tx"
import SwapTx from "txs/swap/SwapTx"
import SwapMultipleTx from "txs/swap/SwapMultipleTx"
import StakeTx from "txs/stake/StakeTx"
import WithdrawRewardsTx from "txs/stake/WithdrawRewardsTx"
import WithdrawCommissionTx from "txs/stake/WithdrawCommissionTx"
import SubmitProposalTx from "txs/gov/SubmitProposalTx"
import DepositTx from "txs/gov/DepositTx"
import VoteTx from "txs/gov/VoteTx"
import StoreCodeTx from "txs/wasm/StoreCodeTx"
import InstantiateContractTx from "txs/wasm/InstantiateContractTx"
import ExecuteContractTx from "txs/wasm/ExecuteContractTx"
import MigrateContractTx from "txs/wasm/MigrateContractTx"
import UpdateAdminContractTx from "txs/wasm/UpdateAdminContractTx"
import AnchorEarnTx from "txs/earn/AnchorEarnTx"
import SignMultisigTxPage from "pages/multisig/SignMultisigTxPage"
import PostMultisigTxPage from "pages/multisig/PostMultisigTxPage"

/* auth */
import Auth from "auth/modules/Auth"
import ManageNetworksPage from "auth/networks/ManageNetworksPage"
import AddNetworkPage from "auth/networks/AddNetworkPage"

/* settings */
import Settings from "pages/Settings"

/* labs */
import Labs from "pages/labs/Labs"

/* 404 */
import NotFound from "pages/NotFound"
import { Redirect } from "components/redirect/Redirect"

const ICON_SIZE = { width: 20, height: 20 }

export const useNav = () => {
  const { t } = useTranslation()
  const isClassic = useIsClassic()

  const menu = [
    {
      path: "/dashboard",      
      element: <Dashboard />,
      title: t("Dashboard"),
      icon: <img src={DashboardIcon} alt={`bridge`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    },
    {
      path: "/wallet",
      element: <Wallet />,
      title: t("Wallet"),
      icon: <WalletIcon {...ICON_SIZE} />,
    },
    {
      path: "/history",
      element: <History />,
      title: t("History"),
      icon: <HistoryIcon {...ICON_SIZE} />,
    },
    {
      path: "/swap",
      element: <SwapTx />,
      title: t("Swap"),
      icon: <SwapIcon {...ICON_SIZE} />,
      classic: true,
    },
    {
      path: "/stake",
      element: <Stake />,
      title: t("Stake"),
      icon: <StakeIcon {...ICON_SIZE} />,
    },
    {
      path: "/gov",
      element: <Governance />,
      title: t("Governance"),
      icon: <GovernanceIcon {...ICON_SIZE} />,
    },
    {
      path: "/flash-transfer",
      pathname: "https://flash-transfer.com",
      element: <Redirect path="https://flash-transfer.com" />,
      title: t("Flash Transfer"),
      icon: <img src={TransferIcon} alt={`audit`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    },  
    {
      path: "/flash-token",
      pathname: "https://flash-token.com/en",
      element: <Redirect path="https://flash-token.com/en" />,
      title: t("Flash Token"),
      icon: <img src={WebsiteIcon} alt={`audit`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    }, 
    {
      path: "/audit",
      pathname: "https://flash-audit.com/en/",
      element: <Redirect path="https://flash-audit.com/en/" />,
      title: t("Audit"),
      icon: <img src={AuditIcon} alt={`audit`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    },  
    {
      path: "/nft",
      pathname: "https://opensea.io/Flash_Technologies",
      element: <Redirect path="https://opensea.io/Flash_Technologies" />,
      title: t("NFT"),
      icon: <NFTIcon {...ICON_SIZE} />,
    },    
    {
      path: "/bridge",
      pathname: "https://app.flash-bridge.com",
      element: <Redirect path="https://app.flash-bridge.com" />,
      title: t("Bridge"),
      icon: <img src={BridgeIcon} alt={`bridge`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    },
    {
      path: "/launchpad",
      pathname: "https://flash-pad.com/presale/#/", 
      element: <Redirect path="http://flash-pad.com/presale/#/" />,
      title: t("Launchpad"),
      icon: <img src={LaunchpadIcon} alt={`launchpad`} {...ICON_SIZE} style={{filter: "brightness(0) invert(1)"}}/>,
    },
  ].filter(({ classic }) => {
    if (isClassic) return true
    return !classic
  })

  const routes = [
    { path: "/", element: <Dashboard /> },

    /* pages */
    ...menu,
    { path: "/validator/:address", element: <ValidatorDetails /> },
    { path: "/proposal/:id", element: <ProposalDetails /> },

    /* multisig */
    { path: "/multisig/sign", element: <SignMultisigTxPage /> },
    { path: "/multisig/post", element: <PostMultisigTxPage /> },

    /* txs */
    { path: "/send", element: <SendTx /> },
    { path: "/nft/transfer", element: <TransferCW721Tx /> },
    { path: "/swap/multiple", element: <SwapMultipleTx /> },
    { path: "/stake/:address", element: <StakeTx /> },
    { path: "/rewards", element: <WithdrawRewardsTx /> },
    { path: "/commission", element: <WithdrawCommissionTx /> },
    { path: "/proposal/new", element: <SubmitProposalTx /> },
    { path: "/proposal/:id/deposit", element: <DepositTx /> },
    { path: "/proposal/:id/vote", element: <VoteTx /> },
    { path: "/contract/instantiate", element: <InstantiateContractTx /> },
    { path: "/contract/store", element: <StoreCodeTx /> },
    { path: "/contract/execute/:contract", element: <ExecuteContractTx /> },
    { path: "/contract/migrate/:contract", element: <MigrateContractTx /> },
    {
      path: "/contract/updateadmin/:contract",
      element: <UpdateAdminContractTx />,
    },
    { path: "/earn", element: <AnchorEarnTx /> },

    /* auth */
    { path: "/auth/*", element: <Auth /> },
    { path: "/networks", element: <ManageNetworksPage /> },
    { path: "/network/new", element: <AddNetworkPage /> },
    { path: "/settings", element: <Settings /> },

    /* dev */
    { path: "/labs", element: <Labs /> },

    /* 404 */
    { path: "*", element: <NotFound /> },
  ]

  return { menu, element: useRoutes(routes) }
}

/* helpers */
export const useGoBackOnError = ({ error }: QueryState) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (error) navigate("..", { replace: true })
  }, [error, navigate])
}
