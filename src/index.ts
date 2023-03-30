/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./core/core.dart.cjs";
import { flow } from "./ui/flow";
import { FlowStep } from "./ui/flow-step";
import { Config } from "./config";
import * as Core from "./core/core";

export * from "./core/core";
export { Config } from "./config";
export { LicenseUsecase } from "./license-usecase";
export { LicenseUse } from "./license-use";
export { LicenseRecord } from "./license-record";
export { TitleTag } from "./title-tag";
export { TitleRecord } from "./title-record";
export * as UI from "./ui/ui";

const _config = new Config();

export function present() {
  if (Core.isInitialized()) flow(FlowStep.prompt, _config);
  else
    throw new Error(
      "Cannot present(). Wait for TIKI SDK initialization to complete."
    );
}

export function settings() {
  if (Core.isInitialized()) flow(FlowStep.settings, _config);
  else
    throw new Error(
      "Cannot present(). Wait for TIKI SDK initialization to complete."
    );
}

export const config = (): Config => _config;
