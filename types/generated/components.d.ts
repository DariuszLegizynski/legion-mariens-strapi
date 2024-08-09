import type { Schema, Attribute } from '@strapi/strapi';

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

export interface ContentImageWithText extends Schema.Component {
  collectionName: 'components_content_image_with_texts';
  info: {
    displayName: 'ImageWithText';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    avatar: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    content: Attribute.Blocks & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'navigation.sub-category': NavigationSubCategory;
      'navigation.category': NavigationCategory;
      'images.three-columns-images': ImagesThreeColumnsImages;
      'images.three-column-images': ImagesThreeColumnImages;
      'images.single-image': ImagesSingleImage;
      'events.description': EventsDescription;
      'events.categories': EventsCategories;
      'events.addresse': EventsAddresse;
      'content.title-text': ContentTitleText;
      'content.image-with-text': ContentImageWithText;
    }
  }
}
