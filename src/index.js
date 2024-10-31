import dotenv from 'dotenv';
import { ShopifyService } from './services/shopifyService.js';
import { MigrationService } from './services/migrationService.js';
import logger from './utils/logger.js';

dotenv.config();

async function main() {
  try {
    const sourceShopify = new ShopifyService(
      process.env.SOURCE_SHOP_URL,
      process.env.SOURCE_ACCESS_TOKEN
    );

    const destinationShopify = new ShopifyService(
      process.env.DESTINATION_SHOP_URL,
      process.env.DESTINATION_ACCESS_TOKEN
    );

    const migrationService = new MigrationService(sourceShopify, destinationShopify);
    await migrationService.migrateAll();
  } catch (error) {
    logger.error('Błąd główny aplikacji:', error);
    process.exit(1);
  }
}

main(); 