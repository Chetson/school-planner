import { forwardRef, useMemo, useRef } from 'react';

import { composeRefs } from '@radix-ui/react-compose-refs';
import clsx from 'clsx';

import { IconKind, noop } from '@shared/helpers';

import { deriveStrValue } from './lib/heplers';
import { Input } from '../inputs';

import type { InputProps } from '../inputs';
import type { ChangeEvent, ForwardRefRenderFunction } from 'react';

type FileInputProps = Omit<InputProps, 'value' | 'type' | 'onChange'> &
  (
    | {
        isMultiselect: true;
        onChange?: (files: File[]) => void;
        value?: File[] | null;
      }
    | {
        isMultiselect?: false;
        onChange?: (file: File) => void;
        value?: File | null;
      }
  );

const FileInput: ForwardRefRenderFunction<HTMLInputElement, FileInputProps> = (
  {
    disabled,
    inputClassName,
    containerClassName,
    labelClassName,
    value,
    isMultiselect,
    accept,
    onChange,
    ...props
  },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) return;

    if (isMultiselect) {
      return onChange?.([...fileList]);
    }

    if (fileList[0]) {
      onChange?.(fileList[0]);
    }
  };

  const handleClick = () => inputRef.current?.click();

  const setRef = composeRefs(inputRef, ref);

  const strValue = useMemo(() => deriveStrValue(value), [value]);

  return (
    <div className="relative w-full" onClick={handleClick}>
      {!disabled && (
        <input
          ref={(element) => element && setRef(element)}
          type="file"
          className="hidden"
          multiple={isMultiselect}
          onChange={handleChange}
          accept={accept}
        />
      )}
      <Input
        {...props}
        readOnly
        value={strValue}
        onChange={noop}
        tabIndex={-1}
        inputClassName={clsx('pointer-events-none', inputClassName)}
        containerClassName={clsx(
          !disabled && 'cursor-pointer',
          containerClassName,
        )}
        labelClassName={clsx(
          !disabled && '!cursor-pointer',
          'pointer-events-none',
          labelClassName,
        )}
        disabled={disabled}
        leftElement={IconKind.FOLDER_PLUS}
      />
    </div>
  );
};

export default forwardRef(FileInput);
