CREATE TABLE `short_url` (
  `id` int NOT NULL AUTO_INCREMENT,
  `original_url` varchar(10000) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url_idx` (`original_url`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
