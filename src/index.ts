/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ui/theme.css";
import OfferPrompt from "./ui/screens/offer-prompt/offer-prompt";
import Settings from "./ui/screens/settings/settings";

function present() {
  OfferPrompt();
}

function terms() {
  Settings(
    "# learn more\n" +
      "\n" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n" +
      "aliqua. Posuere lorem ipsum dolor sit amet consectetur. Sit amet massa vitae tortor condimentum lacinia quis vel. Dictum\n" +
      "non consectetur a erat. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Lobortis scelerisque fermentum\n" +
      "dui faucibus in. Amet nulla facilisi morbi tempus. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit.\n" +
      "Adipiscing at in tellus integer feugiat scelerisque. Eget egestas purus viverra accumsan in. Consequat ac felis donec et\n" +
      "odio pellentesque. Egestas dui id ornare arcu odio ut sem. Malesuada fames ac turpis egestas sed tempus urna.\n" +
      "\n" +
      "Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Tortor at auctor urna nunc id. Id volutpat lacus\n" +
      "laoreet non curabitur. Morbi tristique senectus et netus et malesuada fames ac turpis. Mi bibendum neque egestas congue\n" +
      "quisque egestas diam in arcu. Eu tincidunt tortor aliquam nulla. Tincidunt ornare massa eget egestas purus viverra\n" +
      "accumsan. Bibendum ut tristique et egestas quis. Est ullamcorper eget nulla facilisi etiam dignissim diam. Vivamus at\n" +
      "augue eget arcu dictum. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. In massa\n" +
      "tempor nec feugiat nisl. Bibendum ut tristique et egestas quis ipsum suspendisse. Metus aliquam eleifend mi in nulla\n" +
      "posuere. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Nulla malesuada pellentesque elit eget\n" +
      "gravida. Mollis nunc sed id semper."
  );
}

export { present, terms };
