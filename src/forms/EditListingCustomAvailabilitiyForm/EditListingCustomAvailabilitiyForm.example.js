/* eslint-disable no-console */
import EditListingCustomAvailabilitiyForm from './EditListingCustomAvailabilitiyForm';

export const Empty = {
  component: EditListingCustomAvailabilitiyForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingCustomAvailabilitiyForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
