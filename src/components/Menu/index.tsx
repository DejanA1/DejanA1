import React, { useContext, useEffect } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import transakSDK from '@transak/transak-sdk'
import links from './config'
import i18n from '../../i18n';

const Menu: React.FC = props => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = useGetPriceData()

  useEffect(() => {
    if(selectedLanguage) i18n.changeLanguage(selectedLanguage.code);
    setTranslatedLanguage(selectedLanguage);
  }, [selectedLanguage, setTranslatedLanguage])

  useEffect(() => {
    if( isDark === false){
      toggleTheme();
    }    
  }, [isDark, toggleTheme])


  

  const buy = () => {
    /* eslint-disable */
    const transak = new transakSDK({
      // apiKey: '3aea4088-06db-405c-8db4-6c62981b925b',  // Your API Key 
      // apiKey: 'f0c9fc39-1e03-42dc-a61b-f873050877f0',  // Your API Key for PRODUCTION
      apiKey: '7b1ad524-06bf-402a-97aa-c2ae111dcb1d',     // Your API Key for PRODUCTION
      environment: 'STAGING', // STAGING/PRODUCTION
      defaultCryptoCurrency: 'BNB',
      walletAddress: '', // Your customer's wallet address
      themeColor: '000000', // App theme color
      fiatCurrency: 'USD', // INR/GBP
      email: '', // Your customer's email address
      redirectURL: 'https://ultggDBG.net/swap',
      hostURL: window.location.origin,
      widgetHeight: '550px',
      widgetWidth: '350px'
    });
    transak.init();
    

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data)
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  }


  return (
    <UikitMenu
      links={links}
      priceLink="https://www.coingecko.com/en/coins/goose-finance"
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      buy={buy}
      logout={deactivate}
      // isDark={isDark}
      // toggleTheme={toggleTheme}
      isDark={false}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      {...props}
    />
  )
}

export default Menu
