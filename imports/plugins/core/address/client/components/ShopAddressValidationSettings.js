import React, { Component } from "react";
import PropTypes from "prop-types";
import AccordionFormList from "./AccordionFormList";
import AddressValidationSettingsForm from "./AddressValidationSettingsForm";

export default class ShopAddressValidationSettings extends Component {
  static propTypes = {
    addressValidationConfig: PropTypes.shape({
      enabledServices: PropTypes.arrayOf(PropTypes.shape({
        countryCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
        serviceDisplayName: PropTypes.string.isRequired,
        serviceName: PropTypes.string.isRequired
      }))
    }),
    countryOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
    onItemDeleted: PropTypes.func.isRequired,
    serviceOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }))
  };

  get listItems() {
    const { addressValidationConfig, countryOptions, serviceOptions } = this.props;

    return addressValidationConfig.enabledServices.map((item) => ({
      detail: item.countryCodes.join(", "),
      id: item._id,
      itemEditFormProps: {
        countryOptions,
        onSubmit(doc) {
          console.log("onSubmit edit", doc);
        },
        serviceOptions,
        value: item
      },
      label: item.serviceDisplayName
    }));
  }

  render() {
    const { onItemDeleted, countryOptions, serviceOptions } = this.props;

    const itemAddFormProps = {
      countryOptions,
      onSubmit(doc) {
        console.log("onSubmit add", doc);
      },
      serviceOptions
    };

    return (
      <div className="clearfix">
        <AccordionFormList
          addNewItemButtonText="Add address validation rule"
          components={{ ItemAddForm: AddressValidationSettingsForm, ItemEditForm: AddressValidationSettingsForm }}
          deleteItemButtonText="Delete rule"
          entryFormSubmitButtonText="Add new rule"
          itemAddFormProps={itemAddFormProps}
          items={this.listItems}
          onItemDeleted={onItemDeleted}
        />
      </div>
    );
  }
}
