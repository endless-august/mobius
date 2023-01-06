// '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import _ from 'lodash';

const solidIcons = require('@fortawesome/free-solid-svg-icons');
const definitions = _.chain(solidIcons)
    .filter(x => x.icon)
    .unionBy(x => x.iconName)
    .map(x => {
        const [, , ligatures] = x.icon;
        const others = _.filter(ligatures, ligature => _.isString(ligature) && ligature.length > 0);
        if (_.size(others) > 0) {
            // console.log(x.iconName, others);
            return [
                x,
                ..._.map(others, other => {
                    const newX = _.cloneDeep(x);
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

export default {};
