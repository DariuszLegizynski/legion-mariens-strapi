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
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    pdf: Attribute.Media<'files'>;
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

export interface EventsRegister extends Schema.Component {
  collectionName: 'components_events_registers';
  info: {
    displayName: 'register';
    icon: 'discuss';
  };
  attributes: {
    registrationDescription: Attribute.Text;
    isRegistration: Attribute.Boolean;
  };
}

export interface EventsCycleEvent extends Schema.Component {
  collectionName: 'components_events_cycle_events';
  info: {
    displayName: 'cycle event';
    icon: 'clock';
    description: '';
  };
  attributes: {
    recurrenceType: Attribute.Enumeration<['weekly', 'monthly', 'yearly']>;
    recurrenceEndDate: Attribute.Date;
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

export interface EventsApplicant extends Schema.Component {
  collectionName: 'components_events_applicants';
  info: {
    displayName: 'applicant';
    icon: 'information';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    surname: Attribute.String;
    email: Attribute.Email;
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

export interface ContentWrapper extends Schema.Component {
  collectionName: 'components_content_wrappers';
  info: {
    displayName: 'prayer';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    content: Attribute.Component<'content.img-title-pdf', true>;
  };
}

export interface ContentTitle extends Schema.Component {
  collectionName: 'components_content_titles';
  info: {
    displayName: 'title';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface ContentTitleText extends Schema.Component {
  collectionName: 'components_content_title_texts';
  info: {
    displayName: 'TitleContent';
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

export interface ContentTitleImage extends Schema.Component {
  collectionName: 'components_content_title_images';
  info: {
    displayName: 'TitleImage';
    icon: 'bell';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media<'images' | 'videos'>;
  };
}

export interface ContentTitleDescription extends Schema.Component {
  collectionName: 'components_content_title_descriptions';
  info: {
    displayName: 'TitleDescription';
    icon: 'feather';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface ContentLinks extends Schema.Component {
  collectionName: 'components_content_links';
  info: {
    displayName: 'textPDF';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    pdf: Attribute.Media<'files'>;
  };
}

export interface ContentIntroduction extends Schema.Component {
  collectionName: 'components_content_introductions';
  info: {
    displayName: 'TitleImageContent';
    icon: 'emotionHappy';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
    content: Attribute.Blocks;
  };
}

export interface ContentImgTitlePdf extends Schema.Component {
  collectionName: 'components_content_img_title_pdfs';
  info: {
    displayName: 'PrayerImgTitlePDF';
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

export interface ContentImgPdfTitle extends Schema.Component {
  collectionName: 'components_content_img_pdf_titles';
  info: {
    displayName: 'ImgPdfTitle';
    icon: 'server';
  };
  attributes: {
    cover: Attribute.Media<'images' | 'videos'>;
    pdf: Attribute.Media<'files'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'order.ordered-item': OrderOrderedItem;
      'images.three-columns-images': ImagesThreeColumnsImages;
      'images.three-column-images': ImagesThreeColumnImages;
      'images.single-image': ImagesSingleImage;
      'navigation.sub-category': NavigationSubCategory;
      'navigation.category': NavigationCategory;
      'events.register': EventsRegister;
      'events.cycle-event': EventsCycleEvent;
      'events.categories': EventsCategories;
      'events.applicant': EventsApplicant;
      'events.addresse': EventsAddresse;
      'content.wrapper': ContentWrapper;
      'content.title': ContentTitle;
      'content.title-text': ContentTitleText;
      'content.title-image': ContentTitleImage;
      'content.title-description': ContentTitleDescription;
      'content.links': ContentLinks;
      'content.introduction': ContentIntroduction;
      'content.img-title-pdf': ContentImgTitlePdf;
      'content.img-pdf-title': ContentImgPdfTitle;
    }
  }
}
