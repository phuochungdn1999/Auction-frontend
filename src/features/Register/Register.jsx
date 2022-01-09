import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./Register.module.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grow from "@material-ui/core/Grow";
import Header from "../../components/Header/Header";
import Textarea from "./components/TextArea/TextArea";
import From from "./components/From/From";
import To from "./components/To/To";
import Category from "./components/Category/Category";
import Importimg from "./components/ImportImg/ImportImg";
import { useMoralisFile, useMoralis } from "react-moralis";
import AccountContext from "../../Stores/StoreAddress";
import BigNumber from "bignumber.js";
import axios from "axios";
import { useHistory } from "react-router";

const Web3 = require("web3");
const auctionAbi = require("../../abi/auction.json");

const Create = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageLogo, setImageLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [logoName, setLogoName] = useState("");
  const [imagesName, setImagesName] = useState("");
  const [description, setDescription] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const accountCtx = useContext(AccountContext);
  const contractAddress = "0xB0b03b0a469f3A60F92C09504AdA25D832D8e06e";
  const web3 = new Web3(accountCtx.rpc);
  const [from, setFrom] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [to, setTo] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
      new Date().getDate() + 1
    }`
  );
  const [validate, setValidate] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { authenticate, isAuthenticated, user } = useMoralis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      window.scrollTo(0, 0);
      console.log("isAuthenticated", isAuthenticated);
      console.log("isAuthenticated", user);
      if (!isAuthenticated) {
        await authenticate();
        console.log("isAuthenticated", isAuthenticated);
        console.log("isAuthenticated", user);
      }
      const getAuctionAPI = `http://localhost:3002/categories`;
      console.log("getAuctionAPI", getAuctionAPI);

      const res = await axios(getAuctionAPI);
      console.log(res.data.data.category);
      setCategories(res.data.data.category);
    } catch (error) {
      console.log(error);
      alert("Xảy ra lỗi");
    }
  }, []);

  const captureImageLogo = async (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        setLogoName(file.name);
        const temp = [...validate];
        temp[0] = 1;
        setValidate(temp);
        console.log("authen", isAuthenticated);

        const image = Array.from(Buffer(reader.result));
        const result = await saveFile("batman.jpeg", image, {
          saveIPFS: true,
        });
        console.log("result", isAuthenticated);
        console.log("result", result);
        setImageLogo(result.ipfs());
      };
    }
  };
  const captureImages = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      console.log("authen", isAuthenticated);

      console.log(reader);
      const arr = [...images];
      const arrName =
        imagesName.length === 0 ? file.name : imagesName + "\n" + file.name;
      console.log(arrName);
      const temp = [...validate];
      temp[1] = 1;
      setValidate(temp);
      setImagesName(arrName);

      console.log("authen", isAuthenticated);

      const image = Array.from(Buffer(reader.result));
      const result = await saveFile("batman.jpeg", image, {
        saveIPFS: true,
      });
      arr.push(result.ipfs());
      console.log("ipfs", result.ipfs());
      setImages(arr);
      console.log(images);
    };
  };

  const handleChangeName = (event) => {
    const temp = [...validate];
    temp[2] = 1;
    setValidate(temp);
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    const temp = [...validate];
    temp[3] = 1;
    setValidate(temp);
    setDescription(event.target.value);
  };
  const handleChangeFrom = (event) => {
    const temp = [...validate];
    temp[4] = 1;
    setValidate(temp);
    setFrom(event.target.value);
  };
  const handleChangeTo = (event) => {
    const temp = [...validate];
    temp[5] = 1;
    setValidate(temp);
    setTo(event.target.value);
  };

  const handleChangePrice = (event) => {
    const temp = [...validate];
    temp[6] = 1;
    setValidate(temp);
    setPrice(event.target.value);
  };
  const handleStepPrice = (event) => {
    setStepPrice(event.target.value);
  };
  const handleCategory = (event) => {
    console.log(event.target.value);
    console.log("categorylist", categoryList);
    let temp = categoryList;
    console.log("temp", temp);
    if (temp.find((item) => item === event.target.value)) {
      console.log("123");
      temp = temp.filter((item) => item !== event.target.value);
    } else {
      console.log("456");
      temp.push(event.target.value);
    }
    setCategoryList(temp);
    if (temp.length !== 0) {
      console.log("99999");
      const valiteCategory = [...validate];
      valiteCategory[7] = 1;
      setValidate(valiteCategory);
    }
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const submitHandler = async () => {
    setLoading(true);

    console.log(new Date(from).getTime() / 1000);
    let arr = [0, 0, 0, 0, 0, 0, 0, 0];
    if (imageLogo) {
      arr[0] = 1;
    }
    if (images.length !== 0) {
      console.log(images);
      arr[1] = 1;
    }
    if (name) {
      arr[2] = 1;
    }
    if (description) {
      arr[3] = 1;
    }
    if (from) {
      arr[4] = 1;
    }
    if (to) {
      arr[5] = 1;
    }
    if (price) {
      arr[6] = 1;
    }
    if (categoryList.length !== 0) {
      arr[7] = 1;
    }
    setValidate(arr);
    try {
      const obj = {
        name,
        description,
        reserveBid: new BigNumber(price).multipliedBy(10 ** 18),
        start: Math.floor(new Date(from).getTime() / 1000),
        end: Math.floor(new Date(to).getTime() / 1000),
        imageLogo,
        images,
        stepBid: stepPrice
          ? new BigNumber(stepPrice).multipliedBy(10 ** 18)
          : 0,
        categoryList,
      };
      console.log("obj123123", obj);
      const token = accountCtx.token;
      const account = accountCtx.account;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const auction = await fetch("http://localhost:3002/auctions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(obj),
      });
      const data = await auction.json();
      console.log(data);
      const objCard = {
        nameOfCard: data.data.auction.name,
        from: data.data.auction.start,
        to: data.data.auction.end,
        reserveBid: new BigNumber(data.data.auction.reserveBid).toString(),
        stepBid: new BigNumber(data.data.auction.stepBid).toString(),
      };
      console.log("objcard", objCard);
      const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
      const dataApprove = contractERC721.methods.addNewCard(
        account,
        data.data.auction.id,
        objCard
      );
      const addNewAuctionObj = {
        // nonce: nonce.toString(),
        from: account,
        to: contractAddress,
        value: web3.utils.toHex(0),
        data: dataApprove.encodeABI(),
      };

      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [addNewAuctionObj],
      });

      console.log({ txHash });

      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt: ", transactionReceipt);
      history.push("/productList");
    } catch (error) {
      console.log("reject", error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.body1}>
      <Header />
      {console.log(images)}
      {/* {loading? <h1>loading</h1>:<h2>eubn</h2>} */}
      <div className={styles.body}>
        <Grow in timeout={1500}>
          <div className={styles.col7}>
            <div className={styles.signInForm}>
              <div className={styles.titles}>
                <div className={styles.titleForm}>Create</div>
              </div>
              <ValidatorForm
                className={styles.FormControl}
                onSubmit={submitHandler}
              >
                <div class="mb-3">
                  <label
                    for="formFileLg"
                    class="form-label"
                    className={styles.name}
                  >
                    Auction Main Image
                  </label>
                  <input
                    class="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                    accept="image/*"
                    onChange={captureImageLogo}
                  />
                  {imageLogo !== null ? (
                    <span class="pt-2">{logoName}</span>
                  ) : null}
                  {validate[0] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>

                <div class="mb-5">
                  <label
                    for="formFileMultiple"
                    class="form-label"
                    className={styles.name}
                  >
                    Auction Images
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFileMultiple"
                    accept="image/*"
                    multiple
                    onChange={captureImages}
                  />
                  {imagesName.length > 0 ? <span>{imagesName}</span> : null}
                  {validate[1] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>

                <div class="mb-3">
                  <label for="name" class="form-label" className={styles.name}>
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Auction"
                    onChange={handleChangeName}
                  />
                  {validate[2] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>

                <div class="mb-3 mt-2">
                  <label
                    for="description"
                    class="form-label"
                    className={styles.name}
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    rows="3"
                    placeholder="This is description"
                    onChange={handleChangeDescription}
                  ></textarea>
                  {validate[3] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>
                <div class="row g-2 mb-3 mt-3">
                  <div class="col-md">
                    <div class="form-floating">
                      <input
                        type="date"
                        class="form-control"
                        id="from"
                        placeholder={`${new Date().getFullYear()}-${
                          new Date().getMonth() + 1
                        }-${new Date().getDate()}`}
                        value={from}
                        onChange={handleChangeFrom}
                      />
                      <label for="floatingInputGrid">From</label>
                    </div>
                    {validate[4] === 0 ? (
                      <span class="pt-2">This field is require</span>
                    ) : null}
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                      <input
                        type="date"
                        class="form-control"
                        id="to"
                        onChange={handleChangeTo}
                        value={to}
                      />
                      <label for="floatingInputGrid">To</label>
                    </div>
                    {validate[5] === 0 ? (
                      <span class="pt-2">This field is require</span>
                    ) : null}
                  </div>
                </div>
                <div class="mb-3 mt-2">
                  <label for="price" class="form-label" className={styles.name}>
                    Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="price"
                    placeholder="1 ETH"
                    onChange={handleChangePrice}
                  />
                  {validate[6] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>
                <div class="mb-3 mt-2">
                  <label for="price" class="form-label" className={styles.name}>
                    Step Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="price"
                    placeholder="1 ETH"
                    onChange={handleStepPrice}
                  />
                </div>
                <div className={styles.name} class="mb-3 mt-2">
                  Category
                  <div class="form-check">
                    {console.log("category", categories.length)}
                    {categories.map((item) => (
                      <div>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id="flexCheckChecked"
                          onChange={handleCategory}
                          // checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {validate[7] === 0 ? (
                    <span class="pt-2">This field is require</span>
                  ) : null}
                </div>

                <div className={styles.btn}>
                  <button
                    className={styles.button}
                    class="btn btn-primary btn-lg"
                  >
                    Create
                  </button>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
};

export default Create;
