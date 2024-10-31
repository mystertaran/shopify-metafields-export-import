import logger from '../utils/logger.js';

export class MigrationService {
  constructor(sourceShopify, destinationShopify) {
    this.sourceShopify = sourceShopify;
    this.destinationShopify = destinationShopify;
  }

  async migrateAll() {
    try {
      logger.info('Rozpoczynanie migracji...');
      
      // Migracja metafields
      const metafields = await this.sourceShopify.getAllMetafields();
      for (const metafield of metafields) {
        await this.destinationShopify.createMetafield(metafield);
      }

      // Migracja metaobjects
      const metaobjects = await this.sourceShopify.getAllMetaobjects();
      for (const metaobject of metaobjects) {
        await this.destinationShopify.createMetaobject(metaobject);
      }

      logger.info('Migracja zakończona pomyślnie');
    } catch (error) {
      logger.error('Błąd podczas migracji:', error);
      throw error;
    }
  }
} 