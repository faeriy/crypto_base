import React from 'react';
import { Card, Space, Tag, Statistic, Row, Col, Divider, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const formatPrice = (n) =>
  n >= 1 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n) : `$${n.toFixed(8)}`;
const formatShort = (n) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
};

const tagCategoryColor = {
  ALGORITHM: 'blue',
  CATEGORY: 'default',
  PLATFORM: 'green',
  OTHERS: 'purple',
};

function CryptocurrencyCard(props) {
  const { currency } = props;

  if (!currency) {
    return <Card style={{ width: 380 }} loading />;
  }

  const quote = currency.quote?.USD;
  const price = quote?.price;
  const percent24h = quote?.percent_change_24h;
  const volume24h = quote?.volume_24h;
  const marketCap = quote?.market_cap;
  const tags = Array.isArray(currency.tags) ? currency.tags : [];

  return (
    <Card
      style={{ width: 380 }}
      title={
        <div className="flex items-center gap-3">
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
            alt=""
            width={32}
            height={32}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{currency.name}</Text>
            <Text type="secondary">{currency.symbol} · Rank #{currency.cmc_rank}</Text>
          </Space>
        </div>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Statistic
          title="Price"
          value={price}
          formatter={(v) => formatPrice(v)}
          precision={price >= 1 ? 2 : 8}
        />
        {percent24h != null && (
          <Text type={percent24h >= 0 ? 'success' : 'danger'}>
            {percent24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {' '}24h: {percent24h >= 0 ? '+' : ''}{percent24h.toFixed(2)}%
          </Text>
        )}

        <Divider style={{ margin: '8px 0' }} />

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Statistic title="24h Volume" value={volume24h} formatter={(v) => formatShort(v)} />
          </Col>
          <Col span={12}>
            <Statistic title="Market Cap" value={marketCap} formatter={(v) => formatShort(v)} />
          </Col>
        </Row>

        {(currency.circulating_supply != null || currency.max_supply != null) && (
          <>
            <Divider style={{ margin: '8px 0' }} />
            <div>
              <Text type="secondary">Supply</Text>
              <div>
                <Text>Circulating: {new Intl.NumberFormat('en-US').format(currency.circulating_supply ?? 0)}</Text>
                {currency.max_supply != null && (
                  <Text type="secondary"> / Max: {new Intl.NumberFormat('en-US').format(currency.max_supply)}</Text>
                )}
              </div>
            </div>
          </>
        )}

        {tags.length > 0 && (
          <>
            <Divider style={{ margin: '8px 0' }} />
            <div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 6 }}>Tags</Text>
              <Space size={[4, 4]} wrap>
                {tags.map((tag) => (
                  <Tag key={tag.slug} color={tagCategoryColor[tag.category] ?? 'default'}>
                    {tag.name}
                  </Tag>
                ))}
              </Space>
            </div>
          </>
        )}
      </Space>
    </Card>
  );
}

export default CryptocurrencyCard;
