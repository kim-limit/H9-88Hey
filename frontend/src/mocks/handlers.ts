import { trimHandler } from './api/trim';
import { engineHandler } from './api/engine';
import { bodyTypeHandler } from './api/body-type';
import { trimColorHandler } from './api/trim-color';
import { wheelDriveHandler } from './api/wheel-drive';
import { trimNPerformanceHandler } from './api/trim-n-performance';
import { trimSelectOptionHandler } from './api/trim-select-option';
import { trimDefaultOptionHandler } from './api/trim-default-option';
import { trimHGenuineAccessoriesHandler } from './api/trim-h-genuine-accessories';
import { testHandler } from './api/test';

export const handlers = [
  ...trimHandler,
  ...wheelDriveHandler,
  ...trimSelectOptionHandler,
  ...trimNPerformanceHandler,
  ...trimHGenuineAccessoriesHandler,
  ...trimDefaultOptionHandler,
  ...trimColorHandler,
  ...engineHandler,
  ...bodyTypeHandler,
  ...testHandler,
];
