SELECT
      toDateTime(toStartOfDay(toTimeZone(toDateTime(chain_gdp.signed_at), 'UTC'), 'UTC'), 'UTC') AS `date_day`, 
      uniq(chain_gdp.tx_hash) AS `count_transaction`, 
      avg(uniq(chain_gdp.tx_hash)) OVER (ORDER BY date_day ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) AS `moving_average_30_day_transactions`
FROM
      (SELECT *
          FROM blockchains.all_chains ac
          WHERE signed_at >= toDate(now()) - INTERVAL 30 DAY
          AND signed_at < toDate(now()) + INTERVAL 1 DAY -- Adjust this if you need data up to the current moment
          AND chain_name = 'bnb_opbnb_mainnet'
      ) AS `chain_gdp`
WHERE 
      (chain_gdp.signed_at >= toDate(now()) - INTERVAL 30 DAY AND chain_gdp.signed_at < toDate(now()) + INTERVAL 1 DAY)
      AND (chain_gdp.chain_name = 'bnb_opbnb_mainnet') 
GROUP BY 
      `date_day` 
ORDER BY 
      `date_day` ASC 
LIMIT 10000;
