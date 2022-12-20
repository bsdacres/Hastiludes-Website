import React, { useEffect, useState } from "react";
import '../styles/about.css'
import { motion } from "framer-motion";
import { getDefaultProvider } from 'ethers'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import NewsComponent from "./components/NewsComponent";
import { NewsCarousel } from "./components/NewsCarousel";

const news = [
    {
      title: "How to get your hands on the Covenaunt X Hastiludes NFT?",
      date: "Coming Soon",
      thumbnail: 'https://media.discordapp.net/attachments/998097105916809317/1053321111561064528/1.jpg?width=934&height=643',
      content: "Before copping a RTFKT NFT that can unlock other NFTs or a forging event, check here first to make sure it's still eligible and hasn't already been claimed or forged. Keep in mind the status may change between the time of checking and buying."
    },
    {
      title: "Upcoming rewards for Velas Holders!",
      date: "Feb. 2022",
      thumbnail: 'https://media.discordapp.net/attachments/883034757376639036/934950117688086528/screenshot003.png?width=943&height=643',
      content: "Before copping a RTFKT NFT that can unlock other NFTs or a forging event, check here first to make sure it's still eligible and hasn't already been claimed or forged. Keep in mind the status may change between the time of checking and buying."
    },
    {
      title: "New Name, Same Passion",
      date: "2021",
      thumbnail: 'https://media.discordapp.net/attachments/883034757376639036/1053891935607193660/Screenshot_2.png?width=946&height=532',
      content: "Before copping a RTFKT NFT that can unlock other NFTs or a forging event, check here first to make sure it's still eligible and hasn't already been claimed or forged. Keep in mind the status may change between the time of checking and buying."
    },
    {
      title: "Covenaunt",
      date: "2019",
      thumbnail: 'https://cdn.discordapp.com/attachments/883034757376639036/1053891934982258718/222D01FC-EDD4-4C54-A16D-0B63ED590990.jpg',
      content: "Before copping a RTFKT NFT that can unlock other NFTs or a forging event, check here first to make sure it's still eligible and hasn't already been claimed or forged. Keep in mind the status may change between the time of checking and buying."
    }
  ]

  const newsSlides = [
    {
      title: "Hear ye, hear ye!",
      thumbnail: 'https://cdn.discordapp.com/attachments/998097105916809317/1053321111561064528/1.jpg',
      content: "The long awaited is relic is almsot here! Patrons who participate have the option to claim a physical equalavent in the near future. Join our Discord to prepare for the mint!"
    }
  ]




export default function News() {
    const [slide, setSlide] = useState(0)
    return(
        <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="news-container">
            <NewsCarousel 
            title={newsSlides[0].title}
            content={newsSlides[0].content}
            image={newsSlides[0].thumbnail}
            />
            <div className="newss-con">
                {news.map((newss) => (
                    <NewsComponent
                    key = {newss}
                    thumbnail = {newss.thumbnail}
                    title = {newss.title}
                    date = {newss.date}
                    preview = {newss.content}
                    />
                    ))}
            </div>
        </motion.div>
    )
}