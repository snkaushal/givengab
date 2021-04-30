/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'dates-length',
    label: 'Dates',
    type: 'BookingDateRangeLengthFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates', 'minDuration'],
    config: {
      // A global time zone to use in availability searches. As listings
      // can be in various time zones, we must decide what time zone we
      // use in search when looking for available listings within a
      // certain time interval.
      //
      // If you have all/most listings in a certain time zone, change this
      // config value to that.
      //
      // See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
      searchTimeZone: 'Etc/UTC',

      // Options for the minimum duration of the booking
      options: [
        { key: '0', label: 'Any length' },
        { key: '60', label: '1 hour', shortLabel: '1h' },
        { key: '120', label: '2 hours', shortLabel: '2h' },
      ],
    },
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'yogaStyles',
    label: 'Yoga styles',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_yogaStyles'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'ashtanga', label: 'Ashtanga' },
        { key: 'hatha', label: 'Hatha' },
        { key: 'kundalini', label: 'Kundalini' },
        { key: 'restorative', label: 'Restorative' },
        { key: 'vinyasa', label: 'Vinyasa' },
        { key: 'yin', label: 'Yin' },
      ],
    },
  },
  {
    id: 'orgType',
    label: 'Donee Organization Type',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_orgType'],
    config: {
      searchMode: 'has_any',
      options: [
        {
          key: 'not-incorporated',
          label: 'Not incorporated',
        },
        {
          key: 'non-profit',
          label: 'Non profit',
        },
        {
          key: 'startup',
          label: 'Startup',
        },
        {
          key: 'corporation',
          label: 'Corporation',
        },
        {
          key: 'restaurant',
          label: 'Restaurant',
        },
        {
          key: 'bar-coffee shop',
          label: 'Bar / Coffee Shop',
        },
        {
          key: 'educational',
          label: 'Educational',
        },
        {
          key: 'government',
          label: 'Government',
        },
        {
          key: 'political',
          label: 'Political',
        },
        {
          key: 'individual',
          label: 'Individual',
        },
        {
          key: 'gofundme',
          label: 'GoFundMe',
        },
        {
          key: 'smallbusiness',
          label: 'Small business',
        },
      ],
    },
  },
  {
    id: 'industry',
    label: "Giver's Industry",
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_industry'],
    config: {
      searchMode: 'has_any',
      options: [
        {
          key: 'law',
          label: 'Law',
        },
        {
          key: 'engineering',
          label: 'Engineering',
        },
        {
          key: 'community-development',
          label: 'Community Development',
        },
        {
          key: 'entrepreneurship',
          label: 'Entrepreneurship',
        },
        {
          key: 'executive',
          label: 'Executive',
        },
        {
          key: 'education',
          label: 'Education',
        },
        {
          key: 'public-services',
          label: 'Public Services',
        },
        {
          key: 'medical',
          label: 'Medical',
        },
        {
          key: 'sciences',
          label: 'Sciences',
        },
        {
          key: 'technology',
          label: 'Technology',
        },
        {
          key: 'construction',
          label: 'Construction',
        },
        {
          key: 'food-entertainment',
          label: 'Food & Entertainment',
        },
        {
          key: 'music-and-art',
          label: 'Music and Art',
        },
        {
          key: 'politics',
          label: 'Politics',
        },
        {
          key: 'fitness',
          label: 'Fitness',
        },
      ],
    },
  },
  {
    id: 'activityType',
    label: 'Activity Type',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_activityType'],
    config: {
      searchMode: 'has_any',
      options: [
        {
          key: 'drinks',
          label: 'Drinks',
        },
        {
          key: 'meals',
          label: 'Meals',
        },
        {
          key: 'coffee',
          label: 'Coffee',
        },
        {
          key: 'outdoors',
          label: 'Outdoors',
        },
        {
          key: 'active',
          label: 'Active',
        },
        {
          key: 'career',
          label: 'Career',
        },
        {
          key: 'music',
          label: 'Music',
        },
        {
          key: 'hobby',
          label: 'Hobby',
        },
        {
          key: 'adrenaline',
          label: 'Adrenaline',
        },
      ],
    },
  },
  {
    id: 'style',
    label: "Giver's Style",
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_style'],
    config: {
      options: [
        {
          key: 'casual',
          label: 'Casual',
        },
        {
          key: 'professional',
          label: 'Professional',
        },
      ],
    },
  },
  {
    id: 'certificate',
    label: 'Certificate',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_certificate'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
        { key: '200h', label: 'Registered yoga teacher 200h' },
        { key: '500h', label: 'Registered yoga teacher 500h' },
      ],
    },
  },
];

export const customFilters = [
  {
    id: 'cities',
    label: 'City',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['cities'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'reno-tahoe',
          label: 'Reno / Tahoe',
        },
        {
          key: 'other',
          label: 'Other',
        },
      ],
    },
  },
  {
    id: 'objectives',
    label: 'Objectives',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['objectives'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'support_local_organizations_financially',
          label: 'Support local organizations financially',
        },
        { key: 'network_with_local_peers', label: 'Network with local peers' },
        {
          key: 'learn_more_about_a_specific_profession',
          label: 'Learn more about a specific profession',
        },
        {
          key: "see_reno/tahoe_from_another's_perspective",
          label: "See Reno/Tahoe from another's perspective",
        },
        { key: 'explore_new_hobbies', label: 'Explore new hobbies' },
        { key: 'shadow_professionals', label: 'Shadow professionals' },
        { key: 'meet_interesting_people', label: 'Meet interesting people' },
        {
          key: 'raise_money_for_an_organization',
          label: 'Raise money for an organization',
        },
        { key: 'mentor_others', label: 'Mentor Others' },
        {
          key: 'find_potential_partners_or_employees',
          label: 'Find potential partners or employees',
        },
        {
          key: 'have_fun_and_learn_about_the_community',
          label: 'Have fun and learn about the community',
        },
      ],
    },
  },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};
