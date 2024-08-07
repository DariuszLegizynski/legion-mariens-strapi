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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'navigation.sub-category': NavigationSubCategory;
      'navigation.category': NavigationCategory;
      'images.three-columns-images': ImagesThreeColumnsImages;
      'images.three-column-images': ImagesThreeColumnImages;
      'images.single-image': ImagesSingleImage;
    }
  }
}
