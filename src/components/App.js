import React, { Component, useState, useContext, useEffect } from 'react';
import DVideo from '../abis/DVideo.json'
import Web3 from 'web3';
import './App.css';
import { Route } from "react-router-dom";
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
import InvalidPage from './Error404/InvalidPage'

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
  }
}

async function loadBlockchainData(setAccount, setVideoContract, setUserContract, setVideoCount, setVideos, videos, setCurrentHash, setCurrentTitle, setinit) {
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()
  setAccount(accounts[0])  //saving account in context
  // Network ID
  const networkId = await web3.eth.net.getId()
  const networkData = DVideo.networks[networkId]
  if (networkData) {
    const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
    setVideoContract(dvideo)  //saving video contract in context
    const videosCount = await dvideo.methods.videoCount().call()
    setVideoCount(videosCount)

    // Load videos, sort by newest
    for (var i = videosCount; i >= 1; i--) {
      const video = await dvideo.methods.videos(i).call()
      videos.push(video)
      setVideos(videos)
    }

    //Set latest video with title to view as default 
    const latest = await dvideo.methods.videos(videosCount).call()
    setCurrentHash(latest.hash);
    setCurrentTitle(latest.title);
    setinit(false);
  } else {
    window.alert('DVideo contract not deployed to detected network.')
  }
}







function App() {

  const [init, setinit] = useState(true)

  useEffect(async () => {
    // await loadWeb3();
    // await loadBlockchainData(setAccount, setVideoContract, setUserContract, setVideoCount, setVideos, videos, setCurrentHash, setCurrentTitle, setinit);
    setinit(false)
  }, [])

  if (init === true) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact={true} strict={true} render={() => {
          return <Home />
        }} />
        <Route path="/login" exact={true} strict={true} render={() => {
          return <Login />
        }} />
        <Route path="/signup" exact={true} strict={true} render={() => {
          return <Signup />
        }} />
        <Route path="/profile" exact={true} strict={true} render={() => {
          return <PrivateProfile />
        }} />
        <Route path="/publicProfile/:userId" exact={true} strict={true} render={(url) => {
          return <PublicProfile userId={url.match.params.userId} />
        }} />
        <Route path="/upload" exact={true} strict={true} render={() => {
          return <UploadOption />
        }} />
        <Route path="/upload/:option" exact={true} strict={true} render={(url) => {
          return <UploadForm uploadOption={url.match.params.option} />
        }} />
        <Route path="/video/:videoId" exact={true} strict={true} render={(url) => {
          return <ViewVideo videoId={url.match.params.videoId} />
        }} />
        <Route path="/search/:searchString" exact={true} strict={true} render={(url) => {
          return <SearchResults searchString={url.match.params.searchString} />
        }} />
        <Route path="/playlist/:playlistName" exact={true} strict={true} render={(url) => {
          return <PrivateProfilePlaylist playlistName={url.match.params.playlistName} />
        }} />
        <Route render={() => {
          return <InvalidPage />
        }} />
      </Switch >
    </React.Fragment>
  )
}

export default App;