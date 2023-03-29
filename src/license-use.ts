/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUsecase } from "./license-usecase";

export interface LicenseUse {
  usecases: Array<LicenseUsecase>;
  destinations?: Array<string>;
}
