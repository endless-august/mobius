import { library } from '@fortawesome/fontawesome-svg-core';
import { chain, filter, isString, size, map, cloneDeep } from 'lodash';

const solidIcons = require('@fortawesome/free-solid-svg-icons');
const definitions = chain(solidIcons)
    .filter(x => x.icon)
    .unionBy(x => x.iconName)
    .map(x => {
        const [, , ligatures] = x.icon;
        const others = filter(ligatures, ligature => isString(ligature) && ligature.length > 0);
        if (size(others) > 0) {
            // console.log(x.iconName, others);
            return [
                x,
                ...map(others, other => {
                    const newX = cloneDeep(x);
                    newX.iconName = other;
                    return newX;
                }),
            ];
        }
        return x;
    })
    .flatten()
    .value();
library.add(...definitions);
