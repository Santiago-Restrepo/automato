-- Adminer 4.8.1 PostgreSQL 16.2 dump

INSERT INTO "flow" ("created_at", "updated_at", "deleted_at", "id", "name") VALUES
('2024-10-06 01:52:45.937027',	'2024-10-21 18:53:51.40861',	NULL,	1,	'Update Sheets Inventory');

INSERT INTO "function" ("created_at", "updated_at", "deleted_at", "id", "name", "description") VALUES
('2024-12-19 15:42:52.255914',	'2024-12-19 15:42:52.255914',	NULL,	1,	'getPropertiesFromObject',	'get specific properties of an object'),
('2024-12-19 15:43:41.417669',	'2024-12-19 15:43:41.417669',	NULL,	2,	'validateShopifyInventoryUpdate',	'Validates properties of shopify invetory update webhook payload'),
('2024-12-19 15:44:15.067467',	'2024-12-19 15:44:15.067467',	NULL,	3,	'arrayToGoogleSheetsValues',	'parses an array of object into an array of google sheets values (array of arrays)'),
('2024-12-19 15:44:52.215173',	'2024-12-19 15:44:52.215173',	NULL,	4,	'updateGoogleSheetsSpreadsheetData',	'updates a specified Google sheets spreadsheet with data passed from parameters'),
('2024-12-19 15:45:08.826487',	'2024-12-19 15:45:08.826487',	NULL,	5,	'getGoogleSheetsSpreadsheetData',	'get data from a specified Google Sheets spreadsheet'),
('2024-12-19 15:45:30.543905',	'2024-12-19 15:45:30.543905',	NULL,	6,	'transformSheetsResponse',	'transform google sheets response into an array of objects'),
('2024-12-19 15:45:46.645369',	'2024-12-19 15:45:46.645369',	NULL,	7,	'updateArrayElement',	'updates an array with a new element');

INSERT INTO "function_parameter" ("created_at", "updated_at", "deleted_at", "id", "key", "function_id") VALUES
('2024-12-19 16:13:33.992759',	'2024-12-19 16:13:33.992759',	NULL,	1,	'propertiesMap',	1),
('2024-12-19 16:13:41.214341',	'2024-12-19 16:13:41.214341',	NULL,	2,	'object',	1),
('2024-12-19 16:13:58.670808',	'2024-12-19 16:13:58.670808',	NULL,	3,	'payload',	2),
('2024-12-19 16:14:11.14689',	'2024-12-19 16:14:11.14689',	NULL,	4,	'data',	3),
('2024-12-19 16:14:22.457075',	'2024-12-19 16:14:22.457075',	NULL,	5,	'spreadsheetId',	4),
('2024-12-19 16:14:29.731382',	'2024-12-19 16:14:29.731382',	NULL,	6,	'range',	4),
('2024-12-19 16:14:35.747264',	'2024-12-19 16:14:35.747264',	NULL,	7,	'values',	4),
('2024-12-19 16:14:52.253869',	'2024-12-19 16:14:52.253869',	NULL,	8,	'spreadsheetId',	5),
('2024-12-19 16:14:59.851',	'2024-12-19 16:14:59.851',	NULL,	9,	'range',	5),
('2024-12-19 16:15:32.161826',	'2024-12-19 16:15:32.161826',	NULL,	10,	'sheetsResponse',	6),
('2024-12-19 16:15:44.77289',	'2024-12-19 16:15:44.77289',	NULL,	11,	'newElement',	7),
('2024-12-19 16:15:50.674836',	'2024-12-19 16:15:50.674836',	NULL,	12,	'currentElements',	7),
('2024-12-19 16:15:57.240579',	'2024-12-19 16:15:57.240579',	NULL,	13,	'id_key',	7);

INSERT INTO "integration" ("created_at", "updated_at", "deleted_at", "id", "name") VALUES
('2024-12-13 14:16:50.924073',	'2024-12-13 14:16:50.924073',	NULL,	1,	'Shopify'),
('2024-12-13 16:58:13.696183',	'2024-12-13 16:58:13.696183',	NULL,	2,	'GoogleSheets');

INSERT INTO "step" ("created_at", "updated_at", "deleted_at", "id", "description", "order", "flow_id", "function_id") VALUES
('2024-11-18 16:46:20.599947',	'2024-11-18 16:46:20.599947',	NULL,	7,	NULL,	1,	1,	2),
('2024-11-18 16:46:20.599947',	'2024-11-18 16:46:20.599947',	NULL,	10,	NULL,	2,	1,	5),
('2024-12-15 16:53:40.712458',	'2024-12-15 16:53:40.712458',	NULL,	11,	NULL,	3,	1,	6),
('2024-12-15 16:53:40.712458',	'2024-12-15 16:53:40.712458',	NULL,	12,	NULL,	4,	1,	7),
('2024-12-15 17:29:22.192556',	'2024-12-15 17:29:22.192556',	NULL,	13,	NULL,	5,	1,	3),
('2024-12-15 17:32:54.809531',	'2024-12-15 17:32:54.809531',	NULL,	14,	NULL,	6,	1,	4);

INSERT INTO "step_parameter" ("created_at", "updated_at", "deleted_at", "id", "value", "output_step_id", "input_step_id", "function_parameter_id") VALUES
('2024-12-15 16:48:28.442255',	'2024-12-15 16:48:28.442255',	NULL,	10,	'"1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0"',	NULL,	10,	8),
('2024-12-15 16:48:28.442255',	'2024-12-15 16:48:28.442255',	NULL,	11,	'"A:E"',	NULL,	10,	9),
('2024-12-15 16:54:14.132075',	'2024-12-15 16:54:14.132075',	NULL,	12,	NULL,	10,	11,	10),
('2024-12-15 17:21:56.342965',	'2024-12-15 17:21:56.342965',	NULL,	13,	NULL,	7,	12,	11),
('2024-12-15 17:22:20.859109',	'2024-12-15 17:22:20.859109',	NULL,	14,	NULL,	11,	12,	12),
('2024-12-15 17:22:41.024904',	'2024-12-15 17:22:41.024904',	NULL,	15,	'"inventory_item_id"',	NULL,	12,	13),
('2024-12-15 17:31:42.350395',	'2024-12-15 17:31:42.350395',	NULL,	16,	NULL,	12,	13,	4),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	17,	'"1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0"',	NULL,	14,	5),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	18,	'"A:E"',	NULL,	14,	6),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	19,	NULL,	13,	14,	7);

INSERT INTO "trigger" ("created_at", "updated_at", "deleted_at", "id", "description", "is_active", "flow_id", "payload_key") VALUES
('2024-11-29 18:40:31.486326',	'2024-11-29 18:40:31.486326',	NULL,	2,	NULL,	't',	1,	'payload');

-- 2024-12-19 16:36:58.450117+00