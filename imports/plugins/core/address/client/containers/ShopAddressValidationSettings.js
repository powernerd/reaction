import { get } from "lodash";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Countries, Packages } from "/lib/collections";
import ShopAddressValidationSettings from "../components/ShopAddressValidationSettings";

const handlers = {
  onItemDeleted(id) {
    console.log("item deleted", id);
  }
};

const composer = (props, onData) => {
  // Get plugin settings for the current shop
  const plugin = Packages.findOne({ name: "reaction-address", shopId: Reaction.getShopId() });
  if (!plugin) return;

  let enabledServices = get(plugin, "settings.addressValidation.enabledServices", []);

  // Add serviceDisplayName to each item
  if (Array.isArray(enabledServices)) {
    enabledServices = enabledServices.map((item) => {
      const serviceDisplayName = "TODO Get Names";
      return {
        serviceDisplayName,
        ...item
      };
    });
  }

  onData(null, {
    enabledServices,
    countryOptions: Countries.find().fetch(),
    serviceOptions: [{
      label: "Test",
      value: "test"
    }]
  });
};

registerComponent("ShopAddressValidationSettings", ShopAddressValidationSettings, [
  withProps(handlers),
  composeWithTracker(composer)
]);

export default compose(
  withProps(handlers),
  composeWithTracker(composer)
)(ShopAddressValidationSettings);
