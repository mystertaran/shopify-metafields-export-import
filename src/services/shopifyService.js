import { Shopify } from '@shopify/shopify-api';
import logger from '../utils/logger.js';

export class ShopifyService {
  constructor(shopUrl, accessToken) {
    this.client = new Shopify.Clients.Rest(shopUrl, accessToken);
  }

  async getAllMetafields() {
    try {
      const response = await this.client.get({
        path: 'metafields',
      });
      logger.info(`Pobrano ${response.body.metafields.length} metafields`);
      return response.body.metafields;
    } catch (error) {
      logger.error('Błąd podczas pobierania metafields:', error);
      throw error;
    }
  }

  async getAllMetaobjects() {
    try {
      const response = await this.client.get({
        path: 'metaobjects',
      });
      logger.info(`Pobrano ${response.body.metaobjects.length} metaobjects`);
      return response.body.metaobjects;
    } catch (error) {
      logger.error('Błąd podczas pobierania metaobjects:', error);
      throw error;
    }
  }

  async createMetafield(metafield) {
    try {
      await this.client.post({
        path: 'metafields',
        data: { metafield },
      });
      logger.info(`Utworzono metafield: ${metafield.key}`);
    } catch (error) {
      logger.error(`Błąd podczas tworzenia metafield ${metafield.key}:`, error);
      throw error;
    }
  }

  async createMetaobject(metaobject) {
    try {
      await this.client.post({
        path: 'metaobjects',
        data: { metaobject },
      });
      logger.info(`Utworzono metaobject: ${metaobject.type}`);
    } catch (error) {
      logger.error(`Błąd podczas tworzenia metaobject ${metaobject.type}:`, error);
      throw error;
    }
  }
} 