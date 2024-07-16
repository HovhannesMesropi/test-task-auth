import { CracoConfig } from '@craco/types';
import { Linter } from 'eslint';

const cracoConfig: CracoConfig = {
  eslint: {
    enable: true,
    mode: 'file',
    configure: (eslintConfig: Linter.Config) => {
      eslintConfig.rules = {
        'prettier/prettier': 'error',
      };
      return eslintConfig;
    }
  }
};

export default cracoConfig;