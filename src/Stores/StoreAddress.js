import { createContext, useState } from "react";
const AccountContext = createContext({
  addNewAccount: (account) => {},
  addNewChainId: (chainId) => {},
  addNewToken: (token) => {},
  addNewRrpc: (rpc) => {},
  account: null,
  chainId: null,
  token: null,
  rpc: null,
});

export function AccountContextProvider(props) {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [token, setToken] = useState("");
  const [rpc, setNewRpc] = useState("");

  function addNewAccountHandler(account) {
    setAccount(account);
  }
  function addNewRpcHandler(rpc) {
    setNewRpc(rpc);
  }
  function addNewChainIdHandler(chainId) {
    setChainId(chainId);
  }
  function addNewTokenHandler(token) {
    setToken(token);
  }
  const context = {
    addNewAccount: addNewAccountHandler,
    addNewChainId: addNewChainIdHandler,
    addNewToken: addNewTokenHandler,
    addNewRpc: addNewRpcHandler,
    account: account,
    chainId: chainId,
    token: token,
    rpc: rpc,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;
