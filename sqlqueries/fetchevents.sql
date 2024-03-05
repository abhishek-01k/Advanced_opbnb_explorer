SELECT
      chain_gdp.chain_name AS `chain_name`, 
      COALESCE(`topic_hash_method`.name, 'No Event Label') AS `event_label`, 
      COUNT(*) AS `count_rows`
FROM
      (SELECT *
          FROM blockchains.all_chains ac
          WHERE 1 = 1
          AND chain_name IN ('bnb_opbnb_mainnet', 'bnb_opbnb_mainnet', 'bnb_opbnb_mainnet', 'bnb_opbnb_mainnet')
      ) AS `chain_gdp`
LEFT JOIN 
      (SELECT * FROM reports.topic_hash_methods WHERE 1 = 1
      ) AS `topic_hash_method` ON `topic_hash_method`.topic0 = `chain_gdp`.topic0  
WHERE 
      (chain_gdp.chain_name IN ('bnb_opbnb_mainnet', 'bnb_opbnb_mainnet', 'bnb_opbnb_mainnet', 'zksync_mainnet')) 
GROUP BY 
      `chain_name`, `event_label` 
ORDER BY 
      `count_rows` DESC 
LIMIT 10000;
