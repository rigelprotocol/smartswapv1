import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import ActiveOrder from 'components/order/ActiveOrder';
import ShowDetails from 'components/detail/ShowDetails';
import ChartGraph from 'components/charts/ShowChart';
import SendToken from 'components/sendToken';
import History from 'components/history';
import Layout from 'components/layout';
import Tour from 'reactour';
import Step from 'components/onboarding/Step';
import Modal from 'components/onboarding/WelcomeModal/WelcomeModal';
import { Toaster } from 'react-hot-toast';
import style from '../../styles/intro.css';
import styles from '../../styles/Home.css';

export const TABS = {
  MANUAL: 'MANUAL',
  AUTO_TIME: 'AUTO_TIME',
  ACTIVE: 'ACTIVE',
  PRICE: 'PRICE',
};
export default function HomePage(props) {
  const [tab, setTab] = useState(TABS.MANUAL);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');

  useEffect(() => {
    const visits = window.localStorage.getItem('noFirstVisit');
    if (!visits) {
      setWelcomeModal(true);

      window.localStorage.setItem('noFirstVisit', 1);
    }
  }, []);

  const stepsForMobile = [
    {
      selector: '._3aVZgjuOcUs7jDx7puQe62 ',
      content: ({ goTo, inDom }) => (
        <Step
          title="Connect Wallet"
          description="Click here to connect us to your wallet on the Ethereum or Binance Smartchain"
          desc1
          mobile={isMobileDevice}
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button
            onClick={() => {
              window.scroll(0, 300);
              goTo(1);
            }}
            className={style.nextbutton}
          >
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
      position: 'left',
    },
    {
      selector: '.css-1jo4mlf',
      content: ({ goTo, inDom }) => (
        <Step
          mobile={isMobileDevice}
          title="Order History"
          description="Click here to view your Order History and Market History for all your previous transactions"
          desc2
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(2)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.selectFrom__button',
      content: ({ goTo, inDom }) => (
        <Step
          mobile={isMobileDevice}
          title="Swap From"
          description="Click here to select the token you would like to swap for another token."
          desc3
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(3)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.selectedTo__button',
      content: ({ goTo, inDom }) => (
        <Step
          mobile={isMobileDevice}
          title="Swap To"
          description="Click here to select the token you would like to receive."
          desc4
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button
            onClick={() => {
              window.scroll(300, 0);
              goTo(4);
            }}
            className={style.nextbutton}
          >
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.from__button',

      content: ({ goTo, inDom }) => (
        <Step
          mobile={isMobileDevice}
          title="Token Amount To Change"
          description="Enter the amount of tokens you would like to change from."
          desc5
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.nextbutton}
          >
            Done
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
  ];

  const steps = [
    {
      selector: '.connect__wallet__button',
      content: ({ goTo, inDom }) => (
        <Step
          title="Connect Wallet"
          description="Click here to connect us to your wallet on the Ethereum or Binance Smartchain"
          desc1
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(1)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
      position: 'bottom',
    },
    {
      selector: '.css-1dv2wbq',
      content: ({ goTo, inDom }) => (
        <Step title="Details" desc2>
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(2)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.css-1jo4mlf',
      content: ({ goTo, inDom }) => (
        <Step
          title="Order History"
          description="Click here to view your Order History and Market History for all your previous transactions"
          desc3
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(3)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.selectFrom__button',
      content: ({ goTo, inDom }) => (
        <Step
          title="Swap From"
          description="Click here to select the token you would like to swap for another token."
          desc4
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(4)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.selectedTo__button',
      content: ({ goTo, inDom }) => (
        <Step
          title="Swap To"
          description="Click here to select the token you would like to receive."
          desc5
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button onClick={() => goTo(5)} className={style.nextbutton}>
            Next
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
    {
      selector: '.from__button',
      content: ({ goTo, inDom }) => (
        <Step
          title="Token Amount To Change"
          description="Click here to Enter the amount of tokens you would like to change from."
          desc6
        >
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.skipbutton}
          >
            Skip
          </button>
          <button
            onClick={() => setIsTourOpen(false)}
            className={style.nextbutton}
          >
            Done
          </button>
        </Step>
      ),
      style: {
        borderRadius: '10px',
        backgroundColor: '#34215F',
        color: '#fff',
        padding: '24px 20px',
        width: '280px',
      },
    },
  ];

  const start = () => {
    setWelcomeModal(false);
    setIsTourOpen(true);
  };

  const skip = () => {
    setWelcomeModal(false);
  };

  return (
    <Layout title="Rigel Protocol - Smartswap">
      <>
        {welcomeModal && (
          <Modal closeModal={() => setWelcomeModal(false)}>
            <button onClick={start} className={style.start__walkthrough}>
              Start walkthrough
            </button>
            <br />
            <button onClick={skip} className={style.skip__walkthrough}>
              Skip
            </button>
          </Modal>
        )}

        <Tour
          isOpen={isTourOpen}
          steps={isMobileDevice ? stepsForMobile : steps}
          closeWithMask={false}
          showButtons={false}
          showNavigation={false}
          showCloseButton={false}
          showNumber={false}
          startAt={0}
          disableFocusLock
          inViewThreshold={560}
          disableInteraction
          rounded={10}
          maskSpace={5}
        />

        <Flex mb="100px" mx={2} flexWrap="wrap">
          <Box w={['100%', '100%', '30%', '29.5%']} mb={4} ml="2.8" mr="-0.7">
            <Box bg="#120136" rounded="2xl">
              {tab === TABS.MANUAL ? <ShowDetails /> : <ActiveOrder active />}
            </Box>
          </Box>

          <Box mx={5} w={['100%', '100%', '30%', '29.5%']} rounded="lg" mb={4}>
            <Box
              style={{
                boxShadow: '0px 0px 1px inset #343337, 0px 0px 1px gray',
              }}
              bg="#120136"
              rounded="2xl"
            >
              <Flex color="gray.500" justifyContent="space-between" px={4}>
                <Text
                  cursor="pointer"
                  fontSize="md"
                  className={
                    tab === TABS.MANUAL ? styles.active : styles.inactive
                  }
                  onClick={() => {
                    setTab(TABS.MANUAL);
                  }}
                >
                  Manual
                </Text>
                <Tooltip
                  label="Coming Soon"
                  bg="#120136"
                  aria-label="A tooltip"
                >
                  <Text
                    cursor="not-allowed"
                    className={
                      tab === TABS.PRICE ? styles.active : styles.inactive
                    }
                    // onClick={() => {
                    //   setTab(TABS.PRICE);
                    // }}
                  >
                    Set price
                  </Text>
                </Tooltip>
                <Tooltip
                  label="Coming Soon"
                  bg="#120136"
                  aria-label="A tooltip"
                >
                  <Text
                    cursor="not-allowed"
                    className={
                      tab === TABS.AUTO_TIME ? styles.active : styles.inactive
                    }
                    // onClick={() => {
                    //   setTab(TABS.AUTO_TIME);
                    // }}
                  >
                    Auto Time
                  </Text>
                </Tooltip>
              </Flex>
            </Box>
            <ChartGraph />
            <SendToken {...props} />
          </Box>
          <Box mx={5} w={['100%', '100%', '30%', '29.5%']} mb={4}>
            <Box
              bg="#120136"
              rounded="2xl"
              style={{
                boxShadow: '0px 0px 1px inset #343337, 0px 0px 1px gray',
              }}
            >
              <History />
            </Box>
          </Box>
        </Flex>
      </>
    </Layout>
  );
}
