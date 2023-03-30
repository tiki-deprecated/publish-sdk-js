/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUsecaseEnum } from "./license-usecase-enum";

export class LicenseUsecase {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  static custom(value: string): LicenseUsecase {
    return new LicenseUsecase(`custom:${value.replace("custom:", "")}`);
  }

  static from(value: string): LicenseUsecase {
    const maybeTag: LicenseUsecaseEnum | undefined = (<unknown>(
      LicenseUsecaseEnum
    ))[value];
    if (maybeTag !== undefined) {
      return new LicenseUsecase(maybeTag.valueOf());
    } else return LicenseUsecase.custom(value);
  }

  static attribution(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.attribution);
  }

  static retargeting(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.retargeting);
  }

  static personalization(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.personalization);
  }

  static aiTraining(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.aiTraining);
  }

  static distribution(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.distribution);
  }

  static analytics(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.analytics);
  }

  static support(): LicenseUsecase {
    return new LicenseUsecase(LicenseUsecaseEnum.support);
  }
}
