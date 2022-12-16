import {TranslationKeys} from './../hooks/useAppTranslation';
import {TransProps} from 'next-translate';

declare global {
    type OptionValue = string | number;
    type Option = {
        value: OptionValue;
        label: TranslationKeys | string;
        description?: string;
    };
}
