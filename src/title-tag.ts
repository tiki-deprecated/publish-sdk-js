/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTagEnum } from "./title-tag-enum";

/**
 * A TitleTag object represents a tag that describes a data asset included in a {@link TitleRecord}.
 * Tags improve record searchability and come in handy when bulk searching and filtering licenses.
 *
 * You can use our list of common enumerations or define your own using {@link custom}.
 */
export class TitleTag {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  /**
   * The string value of the use case.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Define a custom tag.
   *
   * The resulting {@link value} is `custom:<tag>`
   *
   * @param value - your custom tag
   */
  static custom(value: string): TitleTag {
    return new TitleTag(`custom:${value.replace("custom:", "")}`);
  }

  /**
   * Create a new TitleTag from a string value
   *
   * Attempts to resolve to one of our standard enumerated values. If it does not match,
   * a custom tag is created.
   *
   * @param value - The string value to resolve
   */
  static from(value: string): TitleTag {
    const maybeTag: TitleTagEnum | undefined = (<unknown>TitleTagEnum)[value];
    if (maybeTag !== undefined) {
      return new TitleTag(maybeTag.valueOf());
    } else return TitleTag.custom(value);
  }

  /**
   * Name: Such as first or last name
   */
  static nam3(): TitleTag {
    return new TitleTag(TitleTagEnum.name);
  }

  /**
   * Email Address: Including but not limited to a hashed email address
   */
  static emailAddress(): TitleTag {
    return new TitleTag(TitleTagEnum.emailAddress);
  }

  /**
   * Phone Number: Including but not limited to a hashed phone number
   */
  static phoneNumber(): TitleTag {
    return new TitleTag(TitleTagEnum.phoneNumber);
  }

  /**
   * Physical Address: Such as home address, physical address, or mailing address
   */
  static physicalAddress(): TitleTag {
    return new TitleTag(TitleTagEnum.physicalAddress);
  }

  /**
   * Contact Info: Any other information that can be used to contact the user
   */
  static contactInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.contactInfo);
  }

  /**
   * Health: Health and medical data or health-related human subject research
   */
  static health(): TitleTag {
    return new TitleTag(TitleTagEnum.health);
  }

  /**
   * Fitness: Fitness and exercise data
   */
  static fitness(): TitleTag {
    return new TitleTag(TitleTagEnum.fitness);
  }

  /**
   * Payment Info: Such as form of payment, payment card number, or bank account number
   */
  static paymentInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.paymentInfo);
  }

  /**
   * Credit Info: Such as credit score
   */
  static creditInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.creditInfo);
  }

  /**
   * Financial Info: Such as salary, income, assets, debts, or any other financial information
   */
  static financialInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.financialInfo);
  }

  /**
   * Precise Location: Information that describes the location of a user or device with the same or greater
   * resolution as a latitude and longitude with three or more decimal places
   */
  static preciseLocation(): TitleTag {
    return new TitleTag(TitleTagEnum.preciseLocation);
  }

  /**
   * Coarse Location: Information that describes the location of a user or device with lower resolution than a
   * latitude and longitude with three or more decimal places
   */
  static coarseLocation(): TitleTag {
    return new TitleTag(TitleTagEnum.coarseLocation);
  }

  /**
   * Sensitive Info: Such as racial or ethnic data, sexual orientation, pregnancy or childbirth information,
   * disability, religious or philosophical beliefs, trade union membership, political opinion,
   * genetic information, or biometric data
   */
  static sensitiveInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.sensitiveInfo);
  }

  /**
   * Contacts: Such as a list of contacts in the user’s phone, address book, or social graph
   */
  static contacts(): TitleTag {
    return new TitleTag(TitleTagEnum.contacts);
  }

  /**
   * Messages: Including subject line, sender, recipients, and contents of the email, sms, or other
   * text-based messages.
   */
  static messages(): TitleTag {
    return new TitleTag(TitleTagEnum.messages);
  }

  /**
   * Photo/Video: The user’s photos or videos.
   */
  static photoVideo(): TitleTag {
    return new TitleTag(TitleTagEnum.photoVideo);
  }

  /**
   * Audio: The user’s voice or sound recordings
   */
  static audio(): TitleTag {
    return new TitleTag(TitleTagEnum.audio);
  }

  /**
   * Gameplay Content: Such as saved games, multiplayer matching or gameplay logic, or user-generated content in-game
   */
  static gameplayContent(): TitleTag {
    return new TitleTag(TitleTagEnum.gameplayContent);
  }

  /**
   * Customer Support: Data generated by the user during a customer support request
   */
  static customerSupport(): TitleTag {
    return new TitleTag(TitleTagEnum.customerSupport);
  }

  /**
   * User Content: Any other user-generated content
   */
  static userContent(): TitleTag {
    return new TitleTag(TitleTagEnum.userContent);
  }

  /**
   * Browsing History: Information about content the user has viewed that is not part of your app, such as websites
   */
  static browsingHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.browsingHistory);
  }

  /**
   * Search History: Information about searches performed
   */
  static searchHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.searchHistory);
  }

  /**
   * User Id: Such as screen name, handle, account ID, assigned user ID, customer number, or other user-level or
   * account-level ID that can be used to identify a particular user or account
   */
  static userId(): TitleTag {
    return new TitleTag(TitleTagEnum.userId);
  }

  /**
   * Device Id: Such as the device’s advertising identifier, or other device-level ID
   */
  static deviceId(): TitleTag {
    return new TitleTag(TitleTagEnum.deviceId);
  }

  /**
   * Purchase History: An account’s or individual’s purchases or purchase tendencies
   */
  static purchaseHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.purchaseHistory);
  }

  /**
   * Product Interaction: Such as app launches, taps, clicks, scrolling information, music listening data, video
   * views, saved place in a game, video, or song, or other information about how the user interacts with your app
   */
  static productInteraction(): TitleTag {
    return new TitleTag(TitleTagEnum.productInteraction);
  }

  /**
   * Advertising Data: Such as information about the advertisements the user has seen
   */
  static advertisingData(): TitleTag {
    return new TitleTag(TitleTagEnum.advertisingData);
  }

  /**
   * Usage Data: Any other data about user activity in your app
   */
  static usageData(): TitleTag {
    return new TitleTag(TitleTagEnum.usageData);
  }

  /**
   * Crash Data: Such as crash logs
   */
  static crashData(): TitleTag {
    return new TitleTag(TitleTagEnum.crashData);
  }

  /**
   * Performance Data: Such as launch time, hang rate, or energy use
   */
  static performanceData(): TitleTag {
    return new TitleTag(TitleTagEnum.performanceData);
  }

  /**
   * Diagnostic Data: Any other data collected for the purposes of measuring technical diagnostics related to your app
   */
  static diagnosticData(): TitleTag {
    return new TitleTag(TitleTagEnum.diagnosticData);
  }
}
