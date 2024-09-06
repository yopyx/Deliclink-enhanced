export type GeoLocation = {
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    "ISO_3166-1_alpha-2": string;
    "ISO_3166-1_alpha-3": string;
    "ISO_3166-2": string[];
    _category: string;
    _normalized_city: string;
    _type: string;
    attraction?: string;
    city?: string;
    city_block: string;
    continent: string;
    country: string;
    country_code: string;
    county?: string;
    house_number?: string;
    local_authority?: string;
    municipality?: string;
    political_union?: string;
    postcode?: string;
    region?: string;
    road?: string;
    state: string;
    state_code: string;
    suburb?: string;
  };
  confidence: number;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
};
export type Widget = {
  NewListingView_category_bar_chicletranking_TwoRows?: string;
  NewListingView_category_bar_chicletranking_TwoRows_Rendition?: string;
  Restaurant_Group_WebView_PB_Theme?: string;
  Restaurant_Group_WebView_SEO_PB_Theme?: string;
  collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: string;
  inlineFacetFilter: string;
  restaurantCountWidget: string;
};
export type NextPageParam = {
  lat: number;
  lng: number;
  nextOffset: string;
  widgetOffset: Widget;
  filters: object;
  seoParams: {
    seoUrl: string;
    pageType: string;
    apiName: string;
  };
  page_type: string;
  _csrf: string;
};
export type NextListParam = {
  sortAttribute: string;
  isFiltered: boolean;
  queryId: string;
  seoParams: {
    apiName: string;
    brandId: string;
    seoUrl: string;
    pageType: string;
  };
  widgetOffset: Widget;
  nextOffset: string;
};
export type Cuisine = {
  id: string;
  imageId: string;
  action: {
    link: string;
    text: string;
    type: string;
  };
  entityType: string;
  accessibility: {
    altText: string;
    altTextCta: string;
  };
  entityId: string;
  frequencyCapping: object;
  externalMarketing: object;
  description: string;
};
export type ResData = {
  info: {
    id: string;
    name: string;
    cloudinaryImageId: string;
    locality: string;
    areaName: string;
    costForTwo: string;
    cuisines: string[];
    avgRating: number;
    veg?: boolean;
    parentId: string;
    avgRatingString: string;
    totalRatingsString: string;
    sla: {
      deliveryTime: number;
      lastMileTravel: number;
      serviceability: string;
      slaString: string;
      lastMileTravelString: string;
      iconType: string;
    };
    availability: {
      nextCloseTime: string;
      opened: boolean;
    };
    badges: object;
  };
  isOpen: boolean;
  type: string;
  badgesV2: {
    entityBadges: {
      imageBased: object;
      textBased: object;
      textExtendedBadges: object;
    };
  };
  aggregatedDiscountInfoV3: {
    header: string;
    subHeader?: string;
    discountTag?: string;
  };
  orderabilityCommunication?: {
    title: object;
    subTitle: object;
    message: object;
    customIcon: object;
  };
  differentiatedUi: {
    displayType: string;
    differentiatedUiMediaDetails: {
      mediaType: string;
      lottie: object;
      video: object;
    };
  };
  reviewsSummary: object;
  displayType: string;
  restaurantOfferPresentationInfo: object;
  externalRatings: {
    aggregatedRating: {
      rating: string;
      ratingCount?: string;
    };
    source?: string;
    sourceIconImageId?: string;
  };
  ratingsDisplayPreference: string;

  analytics: object;
  cta: {
    link: string;
    type: string;
    text?: string;
  };
  widgetId?: string;
};
export type FacetInfo = {
  label: string;
  id: string;
  analytics: object;
  openFilter?: boolean;
};
export type FacetList = {
  label: string;
  id: string;
  selection: string;
  facetInfo?: FacetInfo[];
  canSearch?: boolean;
  openFilter?: boolean;
  viewType: string;
  subLabel?: string;
};
export type CityResData = {
  statusCode: number;
  data: {
    statusMessage: string;
    pageOffset: {
      nextOffset: string;
      widgetOffset: Widget;
    };
    cards: [
      {
        card: {
          card: {
            "@type": string;
            header: {
              title: string;
              headerStyling: {
                padding: {
                  left: number;
                  top: number;
                  bottom: number;
                };
              };
            };
            layout: {
              rows: number;
              columns: number;
              horizontalScrollEnabled: boolean;
              itemSpacing: number;
              widgetPadding: object;
              containerStyle: {
                containerPadding: {
                  left: number;
                  top: number;
                  right: number;
                  bottom: number;
                };
              };
              scrollBar: object;
              widgetTheme: {
                defaultMode: {
                  backgroundColour: string;
                  theme: string;
                };
                darkMode: {
                  theme: string;
                };
              };
            };
            imageGridCards: {
              info: Cuisine[];
              style: {
                width: {
                  type: string;
                  value: number;
                  reference: string;
                };
                height: {
                  type: string;
                  value: number;
                  reference: string;
                };
              };
            };
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            header: {
              title: string;
              action: object;
              headerStyling: {
                padding: {
                  left: number;
                  top: number;
                  bottom: number;
                };
              };
            };
            layout: {
              rows: number;
              columns: number;
              horizontalScrollEnabled: boolean;
              itemSpacing: number;
              widgetPadding: object;
              containerStyle: {
                containerPadding: {
                  left: number;
                  right: number;
                  bottom: number;
                };
              };
              scrollBar: {
                scrollThumbColor: string;
                scrollTrackColor: string;
                width: number;
                height: number;
                scrollStyling: {
                  padding: {
                    top: number;
                    bottom: number;
                  };
                };
              };
              widgetTheme: {
                defaultMode: {
                  backgroundColour: string;
                  theme: string;
                };
                darkMode: {
                  backgroundColour: string;
                  theme: string;
                };
              };
            };
            id: string;
            gridElements: {
              infoWithStyle: {
                "@type": string;
                restaurants: ResData[];
                theme: string;
                widgetType: string;
                style: {
                  width: {
                    type: string;
                    value: number;
                    reference: string;
                  };
                  height: {
                    type: string;
                    value: number;
                    reference: string;
                  };
                  layoutAlignment: string;
                };
                collectionId: string;
              };
            };
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            sortConfigs: {
              key: string;
              title: string;
              selected?: boolean;
              defaultSelection?: boolean;
            }[];
            restaurantCount: number;
            facetList: FacetList[];
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            layout: {
              columns: number;
            };
            id: string;
            gridElements: {
              infoWithStyle: {
                "@type": string;
                restaurants: ResData[];
                theme: string;
              };
            };
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            message: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            androidAppImage: string;
            androidAppLink: string;
            iosAppImage: string;
            iosAppLink: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            cities: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            citySlug: string;
            lat: string;
            lng: string;
            userAgent: string;
            gandalfRequest: string;
            id: string;
            metaInfo: {
              pageType: string;
              pageTitle: string;
              pageMetaDescription: string;
              pageKeywords: string;
            };
            screenType: string;
            seoParams: {
              apiName: string;
              seoUrl: string;
              pageType: string;
            };
          };
        };
      }
    ];
    firstOffsetRequest: boolean;
    cacheExpiryTime: number;
    nextFetch: number;
  };
  tid: string;
  sid: string;
  deviceId: string;
  csrfToken: string | null;
};
export type CityResDatav2 = {
  statusCode: number;
  data: {
    statusMessage: string;
    pageOffset: {
      nextOffset: string;
      widgetOffset: Widget;
    };
    cards: [
      {
        card: {
          card: {
            "@type": string;
            title: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            sortConfigs: {
              key: string;
              title: string;
              selected?: boolean;
              defaultSelection?: boolean;
            }[];
            restaurantCount: number;
            facetList: FacetList[];
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            layout: {
              columns: number;
            };
            id: string;
            gridElements: {
              infoWithStyle: {
                "@type": string;
                restaurants: ResData[];
                theme: string;
              };
            };
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            message: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            brands: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            title: string;
            androidAppImage: string;
            androidAppLink: string;
            iosAppImage: string;
            iosAppLink: string;
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            cities: {
              text: string;
              link: string;
            }[];
            id: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            citySlug: string;
            lat: string;
            lng: string;
            userAgent: string;
            gandalfRequest: string;
            id: string;
            metaInfo: {
              pageType: string;
              pageTitle: string;
              pageMetaDescription: string;
              pageKeywords: string;
            };
            screenType: string;
            seoParams: {
              apiName: string;
              seoUrl: string;
              pageType: string;
            };
          };
        };
      }
    ];
    firstOffsetRequest: boolean;
    cacheExpiryTime: number;
    nextFetch: number;
  };
  tid: string;
  sid: string;
  deviceId: string;
  csrfToken: string | null;
};

export type ResDataUpdate = {
  statusCode: number;
  data: {
    statusMessage: string;
    pageOffset: {
      nextOffset: string;
      widgetOffset: Widget;
    };
    cards: [
      {
        card: {
          card: {
            "@type": string;
            layout: {
              columns: number;
            };
            id: string;
            gridElements: {
              infoWithStyle: {
                "@type": string;
                restaurants: ResData[];
                theme: string;
              };
            };
          };
        };
      }
    ];
    nextFetch: number;
  };
  tid: string;
  sid: string;
  deviceId: string;
  csrfToken: string | null;
};

export type SortConfig = {
  key: string;
  title: string;
  selected?: boolean;
  defaultSelection?: boolean;
};
export type ResListUpdate = {
  data: {
    tid: string;
    sid: string;
    deviceId: string;
    requestId: string;
    apiTime: string;
    success: {
      statusMessage: string;
      pageOffset: {
        nextOffset: string;
        widgetOffset: Widget;
      };
      cards: [
        {
          card: {
            card: {
              "@type": string;
              sortConfigs: SortConfig[];
              restaurantCount: number;
              facetList: FacetList;
            };
          };
        },
        {
          card: {
            card: {
              "@type": string;
              layout: {
                columns: number;
              };
              id: string;
              gridElements: {
                infoWithStyle: {
                  "@type": string;
                  restaurants: ResData[];
                  theme: string;
                };
              };
            };
          };
        }
      ];
      firstOffsetRequest?: boolean;
      nextFetch: number;
    };
    jid: string;
  };
  statusCode: number;
};

export type ResListUpdatev2 = {
  data: {
    tid: string;
    sid: string;
    deviceId: string;
    requestId: string;
    apiTime: string;
    success: {
      statusMessage: string;
      pageOffset: {
        nextOffset: string;
        widgetOffset: Widget;
      };
      cards: [
        {
          card: {
            card: {
              "@type": string;
              layout: {
                columns: number;
              };
              id: string;
              gridElements: {
                infoWithStyle: {
                  "@type": string;
                  restaurants: ResData[];
                  theme: string;
                };
              };
            };
          };
        }
      ];
      firstOffsetRequest?: boolean;
      nextFetch: number;
    };
    jid: string;
  };
  statusCode: number;
};

export type Menu = {
  statusCode: number;
  data: {
    statusMessage: string;
    cards: [
      {
        card: {
          card: {
            "@type": string;
            text: string;
            headerStyling: {
              textColor: string;
              textVariant: string;
            };
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            tabs: [
              {
                id: string;
                title: string;
              }
            ];
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            info: {
              id: string;
              name: string;
              city: string;
              slugs: {
                restaurant: string;
                city: string;
              };
              uniqueId: string;
              cloudinaryImageId: string;
              locality: string;
              areaName: string;
              costForTwo: "35000";
              costForTwoMessage: string;
              cuisines: string[];
              avgRating: number;
              veg: boolean;
              feeDetails: {
                restaurantId: string;
                fees: {
                  name: string;
                  fee?: number;
                }[];
                totalFee: number;
                title: string;
                amount: string;
                icon: string;
                message: string;
              };
              parentId: string;
              avgRatingString: string;
              totalRatingsString: string;
              sla: {
                restaurantId: string;
                deliveryTime: number;
                minDeliveryTime: number;
                maxDeliveryTime: number;
                lastMileTravel: number;
                serviceability: string;
                stressFactor: number;
                rainMode: string;
                longDistance: string;
                zoneId: number;
                slaString: string;
                lastMileTravelString: string;
                iconType: string;
              };
              availability: {
                nextOpenTimeMessage?: string;
                nextOpenTime?: string;
                nextCloseTime?: string;
                opened?: boolean;
                visibility: boolean;
                restaurantClosedMeta: object;
              };
              aggregatedDiscountInfo: {
                header: string;
                shortDescriptionList: {
                  meta: string;
                  discountType: string;
                  operationType: string;
                }[];
                descriptionList: {
                  meta: string;
                  discountType: string;
                  operationType: string;
                }[];
                visible: boolean;
              };
              badges: object;
              slugString: string;
              isOpen?: boolean;
              labels: {
                title: string;
                message: string;
              }[];
              totalRatings: number;
              aggregatedDiscountInfoV2: {
                header: string;
                shortDescriptionList: {
                  meta: string;
                  discountType: string;
                  operationType: string;
                }[];
                descriptionList: {
                  meta: string;
                  discountType: string;
                  operationType: string;
                }[];
                couponDetailsCta: string;
              };
              type: string;
              nudgeBanners: [
                {
                  priority: number;
                  discountInfo: {
                    discountType: string;
                    value: number;
                  };
                  unlockedMessage: string;
                  minItemCount: number;
                  maxItemCount: number;
                  type: string;
                  nudgeTagInfo: {
                    title: string;
                    fontName: string;
                  };
                  logoCtx: object;
                }
              ];
              headerBanner: {
                url: string;
              };
              ratingSlab: string;
              availabilityServiceabilityMessage: string;
              orderabilityCommunication: {
                title: {
                  text: string;
                };
                subTitle: {
                  text: string;
                };
                message: {
                  text: string;
                  textColour: string;
                };
                customIcon: {
                  bgGradientColorStart: string;
                  bgGradientColorEnd: string;
                };
              };
              cartOrderabilityNudgeBanner: {
                parameters: object;
                presentation: object;
              };
              latLong: string;
              backgroundImageOverlayInfo: object;
            };
            analytics: object;
          };
          relevance: {
            type: string;
            sectionId: string;
          };
        };
      },
      {
        card: {
          card: {
            "@type": string;
            layout: {
              rows: number;
              columns: number;
              horizontalScrollEnabled: boolean;
              itemSpacing: number;
              lineSpacing: number;
              widgetPadding: object;
              containerStyle: {
                containerPadding: {
                  left: number;
                  right: number;
                  bottom: number;
                };
              };
              scrollBar: object;
            };
            id: string;
            gridElements: {
              infoWithStyle: {
                "@type": string;
                offers: Offer[];
                habitMilestoneInfo: {
                  callout: object;
                };
                loyaltyDiscoverPresentationInfo: {
                  logoCtx: object;
                };
              };
            };
          };
        };
      },
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: (
                | RegularCardt1
                | RegularCardt2
                | RegularCardt3
                | RegularCardt4
                | RegularCardt5
              )[];
            };
          };
        };
      }
    ];
    firstOffsetRequest: boolean;
    isQCLink: boolean;
  };
  tid: string;
  sid: string;
  deviceId: string;
  csrfToken: string;
};

export type Offer = {
  info: {
    header: string;
    offerTagColor: string;
    offerTag?: string;
    logoBottom?: string;
    offerIds: string[];
    expiryTime: string;
    couponCode?: string;
    description: string;
    offerType: string;
    restId: string;
    offerLogo: string;
    descriptionTextColor: string;
    showExpiryTimer?: boolean;
  };
  cta: {
    type: string;
  };
};

export type Dish = {
  card: {
    "@type": string;
    info: {
      id: string;
      name: string;
      category: string;
      description: string;
      imageId?: string;
      inStock?: number;
      isVeg: number;
      price: number;
      finalPrice?: number;
      variants: {
        variantGroups?: {
          groupId: string;
          name: string;
          variations: {
            name: string;
            default: number;
            id: string;
            inStock: number;
            isVeg: number;
            isEnabled: number;
          }[];
        }[];
      };
      variantsV2: object;
      addons?: Addon[];
      itemAttribute: {
        vegClassifier: string;
        portionSize?: string;
      };
      defaultPrice?: number;
      ribbon: object;
      type: string;
      offerTags?: object[];
      itemBadge: object;
      badgesV2: object;
      itemNudgeType?: string;
      ratings: {
        aggregatedRating: {
          rating?: string;
          ratingCount?: string;
          ratingCountV2?: string;
        };
      };
      itemPriceStrikeOff: boolean;
    };
    analytics: object;
    hideRestaurantDetails: boolean;
  };
};

export type Addon = {
  groupId: string;
  groupName: string;
  choices: {
    id: string;
    name: string;
    price: number;
    inStock: number;
    isVeg: number;
    isEnabled: number;
  }[];
  maxAddons: number;
  maxFreeAddons?: number;
};

export type RegularCardt1 = {
  card: {
    card: {
      "@type": string;
      isPureVeg: boolean;
      badges: object;
      vegOnlyDetails: {
        imageId: string;
        title: string;
        description: string;
      };
      topRatedFilter: {
        attributes: {
          displayText: string;
        };
      };
      kidsCategoryFilter: {
        attributes: {
          displayText: string;
          tooltip: {
            enabled: boolean;
            displayText: string;
          };
        };
      };
      vegFilter: {
        attributes: {
          displayText: string;
        };
      };
      nonvegFilter: {
        attributes: {
          displayText: string;
        };
      };
    };
    relevance: {
      type: string;
      sectionId: string;
    };
  };
};

export type RegularCardt2 = {
  card: {
    card: {
      "@type": string;
      title: string;
      itemCards: Dish[];
    };
  };
};
export type RegularCardt3 = {
  card: {
    card: {
      "@type": string;
      type: string;
      imageId: string;
      text: string[];
    };
  };
};

export type RegularCardt4 = {
  card: {
    card: {
      "@type": string;
      name: string;
      area: string;
      completeAddress: string;
    };
  };
};

export type RegularCardt5 = {
  card: {
    card: {
      "@type": string;
      title: string;
      categories: {
        title: string;
        itemCards: Dish[];
      }[];
    };
  };
};
