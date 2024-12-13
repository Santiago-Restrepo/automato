-- This sample doesn't includes flow integration credentials, remember to add them


INSERT INTO "flow" ("created_at", "updated_at", "deleted_at", "id", "name") VALUES
('2024-10-06 01:52:45.937027',	'2024-10-21 18:53:51.40861',	NULL,	1,	'Update Sheets Inventory');

INSERT INTO "integration" ("created_at", "updated_at", "deleted_at", "id", "name") VALUES
('2024-12-13 14:16:50.924073',	'2024-12-13 14:16:50.924073',	NULL,	1,	'Shopify'),
('2024-12-13 16:58:13.696183',	'2024-12-13 16:58:13.696183',	NULL,	2,	'GoogleSheets');

INSERT INTO "parameter" ("created_at", "updated_at", "deleted_at", "id", "value", "input_step_id", "key", "output_step_id") VALUES
('2024-12-15 16:48:28.442255',	'2024-12-15 16:48:28.442255',	NULL,	10,	'"1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0"',	10,	'spreadsheetId',	NULL),
('2024-12-15 16:48:28.442255',	'2024-12-15 16:48:28.442255',	NULL,	11,	'"A:E"',	10,	'range',	NULL),
('2024-12-15 16:54:14.132075',	'2024-12-15 16:54:14.132075',	NULL,	12,	NULL,	11,	'sheetsResponse',	10),
('2024-12-15 17:21:56.342965',	'2024-12-15 17:21:56.342965',	NULL,	13,	NULL,	12,	'newElement',	7),
('2024-12-15 17:22:20.859109',	'2024-12-15 17:22:20.859109',	NULL,	14,	NULL,	12,	'currentElements',	11),
('2024-12-15 17:22:41.024904',	'2024-12-15 17:22:41.024904',	NULL,	15,	'"inventory_item_id"',	12,	'id_key',	NULL),
('2024-12-15 17:31:42.350395',	'2024-12-15 17:31:42.350395',	NULL,	16,	NULL,	13,	'data',	12),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	17,	'"1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0"',	14,	'spreadsheetId',	NULL),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	18,	'"A:E"',	14,	'range',	NULL),
('2024-12-15 17:33:33.78989',	'2024-12-15 17:33:33.78989',	NULL,	19,	NULL,	14,	'values',	13);

INSERT INTO "step" ("created_at", "updated_at", "deleted_at", "id", "description", "order", "flow_id", "function_name", "type") VALUES
('2024-11-18 16:46:20.599947',	'2024-11-18 16:46:20.599947',	NULL,	7,	NULL,	1,	1,	'validateShopifyInventoryUpdate',	'FUNCTION'),
('2024-11-18 16:46:20.599947',	'2024-11-18 16:46:20.599947',	NULL,	10,	NULL,	2,	1,	'getGoogleSheetsSpreadsheetData',	'FUNCTION'),
('2024-12-15 16:53:40.712458',	'2024-12-15 16:53:40.712458',	NULL,	11,	NULL,	3,	1,	'transformSheetsResponse',	'FUNCTION'),
('2024-12-15 16:53:40.712458',	'2024-12-15 16:53:40.712458',	NULL,	12,	NULL,	4,	1,	'updateArrayElement',	'FUNCTION'),
('2024-12-15 17:29:22.192556',	'2024-12-15 17:29:22.192556',	NULL,	13,	NULL,	5,	1,	'arrayToGoogleSheetsValues',	'FUNCTION'),
('2024-12-15 17:32:54.809531',	'2024-12-15 17:32:54.809531',	NULL,	14,	NULL,	6,	1,	'updateGoogleSheetsSpreadsheetData',	'FUNCTION');

INSERT INTO "trigger" ("created_at", "updated_at", "deleted_at", "id", "description", "is_active", "flow_id", "payload_key") VALUES
('2024-11-29 18:40:31.486326',	'2024-11-29 18:40:31.486326',	NULL,	2,	NULL,	't',	1,	'payload');