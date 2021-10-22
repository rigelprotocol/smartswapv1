import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/chart.css';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { MinusIcon } from '@chakra-ui/icons';
import axios from 'axios';

export const Graph = ({ setShow }) => {
  const [rgpPrice, setRgpPrice] = useState([]);
  const [volume24, setVolume24] = useState([]);
  const [pricePercentageChange, setPricePercentageChange] = useState('');
  const [volumeChange, setVolumeChange] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartGraph, setChartGraph] = useState({})
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);

  const fetchData = () =>{
    setLoading(true);
    const getChartData = axios({
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `https://api.coingecko.com/api/v3/coins/rigel-protocol/market_chart?vs_currency=bnb&days=7&interval=daily`,
    withCredentials: false,
  });

  const getVolume = axios({
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    withCredentials: false,
  });
  const getPriceChangePercentageBNB = axios({
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=bnb&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
    withCredentials: false,
  });
  const getVolumeChange = axios({
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=rigel-protocol&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
    withCredentials: false,
  });
  axios.all([getChartData, getVolume, getPriceChangePercentageBNB, getVolumeChange]).then(
    axios.spread((...allData) => {
      const chartData = allData[0].data;
      const volumeData = allData[1].data[0];
      const priceChangeData = allData[2].data[0];
      const volumeChangeData = allData[3].data[0];
      const rgpToBnb = [];
      for(const dataArray of chartData.prices){
        rgpToBnb.push(parseFloat(dataArray[1].toFixed(5)))
      }
      const data = {
        labels: ['', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'RGB to BNB Price',
            data: rgpToBnb,
            fill: true,
            backgroundColor: [
              'rgba(64, 186, 213,0.2)',
              'rgba(64, 186, 213,0.25)',
            ],
            borderColor: '#40BAD5',
            borderDashOffset: 0.0,
            lineTension: 0.5,
          },
        ],
      };
      const options = {
        plugins:{
          tooltip: {
              callbacks: {
                  label: function(context) {
                      var label = context.dataset.label || '';

                      if (label) {
                          label +=': '+context.dataset.data[context.dataIndex]+ ' BNB';
                      }
                      if (context.parsed.y !== null) {
                          label += ' ';
                      }
                      return label;
                  }
              }
          },
          legend: {
          display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x:{
            gridLines: {
              display: false,
            },
            ticks:{
              display:false,
            }
          },
          y: {
            position: 'right',
            ticks: {
              fontColor: 'rgba(255, 255, 255,0.25)',
              labels: rgpToBnb,
              display: true,
              fontStyle: 'bold'
            },
            gridLines: {
              display: false,
            },
          }
        }
      };

      setChartGraph(chartData)
      setVolume24(volumeData.total_volume);
      setPricePercentageChange(priceChangeData.price_change_percentage_24h.toFixed(2));
      setVolumeChange(volumeChangeData.price_change_percentage_24h.toFixed(2));
      setRgpPrice(rgpToBnb);
      setOptions(options);
      setData(data);
      setLoading(false);
    }
  )
  )
};

  useEffect(() => {
    fetchData();
  }, []);
  return (

    <Box className={styles.charts__container}>
      {loading ? (<Text fontSize="sm" color=" rgba(255, 255, 255,0.50)" textAlign="center" p={10}>Loading</Text>) : (
        <>
        <Flex
          color="gray.400"
          justifyContent="space-between"
          px={4}
          className={styles.details__container}
        >
          <div>
            <Text className={styles.text__market}>Volume (24)</Text>
            <Text className={styles.text}>
              ${volume24.toLocaleString()} <span className={volumeChange > 0 ? styles.increase : styles.decrease}>{volumeChange}%</span>
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
        <Line id="mychart" data={data} options={options} className={styles.charts}/>
        </>
      )}
    </Box>
  );
};
export default Graph;
