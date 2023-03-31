/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUsecaseEnum } from "./license-usecase-enum";

/**
 * A use case for a license, describing how an asset may be used.
 *
 * Use cases explicitly define how an asset may be used. Use either our list of common enumerations or define your
 * own using {@link LicenseUsecase.custom}. Custom use cases can be created by using a value that does not match
 * any of the predefined cases.
 */
export class LicenseUsecase {
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
   * Define a custom use case.
   *
   * The resulting {@link value} is `custom:<usecase>`
   *
   * @param value - your custom use case
   */
  static custom(value: string): LicenseUsecase {
    return new LicenseUsecase(`custom:${value.replace("custom:", "")}`);
  }

  /**
   * Create a new LicenseUsecase from a string value
   *
   * Attempts to resolve to one of our standard enumerated values. If it does not match,
   * a custom usecase is created.
   *
   * @param value - The string value to resolve
   */
  static from(value: string): LicenseUsecase {
    const maybeTag: LicenseUsecaseEnum | undefined = (<unknown>(
      LicenseUsecaseEnum
    ))[value];
    if (maybeTag !== undefined) {
      return new LicenseUsecase(maybeTag.valueOf());
    } else return LicenseUsecase.custom(value);
  }

  /**
   * Attribution: determine the actions that led to an outcome
   */
  static attribution(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.attribution);
  }

  /**
   * Retargeting: advertise to and reach users, often on other platforms
   */
  static retargeting(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.retargeting);
  }

  /**
   * Personalization: tailor messaging, offers, features, etc., to an individual
   */
  static personalization(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.personalization);
  }

  /**
   * AI Training: train machine learning models with user data
   */
  static aiTraining(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.aiTraining);
  }

  /**
   * Distribution: distribute/relicense data, insights, signals, etc., to 3rd-parties
   */
  static distribution(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.distribution);
  }

  /**
   * Analytics: extract insights and signals from user data
   */
  static analytics(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.analytics);
  }

  /**
   * Support: Add user data into customer support processes
   */
  static support(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.support);
  }
}
