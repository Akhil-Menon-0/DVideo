import React, { useState, useContext, useEffect } from 'react';
import Context from './Context/Context';
import DVideo from '../abis/Primary.json'
import Web3 from 'web3';
import './App.css';
import { Switch } from "react-router-dom";

import Home from './Home/Home'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import PrivateProfile from './Profile/PrivateProfile'
import PublicProfile from './Profile/PublicProfile'
import UploadOption from './UploadVid/UploadOption'
import UploadForm from './UploadVid/UploadForm'
import ViewVideo from './ViewVideo/ViewVideo'
import Navbar from './Navbar/Navbar'
import SearchResults from './SearchResults/SearchResults'
import PrivateProfilePlaylist from './Profile/PrivateProfilePlaylist'
import AllTransactions from './Transactions/AllTransactions';
import InvalidPage from './Error404/InvalidPage'
import PublicRoute from './Routes/PublicRoute'
import PrivateRoute from './Routes/PrivateRoute'

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    window.location.href = "https://metamask.io/"
  }
}

async function loadBlockchainData(setAccount, setContract) {
  window.ethereum.on('accountsChanged', function (accounts) {
    window.alert("Account changed.Refreshing...")
    window.location.reload()
  })
  window.ethereum.on('networkChanged', function (networkId) {
    window.alert("Network changed.Refreshing...")
    window.location.reload()
  })
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()
  setAccount(accounts[0])  //saving account in context
  // Network ID
  const networkId = await web3.eth.net.getId()
  const networkData = DVideo.networks[networkId]
  if (networkData) {
    const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
    setContract(dvideo)  //saving video contract in context
    // const videosCount = await dvideo.methods.videoCount().call()
    // setVideoCount(videosCount)

    // // Load videos, sort by newest
    // for (var i = videosCount; i >= 1; i--) {
    //   const video = await dvideo.methods.videos(i).call()
    //   videos.push(video)
    //   setVideos(videos)
    // }

    // //Set latest video with title to view as default 
    // const latest = await dvideo.methods.videos(videosCount).call()
    // setCurrentHash(latest.hash);
    // setCurrentTitle(latest.title);
    return [accounts[0], dvideo];
  } else {
    window.alert('DVideo contract not deployed to detected network.')
    window.location.reload()
  }
}

async function getUserFromLocalStorage(account, setUser, setTransactions, contract) {
  let userSession = JSON.parse(window.localStorage.getItem(account))
  if (userSession !== null) {
    let user = await contract.methods.PublicKey_User(userSession.publicKey).call();
    let subscriptions = await contract.methods.getUserSubscriptions(user.publicKey).call();
    let likedVideos = await contract.methods.getUserPlaylist(user.publicKey, "liked").call();
    let savedVideos = await contract.methods.getUserPlaylist(user.publicKey, "later").call();
    let myVideos=await contract.methods.getUserVideos(user.publicKey).call();
    user.subscriptions = subscriptions
    user.liked = likedVideos
    user.saved = savedVideos
    user.myVideos=myVideos
    setUser(user) //create user of context from userSession
    setTransactions(userSession.transactions)
  }
}

function App() {

  const [init, setinit] = useState(true)
  const { account, setUser, setTransactions, contract, setContract, setAccount } = useContext(Context)
  useEffect(() => {
    async function fetchData() {
      setinit(true)
      await loadWeb3();

      const localUseResult = await loadBlockchainData(setAccount, setContract);
      await getUserFromLocalStorage(localUseResult[0], setUser, setTransactions, localUseResult[1])
      setinit(false)
    }
    fetchData();
  }, [])



  if (init === true) {
    return (
      <h1>Loading...</h1>
    )
  }


  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact={true} strict={true} />
        <PublicRoute restricted={true} component={Login} path="/login" exact={true} strict={true} />
        <PublicRoute restricted={true} component={Signup} path="/signup" exact={true} strict={true} />
        <PrivateRoute component={PrivateProfile} path="/profile" exact={true} strict={true} />
        <PublicRoute restricted={false} component={PublicProfile} path="/publicProfile/:userId" exact={true} strict={true} />
        <PrivateRoute component={UploadOption} path="/upload" exact={true} strict={true} />
        <PrivateRoute component={UploadForm} path="/upload/:uploadOption" exact={true} strict={true} />
        <PublicRoute restricted={false} component={ViewVideo} path="/video/:videoId" exact={true} strict={true} />
        <PublicRoute restricted={false} component={SearchResults} path="/search/" exact={true} strict={true} />
        <PrivateRoute component={PrivateProfilePlaylist} path="/playlist/:playlistName" exact={true} strict={true} />
        <PrivateRoute component={AllTransactions} path="/profile/transactions" exact={true} strict={true} />
        <PublicRoute restricted={false} component={InvalidPage} />
      </Switch >
    </React.Fragment>
  )
}

export default App;