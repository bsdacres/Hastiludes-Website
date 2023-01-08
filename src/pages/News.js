import React, { useEffect, useState } from "react";
import '../styles/about.css'
import { motion } from "framer-motion";
import { getDefaultProvider } from 'ethers'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import NewsComponent from "./components/NewsComponent";
import { NewsCarousel } from "./components/NewsCarousel";

const news = [
    {
      title: "How to get your hands on the Covenaunt x Hastiludes NFT?",
      date: "Coming Soon",
      thumbnail: 'https://media.discordapp.net/attachments/998097105916809317/1053321111561064528/1.jpg?width=934&height=643',
      content: "The first Hastiludes's NFT will be available later this January. The mint price will be the equalvant of $100 USD and will include the cost of shipping the physical item."
    },
    {
      title: "Upcoming rewards for Velas Holders!",
      date: "Feb. 2022",
      thumbnail: 'https://media.discordapp.net/attachments/883034757376639036/934950117688086528/screenshot003.png?width=943&height=643',
      content: "Our arrival on the Velas Network last year was an amazing experience. For those who supported the project, we want to compensate you!"
    },
    {
      title: "New Name, Same Passion",
      date: "2021",
      thumbnail: 'https://media.discordapp.net/attachments/883034757376639036/1053891935607193660/Screenshot_2.png?width=946&height=532',
      content: "While we may have undergone a name change, Hastiludes is commited to bringing the world of Covenaunt to a gaming audience. All of our current plans remain the same, but have undergone a bit of refinement to encourage a cohensive experience"
    },
    {
      title: "Covenaunt",
      date: "2019",
      thumbnail: 'https://cdn.discordapp.com/attachments/883034757376639036/1053891934982258718/222D01FC-EDD4-4C54-A16D-0B63ED590990.jpg',
      content: "Inspired by heroic epics, Covenaunt will continue to provide quality garments which implement and encourage the lore of Hastiludes"
    }
  ]

  const newsSlides = [
    {
      title: "Hear ye, hear ye!",
      thumbnail: 'https://cdn.discordapp.com/attachments/1023739791612850176/1061333045254291526/6.jpg',
      content: "The long awaited relic is almost here! Patrons who participate in the mint have the option to claim a physical equalavent in the near future. Join our Discord to prepare for the mint!"
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