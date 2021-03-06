import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Choice, {Error, errorID, helpTextID} from '../Choice';
import Icon from '../Icon';

import * as styles from './Checkbox.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  checked?: boolean | 'indeterminate',
  helpText?: React.ReactNode,
  id?: string,
  name?: string,
  value?: string,
  error?: Error,
  disabled?: boolean,
  onChange?(newChecked: boolean, id: string): void,
  onFocus?(): void,
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('Checkbox');

export default function Checkbox({
  id = getUniqueID(),
  label,
  labelHidden,
  helpText,
  checked = false,
  error,
  disabled,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
}: Props) {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    const {currentTarget} = event;
    onChange(currentTarget.checked, id);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') { describedBy.push(errorID(id)); }
  if (helpText) { describedBy.push(helpTextID(id)); }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;

  const wrapperClassName = classNames(
    styles.Checkbox,
    error && styles.error,
  );

  const isIndeterminate = checked === 'indeterminate';
  const isChecked = !isIndeterminate && Boolean(checked);

  const indeterminateAttributes = isIndeterminate
    ? {indeterminate: 'true', 'aria-checked': 'mixed'}
    : {'aria-checked' : isChecked};

  const iconSource = isIndeterminate ? 'subtract' : 'checkmark';

  const inputClassName = classNames(
    styles.Input,
    isIndeterminate && styles['Input-indeterminate'],
  );

  return (
    <Choice
      id={id}
      label={label}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
    >
      <div className={wrapperClassName}>
        <input
          id={id}
          name={name}
          value={value}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className={inputClassName}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error != null}
          aria-describedby={ariaDescribedBy}
          role="checkbox"
          {...indeterminateAttributes}
        />
        <div className={styles.Backdrop} />
        <div className={styles.Icon}>
          <Icon source={iconSource} />
        </div>
      </div>
    </Choice>
  );
}
