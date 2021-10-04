import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/chart.css';
import Chart from 'chart.js';
import React, { useState, useEffect } from 'react';
import { MinusIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Graph = ({ setShow }) => {
  const ref = React.createRef();
  const [rgpPrice, setRgpPrice] = useState([]);
  const [volume24, setVolume24] = useState([]);
  const [pricePercentageChange, setPricePercentageChange] = useState('');
  const [volumeChange, setVolumeChange] = useState('');
  const getPriceHistory = () =>{
  const chartRef = ref.current.getContext('2d');
  const ctx = ref.current.getContext('2d');
  const gradient = ctx.createLinearGradient(90, 245, 85, 30);
  gradient.addColorStop(0.5, 'rgba(64, 186, 213,0)');
  gradient.addColorStop(1, 'rgba(64, 186, 213,0.25)');
  let rgpToBnb = [];
    axios({
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `https://api.coingecko.com/api/v3/coins/rigel-protocol/market_chart?vs_currency=bnb&days=14&interval=daily`,
    withCredentials: false,
  })
  .then(res=>{
    for(const dataArray of res.data.prices){
      rgpToBnb.push(dataArray[1].toFixed(5))
    }
    setRgpPrice(rgpToBnb)
    new Chart(chartRef, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', ''],
        datasets: [
          {
            fill: true,
            lineTension: 0.5,
            backgroundColor: gradient,
            borderColor: '#40BAD5',
            borderDashOffset: 0.0,
            pointRadius: 0,
            data: rgpToBnb,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: { display: false },
              gridLines: { display: false },
            },
          ],
          yAxes: [
            {
              display: true,
              position: 'right',
              ticks: {
                fontColor: 'rgba(255, 255, 255,0.25)',
                labels: rgpToBnb,
              },
              gridLines: {
                display: false,
              },
            },
            {
              display: false,
              position: 'left',
            },
          ],
        },
      },
    });
  })
  .catch(err =>{
    console.log(err)
  })
}


  const getVolume = () =>{
    axios({
      method: 'get',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      withCredentials: false,
    })
    .then(res=>{
      const totalVolume = res.data[0].total_volume;
      setVolume24(totalVolume);
    })
    .catch(err =>{
      console.log(err)
    })
};

  const getPriceChangePercentageBNB = () =>{
    axios({
      method: 'get',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=bnb&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      withCredentials: false,
    })
    .then(res =>{
      const priceChangePercentage = res.data[0].price_change_percentage_24h.toFixed(2);
      setPricePercentageChange(priceChangePercentage);
    })
    .catch(err =>{
      console.log(err)
    })
  };

  const getVolumeChange = () =>{
    axios({
      method: 'get',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      withCredentials: false,
    })
    .then(res =>{
      const volumeChange = res.data[0].price_change_percentage_24h.toFixed(2);
      setVolumeChange(volumeChange)
    })
    .catch(err =>{
      console.log(err)
    })
  };

  useEffect(() => {
    getPriceHistory();
    getVolume();
    getPriceChangePercentageBNB();
    getVolumeChange();
  }, []);
  return (

    <Box className={styles.charts__container}>
      <Flex
        color="gray.400"
        justifyContent="space-between"
        px={4}
        className={styles.details__container}
      >
        <div>
          <Text className={styles.text__market}>Volume (24)</Text>
          <Text className={styles.text}>
            ${volume24} <span className={volumeChange > 0 ? styles.increase : styles.decrease}>{volumeChange}%</span>
          </Text>
        </div>
        <div>
          <Text className={styles.text__market}>Current Price</Text>
          <Text className={styles.text}>
            {rgpPrice[rgpPrice.length - 1]} BNB <span className={pricePercentageChange > 0 ? styles.increase : styles.decrease}>
            {pricePercentageChange}%
            </span>
          </Text>
        </div>
        <MinusIcon
          w={6}
          h={6}
          my={5}
          cursor="pointer"
          onClick={() => {
            setShow(false);
          }}
          className={styles.icon}
        />
      </Flex>

      <canvas id="chart" ref={ref} className={styles.charts} />
    </Box>
  );
};

export default Graph;
