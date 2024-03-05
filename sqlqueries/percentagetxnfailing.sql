SELECT
      chain_gdp.chain_name AS `chain_name`, 
      toDateTime(toStartOfDay(toTimeZone(toDateTime(chain_gdp.signed_at), 'UTC'), 'UTC'), 'UTC') AS `date_day`, 
      uniq(chain_gdp.tx_hash) / date_diff('second', min(chain_gdp.signed_at), max(chain_gdp.signed_at)) AS `ratios_transactions_per_second`
FROM
      (SELECT *
          FROM blockchains.all_chains ac
          WHERE signed_at >= toDate(now()) - INTERVAL 30 DAY
          AND signed_at < toDate(now()) + INTERVAL 1 DAY
          AND chain_name IN ('arbitrum_mainnet','bnb_opbnb_mainnet','optimism_mainnet','zksync_mainnet','matic_mainnet')
      ) AS `chain_gdp`
WHERE 
      (chain_gdp.signed_at >= toDate(now()) - INTERVAL 30 DAY AND chain_gdp.signed_at < toDate(now()) + INTERVAL 1 DAY)
      AND (chain_gdp.chain_name IN ('arbitrum_mainnet','bnb_opbnb_mainnet','optimism_mainnet','zksync_mainnet','matic_mainnet')) 
GROUP BY 
      `chain_name`, `date_day` 
ORDER BY 
      `date_day` ASC 
LIMIT 10000
