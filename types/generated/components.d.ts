import type { Schema, Attribute } from '@strapi/strapi';

export interface OrderOrderedItem extends Schema.Component {
  collectionName: 'components_order_ordered_items';
  info: {
    displayName: 'OrderedItem';
    icon: 'cup';
  };
  attributes: {
    amount: Attribute.Integer;
    price: Attribute.Decimal;
    product: Attribute.Relation<
      'order.ordered-item',
      'oneToOne',
      'api::product.product'
    >;
  };
}

export interface NavigationSubCategory extends Schema.Component {
  collectionName: 'components_navigation_sub_categories';
  info: {
    displayName: 'mainCategory';
    icon: 'layer';
    description: '';
  };
  attributes: {
    linkName: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    linkPath: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface NavigationCategory extends Schema.Component {
  collectionName: 'components_navigation_categories';
  info: {
    displayName: 'mainWithSubCategory';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    linkName: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    subCategory: Attribute.Component<'navigation.sub-category', true>;
    linkPath: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface EventsDescription extends Schema.Component {
  collectionName: 'components_events_descriptions';
  info: {
    displayName: 'Description';
    icon: 'message';
  };
  attributes: {
    content: Attribute.Blocks;
    registration: Attribute.Boolean & Attribute.DefaultTo<false>;
    registrationDescription: Attribute.Text;
  };
}

export interface EventsCategories extends Schema.Component {
  collectionName: 'components_events_categories';
  info: {
    displayName: 'Categories';
    icon: 'bulletList';
  };
  attributes: {
    categories: Attribute.Enumeration<
      [
        'Alle Kategorien',
        'Anbetung',
        'Bibelrunde',
        'Einkehrtag',
        'Exerzitien',
        'Fest',
        'Gebet',
        'Jugend',
        'Kongress',
        'Messe',
        'Patrizierrunde',
        'Radiosendung',
        'Schukungstag',
        'Treffen',
        'Wallfahrt',
        'Weiterbildung'
      ]
    > &
      Attribute.DefaultTo<'Alle Kategorien'>;
  };
}

export interface EventsAddresse extends Schema.Component {
  collectionName: 'components_content_addresses';
  info: {
    displayName: 'contact data';
    icon: 'house';
    description: '';
  };
  attributes: {
    street: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    number: Attribute.Integer;
    city: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    country: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    organiser: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    contactPerson: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    phone: Attribute.String;
    email: Attribute.Email;
    shortDescription: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    addressAddition: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface ImagesThreeColumnsImages extends Schema.Component {
  collectionName: 'components_images_three_columns_images';
  info: {
    displayName: 'threeColumnsImages';
    icon: 'picture';
  };
  attributes: {
    leftImage: Attribute.Media<'images' | 'files'>;
    centerImage: Attribute.Media<'images' | 'files'>;
    rightImage: Attribute.Media<'images' | 'files'>;
  };
}

export interface ImagesThreeColumnImages extends Schema.Component {
  collectionName: 'components_images_three_column_images';
  info: {
    displayName: 'threeColumnImages';
    icon: 'picture';
  };
  attributes: {
    leftImage: Attribute.Media<'images' | 'files'>;
    centerImage: Attribute.Media<'images' | 'files'>;
    rightImage: Attribute.Media<'images' | 'files'>;
  };
}

export interface ImagesSingleImage extends Schema.Component {
  collectionName: 'components_images_single_images';
  info: {
    displayName: 'singleImage';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files'>;
  };
}

export interface ContentWrapper extends Schema.Component {
  collectionName: 'components_content_wrappers';
  info: {
    displayName: 'wrapper';
    icon: 'bulletList';
  };
  attributes: {
    content: Attribute.Component<'content.img-title-pdf', true>;
  };
}

export interface ContentTitleText extends Schema.Component {
  collectionName: 'components_content_title_texts';
  info: {
    displayName: 'TitleText';
    icon: 'file';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    content: Attribute.Blocks;
  };
}

export interface ContentIntroduction extends Schema.Component {
  collectionName: 'components_content_introductions';
  info: {
    displayName: 'introduction';
    icon: 'emotionHappy';
  };
  attributes: {
    avatar: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
    content: Attribute.Blocks;
  };
}

export interface ContentImgTitlePdf extends Schema.Component {
  collectionName: 'components_content_img_title_pdfs';
  info: {
    displayName: 'ImgTitlePDF';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    prayerCategory: Attribute.Relation<
      'content.img-title-pdf',
      'oneToOne',
      'api::prayer-category.prayer-category'
    >;
    content: Attribute.Blocks;
    pdf: Attribute.Media<'files'>;
    image: Attribute.Media<'images'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'order.ordered-item': OrderOrderedItem;
      'navigation.sub-category': NavigationSubCategory;
      'navigation.category': NavigationCategory;
      'events.description': EventsDescription;
      'events.categories': EventsCategories;
      'events.addresse': EventsAddresse;
      'images.three-columns-images': ImagesThreeColumnsImages;
      'images.three-column-images': ImagesThreeColumnImages;
      'images.single-image': ImagesSingleImage;
      'content.wrapper': ContentWrapper;
      'content.title-text': ContentTitleText;
      'content.introduction': ContentIntroduction;
      'content.img-title-pdf': ContentImgTitlePdf;
    }
  }
}
