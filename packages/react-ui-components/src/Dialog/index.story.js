import React from 'react';
import {storiesOf, action} from '@storybook/react';
import {withKnobs, text, boolean} from '@storybook/addon-knobs';
import {StoryWrapper} from './../_lib/storyUtils.js';
import Dialog from './index.js';
import Button from './../Button/index.js';

storiesOf('Dialog', module)
    .addDecorator(withKnobs)
    .addWithInfo(
        'default',
        'Dialog',
        () => (
            <StoryWrapper>
                <Dialog
                    isOpen={boolean('Is opened?', true)}
                    title={text('Title', 'Hello title!')}
                    onRequestClose={action('onRequestClose')}
                    actions={[
                        <Button key="foo">An action button</Button>
                    ]}
                    style="wide"
                    >
                    {text('Inner content', 'Hello world!')}
                </Dialog>
            </StoryWrapper>
        ),
        {inline: true, source: false}
    )
    .addWithInfo(
        'narrow',
        'Dialog',
        () => (
            <StoryWrapper>
                <Dialog
                    isOpen={boolean('Is opened?', true)}
                    title={text('Title', 'Hello title!')}
                    onRequestClose={action('onRequestClose')}
                    actions={[
                        <Button key="foo">An action button</Button>
                    ]}
                    style="narrow"
                    >
                    {text('Inner content', 'Hello world!')}
                </Dialog>
            </StoryWrapper>
        ),
        {inline: true, source: false}
    );
