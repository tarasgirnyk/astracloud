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
import * as migration_20260713_094442_vps_pricing_cards_hostbill_mapping from './20260713_094442_vps_pricing_cards_hostbill_mapping';
import * as migration_20260714_090341_native_localization_and_service_pages from './20260714_090341_native_localization_and_service_pages';
import * as migration_20260714_090527_pages_drop_locale_field from './20260714_090527_pages_drop_locale_field';
import * as migration_20260714_111709_vps_pricing_cards_live_only from './20260714_111709_vps_pricing_cards_live_only';
import * as migration_20260715_121316_vps_pricing_cards_heading from './20260715_121316_vps_pricing_cards_heading';
import * as migration_20260722_100922_services_cta_href_localized from './20260722_100922_services_cta_href_localized';
import * as migration_20260722_102814_services_pricing_table_category_id from './20260722_102814_services_pricing_table_category_id';
import * as migration_20260722_105055_services_payment_methods from './20260722_105055_services_payment_methods';
import * as migration_20260723_100419_advantages_centered_stats_bar from './20260723_100419_advantages_centered_stats_bar';
import * as migration_20260723_101611_consultation_split_card from './20260723_101611_consultation_split_card';
import * as migration_20260723_105056_advantages_split_layout from './20260723_105056_advantages_split_layout';

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
    name: '20260712_201547_colocation_page',
  },
  {
    up: migration_20260713_094442_vps_pricing_cards_hostbill_mapping.up,
    down: migration_20260713_094442_vps_pricing_cards_hostbill_mapping.down,
    name: '20260713_094442_vps_pricing_cards_hostbill_mapping',
  },
  {
    up: migration_20260714_090341_native_localization_and_service_pages.up,
    down: migration_20260714_090341_native_localization_and_service_pages.down,
    name: '20260714_090341_native_localization_and_service_pages',
  },
  {
    up: migration_20260714_090527_pages_drop_locale_field.up,
    down: migration_20260714_090527_pages_drop_locale_field.down,
    name: '20260714_090527_pages_drop_locale_field',
  },
  {
    up: migration_20260714_111709_vps_pricing_cards_live_only.up,
    down: migration_20260714_111709_vps_pricing_cards_live_only.down,
    name: '20260714_111709_vps_pricing_cards_live_only',
  },
  {
    up: migration_20260715_121316_vps_pricing_cards_heading.up,
    down: migration_20260715_121316_vps_pricing_cards_heading.down,
    name: '20260715_121316_vps_pricing_cards_heading',
  },
  {
    up: migration_20260722_100922_services_cta_href_localized.up,
    down: migration_20260722_100922_services_cta_href_localized.down,
    name: '20260722_100922_services_cta_href_localized',
  },
  {
    up: migration_20260722_102814_services_pricing_table_category_id.up,
    down: migration_20260722_102814_services_pricing_table_category_id.down,
    name: '20260722_102814_services_pricing_table_category_id',
  },
  {
    up: migration_20260722_105055_services_payment_methods.up,
    down: migration_20260722_105055_services_payment_methods.down,
    name: '20260722_105055_services_payment_methods',
  },
  {
    up: migration_20260723_100419_advantages_centered_stats_bar.up,
    down: migration_20260723_100419_advantages_centered_stats_bar.down,
    name: '20260723_100419_advantages_centered_stats_bar',
  },
  {
    up: migration_20260723_101611_consultation_split_card.up,
    down: migration_20260723_101611_consultation_split_card.down,
    name: '20260723_101611_consultation_split_card',
  },
  {
    up: migration_20260723_105056_advantages_split_layout.up,
    down: migration_20260723_105056_advantages_split_layout.down,
    name: '20260723_105056_advantages_split_layout'
  },
];
