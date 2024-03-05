SELECT
      toDateTime(toStartOfDay(toTimeZone(toDateTime(chain_gdp.signed_at), 'UTC'), 'UTC'), 'UTC') AS `date_day`, 
      avg(uniq(arrayJoin(array(chain_gdp.tx_sender, chain_gdp.tx_recipient)))) OVER (ORDER BY date_day ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) AS `moving_average_30_day_active_address`, 
      uniq(arrayJoin(array(chain_gdp.tx_sender, chain_gdp.tx_recipient))) AS `count_active_addresses`
FROM
      (SELECT *
          FROM blockchains.all_chains ac
          WHERE signed_at >= toDate(now()) - INTERVAL 30 DAY
          AND signed_at < toDate(now()) + INTERVAL 1 DAY
          AND chain_name = 'avalanche_mainnet'
      ) AS `chain_gdp`
WHERE 
      (chain_gdp.signed_at >= toDate(now()) - INTERVAL 30 DAY AND chain_gdp.signed_at < toDate(now()) + INTERVAL 1 DAY)
      AND (chain_gdp.chain_name = 'avalanche_mainnet') 
GROUP BY 
      `date_day` 
ORDER BY 
      `date_day` ASC 
LIMIT 10000;
