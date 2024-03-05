SELECT
  toDateTime(toStartOfMonth(toTimeZone(toDateTime(chain_gdp.signed_at), 'UTC'), 'UTC'), 'UTC') AS `date_month`,
  arrayReduce('avg', arrayFilter(x -> x != 0, uniqResample(
    (SELECT toUnixTimestamp(toDateTime(min(date_trunc('week', signed_at)))) FROM blockchains.all_chains WHERE chain_name = 'bnb_opbnb_mainnet' AND signed_at >= parseDateTimeBestEffort('2023-06-01T00:00:00.000Z') AND signed_at <= now()),
    (SELECT toUnixTimestamp(toDateTime(max(date_trunc('week', signed_at)))) FROM blockchains.all_chains WHERE chain_name = 'bnb_opbnb_mainnet' AND signed_at >= parseDateTimeBestEffort('2023-06-01T00:00:00.000Z') AND signed_at <= now()),
    604800) (chain_gdp.tx_sender, chain_gdp.signed_at))) AS `average_wau`,
  uniq(arrayJoin(array(chain_gdp.tx_sender, chain_gdp.tx_recipient))) AS `count_active_addresses`
FROM
  (SELECT *
   FROM blockchains.all_chains ac
   WHERE signed_at >= parseDateTimeBestEffort('2023-06-01T00:00:00.000Z') AND signed_at <= now()
     AND chain_name = 'bnb_opbnb_mainnet'
  ) AS `chain_gdp`
WHERE (chain_gdp.signed_at >= parseDateTimeBestEffort('2023-06-01T00:00:00.000Z') AND chain_gdp.signed_at <= now()) AND (chain_gdp.chain_name = 'bnb_opbnb_mainnet')
GROUP BY `date_month`
ORDER BY `date_month` ASC
LIMIT 10000