import * as migration_20260710_100352_client_identity_map from './20260710_100352_client_identity_map';
import * as migration_20260712_172043_homepage_sections from './20260712_172043_homepage_sections';
import * as migration_20260712_173810_pricing_no_data_message from './20260712_173810_pricing_no_data_message';
import * as migration_20260712_175048_simple_content_block from './20260712_175048_simple_content_block';
import * as migration_20260712_182322_simple_content_richtext from './20260712_182322_simple_content_richtext';
import * as migration_20260712_183608_documents_block from './20260712_183608_documents_block';
import * as migration_20260712_184208_documents_view_link_label from './20260712_184208_documents_view_link_label';
import * as migration_20260712_190500_documents_view_download from './20260712_190500_documents_view_download';
import * as migration_20260712_195528_vps_page from './20260712_195528_vps_page';
import * as migration_20260712_201547_colocation_page from './20260712_201547_colocation_page';

export const migrations = [
  {
    up: migration_20260710_100352_client_identity_map.up,
    down: migration_20260710_100352_client_identity_map.down,
    name: '20260710_100352_client_identity_map',
  },
  {
    up: migration_20260712_172043_homepage_sections.up,
    down: migration_20260712_172043_homepage_sections.down,
    name: '20260712_172043_homepage_sections',
  },
  {
    up: migration_20260712_173810_pricing_no_data_message.up,
    down: migration_20260712_173810_pricing_no_data_message.down,
    name: '20260712_173810_pricing_no_data_message',
  },
  {
    up: migration_20260712_175048_simple_content_block.up,
    down: migration_20260712_175048_simple_content_block.down,
    name: '20260712_175048_simple_content_block',
  },
  {
    up: migration_20260712_182322_simple_content_richtext.up,
    down: migration_20260712_182322_simple_content_richtext.down,
    name: '20260712_182322_simple_content_richtext',
  },
  {
    up: migration_20260712_183608_documents_block.up,
    down: migration_20260712_183608_documents_block.down,
    name: '20260712_183608_documents_block',
  },
  {
    up: migration_20260712_184208_documents_view_link_label.up,
    down: migration_20260712_184208_documents_view_link_label.down,
    name: '20260712_184208_documents_view_link_label',
  },
  {
    up: migration_20260712_190500_documents_view_download.up,
    down: migration_20260712_190500_documents_view_download.down,
    name: '20260712_190500_documents_view_download',
  },
  {
    up: migration_20260712_195528_vps_page.up,
    down: migration_20260712_195528_vps_page.down,
    name: '20260712_195528_vps_page',
  },
  {
    up: migration_20260712_201547_colocation_page.up,
    down: migration_20260712_201547_colocation_page.down,
    name: '20260712_201547_colocation_page'
  },
];
