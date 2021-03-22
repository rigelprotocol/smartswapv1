import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/chart.css';
import Chart from 'chart.js';
import React, { useEffect } from 'react';
import { MinusIcon } from '@chakra-ui/icons';

const Graph = ({ setShow }) => {
  const ref = React.createRef();

  useEffect(() => {
    const chartRef = ref.current.getContext('2d');
    const ctx = ref.current.getContext('2d');
    const gradient = ctx.createLinearGradient(90, 245, 85, 30);
    gradient.addColorStop(0.5, 'rgba(64, 186, 213,0)');
    gradient.addColorStop(1, 'rgba(64, 186, 213,0.25)');

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
            data: [0, 5, 4, 14, 10, 20, 5, 11],
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
                min: 0.0,
                max: 20.0,
                stepSize: 10.0,
                suggestedMin: 0.0,
                suggestedMax: 20.0,
                callback: (label) => {
                  switch (label) {
                    case 0.0:
                      return '0.02 BNB';
                    case 10.0:
                      return '0.03 BNB';
                    case 20.0:
                      return '0.04 BNB';
                  }
                },
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
            $22,364,064 <span className={styles.increase}>+3.07%</span>
          </Text>
        </div>
        <div>
          <Text className={styles.text__market}>Current Price</Text>
          <Text className={styles.text}>
            0.03892 BNB <span className={styles.decrease}>-0.03%</span>
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
