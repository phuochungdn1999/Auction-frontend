import { createContext, useState } from "react";
const AccountContext = createContext({
  addNewAccount: (account) => {},
  addNewChainId: (chainId) => {},
  addNewToken: (token) => {},
  account: null,
  chainId: null,
  token: null,
});

export function AccountContextProvider(props) {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [token, setToken] = useState("");

  function addNewAccountHandler(account) {
    setAccount(account);
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
    account: account,
    chainId: chainId,
    token: token,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;
