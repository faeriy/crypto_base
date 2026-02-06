import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import CryptocurrencyCard from './components/CryptocurrencyCard';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const onClick = e => {
    console.log('click ', e);
    setCurrencyId(e.key);
  };

  // Currencies fetching logic
  const fetchCurrencies = () => {
    axios.get('http://localhost:8000/cryptocurrencies').then(
      r => {
        const currenciesResponse = r.data
        const menuItems = [
          {
            type: 'divider',
          },
          {
            key: 'grp',
            label: 'CoinBase',
            type: 'group',
            children: currenciesResponse.map(c => ({
              label: c.name,
              key: String(c.id),
            })),
          },
        ];
        setCurrencies(menuItems);
      }
    )
  };

  const fetchCurrencyData = () => {
    setCurrencyData(null); // clear previous data while loading
    axios.get(`http://localhost:8000/cryptocurrencies/${currencyId}`).then(
      r => {
        setCurrencyData(r.data);
      }
    )
  }

  useEffect(() => {fetchCurrencies()}, []);
  useEffect(() => {fetchCurrencyData()}, [currencyId]);

  return (
    <div className='flex '>
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={currencies}
      className='h-screen overflow-scroll'
    />
    <div className='mx-auto my-auto'>
      <CryptocurrencyCard currency={currencyData}/>
    </div>
    </div>
    
  );
};
export default App;
