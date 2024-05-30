import React, { useState } from 'react';
import { components, MultiValueRemoveProps } from 'react-select';
import { Input } from "antd";

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  const {innerProps } = props;
  const defaultValue = '[x]';
  // @ts-ignore
  const [value, setValue] = useState<string>(defaultValue);
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleToggle = () => {
    setIsShowInput(!isShowInput)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setValue('');
    handleToggle()
  };

  const onBlur = () =>{
    if (!value.length) {
     setValue(defaultValue)
    }
    handleToggle()
  }

  if (isShowInput) {
    return (
      <Input
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        style={{
          width: 80
        }}
      />
    )
  }

  return (
    <components.MultiValueRemove {...props} innerProps={{...innerProps, onClick: handleClick}}>
      <span>{value}</span>
    </components.MultiValueRemove>
    );
  };

export default MultiValueRemove;
