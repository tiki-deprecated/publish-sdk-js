/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTagEnum } from "./title-tag-enum";

export class TitleTag {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  static custom(value: string): TitleTag {
    return new TitleTag(`custom:${value}`);
  }

  static from(value: string): TitleTag {
    const maybeTag: TitleTagEnum | undefined = (<unknown>TitleTagEnum)[value];
    if (maybeTag !== undefined) {
      return new TitleTag(maybeTag.valueOf());
    } else return TitleTag.custom(value);
  }

  static emailAddress(): TitleTag {
    return new TitleTag(TitleTagEnum.emailAddress);
  }
  static phoneNumber(): TitleTag {
    return new TitleTag(TitleTagEnum.phoneNumber);
  }
  static physicalAddress(): TitleTag {
    return new TitleTag(TitleTagEnum.physicalAddress);
  }
  static contactInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.contactInfo);
  }
  static health(): TitleTag {
    return new TitleTag(TitleTagEnum.health);
  }
  static fitness(): TitleTag {
    return new TitleTag(TitleTagEnum.fitness);
  }
  static paymentInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.paymentInfo);
  }
  static creditInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.creditInfo);
  }
  static financialInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.financialInfo);
  }
  static preciseLocation(): TitleTag {
    return new TitleTag(TitleTagEnum.preciseLocation);
  }
  static coarseLocation(): TitleTag {
    return new TitleTag(TitleTagEnum.coarseLocation);
  }
  static sensitiveInfo(): TitleTag {
    return new TitleTag(TitleTagEnum.sensitiveInfo);
  }
  static contacts(): TitleTag {
    return new TitleTag(TitleTagEnum.contacts);
  }
  static messages(): TitleTag {
    return new TitleTag(TitleTagEnum.messages);
  }
  static photoVideo(): TitleTag {
    return new TitleTag(TitleTagEnum.photoVideo);
  }
  static audio(): TitleTag {
    return new TitleTag(TitleTagEnum.audio);
  }
  static gameplayContent(): TitleTag {
    return new TitleTag(TitleTagEnum.gameplayContent);
  }
  static customerSupport(): TitleTag {
    return new TitleTag(TitleTagEnum.customerSupport);
  }
  static userContent(): TitleTag {
    return new TitleTag(TitleTagEnum.userContent);
  }
  static browsingHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.browsingHistory);
  }
  static searchHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.searchHistory);
  }
  static userId(): TitleTag {
    return new TitleTag(TitleTagEnum.userId);
  }
  static deviceId(): TitleTag {
    return new TitleTag(TitleTagEnum.deviceId);
  }
  static purchaseHistory(): TitleTag {
    return new TitleTag(TitleTagEnum.purchaseHistory);
  }
  static productInteraction(): TitleTag {
    return new TitleTag(TitleTagEnum.productInteraction);
  }
  static advertisingData(): TitleTag {
    return new TitleTag(TitleTagEnum.advertisingData);
  }
  static usageData(): TitleTag {
    return new TitleTag(TitleTagEnum.usageData);
  }
  static crashData(): TitleTag {
    return new TitleTag(TitleTagEnum.crashData);
  }
  static performanceData(): TitleTag {
    return new TitleTag(TitleTagEnum.performanceData);
  }
  static diagnosticData(): TitleTag {
    return new TitleTag(TitleTagEnum.diagnosticData);
  }
}
