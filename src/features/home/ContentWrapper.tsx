import { createElement, FC, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ContentProps {
    component: FC;
}
const ContentWrapper: FC<ContentProps> = ({ component }) => {
    return <div key={uuidv4()}>{createElement(component)}</div>;
};

export const createContentWrapper = (component: FC): ReactNode => {
    return createElement(ContentWrapper, { component });
};
